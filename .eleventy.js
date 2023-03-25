const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const embedEverything = require("eleventy-plugin-embed-everything");

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItEmoji = require('markdown-it-emoji');
const pluginTOC = require('eleventy-plugin-toc');

module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(embedEverything);

  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/video');
  eleventyConfig.addPassthroughCopy('src/js');

  eleventyConfig.setLibrary(
    'md',
        markdownIt({
            html: true,
            linkify: true,
            typographer: false // better not break code
        }).use(markdownItAnchor).use(markdownItEmoji)
  );

  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h1','h2', 'h3', 'h4', 'h5', 'h6'],
    wrapper: 'div'
  });

  const {
    DateTime
  } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yy-MM-dd');
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat("dd-MM-yy");
  });

  return {
    dir: { input: 'src', output: '_site' }
  };
};
