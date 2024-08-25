import { IoMdNotificationsOutline } from "react-icons/io";
import { IoAttachOutline, IoWalletOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { GoHistory } from "react-icons/go";
import { Link, Navigate } from "react-router-dom";
import man from "../../assets/man.png";
import man1 from "../../assets/man1.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { UnreadNotification } from "../../util";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

function Dashboard() {
  const url = import.meta.env.VITE_URL;
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [unRead, setUnRead] = useState();
  const [loading, setLoading] = useState(false);
  const config = {
    headers: {
      "content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  const read = UnreadNotification()
    .then((res) => setUnRead(res))
    .catch();
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
    };
    getUser();
  }, []);
  async function changeMode() {
    setLoading(true);
    console.log(loading);
    axios
      .get(`http://localhost:4000/user/switch`, {
        headers: {
          "content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // mode = res.response.driver;
        // console.log(res.data.msg);
        // mode = res.data.driver;
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.msg);
        // console.log(err.response.data.msg);
      });

    // window.location.reload(false);
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
  if (error) return <Navigate to={"/login"} />;

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
        <p className="text-gr underline text-right mt-4">
          <Link to={"/active-ride"}>Active Rides</Link>
        </p>
      </div>
      <div className="flex justify-end">
        {/* <Link to={"/active-ride"}>
          <div className="flex gap-2 items-center">
            <IoAttachOutline size={25} />
            <p>Active rides</p>
          </div>
        <Link to={"/active-ride"}> */}
        <div className="flex gap-2 items-center">
          <GoHistory size={25} />
          <p>History</p>
        </div>
      </div>
      <div className="flex flex-col w-fit items-center gap-6 mt-8 justify-center mx-auto">
        <Link to={"/Find-a-ride"}>
          <button className="bg-bl text-white py-4 px-20 rounded-lg">
            Find a ride
          </button>
        </Link>
        <button
          onClick={() => changeMode()}
          className="bg-gr flex items-center gap-2 text-white py-4 px-20 rounded-lg">
          {loading ? <FaSpinner className="animate-spin" /> : ""}Switch to a
          driver
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
