import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="z-1000 flex h-screen w-screen content-center">
      <PacmanLoader color="#000000" size={20} />
    </div>
  );
};

export default Loading;
