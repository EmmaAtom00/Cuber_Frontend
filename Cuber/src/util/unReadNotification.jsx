import axios from "axios";

const UnreadNotification = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };
  const url = import.meta.env.VITE_URL;

  try {
    const res = await axios.get(`${url}/user/notification`, config);

    const unreadNotifications = res.data.notifications.filter(
      (notification) => !notification.read
    );

    return unreadNotifications.length;
  } catch (error) {
    // console.error("Error fetching notifications:", error);
    return 0;
  }
};

export default UnreadNotification;
