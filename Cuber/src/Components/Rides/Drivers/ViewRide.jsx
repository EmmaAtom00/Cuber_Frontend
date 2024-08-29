import { useEffect, useState } from "react";
import Navigation from "../../Navigation";
import axios from "axios";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

function ViewRide() {
  const [details, setDetails] = useState({});
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [started, setStarted] = useState(false);
  const [dropped, setDropped] = useState(false);
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  const url = import.meta.env.VITE_URL;

  const dropPassenger = async (email) => {
    axios
      .get(`${url}/dropPassenger/${email}`, config)
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {
        // console.log(err)
      });
    // console.log(email);
  };
  const startRide = () => {
    axios
      .get(`${url}/startRide`, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch();
    window.location.reload(false);
  };

  const RequestStatus = (email) => {
    axios
      .get(`${url}/requestStatus/${email}`, config)
      .then((res) => {
        setStatus(res.data.stat);
        // console.log(status);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  const endRide = () => {
    axios
      .get(`${url}/endRide`, config)
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(false);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const checkSuccess = (email) => {
    let success;
    axios
      .get(`${url}/checkSuccess/${email}`, config)
      .then((res) => {
        success = res.data.success;
      })
      .catch((err) => {
        // console.log(err)
      });

    return success;
  };

  useEffect(() => {
    axios
      .get(`${url}/rideDetails`, config)
      .then((res) => {
        setDetails(res.data.findRide);
        // console.log(res.data.findRide);
        available();
        // checkAllRide();
      })
      .catch();
  }, []);

  const checkAllRide = () => {
    axios
      .get(`${url}/allUserDropped`, config)
      .then((res) => {
        setDropped(res.data.success);
      })
      .catch();
  };
  const available = () => {
    axios
      .get(`${url}/started`, config)
      .then((res) => {
        // console.log(res.data);
        setStarted(res.data.available);
      })
      .catch();
  };
  if (details.destination) checkAllRide();
  // console.log(dropped);
  return (
    <div className="p-[2em]">
      <Navigation link={-1} name={"Ride Details"} />
      {details.destination ? (
        <div className="p-2 backdrop:blur-2xl shadow-md">
          <div className="bg-green-300 rounded p-3 mb-3">
            <div className="flex justify-between">
              <h2>Your Ride</h2>
              <div className="cursor-pointer">
                <MdOutlineDeleteForever size={20} color="red" />
              </div>
            </div>
            <p>
              <b>Trip: </b>
              {details.pickup} - {details.destination}
            </p>
          </div>
          <p>
            <b>Passengers</b>
          </p>
          {details.passengers.map((passenger, id) => {
            // const stat = checkSuccess(passenger._id);
            // const request = RequestStatus(passenger._id);

            return (
              <div
                key={id}
                className="my-2 p-2 flex justify-between bg-slate-200">
                <p>{passenger.email}</p>
                <div>
                  <p className="bg-bl/20 px-2">
                    {passenger.success ? "Dropped" : ""}
                  </p>
                  {/* <button
                    onClick={() => {
                      if (!status) dropPassenger(passenger._id);
                    }}
                    className={`${
                      success ? "" : ""
                    }bg-bl rounded text-white py-1 px-2`}>
                    {!status ? (success ? "Dropped" : "Drop") : "pending"}
                  </button> */}
                </div>
              </div>
            );
          })}
          <div className="flex justify-center gap-2 items-center">
            {!started ? (
              <button
                onClick={() => (dropped ? endRide() : "")}
                className={`${
                  !dropped
                    ? "bg-slate-300 cursor-not-allowed"
                    : "bg-red-400 hover:bg-red-500"
                } text-white py-1 px-2 rounded-md `}>
                End Ride
              </button>
            ) : (
              <button
                onClick={() => startRide()}
                className="bg-green-400 text-white py-1 px-2 rounded-md hover:bg-green-500">
                Start Ride
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>You have no active Rides</p>
      )}
    </div>
  );
}
export default ViewRide;
