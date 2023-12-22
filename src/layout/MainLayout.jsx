import { Outlet } from "react-router-dom";
import Nav from "../components/Shared/Nav";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-[#131424]'>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
