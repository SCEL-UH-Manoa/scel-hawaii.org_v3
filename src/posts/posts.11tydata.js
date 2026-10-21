// Keeps old Jekyll post URLs: /<categories>/<yyyy>/<mm>/<dd>/<slug>.html
export default {
  eleventyComputed: {
    permalink: (data) => {
      const cats = Array.isArray(data.categories) ? data.categories : [];
      const [y, m, d] = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Pacific/Honolulu", year: "numeric", month: "2-digit", day: "2-digit",
      }).format(new Date(data.page.date)).split("-");
      return "/" + [...cats, y, m, d, `${data.page.fileSlug}.html`].join("/");
    },
  },
};
