import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import { FirstDisplayPage, IntroPage, Login, SignUp } from "./Components";
import { BiError } from "react-icons/bi";
import { Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Dashboard, Profile } from "./Components/Dashboard";
import {
  ChooseDriver,
  DriverDetail,
  PassengerRequestSuccessPage,
  SelectLocation,
} from "./Components/Rides/Passengers";
import {
  CompleteDetails,
  CompleteTripDetails,
  DriverDashboard,
  PendingApproval,
  Submitted,
  TripDetails,
} from "./Components/Rides/Drivers";

function App() {
  const [introPage, setIntroPage] = useState(<FirstDisplayPage />);
  setTimeout(() => {
    setIntroPage(<IntroPage />);
  }, "5000");

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [mode, setMode] = useState("passenger");

  return (
    <>
      {isMobile ? (
        <Routes>
          <Route index path="/" element={introPage} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route
            path="/Dashboard"
            element={
              mode == "passenger" ? (
                <Dashboard setMode={setMode} />
              ) : (
                <DriverDashboard setMode={setMode} />
              )
            }
          />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Find-a-ride" element={<SelectLocation />} />
          <Route path="/Choose-a-ride" element={<ChooseDriver />} />
          <Route path="/Driver-details" element={<DriverDetail />} />
          <Route path="/Driver-dashboard" element={<DriverDashboard />} />
          <Route path="/Pending-approval" element={<PendingApproval />} />
          <Route path="/Driver-trip-details" element={<TripDetails />} />
          <Route path="/Trip-created" element={<Submitted />} />
          <Route
            path="/Complete-driver-trip-details"
            element={<CompleteTripDetails />}
          />
          <Route
            path="/Complete-driver-details"
            element={<CompleteDetails />}
          />
          <Route
            path="/Passenger-Request-Success"
            element={<PassengerRequestSuccessPage />}
          />
        </Routes>
      ) : (
        <div className="w-full bg-slate-200">
          <div className="h-screen  w-fit mx-auto justify-center flex items-center">
            <div className="bg-white py-20 px-40 rounded-md text-xl justify-center gap-5 items-center flex flex-col">
              <BiError size={40} color="red" />
              <p className="text-center text-xl font-bold">
                Error Loading Page
              </p>
              <p className="text-center text-sm">
                It looks like you're trying to access the
                <br />
                app through a laptop or wider screen. Please switch to mobile.
              </p>
              <small className="text-[12px] text-red-400">
                Web version not available yet
              </small>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
