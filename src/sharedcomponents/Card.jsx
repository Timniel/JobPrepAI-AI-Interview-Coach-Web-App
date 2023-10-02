const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-medium relative border-purple-700 w-[90%] sm:w-4/5 md:w-1/2  h-[34rem]  my-auto flex flex-col mx-auto p-10 shadow-purple-200 rounded-2xl">
      {children}
    </div>
  );
};

export default Card;
