import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import * as cheerio from "cheerio";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "_site");
const archivePages = path.join(root, "archive", "webflow", "pages");

async function htmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(fullPath) : [fullPath];
  }));
  return nested.flat().filter((filename) => filename.endsWith(".html"));
}

test("every archived public page has a generated counterpart", async () => {
  const archived = (await fs.readdir(archivePages))
    .filter((filename) => filename.endsWith(".html"))
    .map((filename) => filename === "index.html"
      ? "index.html"
      : path.join(filename.slice(0, -5), "index.html"));
  for (const relativePath of archived) {
    await assert.doesNotReject(fs.access(path.join(output, relativePath)), relativePath);
  }
  assert.equal(archived.length, 16);
});

test("generated pages use local images and valid internal links", async () => {
  const pages = await htmlFiles(output);
  assert.ok(pages.length >= 17);
  for (const filename of pages) {
    const html = await fs.readFile(filename, "utf8");
    assert.doesNotMatch(html, /cdn\.prod\.website-files\.com/, filename);
    const $ = cheerio.load(html);
    for (const image of $("img").toArray()) {
      const src = $(image).attr("src");
      assert.ok(src?.startsWith("/assets/"), `${filename}: ${src}`);
      await assert.doesNotReject(fs.access(path.join(output, src.slice(1))), `${filename}: ${src}`);
    }
    for (const anchor of $("a[href^='/']").toArray()) {
      const href = $(anchor).attr("href");
      if (!href || href.startsWith("//")) continue;
      const pathname = href.split(/[?#]/)[0];
      const target = pathname.endsWith("/")
        ? path.join(output, pathname, "index.html")
        : path.join(output, pathname);
      await assert.doesNotReject(fs.access(target), `${filename}: ${href}`);
    }
  }
});

test("tweet shortcodes render accessible links and the widget loader", async () => {
  const essay = await fs.readFile(path.join(output, "worse-really-is-better", "index.html"), "utf8");
  const $ = cheerio.load(essay);
  const tweets = $("blockquote.twitter-tweet a[href*='/status/']");
  assert.ok(tweets.length >= 3);
  assert.equal($("script[src='https://platform.twitter.com/widgets.js']").length, 1);
});

test("the homepage orders essays from newest to oldest", async () => {
  const home = await fs.readFile(path.join(output, "index.html"), "utf8");
  const $ = cheerio.load(home);
  const titles = $(".home-copy h2").filter((_, heading) => $(heading).text() === "Essays")
    .next("ul").find("a").map((_, anchor) => $(anchor).text()).get();
  assert.ok(titles.indexOf("Starfield Review") < titles.indexOf("Software Engineers Meet Bio"));
  assert.ok(titles.indexOf("Software Engineers Meet Bio") < titles.indexOf("On Dark Triads in Silicon Valley"));
});
