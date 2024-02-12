/* eslint-disable react/prop-types */
import { Draggable, Droppable } from "react-beautiful-dnd";
import { RiChatDeleteLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { GiRunningNinja } from "react-icons/gi";
import UpdateTask from "./UpdateTask";
import { useState } from "react";

const OnGoing = ({
  updateFormOpen,
  setUpdateFormOpen,
  tasks,
  handleTaskDelete,
  handleEditTask,
  showUpdate,
  setShowUpdate,
  handleTaskUpdate,
}) => {
  const [taskIdBeingEdited, setTaskIdBeingEdited] = useState("");
  const handleEditClick = taskId => {
    setUpdateFormOpen(true);
    setTaskIdBeingEdited(taskId);
    handleEditTask(taskId);
  };
  return (
    <Droppable droppableId='on-going'>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <p className='flex items-center gap-x-2 px-5 py-2 text-xl bg-blue-500/30 text-white/80 font-medium mb-5'>
            <GiRunningNinja />
            On Going
          </p>
          {tasks
            .filter(task => task.status === "on-going")
            .map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {provided => (
                  <div
                    className={`mb-2 rounded-2xl overflow-auto px-[6px] py-2 space-y-3 ${
                      task.priority === "low" && "bg-green-400"
                    } ${task.priority === "medium" && "bg-yellow-500"} ${
                      task.priority === "high" && "bg-red-500"
                    }`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <div>
                      <h3 className='text-lg text-black underline font-medium'>
                        {task.title}
                      </h3>
                      <p className='text-xs text-white'>{task.description}</p>
                      <p className='text-sm text-white'>
                        Priority: {task.priority}
                      </p>
                      <p className='text-xs text-white'>
                        Deadline: {task.deadline}
                      </p>
                    </div>
                    <hr />
                    <div className='flex items-center justify-end gap-x-5 text-xl'>
                      <button onClick={() => handleEditClick(task._id)}>
                        <FaRegEdit className='text-emerald-600' />
                      </button>
                      <button onClick={() => handleTaskDelete(task._id)}>
                        <RiChatDeleteLine className='text-red-900' />
                      </button>
                    </div>
                    <UpdateTask
                      updateFormOpen={updateFormOpen}
                      setUpdateFormOpen={setUpdateFormOpen}
                      task={task}
                      taskIdBeingEdited={taskIdBeingEdited}
                      showUpdate={showUpdate}
                      setShowUpdate={setShowUpdate}
                      handleTaskUpdate={handleTaskUpdate}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default OnGoing;
