import markdownIt from "markdown-it";

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  eleventyConfig.addShortcode("tweet", (url) => {
    const safeUrl = escapeAttribute(url);
    return `<blockquote class="twitter-tweet"><a href="${safeUrl}">View this post on X</a></blockquote>`;
  });

  eleventyConfig.addFilter("readableDate", (value) => {
    if (!value) return "";
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      timeZone: "UTC",
      year: "numeric"
    }).format(new Date(`${value}T00:00:00Z`));
  });

  eleventyConfig.addCollection("essays", (collectionApi) =>
    collectionApi.getFilteredByTag("essay").sort((a, b) => {
      const aDate = a.data.date ? new Date(a.data.date) : new Date(0);
      const bDate = b.data.date ? new Date(b.data.date) : new Date(0);
      return aDate - bDate;
    })
  );

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true, linkify: true, typographer: false })
  );

  return {
    dir: {
      data: "_data",
      includes: "_includes",
      input: "src",
      layouts: "_layouts",
      output: "_site"
    },
    markdownTemplateEngine: "liquid"
  };
}
