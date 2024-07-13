import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-full bg-slate-200">
      <div className="h-screen  w-fit mx-auto justify-center flex items-center">
        <div className="bg-white py-20 px-40 rounded-md text-xl justify-center gap-2 items-center flex flex-col">
          <FcSearch size={80} />
          <p className="text-center text-4xl font-bold">Oops</p>
          <p className="text-center text-sm">Page not Found</p>
          <Link to={"dashboard"}>
            <button className="bg-bl text-white py-1 px-3 text-sm rounded-sm">
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
