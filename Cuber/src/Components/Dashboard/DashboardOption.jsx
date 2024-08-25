import axios from "axios";
import Dashboard from "./Dashboard";
import { DriverDashboard } from "../Rides/Drivers";
import { useEffect, useState } from "react";

function DashboardOption() {
  let [mode, setMode] = useState();
  const url = import.meta.env.VITE_URL;
  // useEffect(() => {

  // }, []);

  const checkMode = () => {
    axios
      .get(`${url}/user/findMode`, {
        headers: {
          "content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // mode = res.response.driver;
        // console.log(res.data.driver);
        setMode(res.data.driver);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  checkMode();
  return <div>{mode ? <DriverDashboard /> : <Dashboard />}</div>;
}
export default DashboardOption;
