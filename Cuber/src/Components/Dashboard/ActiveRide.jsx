import axios from "axios";
import { useEffect, useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import Navigation from "../Navigation";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Option from "../Option";
import { MdDeleteOutline } from "react-icons/md";

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
          <div className="p-4 relative shadow-md gap-2 my-6 mx-4 flex flex-col items-start">
            <Link to={"/choose-a-ride"}>
              <h3>
                {activeRide.firstName} {activeRide.lastName}
              </h3>

              <p>
                <b>Trip: </b>
                {activeRide.pickup} - {activeRide.destination}
              </p>
            </Link>
            <div
              className="text-white bg-red-500 absolute right-0 py-2 block cursor-pointer px-2 rounded-md"
              onClick={() => deleteRide()}>
              <MdDeleteOutline />
            </div>
          </div>
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
