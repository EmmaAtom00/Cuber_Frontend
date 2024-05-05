import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import { FirstDisplayPage, IntroPage } from "./Components";
import { Route, Routes } from "react-router-dom";

function App() {
  const [introPage, setIntroPage] = useState(<FirstDisplayPage />);
  setTimeout(() => {
    setIntroPage(<IntroPage />);
  }, "5000");

  return (
    <>
      <Routes>
        <Route index path="/" element={introPage} />
      </Routes>
    </>
  );
}

export default App;
