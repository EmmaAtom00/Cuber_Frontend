import axios from "axios";
import { useState } from "react";

const NoOfRequest = async () => {
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  let inbox;
  const url = import.meta.env.VITE_URL;
  try {
    const res = await axios.get(`${url}/user/Inbox`, config);
    // console.log(res.data.Inbox.length);

    return res.data.Inbox.length;
  } catch (error) {}
};

export default NoOfRequest;
