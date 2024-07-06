import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../Navigation";
import { toast } from "react-hot-toast";

function Inbox() {
  const [inbox, setInbox] = useState([]);
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
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch inbox");
    }
  };

  const handleAcceptRequest = async (id, email) => {
    try {
      const res = await axios.get(
        `${url}/user/acceptRequest/${id}/${email}`,
        config
      );
      toast.success(res.data.msg);
      fetchInbox();
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept request");
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
        {inbox.length === 0 ? (
          <p>No requests found</p>
        ) : (
          inbox.map((request, id) => (
            <div key={id} className="p-4 shadow-md mb-4">
              <p>
                New request from <b>{request.name}</b>
              </p>
              <div className="flex justify-between items-center">
                <i>
                  <small>{request.status}</small>
                </i>
                <div className="grid gap-2">
                  <button
                    onClick={() => handleRejectRequest(request._id)}
                    className="bg-red-400 py-1 px-2 rounded-sm text-white text-sm">
                    Reject
                  </button>
                  <button
                    onClick={() =>
                      handleAcceptRequest(request._id, request.email)
                    }
                    className="bg-green-400 py-1 px-2 rounded-sm text-white text-sm">
                    Accept
                  </button>
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
