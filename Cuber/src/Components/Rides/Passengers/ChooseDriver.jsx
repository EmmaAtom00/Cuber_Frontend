import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import man from "../../../assets/man.png";
import man1 from "../../../assets/man1.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function ChooseDriver() {
  const [drivers, setDrivers] = useState([{}]);
  const url = import.meta.env.VITE_URL;
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  const loadDrivers = () => {
    axios
      .get(`${url}/user/findMatch`, config)
      .then((res) => {
        setDrivers(res.data.data);
        // console.log(drivers);
        // console.log(res.data.data[0].driver);
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  useEffect(() => {
    loadDrivers();
  }, []);
  const Sponsored = [
    {
      name: "Johnson Abraham",
      start: "Obantoko",
      destination: "Camp",
      img: man,
      link: "/Driver-details",
    },
    {
      name: "Paul Yussuf",
      start: "Obantoko",
      destination: "Camp",
      img: man1,
      link: "/Driver-details",
    },
  ];
  return (
    <div>
      <ToastContainer />
      <div className="p-[2em]">
        <div className="flex items-center justify-center relative">
          <Link to={"/dashboard"} className="absolute left-0 top-0">
            <IoIosArrowRoundBack size={30} />
          </Link>
          <p className="mt-12">Available Drivers</p>
        </div>
        {drivers.map((driver, id) => {
          // console.log(driver);
          return (
            // link/${email}
            <Link
              to={`/driver-details/${driver.driver ? driver.driver._id : "#"}`}
              key={id}>
              <div className="flex items-center shadow-xl bg-white rounded-lg p-6 gap-6 my-6">
                <img src={Sponsored[1].img} alt="" className="w-14" />
                <div className="flex flex-col">
                  {driver.driver ? (
                    <p>
                      {driver.driver.firstName} {driver.driver.lastName}
                    </p>
                  ) : (
                    ""
                  )}
                  <b>Trip</b>
                  <i>
                    {driver.driver ? (
                      <small>
                        {driver.driver.pickup} - {driver.driver.destination}
                      </small>
                    ) : (
                      ""
                    )}
                  </i>
                  <small>
                    <b>Distance: </b>
                    {driver.distance}km
                  </small>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default ChooseDriver;
