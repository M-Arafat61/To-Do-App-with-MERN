/* eslint-disable react/prop-types */
import { Draggable, Droppable } from "react-beautiful-dnd";
import { LuListTodo } from "react-icons/lu";
import { RiChatDeleteLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import UpdateTask from "./UpdateTask";
import { useState } from "react";

const Todo = ({
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
  console.log(tasks);
  return (
    <Droppable droppableId='to-do'>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <p className='flex items-center gap-x-2 px-5 py-2 text-xl bg-blue-500/30 text-white/80 font-medium mb-5'>
            <LuListTodo />
            To Do
          </p>
          {tasks
            .filter(task => task.status === "to-do")
            .map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {provided => (
                  <div
                    className='border border-blue-500 mb-2 rounded-2xl overflow-hidden px-3 py-2 space-y-2'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {
                      <>
                        <h3 className='text-lg text-white'>{task.title}</h3>
                        <p className='text-xs text-white/80'>{task.deadline}</p>
                        <p className='text-sm text-white/70'>
                          {task.description}
                        </p>
                        <p className='text-sm text-white/70'>{task.status}</p>

                        <div className='flex items-center justify-end gap-x-5 text-xl'>
                          <button onClick={() => handleEditClick(task._id)}>
                            <FaRegEdit className='text-emerald-600' />
                          </button>
                          <button onClick={() => handleTaskDelete(task._id)}>
                            <RiChatDeleteLine className='text-red-600' />
                          </button>
                        </div>
                      </>
                    }
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

export default Todo;
