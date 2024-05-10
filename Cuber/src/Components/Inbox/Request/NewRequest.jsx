import Navigation from "../../Navigation";
import man from "../../../assets/man.png";
import { Link } from "react-router-dom";

function NewRequest() {
  return (
    <div className="p-[2em]">
      <Navigation link={-1} name={"New request"} />

      <div className="flex flex-col shadow-lg rounded-md my-8 items-center justify-center p-6">
        <div className="flex flex-col items-center gap-2">
          <img src={man} alt="" className="w-20" />
          <p>Johnson Adam </p>
        </div>

        <div className="flex flex-col items-center my-6 gap-2 shadow-md rounded-md py-3 px-6">
          <h2 className="font-bold">Trip</h2>
          <p className="text-gr text-sm">Obantoko - Camp</p>
        </div>

        <div className="flex flex-col items-center my-8 gap-2 shadow rounded-md py-3 px-6">
          <h2 className="font-bold">Pick up location</h2>
          <p className="text-red-500 text-sm">Agbado bus top</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <Link to={"/Accept-request"} className="w-[50%]">
          <button className="bg-gr text-white py-3 px-8 rounded-md mx-auto w-full">
            Accept
          </button>
        </Link>

        <Link to={"/Reject-request"} className="w-[50%]">
          <button className="bg-red-500 text-white py-3 px-8 rounded-md mx-auto w-full">
            Reject
          </button>
        </Link>
      </div>
    </div>
  );
}
export default NewRequest;
