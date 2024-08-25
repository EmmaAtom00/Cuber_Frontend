import { useEffect, useState } from "react";
import Navigation from "../../Navigation";
import axios from "axios";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

function ViewRide() {
  const [details, setDetails] = useState({});
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const RequestStatus = (email) => {
    axios
      .get(`${url}/requestStatus/${email}`, config)
      .then((res) => setStatus(res.data.stat))
      .catch((err) => console.log(err));
  };

  const endRide = () => {
    axios
      .get(`${url}/endRide`, config)
      .then((res) => {
        toast.success(res.data.msg);
        window.location.reload(false);
      })
      .catch((err) => toast.error(err.response.data.msg));
  };

  const checkSuccess = (email) => {
    let success;
    axios
      .get(`${url}/checkSuccess/${email}`, config)
      .then((res) => {
        setSuccess(res.data.success);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${url}/rideDetails`, config)
      .then((res) => setDetails(res.data.findRide))
      .catch();
    // console.log(details);
  }, []);
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
            const stat = checkSuccess(passenger);
            const request = RequestStatus(passenger);

            // console.log(status);

            return (
              <div
                key={id}
                className="my-2 p-2 flex justify-between bg-slate-200">
                <p>{passenger}</p>
                <div>
                  <button
                    onClick={() => {
                      if (!status) dropPassenger(passenger);
                    }}
                    className={`${
                      success ? "" : ""
                    }bg-bl rounded text-white py-1 px-2`}>
                    {!status ? (success ? "Dropped" : "Drop") : "pending"}
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center">
            <button
              onClick={() => endRide()}
              className="bg-red-400 text-white py-1 px-2 rounded-md hover:bg-red-500">
              End Ride
            </button>
          </div>
        </div>
      ) : (
        <p>You have no active Rides</p>
      )}
    </div>
  );
}
export default ViewRide;
