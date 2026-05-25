module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],

  // JS-added and compound pseudo-class selectors (e.g. :last-child, :has) must survive purging
  // safelist: {
  //   standard: [/^project-timeline-/],
  //   deep: [/^project-timeline-/],
  //   greedy: [/^project-timeline-/],
  // },
};
