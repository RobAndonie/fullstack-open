import blogService from "../services/blogs";
import { useState } from "react";

export default function NewBlog({
  setNotification,
  setShowNotification,
  blogFormRef,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = async () => {
    blogFormRef.current.toggleVisibility();

    const newBlog = { title, author, url };

    try {
      const response = await blogService.createBlog(newBlog);

      setShowNotification(true);
      setNotification({
        type: "good",
        text: `New blog created: ${response.title}`,
      });

      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      setShowNotification(true);
      setNotification({
        type: "error",
        text: "Error creating new blog",
      });

      setTimeout(() => setShowNotification(false), 3000);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          data-testid="title"
        />
      </div>

      <div>
        <label htmlFor="author">author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          data-testid="author"
        />
      </div>

      <div>
        <label htmlFor="url">url</label>
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          data-testid="url"
        />
      </div>

      <button type="submit" data-testid="submit">
        Submit
      </button>
    </form>
  );
}
