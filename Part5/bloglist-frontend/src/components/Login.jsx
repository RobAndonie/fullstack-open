import { useState, useEffect } from "react";
import login from "../services/loginService";
import blogs from "../services/blogs";

export default function Login({
  setUser,
  setShowNotification,
  setNotificationText,
  setNotificationType,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogs.setToken(user.token);
      setUser(user);

      setShowNotification(true);
      setNotificationType("good");
      setNotificationText(`Log in valid, welcome, ${user.name}`);

      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      setShowNotification(true);
      setNotificationType("error");
      setNotificationText("Wrong username or password");
      setTimeout(() => setShowNotification(false), 3000);

      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
