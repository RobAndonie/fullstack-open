import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Toggable from "./components/Toggable";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    const loggedUser = JSON.parse(loggedUserJSON);
    if (loggedUserJSON) {
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    if (user) {
      fetchBlogs();
    }
  }, [user]);

  return (
    <div>
      {showNotification && <Notification notification={notification} />}

      {user ? (
        <div>
          <h1>Welcome {user.name}!</h1>
          <h2>blogs</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              marginBottom: "4rem",
            }}
          >
            {blogs
              .sort((a, b) => a.likes - b.likes)
              .reverse()
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  blogs={blogs}
                  setBlogs={setBlogs}
                  user={user}
                />
              ))}
          </div>

          <Toggable buttonLabel="New Blog" ref={blogFormRef}>
            <NewBlog
              setShowNotification={setShowNotification}
              notification={notification}
              blogFormRef={blogFormRef}
            />
          </Toggable>

          <Logout setUser={setUser} />
        </div>
      ) : (
        <Login
          setUser={setUser}
          setShowNotification={setShowNotification}
          setNotification={setNotification}
        />
      )}
    </div>
  );
};

export default App;
