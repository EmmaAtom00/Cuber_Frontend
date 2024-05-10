import { useState } from "react";
import Success from "../../Success";
import { IoShieldCheckmark } from "react-icons/io5";
import { Navigate } from "react-router-dom";

function Submitted() {
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Navigate to={"/dashboard"} />;
  return (
    <div>
      <Success
        img={<IoShieldCheckmark color="white" size={90} />}
        message={"Success"}
        extra={"Please check your inbox for new request"}
      />
      {setTimeout(() => setRedirect(true), "5000")}
    </div>
  );
}
export default Submitted;
