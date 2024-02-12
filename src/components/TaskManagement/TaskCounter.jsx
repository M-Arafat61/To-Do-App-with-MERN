import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FcTodoList } from "react-icons/fc";

import { RiTaskLine } from "react-icons/ri";

const TaskCounter = ({ tasks }) => {
  const [completedCount, setCompletedCount] = useState([]);

  useEffect(() => {
    const completedTask = tasks.filter(task => task.status === "completed");
    setCompletedCount(completedTask);
  }, [tasks]);

  //   console.log(completedCount);

  return (
    <div className='mt-10 space-y-2 text-white'>
      <div className='flex items-center gap-x-1'>
        <FcTodoList size={26} />
        <h3 className='text-xl font-bold'>Total Tasks: {tasks.length}</h3>
      </div>
      <div className='flex items-center gap-x-1'>
        <RiTaskLine size={26} />
        <h3 className='text-xl font-bold'>
          Completed Tasks: {completedCount.length}
        </h3>
      </div>
    </div>
  );
};

TaskCounter.propTypes = {
  tasks: PropTypes.array,
};

export default TaskCounter;
