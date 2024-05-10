import { useState } from "react";
import Success from "../../Success";
import { Navigate } from "react-router-dom";

function PendingApproval() {
  const [pending, setPending] = useState(false);
  if (pending) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <div>
      <Success
        message={"Your details has been received and is being processed"}
      />
      {setTimeout(() => setPending(true), "7000")}
    </div>
  );
}
export default PendingApproval;
