import Navigation from "../../Navigation";
import man from "../../../assets/man.png";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DriverDetail() {
  const url = import.meta.env.VITE_URL;
  const navigate = useNavigate();
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  const { id: userId } = useParams();
  const [driver, setDriver] = useState({});
  const [send, setSend] = useState(false);

  const driverDetails = [
    { name: "Trip", details: driver.trip },
    { name: "Size", details: driver.size },
    { name: "Available space", details: driver.available_space },
    { name: "Type", details: driver.type },
    { name: "Reg-No", details: driver.reg_no },
    { name: "Price", details: driver.price },
  ];

  function sendRequest() {
    axios
      .get(`${url}/user/sendRequest/${userId}`, config)
      .then((res) => {
        // console.log(res);
        setSend(true);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  useEffect(() => {
    const getUser = () => {
      axios
        .get(`${url}/user/getDriverDetails/${userId}`, config)
        .then((res) => {
          // console.log(res.data.ride);
          setDriver(res.data.ride);
        })
        .catch((err) => {
          // console.log(err)
        });
    };
    getUser();
  }, []);
  return (
    <div className="p-[2em]">
      <Navigation link={-1} name={"Driver details"} />
      <div className="shadow-md p-6">
        <div className="flex flex-col items-center gap-2 justify-center pt-6">
          <img src={man} alt="" className="w-20" />
          <p>{driver.name}</p>
        </div>
        <div className="grid gap-4 mt-8">
          {driverDetails.map(({ name, details }, id) => {
            return (
              <div className="grid grid-cols-2" key={id}>
                <p className="font-bold">{name}</p>
                <p className="">{details}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center mt-10" onClick={() => sendRequest()}>
        <button className="bg-gr text-white py-4 px-8 rounded-md">
          Send request
        </button>
      </div>
      {send && <Navigate to={"/Passenger-Request-Success"} />}
    </div>
  );
}
export default DriverDetail;
