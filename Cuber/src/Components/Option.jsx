import { Link } from "react-router-dom";

function Option({ message, func }) {
  return (
    <div className="h-[100vh] flex flex-col justify-center p-[2em]">
      <div className="shadow-md flex flex-col items-center w-fit mx-auto gap-4 px-20 py-8 rounded-md">
        <p className="text-xl text-center">{message}</p>
        <div className="flex justify-between items-center gap-8">
          <Link to={-1} className="w-[50%]">
            <button className="bg-red-500 text-white py-3 px-8 rounded-md">
              No
            </button>
          </Link>

          <button
            onClick={() => func}
            className="bg-gr text-white py-3 px-8 rounded-md w-[50%]">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
export default Option;
