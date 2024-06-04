function NotFound() {
  return (
    <div className="w-full bg-slate-200">
      <div className="h-screen  w-fit mx-auto justify-center flex items-center">
        <div className="bg-white py-20 px-40 rounded-md text-xl justify-center gap-2 items-center flex flex-col">
          <p className="text-center text-4xl font-bold">404</p>
          <p className="text-center text-sm">Page not Found</p>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
