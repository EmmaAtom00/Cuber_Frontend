import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";

function Logout() {
  const [navigate, setNavigate] = useState(null);
  const url = import.meta.env.VITE_URL;

  useEffect(() => {
    const logout = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        };

        const response = await axios.get(`${url}/logout`, config);

        toast.success(response.data.msg, {
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
        localStorage.removeItem("refreshToken");
        setNavigate("/");
        // setTimeout(() => , 2000);
      } catch (error) {
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

        setNavigate("/login");
        // setTimeout(() => , 2000);
      }
    };

    logout();
  }, [url]);

  if (navigate) {
    return <Navigate to={navigate} />;
  }

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default Logout;
