const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
  {
    title: "Brownies Recipe",
    author: "Snorri Sturluson",
    url: "https://snorri-sturluson.com",
    likes: 10,
  },
  {
    title: "Cakes Recipe",
    author: "William Shakespeare",
    url: "https://william-shakespeare.com",
    likes: 20,
  },
];

describe.only("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  });

  test.only("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test.only("unique identifier property of blog posts is id", async () => {
    const response = await api.get("/api/blogs");
    const ids = response.body.map((blog) => blog.id);
    assert.strictEqual(ids.length, initialBlogs.length);
  });

  describe.only("posting a new blog", () => {
    test.only("blog created successfully", async () => {
      const newBlog = {
        title: "Cookies Recipe",
        author: "Jules Verne",
        url: "https://jules-verne.com",
        likes: 30,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogs = await Blog.find({});
      assert.strictEqual(blogs.length, initialBlogs.length + 1);
    });

    test.only("likes defaults to 0 if missing", async () => {
      const newBlog = {
        title: "Pie Recipe",
        author: "Jane Austen",
        url: "https://jane-austen.com",
      };

      const response = await api.post("/api/blogs").send(newBlog);
      assert.strictEqual(response.body.likes, 0);
    });

    test.only("title and url missing", async () => {
      const newBlogTitle = {
        author: "Oscar Wilde",
        url: "https://oscar-wilde.com",
        likes: 40,
      };

      await api.post("/api/blogs").send(newBlogTitle).expect(400);

      const newBlogURL = {
        title: "Muffins Recipe",
        author: "Oscar Wilde",
        likes: 40,
      };

      await api.post("/api/blogs").send(newBlogURL).expect(400);
    });
  });

  describe.only("updating a blog", () => {
    test.only("blog updated successfully", async () => {
      const blogs = await Blog.find({});
      const blogToUpdate = blogs[0];

      const newBlog = { ...blogToUpdate, likes: 99 };

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200);
      assert.strictEqual(newBlog.likes, response.body.likes);
    });
  });

  describe.only("deleting a blog", () => {
    test.only("blog deleted successfully", async () => {
      const blogs = await Blog.find({});
      const blogToDelete = blogs[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAfterDeletion = await Blog.find({});
      assert.strictEqual(blogsAfterDeletion.length, initialBlogs.length - 1);

      const titles = blogsAfterDeletion.map((blog) => blog.title);
      assert(!titles.includes(blogToDelete.title));
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
