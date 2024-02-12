import Banner from "../../components/Home/Banner";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className='text-center container mx-auto my-16 md:my-24 space-y-5 px-4 md:px-10 lg:px-14'
      >
        <h2 className='text-xl md:text-4xl text-white font-medium'>
          Empower Your Productivity: The{" "}
          <span className='text-blue-700 font-bold'>
            Ultimate Task Management
          </span>{" "}
          Solution
        </h2>
        <p className='text-sm md:text-base font-medium'>
          Organize, Collaborate, and Achieve Your Goals with our Intuitive Task
          Management Application. <br /> Stay in Control of Your Tasks and Boost
          Your Efficiency Like Never Before!
        </p>
      </motion.div>
      <Banner />
    </>
  );
};

export default Home;
