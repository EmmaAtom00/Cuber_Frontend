import { IoMdNotificationsOutline } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { Link } from "react-router-dom";
import man from "../../../assets/man.png";
import man1 from "../../../assets/man1.png";

function DriverDashboard({ setMode }) {
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
          <u>Tools</u>
        </p>
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
        <Link to={"/Complete-driver-details"}>
          <button className="bg-bl text-white py-4 px-20 rounded-lg">
            Create ride
          </button>
        </Link>
        <button
          onClick={() => setMode("passenger")}
          className="bg-gr text-white py-4 px-20 rounded-lg">
          Switch to a Passenger
        </button>
      </div>
    </div>
  );
}
export default DriverDashboard;
