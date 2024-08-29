import axios from "axios";
import { useEffect, useState } from "react";
import { Flip, ToastContainer, toast } from "react-toastify";
import Navigation from "../Navigation";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Option from "../Option";
import { MdDelete, MdDeleteOutline, MdOutlineViewStream } from "react-icons/md";
import { FcAcceptDatabase } from "react-icons/fc";
import Modal from "../modal";
import { FaSearch } from "react-icons/fa";

function History() {
  const [activeRide, setActive] = useState({});
  const [accepted, setAccepted] = useState(false);
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };

  // Reload the page every 15 seconds

  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [modal, setModal] = useState(false);
  const [type, setType] = useState();
  let [isOpen, setIsOpen] = useState(false);
  const details = {
    title: {
      accept: "Drop from vehicle",
    },
    description: {
      accept: "The driver will drop you here",
      verify: {
        accept: "Are you sure you want to proceed?",
      },
    },
  };
  const button = {
    accept: "accept",
    reject: "Drop",
  };
  const handleAccept = (id, email) => {
    return;
  };

  const checkRideIfAccepted = async () => {
    try {
      axios.get(`${url}/user/acceptedRide`, config).then((result) => {
        setMessage(result.data.message);
        // console.log(result.data.redirect);
        setAccepted(result.data.redirect);
      });
    } catch (error) {
      toast.error("an error occurred");
      // console.log(error);
      // navigate("/choose-a-ride");
    }
  };

  // if (accepted) {
  //   setInterval(function () {
  //     location.reload();
  //   }, 15000);
  // }

  if (activeRide.email) checkRideIfAccepted();

  useEffect(() => {
    const data = async () => {
      await axios
        .get(`${url}/user/activeRide`, config)
        .then((res) => {
          setActive(res.data.activeRide);
          // console.log(res.data.activeRide);
        })
        .catch((err) => {
          // toast.error(err.response.data.msg);
        });
    };
    data();
  }, []);

  const completeRide = () => {
    axios
      .get(`${url}/completeRide`, config)
      .then((res) => toast.success("Ride complete"))
      .catch();
    window.location.reload(false);
  };

  const deleteRide = () => {
    axios
      .get(`${url}/deletePassengerRide`, config)
      .then((res) => {
        toast.success("success");
        // console.log(res);
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
          <div className="p-4 relative shadow-md gap-2 my-6 mx-4 flex flex-col items-start bg-black/5 backdrop:blur-4xl ">
            <div className={`${accepted ? "" : ""}`}>
              <h3>
                {activeRide.firstName} {activeRide.lastName}
              </h3>

              <p>
                <b>Trip: </b>
                {activeRide.pickup} - {activeRide.destination}
              </p>
              {accepted ? (
                ""
              ) : (
                <div
                  onClick={() => (accepted ? "" : navigate("/choose-a-ride"))}
                  className="flex items-center cursor-pointer gap-2 bg-gr rounded-sm mt-2 hover:bg-green-400 px-2 w-fit text-white">
                  <FaSearch />
                  Find ride
                </div>
              )}
              {accepted ? (
                <small className="">
                  <i className="text-green-500">{message}</i>
                  <br />
                  {activeRide.requestToDrop ? (
                    <button
                      onClick={() => completeRide()}
                      className="bg-gr text-white p-1 rounded">
                      Accept drop
                    </button>
                  ) : (
                    <small className="text-rose-500">
                      Wait at the nearest bus stop:
                      <div
                        onClick={() => {
                          setIsOpen(!isOpen);
                          setType("accept");
                        }}
                        className="cursor-pointer flex items-center gap-2 text-white bg-red-500 w-fit px-1 rounded">
                        <MdDelete />
                        <p>Drop here</p>
                      </div>
                    </small>
                  )}
                </small>
              ) : (
                ""
              )}

              {isOpen ? (
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  type={type}
                  request={activeRide}
                  handleAcceptRequest={completeRide}
                  handleRejectRequest={""}
                  details={details}
                  button={button}
                />
              ) : (
                ""
              )}
            </div>

            <div
              className={`${
                accepted ? "bg-green-200" : "bg-red-500"
              } text-white absolute mr-2 right-0 py-2 block cursor-pointer px-2 rounded-md`}
              onClick={() => (accepted ? "" : deleteRide())}>
              {accepted ? <FcAcceptDatabase /> : <MdDeleteOutline />}
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
