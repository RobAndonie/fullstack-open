import blogService from "../services/blogs";
import { useState } from "react";

export default function NewBlog({
  user,
  setShowNotification,
  setNotificationText,
  setNotificationType,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user:", user);

    const newBlog = { title, author, url };

    try {
      const response = await blogService.createBlog(newBlog);

      setShowNotification(true);
      setNotificationType("good");
      setNotificationText(`New blog created: ${response.title}`);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      setShowNotification(true);
      setNotificationType("error");
      setNotificationText("Error creating new blog");
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
        />
      </div>

      <div>
        <label htmlFor="author">author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="url">url</label>
        <input
          type="text"
          name="url"
          value={url}
          onChange={(e) => setURL(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
