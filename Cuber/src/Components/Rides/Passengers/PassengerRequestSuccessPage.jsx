import { IoShieldCheckmark } from "react-icons/io5";
import Success from "../../Success";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function PassengerRequestSuccessPage() {
  const [timer, setTimer] = useState(false);
  if (timer) {
    return <Navigate to={"/Dashboard"} />;
  }
  return (
    <div>
      <Success
        message={"Request sent"}
        img={<IoShieldCheckmark size={90} color="white" />}
      />
      {setTimeout(() => setTimer(true), "4000")}
    </div>
  );
}
export default PassengerRequestSuccessPage;
