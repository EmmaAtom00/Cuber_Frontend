import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./App.css";
import { FirstDisplayPage } from "./Components";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route index path="/" element={<FirstDisplayPage />} />
      </Routes>
    </>
  );
}

export default App;
