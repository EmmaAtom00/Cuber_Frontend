import { IoMdNotificationsOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { Link } from "react-router-dom";
import man from "../../assets/man.png";
import man1 from "../../assets/man1.png";

function Dashboard() {
  const Sponsored = [
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
        <div>
          <IoMdNotificationsOutline size={25} />
        </div>
        <div className="flex gap-2">
          <IoWalletOutline size={25} />
          <Link to={"/Profile"}>
            <CiUser size={25} />
          </Link>
        </div>
      </div>
      <h2 className="text-gr mt-14 text-xl font-semibold">
        Welcome back <small className="text-sm text-bl">Abraham</small>
      </h2>
      <div className="bg-[#E9E9E9] p-6 rounded-md my-4">
        <p className="text-[#28374B] font-thin">
          <u>Sponsored</u>
        </p>
        <div className="gap-4 grid mt-3">
          {Sponsored.map(({ name, start, destination, img }, id) => {
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
        <p className="text-gr underline text-right mt-4">View all</p>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <IoChatbubbleEllipsesOutline size={25} />
          <p>Inbox</p>
        </div>
        <div className="flex gap-2 items-center">
          <GoHistory size={25} />
          <p>History</p>
        </div>
      </div>
      <div className="flex flex-col w-fit items-center gap-6 mt-8 justify-center mx-auto">
        <Link to={"/Find-a-ride"} className="">
          <button className="bg-bl text-white py-4 px-20 rounded-lg">
            Find a ride
          </button>
        </Link>
        <button className="bg-gr text-white py-4 px-20 rounded-lg">
          Switch to a driver
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
