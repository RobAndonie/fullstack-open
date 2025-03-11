export default function Notification({ notification }) {
  const notificationStyle = {
    borderStyle: "solid",
    borderColor:
      notification.type === "error"
        ? "red"
        : notification.type === "good"
        ? "green"
        : "blue",
    backgroundColor: "lightGrey",
  };

  return (
    <div style={notificationStyle}>
      <p>{notification.text}</p>
    </div>
  );
}
