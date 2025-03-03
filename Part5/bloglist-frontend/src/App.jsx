import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("");
  const [notificationText, setNotificationText] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
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
      {showNotification && (
        <Notification type={notificationType} text={notificationText} />
      )}

      {user ? (
        <div>
          <h1>Welcome {user.name}!</h1>
          <h2>blogs</h2>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}

          <NewBlog
            user={user}
            setShowNotification={setShowNotification}
            setNotificationText={setNotificationText}
            setNotificationType={setNotificationType}
          />

          <Logout setUser={setUser} />
        </div>
      ) : (
        <Login
          setUser={setUser}
          setShowNotification={setShowNotification}
          setNotificationText={setNotificationText}
          setNotificationType={setNotificationType}
        />
      )}
    </div>
  );
};

export default App;
