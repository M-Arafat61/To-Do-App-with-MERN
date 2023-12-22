import { Outlet } from "react-router-dom";
import Nav from "../components/Shared/Nav";

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-[#131424]'>
      <Nav />
      <Outlet />
    </div>
  );
};

export default MainLayout;
