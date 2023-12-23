import TaskManagement from "../../pages/TaskManagement/TaskManagement";
import LeftSidebar from "./LeftSidebar";

const Dashboard = () => {
  return (
    <>
      <h2 className='bg-cyan-400/30 text-3xl text-center text-white pb-10 md:pb-24'>
        Create and Manage Tasks.
      </h2>
      <div className='flex justify-between'>
        <div className='w-1/4 bg-cyan-400/30 h-max min-h-screen'>
          <LeftSidebar />
        </div>
        <div className='w-3/4 bg-blue-500/30 h-max min-h-screen pl-2 md:pl-8'>
          <TaskManagement />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
