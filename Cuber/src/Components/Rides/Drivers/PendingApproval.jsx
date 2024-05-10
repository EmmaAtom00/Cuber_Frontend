import { useState } from "react";
import Success from "../../Success";
import { Navigate } from "react-router-dom";
import { MdOutlineNotificationImportant } from "react-icons/md";

function PendingApproval() {
  const [pending, setPending] = useState(false);
  if (pending) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <div>
      <Success
        img={<MdOutlineNotificationImportant color="white" size={90} />}
        message={"Your details has been received and is being processed"}
      />
      {setTimeout(() => setPending(true), "7000")}
    </div>
  );
}
export default PendingApproval;
