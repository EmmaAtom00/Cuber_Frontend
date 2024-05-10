import Navigation from "../../Navigation";
import man from "../../../assets/man.png";
import { Link } from "react-router-dom";

function DriverDetail() {
  const driverDetails = [
    { name: "Trip", details: "Obantoko-Camp" },
    { name: "Size", details: 4 },
    { name: "Available space", details: 2 },
    { name: "Type", details: "Car" },
    { name: "Reg-No", details: "ABK983" },
    { name: "Price", details: "Free" },
  ];
  return (
    <div className="p-[2em]">
      <Navigation link={-1} name={"Driver details"} />
      <div className="shadow-md p-6">
        <div className="flex flex-col items-center justify-center pt-6">
          <img src={man} alt="" className="w-20" />
          <p>Johnson Abraham</p>
        </div>
        <div className="grid gap-4 mt-8">
          {driverDetails.map(({ name, details }, id) => {
            return (
              <div className="grid grid-cols-2" key={id}>
                <p className="font-bold">{name}</p>
                <p className="font-thin">{details}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Link
        className="flex justify-center mt-10"
        to={"/Passenger-Request-Success"}>
        <button className="bg-gr text-white py-4 px-8 rounded-md">
          Send request
        </button>
      </Link>
    </div>
  );
}
export default DriverDetail;
