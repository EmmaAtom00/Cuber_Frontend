import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import man from "../../../assets/man.png";
import man1 from "../../../assets/man1.png";

function ChooseDriver() {
  const Sponsored = [
    {
      name: "Johnson Abraham",
      start: "Obantoko",
      destination: "Camp",
      img: man,
      link: "/Driver-details",
    },
    {
      name: "Paul Yussuf",
      start: "Obantoko",
      destination: "Camp",
      img: man1,
      link: "/Driver-details",
    },
  ];
  return (
    <div>
      <div className="p-[2em]">
        <div className="flex items-center justify-center relative">
          <Link to={-1} className="absolute left-0 top-0">
            <IoIosArrowRoundBack size={30} />
          </Link>
          <p className="mt-12">Available Drivers</p>
        </div>
        {Sponsored.map(({ name, start, destination, img, link }, id) => {
          return (
            <Link to={link} key={id}>
              <div className="flex items-center shadow-xl bg-white rounded-lg p-6 gap-6 my-6">
                <img src={img} alt="" className="w-14" />
                <div className="flex flex-col">
                  <p>{name}</p>
                  <b>Trip</b>
                  <i>
                    <small>
                      {start} - {destination}
                    </small>
                  </i>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default ChooseDriver;
