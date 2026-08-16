# xander.ai

The static source for [xander.ai](https://xander.ai), built with Eleventy and deployed to GitHub Pages.

## Write an essay

1. Copy any file in `src/essays/` and give it a URL-friendly filename.
2. Update the short metadata block at the top.
3. Write the essay beneath it in normal Markdown.
4. Add an image with `![description](/assets/my-essay/image.jpg)` after placing the file in `src/assets/my-essay/`.
5. Add a tweet on its own line with `{% tweet "https://x.com/user/status/123" %}`.

The homepage automatically lists essays by date.

## Preview and verify

```sh
npm install
npm run dev
```

Open `http://localhost:8080`. Run the complete build and content checks with:

```sh
npm test
```

## Publishing

Merging to `main` builds the site and deploys `_site/` to GitHub Pages. The `CNAME` file keeps the custom domain as `xander.ai`; DNS should only be switched from Webflow after reviewing the Pages deployment.

## Webflow archive

`archive/webflow/` contains the public sitemap, robots file, and raw HTML captured from the published Webflow site on 16 August 2026. Run `npm run import:webflow` to regenerate the Markdown essays and local media from that archive.
Xander Dunn personal website
