import { useEffect, useState } from "react";
import Navigation from "../Navigation";
import { BiMessageRoundedError } from "react-icons/bi";
import axios from "axios";

function Notification() {
  const [notify, setNotify] = useState([]);
  const url = import.meta.env.VITE_URL;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${url}/user/notification`, config);
        if (Array.isArray(res.data.notifications)) {
          setNotify(res.data.notifications);
        } else {
          setNotify([]);
        }
      } catch (err) {
        console.error(err);
        setNotify([]);
      }
    };

    fetchNotifications();
  }, [url]);

  return (
    <div className="p-[2em]">
      <Navigation link={-1} name={"Notification"} />
      {notify.length === 0 ? (
        <div className="shadow-md p-4 mt-10 w-[50%] mx-auto flex flex-col justify-center items-center">
          <BiMessageRoundedError size={30} />
          <span>Empty</span>
        </div>
      ) : (
        <div>
          {notify.map((notification, id) => (
            <div key={id} className="p-3 shadow-md text-sm">
              <p>{notification.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notification;
