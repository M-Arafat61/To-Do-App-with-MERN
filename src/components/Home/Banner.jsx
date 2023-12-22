/* eslint-disable react/no-unescaped-entities */
import Container from "../Shared/Container";
import { Link } from "react-router-dom";
import banner from "/banner.jpg";

const Banner = () => {
  return (
    <Container>
      <div className='my-10 px-2 md:my-24 flex items-center'>
        <div className='relative items-center flex mx-auto w-full md:w-3/4 rounded-xl overflow-hidden'>
          <img src={banner} alt='' />
          <Link
            to='/task-management'
            className='font-bold text-base md:text-xl bg-blue-500 btn-outline rounded-full px-3 md:px-10 py-1 md:py-4 absolute  text-white'
          >
            Let's Explore!
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
