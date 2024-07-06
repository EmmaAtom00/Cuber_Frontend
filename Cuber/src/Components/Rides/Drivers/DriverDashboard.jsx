import { IoMdNotificationsOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { Link } from "react-router-dom";
import man from "../../../assets/man.png";
import man1 from "../../../assets/man1.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { UnreadNotification } from "../../../util";

function DriverDashboard() {
  const url = import.meta.env.VITE_URL;
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [unRead, setUnRead] = useState();
  const config = {
    headers: {
      "content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    const getUser = async () => {
      await axios
        .get(`${url}/user/dashboard`, config)
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          setError(err.response.status);
        });
      const read = await UnreadNotification();
      setUnRead(read);
    };
    getUser();
  }, []);
  async function changeMode() {
    axios
      .get(`${url}/user/switch`, {
        headers: {
          "content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // mode = res.response.driver;
      })
      .catch((err) => {});
    window.location.reload(false);
  }
  const news = [
    {
      name: "Johnson Abraham",
      start: "Obantoko",
      destination: "Camp",
      img: man,
    },
    { name: "Paul Yussuf", start: "Obantoko", destination: "Camp", img: man1 },
  ];

  return (
    <div className="p-[2em]">
      <div className="flex justify-between">
        <div className="relative">
          <Link to={"/notification"}>
            <IoMdNotificationsOutline size={25} />
          </Link>
          {unRead > 0 ? (
            <div className="bg-red-500 h-[15px] w-[15px] rounded-full flex justify-center items-center absolute top-0 right-0 text-[9px] text-white">
              <p>{unRead}</p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex gap-2">
          <IoWalletOutline size={25} />
          <Link to={"/Profile"}>
            <CiUser size={25} />
          </Link>
        </div>
      </div>
      <h2 className="text-gr mt-14 text-xl font-semibold">
        Welcome back <small className="text-sm text-bl">{user.firstName}</small>
      </h2>

      <div className="bg-[#E9E9E9] p-6 rounded-md my-4">
        <p className="text-[#28374B] font-thin">
          <u>Latest news</u>
        </p>
        <div className="gap-4 grid mt-3">
          {news.map(({ name, start, destination, img }, id) => {
            return (
              <div
                key={id}
                className="flex items-center shadow-xl bg-white rounded-lg p-6 gap-6">
                <img src={img} alt="" className="w-14" />
                <div className="flex flex-col">
                  <p>{name}</p>
                  <b>Trip</b>
                  <i>
                    <small>
                      {start} - {destination}
                    </small>
                  </i>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-gr underline text-right mt-4">View Ride</p>
      </div>

      <div className="flex justify-between">
        <Link to={"/inbox"}>
          <div className="flex gap-2 items-center">
            <IoChatbubbleEllipsesOutline size={25} />
            <p>Inbox</p>
          </div>
        </Link>
        <div className="flex gap-2 items-center">
          <GoHistory size={25} />
          <p>History</p>
        </div>
      </div>
      <div className="flex flex-col w-fit items-center gap-6 mt-8 justify-center mx-auto">
        <Link to={"/Complete-driver-details"}>
          <button className="bg-bl text-white py-4 px-20 rounded-lg">
            Create ride
          </button>
        </Link>
        <button
          onClick={() => changeMode()}
          className="bg-gr text-white py-4 px-20 rounded-lg">
          Switch to a Passenger
        </button>
      </div>
    </div>
  );
}
export default DriverDashboard;
