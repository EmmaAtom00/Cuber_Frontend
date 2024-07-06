import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Spinner.css"; // Import the spinner CSS

function Protected() {
  const url = import.meta.env.VITE_URL;
  const [auth, setAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found, please log in.", { position: "top-center" });
      navigate("/login");
      return;
    }

    axios
      .get(`/protects`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((res) => {
        setAuth(true);
      })
      .catch(async (err) => {
        await toast.error(err.response?.data?.msg || "Authentication failed", {
          position: "top-center",
        });
        console.log(err);
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="protected-container">
      <ToastContainer />
      {auth ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
}

export default Protected;
