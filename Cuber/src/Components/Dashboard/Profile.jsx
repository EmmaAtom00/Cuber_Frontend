import { IoIosArrowRoundBack } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { TfiHelpAlt } from "react-icons/tfi";
import { CiUser } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import profile from "../../assets/profile.svg";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";

function Profile() {
  const [navigate, setNavigate] = useState(null);
  const url = import.meta.env.VITE_URL;

  const logout = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await axios.get(`${url}/logout`, config);

      toast.success(response.data.msg);

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setTimeout(() => setNavigate("/"), 2000);
    } catch (error) {
      toast.error("Please login");

      setNavigate("/login");
      // setTimeout(() => , 2000);
    }
  };

  if (navigate) {
    return (
      <>
        <Navigate to={navigate} />
      </>
    );
  }
  return (
    <div className="p-[2em]">
      <ToastContainer />
      <div className="flex items-center justify-center relative">
        <Link to={"/dashboard"} className="absolute left-0 top-0">
          <IoIosArrowRoundBack size={30} />
        </Link>
        <div className="justify-center flex flex-col items-center gap-2 mt-12">
          <img src={profile} alt="profile photo" />
          <p className="text-2xl">Profile</p>
        </div>
      </div>
      <div className="grid gap-4 my-6">
        <div className="flex items-center cursor-pointer justify-between w-[75%] hover:bg-gr hover:text-white hover:rounded-md p-2">
          <div className="flex items-center gap-4">
            <CiUser size={30} />
            <p className=" ">Edit profile</p>
          </div>
          <IoIosArrowForward size={20} />
        </div>
        <div className="flex items-center cursor-pointer justify-between w-[75%] hover:bg-gr hover:text-white hover:rounded-md p-2">
          <div className="flex items-center gap-4">
            <IoMdNotificationsOutline size={30} />
            <p className=" ">Notification</p>
          </div>
          <IoIosArrowForward size={20} />
        </div>
        <div className="flex items-center cursor-pointer justify-between w-[75%] hover:bg-gr hover:text-white hover:rounded-md p-2">
          <div className="flex items-center gap-4">
            <IoWalletOutline size={30} />
            <p className=" ">Payments</p>
          </div>
          <IoIosArrowForward size={20} />
        </div>
        <div className="flex items-center cursor-pointer justify-between w-[75%] hover:bg-gr hover:text-white hover:rounded-md p-2">
          <div className="flex items-center gap-4">
            <TfiHelpAlt size={30} />
            <p className=" ">Help center</p>
          </div>
          <IoIosArrowForward size={20} />
        </div>
        <div
          onClick={() => logout()}
          className="flex items-center cursor-pointer justify-between w-fit p-2">
          <div className="flex items-center gap-4">
            <IoIosLogOut size={30} color="red" />
            <p className=" ">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
