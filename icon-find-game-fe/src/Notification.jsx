function Notification({ type, message }) {
  if (!message) return null;

  const notificationStyles = {
    success: {
      padding: "10px",
      margin: "10px 0",
      border: "1px solid green",
      borderRadius: "5px",
      backgroundColor: "lightgreen",
      color: "darkgreen",
    },
    error: {
      padding: "10px",
      margin: "10px 0",
      border: "1px solid red",
      borderRadius: "5px",
      backgroundColor: "lightcoral",
      color: "darkred",
    },
  };

  const style = notificationStyles[type] || notificationStyles.default;

  return (
    <div className="notification-container">
      <div style={style}>{message}</div>
    </div>
  );
}

export default Notification;
