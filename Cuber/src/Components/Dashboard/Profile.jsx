import { IoIosArrowRoundBack } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { TfiHelpAlt } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import profile from "../../assets/profile.svg";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="p-[2em]">
      <div className="flex items-center justify-center relative">
        <Link to={"/dashboard"} className="absolute left-0 top-0">
          <IoIosArrowRoundBack size={30} />
        </Link>
        <div className="justify-center flex flex-col items-center gap-2 mt-12">
          <img src={profile} alt="profile photo" />
          <p className="text-2xl">Profile</p>
        </div>
      </div>
      <div className="grid gap-8 my-6">
        <div className="flex items-center cursor-pointer justify-between w-[75%]">
          <div className="flex items-center gap-4">
            <CiUser size={30} />
            <p className="font-thin">Edit profile</p>
          </div>
          <IoIosArrowForward size={20} />
        </div>
        <div className="flex items-center cursor-pointer justify-between w-[75%]">
          <div className="flex items-center gap-4">
            <IoMdNotificationsOutline size={30} />
            <p className="font-thin">Notification</p>
          </div>
          <IoIosArrowForward size={20} />
        </div>
        <div className="flex items-center cursor-pointer justify-between w-[75%]">
          <div className="flex items-center gap-4">
            <IoWalletOutline size={30} />
            <p className="font-thin">Payments</p>
          </div>
          <IoIosArrowForward size={20} />
        </div>
        <div className="flex items-center cursor-pointer justify-between w-[75%]">
          <div className="flex items-center gap-4">
            <TfiHelpAlt size={30} />
            <p className="font-thin">Help center</p>
          </div>
          <IoIosArrowForward size={20} />
        </div>
        <Link
          to={"/logout"}
          className="flex items-center cursor-pointer justify-between w-[75%]">
          <div className="flex items-center gap-4">
            <IoIosLogOut size={30} color="red" />
            <p className="font-thin">Logout</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Profile;
