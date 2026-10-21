import { load as loadYaml } from "js-yaml";
import markdownIt from "markdown-it";

const TZ = "Pacific/Honolulu"; // the lab is in Hawaii; dates are shown in local time

const parts = (d) => {
  const p = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date(d));
  const get = (t) => p.find((x) => x.type === t).value;
  return { y: get("year"), m: get("month"), d: get("day") };
};

export default function (eleventyConfig) {
  // YAML data files (_data/*.yml) keep working exactly like they did in Jekyll
  eleventyConfig.addDataExtension("yml,yaml", (contents) => loadYaml(contents));

  // Markdown: allow inline HTML, and open external links in a new tab
  const md = markdownIt({ html: true, linkify: true, typographer: false });
  const defaultLink = md.renderer.rules.link_open ||
    ((tokens, idx, opts, env, self) => self.renderToken(tokens, idx, opts));
  md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
    const href = tokens[idx].attrGet("href") || "";
    if (/^https?:\/\//.test(href)) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener");
    }
    return defaultLink(tokens, idx, opts, env, self);
  };
  eleventyConfig.setLibrary("md", md);

  // Static files copied as-is
  for (const p of ["assets", "css", "fonts", "js"]) {
    eleventyConfig.addPassthroughCopy(`src/${p}`);
  }
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Filters
  eleventyConfig.addFilter("displayDate", (d) =>
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "short", day: "numeric" }).format(new Date(d)));
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("rfc822", (d) => new Date(d).toUTCString());
  eleventyConfig.addFilter("year", () => new Date().getFullYear());
  eleventyConfig.addFilter("firstSentences", (s, n = 1) =>
    String(s).replace(/\s+/g, " ").trim().split(/(?<=\.)\s+/).slice(0, n).join(" "));
  // Same rule the old Jekyll plugin used, so /people/<name>.html URLs don't change
  eleventyConfig.addFilter("personSlug", (name) =>
    String(name).toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]/g, ""));
  eleventyConfig.addFilter("initials", (name) =>
    String(name).split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase());
  eleventyConfig.addFilter("hasPhoto", (url) => !!url && !/no_profile/.test(url));
  eleventyConfig.addFilter("byRole", (members, role) => (members || []).filter((m) => m.role === role));
  eleventyConfig.addFilter("permalinkFor", (date, categories, slug) => {
    const { y, m, d } = parts(date);
    return "/" + [...(categories || []), y, m, d, `${slug}.html`].join("/");
  });

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date));

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
}
