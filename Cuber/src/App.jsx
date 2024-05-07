import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import { FirstDisplayPage, IntroPage, Login, SignUp } from "./Components";
import { BiError } from "react-icons/bi";
import { Route, Routes } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Dashboard, Profile } from "./Components/Dashboard";
import { ChooseDriver, SelectLocation } from "./Components/Rides/Passengers";

function App() {
  const [introPage, setIntroPage] = useState(<FirstDisplayPage />);
  setTimeout(() => {
    setIntroPage(<IntroPage />);
  }, "5000");

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      {isMobile ? (
        <Routes>
          <Route index path="/" element={introPage} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Find-a-ride" element={<SelectLocation />} />
          <Route path="/Choose-a-ride" element={<ChooseDriver />} />
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
