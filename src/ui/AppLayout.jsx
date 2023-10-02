import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
import SideBarOpen from "../sidebar/SideBarOpen";

const AppLayout = () => {
  const navigation = useNavigation();
  const isloading = navigation.state === "loading";

  return (
    <div className=" flex h-[100dvh]">
      <SideBarOpen />
      <Outlet />
    </div>
  );
};

export default AppLayout;
