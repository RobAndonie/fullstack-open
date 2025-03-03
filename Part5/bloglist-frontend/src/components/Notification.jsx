export default function Notification({ text, type }) {
  const notificationStyle = {
    borderStyle: "solid",
    borderColor: type === "error" ? "red" : type === "good" ? "green" : "blue",
    backgroundColor: "lightGrey",
  };

  return (
    <div style={notificationStyle}>
      <p>{text}</p>
    </div>
  );
}
