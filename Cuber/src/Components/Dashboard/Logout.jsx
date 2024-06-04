import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";

function Logout() {
  const [nav, setNav] = useState(false);
  const [error, setError] = useState(false);
  const url = import.meta.env.VITE_URL;
  useEffect(() => {
    const logout = async () => {
      const config = {
        headers: {
          "content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      await axios
        .get(`${url}/logout`, config)
        .then(async (res) => {
          await toast.success(res.data.msg, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
          localStorage.removeItem("token");
          setTimeout(() => setNav(true), "2000");
        })
        .catch(async (err) => {
          toast.error("Please login", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
          setTimeout(() => setError(true), "2000");
        });
    };
    logout();
  }, []);
  if (error) return <Navigate to={"/login"} />;
  return (
    <div>
      <ToastContainer />
      {nav ? <Navigate to={"/"} /> : ""}
    </div>
  );
}
export default Logout;
