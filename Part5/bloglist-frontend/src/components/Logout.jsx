export default function Logout({ setUser }) {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <button onClick={handleLogout} data-testid="logout-button">
      Logout
    </button>
  );
}
