import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const archiveDir = path.join(root, "archive", "webflow", "pages");
const essayDir = path.join(root, "src", "essays");
const assetRoot = path.join(root, "src", "assets");
const monthNumbers = new Map([
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
].flatMap((month, index) => [
  [month, String(index + 1).padStart(2, "0")],
  [month.slice(0, 3), String(index + 1).padStart(2, "0")]
]));
monthNumbers.set("sept", "09");

function cleanText(value) {
  return value.replaceAll("\u200d", "").replace(/\s+/g, " ").trim();
}

function yamlString(value) {
  return JSON.stringify(cleanText(value));
}

function parseAuthorLine(value) {
  const text = cleanText(value);
  const match = text.match(/^(.+?),\s+(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!match) return { author: "Xander Dunn", date: null, displayDate: text };
  const [, author, day, month, year] = match;
  const monthNumber = monthNumbers.get(month.toLowerCase());
  return {
    author,
    date: monthNumber ? `${year}-${monthNumber}-${day.padStart(2, "0")}` : null,
    displayDate: `${day} ${month} ${year}`
  };
}

function safeFilename(url) {
  let filename;
  try {
    filename = decodeURIComponent(new URL(url).pathname.split("/").pop() || "asset");
  } catch {
    filename = "asset";
  }
  filename = filename.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  if (!filename.includes(".")) filename += ".bin";
  const suffix = crypto.createHash("sha1").update(url).digest("hex").slice(0, 8);
  const extension = path.extname(filename);
  return `${path.basename(filename, extension)}-${suffix}${extension}`;
}

async function downloadAsset(url, slug) {
  const filename = safeFilename(url);
  const destinationDir = path.join(assetRoot, slug);
  const destination = path.join(destinationDir, filename);
  await fs.mkdir(destinationDir, { recursive: true });
  try {
    await fs.access(destination);
  } catch {
    const response = await fetch(url, { headers: { "user-agent": "xander.ai Webflow migration" } });
    if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
    await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
  }
  return `/assets/${slug}/${filename}`;
}

function tweetUrl(iframeSrc) {
  if (!iframeSrc) return null;
  try {
    const embedUrl = new URL(iframeSrc.startsWith("//") ? `https:${iframeSrc}` : iframeSrc);
    if (embedUrl.searchParams.get("schema") !== "twitter") return null;
    const original = embedUrl.searchParams.get("url");
    if (!original) return null;
    const statusUrl = new URL(original);
    statusUrl.search = "";
    return statusUrl.toString();
  } catch {
    return null;
  }
}

function createTurndown() {
  const service = new TurndownService({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "_",
    headingStyle: "atx"
  });
  service.use(gfm);
  service.addRule("webflowFigure", {
    filter: "figure",
    replacement(_content, node) {
      const iframe = node.querySelector("iframe");
      if (iframe) {
        const url = tweetUrl(iframe.getAttribute("src"));
        if (url) return `\n\n{% tweet "${url}" %}\n\n`;
        const src = iframe.getAttribute("src") || "";
        if (src.startsWith("//")) iframe.setAttribute("src", `https:${src}`);
        return `\n\n<div class="embed">${iframe.outerHTML}</div>\n\n`;
      }
      const image = node.querySelector("img");
      if (!image) return "";
      const alt = cleanText(image.getAttribute("alt") || "").replaceAll("]", "\\]");
      const src = image.getAttribute("src") || "";
      const captionHtml = node.querySelector("figcaption")?.innerHTML?.trim();
      return `\n\n![${alt}](${src})${captionHtml ? `\n\n<figcaption>${captionHtml}</figcaption>` : ""}\n\n`;
    }
  });
  return service;
}

async function localizeImages($, slug, scope) {
  for (const image of scope.find("img").toArray()) {
    const element = $(image);
    const src = element.attr("src");
    if (!src || !/^https?:\/\//.test(src)) continue;
    element.attr("src", await downloadAsset(src, slug));
    element.removeAttr("srcset");
    element.removeAttr("sizes");
  }
}

async function importEssay(filename) {
  const slug = path.basename(filename, ".html");
  const html = await fs.readFile(path.join(archiveDir, filename), "utf8");
  const $ = cheerio.load(html);
  const richText = $(".w-richtext").first();
  if (!richText.length) throw new Error(`No Webflow rich text found in ${filename}`);

  const heading = richText.children("h2").first();
  const title = cleanText($("title").text()) || cleanText(heading.text());
  const titleHeadings = [heading];
  let nextHeading = heading.next();
  while (nextHeading.is("h2")) {
    titleHeadings.push(nextHeading);
    nextHeading = nextHeading.next();
  }
  const homeLink = richText.children("p").filter((_, element) =>
    cleanText($(element).text()).toLowerCase() === "xander.ai"
  ).first();
  const subtitleElement = nextHeading.is("p") ? nextHeading : heading.next("p");
  const authorElement = richText.children("p").filter((_, element) =>
    $(element).find("strong").length > 0 && cleanText($(element).text()).includes("Xander Dunn")
  ).first();
  const subtitle = subtitleElement.is(authorElement) ? "" : cleanText(subtitleElement.text());
  const authorData = parseAuthorLine(authorElement.text());
  const description = cleanText($("meta[name='description']").attr("content") || subtitle);

  homeLink.remove();
  for (const titleHeading of titleHeadings) titleHeading.remove();
  if (subtitleElement.length && !subtitleElement.is(authorElement)) subtitleElement.remove();
  authorElement.remove();
  richText.children("p").filter((_, element) => cleanText($(element).text()) === "").remove();

  await localizeImages($, slug, richText);
  const markdown = createTurndown().turndown(richText.html() || "")
    .replaceAll("\u200d", "").replace(/\n{3,}/g, "\n\n").trim();
  const frontMatter = [
    "---",
    `title: ${yamlString(title)}`,
    `description: ${yamlString(description)}`,
    `author: ${yamlString(authorData.author)}`,
    authorData.date ? `date: ${authorData.date}` : null,
    `displayDate: ${yamlString(authorData.displayDate)}`,
    `permalink: /${slug}/index.html`,
    "layout: essay.njk",
    "tags: essay",
    "---",
    ""
  ].filter(Boolean).join("\n");

  await fs.mkdir(essayDir, { recursive: true });
  await fs.writeFile(path.join(essayDir, `${slug}.md`), `${frontMatter}\n${markdown}\n`);
  return { slug, title, date: authorData.date, description };
}

async function importHomeImage() {
  const html = await fs.readFile(path.join(archiveDir, "index.html"), "utf8");
  const $ = cheerio.load(html);
  const src = $("img.image").first().attr("src");
  if (!src) throw new Error("No profile image found on the archived home page");
  const profileImage = await downloadAsset(src, "home");
  const siteDir = path.join(assetRoot, "site");
  await fs.mkdir(siteDir, { recursive: true });
  for (const [selector, filename] of [
    ["link[rel='shortcut icon']", "favicon.png"],
    ["link[rel='apple-touch-icon']", "apple-touch-icon.png"]
  ]) {
    const url = $(selector).attr("href");
    if (!url) continue;
    const response = await fetch(url, { headers: { "user-agent": "xander.ai Webflow migration" } });
    if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
    await fs.writeFile(path.join(siteDir, filename), Buffer.from(await response.arrayBuffer()));
  }
  return profileImage;
}

const files = (await fs.readdir(archiveDir))
  .filter((filename) => filename.endsWith(".html") && filename !== "index.html")
  .sort();
const pages = [];
for (const filename of files) pages.push(await importEssay(filename));
const profileImage = await importHomeImage();
await fs.mkdir(path.join(root, "src", "_data"), { recursive: true });
await fs.writeFile(path.join(root, "src", "_data", "migration.json"),
  `${JSON.stringify({ source: "https://xander.ai", profileImage, pages }, null, 2)}\n`);
console.log(`Imported ${pages.length} essays and ${pages.length + 1} public pages.`);
