import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Protected() {
  const url = import.meta.env.VITE_URL;
  const [auth, setAuth] = useState(true);
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${url}/protected`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res);
      })
      .catch(async (err) => {
        await toast.error(err.response.data.msg, {
          position: "top-center",
        });
        // console.log(err);
        navigate("/login");
      });
  }, []);
  return (
    <div className="">
      <ToastContainer />
      <div className="bg-bl absolute h-[100vh]"></div>
      <Outlet />
    </div>
  );
}
export default Protected;
