import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

function Modal({
  isOpen,
  setIsOpen,
  type,
  request,
  handleAcceptRequest,
  handleRejectRequest,
  details,
  button,
}) {
  return (
    <div className="">
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          // console.log(isOpen);
        }}
        className="relative z-50">
        <div className="absolute top-0 inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle className="font-bold">
              {type == "accept" ? details.title.accept : details.title.reject}
            </DialogTitle>
            <Description>
              {type == "accept"
                ? details.description.accept + " " + request.name
                : details.description.reject + " " + request.name}
            </Description>
            <p className="py-2">
              {type == "accept"
                ? details.description.verify.accept
                : details.description.verify.reject}
            </p>
            <div className="flex gap-4">
              <button
                className="inline-flex items-center gap-2 rounded-md bg-gray-300 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={() => {
                  setIsOpen(false);
                  type == "accept"
                    ? handleAcceptRequest(request._id, request.email)
                    : handleRejectRequest(request._id);
                }}>
                {type == "accept" ? button.accept : button.reject}
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
export default Modal;
