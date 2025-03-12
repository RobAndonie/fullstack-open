import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [detailsShown, setDetailsShown] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = () => {
    setLikes(likes + 1);
    blogService.likeBlog({ ...blog, likes: likes + 1 });
  };

  const handleDelete = () => {
    if (!window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      return;
    }
    blogService.deleteBlog(blog.id);
    setBlogs(blogs.filter((b) => b.id != blog.id));
  };

  return (
    <div>
      {detailsShown ? (
        <div>
          <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            <span>
              {blog.title} {blog.author}
            </span>
            <button onClick={() => setDetailsShown(false)}>Hide</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <span>{likes} likes</span>
              <button onClick={handleLike}>Like</button>
            </div>

            <span>{blog.url}</span>

            {blog.user ? (
              <div>
                <span style={{ display: "block" }}>{blog.user.name}</span>

                {blog.user.username === user.username && (
                  <button style={{ width: "auto" }} onClick={handleDelete}>
                    Delete
                  </button>
                )}
              </div>
            ) : (
              <span>User not found</span>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
          <span>
            {blog.title} {blog.author}
          </span>
          <button onClick={() => setDetailsShown(true)}>Show</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
