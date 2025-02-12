// Load the full build.
var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length
    ? blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog))
    : null;
};

const mostBlogs = (blogs) => {
  const author = _.chain(blogs)
    .countBy("author")
    .map((blogs, author) => ({ author, blogs }))
    .maxBy("blogs")
    .value();

  return author ? author : null;
};

const mostLikes = (blogs) => {
  const author = _.chain(blogs)
    .groupBy("author")
    .map((blogs, author) => ({ author, likes: _.sumBy(blogs, "likes") }))
    .maxBy("likes")
    .value();

  return author ? author : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
