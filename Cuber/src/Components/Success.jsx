function Success({ message, img, extra, nobg }) {
  return (
    <div className="h-[100vh] flex flex-col justify-center p-[2em]">
      <div className="shadow flex flex-col items-center w-fit mx-auto gap-4 px-20 py-8 rounded-md">
        <div className={`rounded-full ${nobg ? "" : "bg-gr p-8"}`}>
          <div>{img}</div>
        </div>
        <p className="text-xl text-center">{message}</p>
        {extra ? (
          <p className="text-red-400 font-light  text-center">{extra}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default Success;
