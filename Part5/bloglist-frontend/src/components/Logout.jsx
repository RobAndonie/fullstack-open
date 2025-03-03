export default function Logout({ setUser }) {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return <button onClick={handleLogout}>Logout</button>;
}
