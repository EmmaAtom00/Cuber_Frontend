import cuberLogo from "/whitelogo.svg";
import { Link } from "react-router-dom";

function IntroPage() {
  return (
    <div className="bg-bl h-[100vh] p-[2em]">
      <div className="flex flex-col items-center justify-center gap-2 h-full">
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={cuberLogo} className="logo" alt="Cuber logo" />
          <h3 className="text-white text-6xl">CUBER</h3>
        </div>
        <p className="text-white text-center mb-32 mt-12 text-md">
          Get cheap rides at the comfort
          <br />
          of your Home
        </p>
        <div className="text-center text-white flex flex-col gap-6">
          <Link>
            <button className="bg-gr rounded-md py-4 w-40">Login</button>
          </Link>
          <Link>
            <button className="bg-gr rounded-md py-4 w-40">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default IntroPage;
