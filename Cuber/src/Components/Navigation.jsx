import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

function Navigation({ link, name }) {
  return (
    <div>
      <div className="flex items-center justify-center relative">
        <Link to={link} className="absolute left-0 top-0">
          <IoIosArrowRoundBack size={30} />
        </Link>
        <p className="mt-12">{name}</p>
      </div>
    </div>
  );
}
export default Navigation;
