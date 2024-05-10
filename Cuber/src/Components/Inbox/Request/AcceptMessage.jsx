import { useState } from "react";
import Success from "../../Success";
import { IoShieldCheckmark } from "react-icons/io5";
import { Navigate } from "react-router-dom";

function AcceptMessage() {
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Navigate to={"/dashboard"} />;
  return (
    <div>
      <Success
        message={"You've accepted the request"}
        img={<IoShieldCheckmark size={90} color="white" />}
      />
      {setTimeout(() => setRedirect(true), "4000")}
    </div>
  );
}
export default AcceptMessage;
