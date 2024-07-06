import { useEffect, useState } from "react";
import Navigation from "../../Navigation";

function ViewRide() {
  const [details, setDetails] = useState({});
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  const url = import.meta.env.VITE_URL;

  useEffect(() => {}, []);
  return (
    <div className="p-[2em]">
      <Navigation link={-1} name={"Ride Details"} />
      ViewRide
    </div>
  );
}
export default ViewRide;
