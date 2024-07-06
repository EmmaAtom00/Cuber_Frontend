import axios from "axios";
import { useEffect, useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import Navigation from "../Navigation";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Option from "../Option";

function History() {
  const [activeRide, setActive] = useState({});
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const data = async () => {
      await axios
        .get(`${url}/user/activeRide`, config)
        .then((res) => {
          setActive(res.data.activeRide);
          console.log(activeRide);
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
        });
    };
    data();
  }, []);

  const deleteRide = () => {
    axios
      .get(`${url}/deletePassengerRide`, config)
      .then((res) => {
        toast.success("success");
        console.log(res);
      })
      .catch((err) => {
        toast.error("cannot delete ride");
      });
    window.location.reload(false);
  };

  return (
    <div className="p-[2em]">
      <Navigation link={-1} name={"Active Rides"} />
      {activeRide.email ? (
        <div>
          <Link to={"/choose-a-ride"}>
            <div className="p-4 shadow-md gap-4 my-6 mx-4 flex flex-col items-center">
              <h3>
                {activeRide.firstName} {activeRide.lastName}
              </h3>

              <p>
                <b>Trip: </b>
                {activeRide.pickup} - {activeRide.destination}
              </p>
            </div>
          </Link>
          <button
            className="text-white bg-red-500 py-3 px-4 m-auto block rounded-md"
            onClick={() => deleteRide()}>
            Delete Ride
          </button>
        </div>
      ) : (
        <div className="p-4 shadow-md gap-4 my-6 mx-4 flex flex-col items-center">
          No active ride
        </div>
      )}
    </div>
  );
}
export default History;
