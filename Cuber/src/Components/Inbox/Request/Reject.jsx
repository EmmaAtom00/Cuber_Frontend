import { Option } from "../..";
import { useNavigate } from "react-router-dom";

function Reject() {
  const navigate = useNavigate();
  const accept = () => {
    navigate("/Reject");
  };
  return (
    <div>
      <Option
        func={accept}
        message={"Are you sure you want to reject this request"}
      />
    </div>
  );
}
export default Reject;
