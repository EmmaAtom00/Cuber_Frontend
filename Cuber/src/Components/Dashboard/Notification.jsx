import { useEffect, useState, useCallback } from "react";
import Navigation from "../Navigation";
import { BiMessageRoundedError } from "react-icons/bi";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

function Notification() {
  const [notify, setNotify] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_URL;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  const spinner = (
    <div className="animate-spin">
      <FaSpinner />
    </div>
  );
  const notification =
    notify.length === 0 ? (
      <div className="shadow-md p-4 mt-10 w-[50%] mx-auto flex flex-col justify-center items-center">
        <BiMessageRoundedError size={30} />
        <span>Empty</span>
      </div>
    ) : (
      <div>
        {notify.map((notification, id) => (
          <div key={id} className="p-3 shadow-md text-sm">
            <p>{notification.message}</p>
            <div className="flex justify-end cursor-pointer">
              <div
                onClick={() => deleteNotification(notification._id)}
                className="p-1 rounded-sm bg-red-500">
                <MdDeleteOutline color="white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  const fetchNotifications = useCallback(async () => {
    try {
      axios
        .get(`${url}/user/notification`, config)
        .then((res) => {
          if (Array.isArray(res.data.notifications)) {
            setNotify(res.data.notifications.reverse());
          } else {
            setNotify([]);
          }
        })
        .catch()
        .finally(setLoading(true));
    } catch (err) {
      // console.error(err);
      setNotify([]);
    }
  }, [url, config]);

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${url}/user/deleteNotification/${id}`, config);
      toast.success("Notification deleted");
      setNotify((prevNotify) =>
        prevNotify.filter((notification) => notification._id !== id)
      );
    } catch (err) {
      toast.error("Can't delete notification");
      // console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  useEffect(() => {
    const readNotification = async () => {
      const read = await axios.get(`${url}/user/readNotification`, config);
      // console.log(read);
      return read;
    };
    const read = readNotification();
  }, []);

  return (
    <div className="p-[2em]">
      <Navigation link={-1} name={"Notification"} />
      {/* <ToastContainer /> */}

      <div className="flex justify-center">
        {!loading ? spinner : notification}
      </div>
    </div>
  );
}

export default Notification;
