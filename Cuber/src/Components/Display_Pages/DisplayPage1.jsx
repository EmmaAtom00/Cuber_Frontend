import AnimatePage from "../AnimatePage";
import cuberLogo from "/whitelogo.svg";

function DisplayPage() {
  return (
    <div className="bg-bl h-[100vh] p-[2em]">
      <AnimatePage>
        <div className="h-[100vh]">
          <div className="flex flex-col items-center justify-center gap-2 h-full">
            <img src={cuberLogo} className="logo" alt="Cuber logo" />
            <h3 className="text-white text-2xl">CUBER</h3>
          </div>
        </div>
      </AnimatePage>
    </div>
  );
}
export default DisplayPage;
