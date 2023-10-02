import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";

export const ToggleButton = ({ isOpen, onClick }) => {
  return (
    <div
      className="md:hidden z-50 flex absolute right-5 top-4 bg-purple-400 rounded-md p-1 shadow-medium"
      onClick={onClick}
    >
      {!isOpen ? (
        <Bars2Icon className="h-7 w-7 text-white" />
      ) : (
        <XMarkIcon className="h-7 w-7 text-white" />
      )}
    </div>
  );
};
