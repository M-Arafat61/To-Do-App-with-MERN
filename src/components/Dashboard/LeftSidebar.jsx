import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Container from "../Shared/Container";
import { GiTreeRoots } from "react-icons/gi";
import { MdHideSource } from "react-icons/md";

import { FaUserAstronaut } from "react-icons/fa";
import { useState } from "react";

const LeftSidebar = () => {
  const { user } = useAuth();
  const [openInfo, setOpenInfo] = useState(false);
  const timeStamp = user?.reloadUserInfo?.createdAt;
  let formattedDate = "Invalid Date";

  if (timeStamp && !isNaN(timeStamp)) {
    const date = new Date(parseInt(timeStamp, 10));
    formattedDate = date.toLocaleString();
  }
  return (
    <Container>
      {user && (
        <>
          <div className='w-3/4 mx-auto'>
            <img className='w-full' src={user.photoURL} alt='' />
          </div>
          <hr className='my-2 border-1 border-blue-600/25' />
          <Link
            className='rounded-r-full flex items-center gap-x-2 px-1 md:px-5 py-2 text-xs md:text-xl hover:bg-blue-700/50 text-white/80  font-medium'
            to={"/"}
          >
            <GiTreeRoots />
            Home
          </Link>
          {!openInfo ? (
            <button
              onClick={() => setOpenInfo(true)}
              className='rounded-r-full mb-2 w-full flex items-center gap-x-2 px-1 md:px-5 py-2 text-xs md:text-xl hover:bg-blue-700/50 text-white/80  font-medium'
            >
              <FaUserAstronaut />
              User Details
            </button>
          ) : (
            <button
              onClick={() => setOpenInfo(false)}
              className='rounded-r-full mb-2 w-full flex items-center gap-x-2 px-5 py-2 text-xl bg-blue-700/30 text-white/40 hover:text-white/80  font-medium underline'
            >
              <MdHideSource />
              Close
            </button>
          )}
          {openInfo && (
            <div className='py-2 px-2 mx-auto text-white/60 shadow-lg'>
              <div className='lg:flex items-center gap-x-2'>
                <p className='font-bold'>Name:</p>
                <h3>{user.displayName}</h3>
              </div>
              <div className='lg:flex items-center gap-x-2'>
                <p className='font-bold'>Email:</p>
                <h3>{user.email}</h3>
              </div>
              <div className=''>
                <p className='font-bold'>User Since:</p>
                <h3>{formattedDate}</h3>
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default LeftSidebar;
