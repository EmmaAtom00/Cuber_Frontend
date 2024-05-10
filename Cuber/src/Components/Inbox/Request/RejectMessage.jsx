import { useState } from "react";
import Success from "../../Success";
import { MdCancel } from "react-icons/md";
import { Navigate } from "react-router-dom";

function RejectMessage() {
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Navigate to={"/dashboard"} />;
  return (
    <div>
      <Success
        message={"You've rejected the request"}
        img={<MdCancel size={120} color="red" />}
        nobg={true}
      />
      {setTimeout(() => setRedirect(true), "4000")}
    </div>
  );
}
export default RejectMessage;
