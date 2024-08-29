import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../Navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

function Inbox() {
  const [inbox, setInbox] = useState([]);
  const [type, setType] = useState();
  let [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const url = import.meta.env.VITE_URL;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  const fetchInbox = async () => {
    try {
      const res = await axios.get(`${url}/user/Inbox`, config);
      setInbox(res.data.Inbox);
      // console.log(inbox);
    } catch (err) {
      // console.error(err);
      toast.error("Failed to fetch inbox");
    }
  };

  const handleAcceptRequest = async (id, email) => {
    try {
      const res = await axios.get(
        `${url}/user/acceptRequest/${id}/${email}`,
        config
      );
      toast.success(res.data.message);
      fetchInbox();
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  const handleRejectRequest = async (id) => {
    try {
      const res = await axios.delete(`${url}/user/deleteRequest/${id}`, config);
      toast.success("Request rejected successfully");
      fetchInbox();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject request");
    }
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  return (
    <div className="p-8">
      <Navigation link={-1} name="Inbox" />
      <div>
        {/* <ToastContainer /> */}
        {inbox.length === 0 ? (
          <p className="flex justify-center mt-4">No requests found</p>
        ) : (
          inbox.map((request, id) => (
            <div key={id} className="p-4 shadow-md mb-4">
              <div className="flex items-center gap-2">
                <p>
                  New request from <b>{request.name}</b>
                </p>
              </div>

              <div
                className={` flex items-center gap-1 duration-75 ease-in-out`}>
                <small>trip details</small>
                <div onClick={() => setOpen(!open)} className="cursor-pointer">
                  {!open ? (
                    <MdArrowDropDown size={20} />
                  ) : (
                    <MdArrowDropUp size={20} />
                  )}
                </div>
              </div>
              <div
                className={`${
                  !open ? "hidden" : ""
                } shadow p-2 mb-2 bg-black/5`}>
                <div className="flex items-center gap-1 mb-2">
                  <p className="px-2 bg-blue-300">trip</p>
                  <small>
                    {request.trip.split(" ")[0]} - {request.trip.split(" ")[1]}
                  </small>
                </div>
                <div className="flex items-center gap-1">
                  <p className="px-2 bg-green-300">status</p>
                  <small>{request.status}</small>
                </div>
              </div>
              <div className="">
                <i>{/* <small>{request.status}</small> */}</i>
                <div className=" flex flex-row gap-2 justify-center">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setType("reject");
                    }}
                    className="bg-red-400 py-1 px-2 rounded-sm text-white text-sm">
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setType("accept");
                    }}
                    className="bg-green-400 py-1 px-2 rounded-sm text-white text-sm">
                    Accept
                  </button>

                  <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                      <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                        <DialogTitle className="font-bold">
                          {type == "accept"
                            ? "Accept request"
                            : "Reject request"}
                        </DialogTitle>
                        <Description>
                          {type == "accept"
                            ? `This will add the passenger: ${request.name} to your ride`
                            : `This will permanently delete the request from ${request.name}`}
                        </Description>
                        <p className="py-2">
                          {type == "accept"
                            ? "Are you sure you want to accept this request?"
                            : "Are you sure you want to reject this request? You'll have to wait till the user sends a new request."}
                        </p>
                        <div className="flex gap-4">
                          <button
                            className="inline-flex items-center gap-2 rounded-md bg-gray-300 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                            onClick={() => setIsOpen(false)}>
                            Cancel
                          </button>
                          <button
                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                            onClick={() => {
                              setIsOpen(false);
                              type == "accept"
                                ? handleAcceptRequest(
                                    request._id,
                                    request.email
                                  )
                                : handleRejectRequest(request._id);
                            }}>
                            {type == "accept" ? "Accept" : "Reject"}
                          </button>
                        </div>
                      </DialogPanel>
                    </div>
                  </Dialog>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Inbox;
