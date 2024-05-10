import { useNavigate } from "react-router-dom";
import { Option } from "../..";

function Accept() {
  const navigate = useNavigate();
  const accept = () => {
    navigate("/Accept");
  };
  return (
    <div>
      <Option
        func={accept}
        message={"Are you sure you want to accept this request"}
      />
    </div>
  );
}
export default Accept;
