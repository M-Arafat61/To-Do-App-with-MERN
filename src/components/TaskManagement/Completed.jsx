import { Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosCloudDone } from "react-icons/io";
import { RiChatDeleteLine } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
const Completed = ({ tasks, handleTaskDelete }) => {
  return (
    <Droppable droppableId='completed'>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <p className='flex items-center gap-x-2 px-5 py-2 text-xl bg-blue-500/30 text-white/80  font-medium mb-5'>
            <IoIosCloudDone />
            Completed
          </p>

          {tasks
            // eslint-disable-next-line react/prop-types
            .filter(task => task.status === "completed")
            .map((task, index) => (
              <Draggable key={task._id} draggableId={task._id} index={index}>
                {provided => (
                  <div
                    className='border border-blue-500 mb-2 rounded-2xl overflow-hidden px-3 py-2'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <h3 className='text-lg text-white'>{task.title}</h3>
                    <p className='text-xs'>{task.description}</p>
                    <div className='flex justify-between items-center'>
                      <p className='text-xs'>{task.deadline}</p>
                      <button onClick={() => handleTaskDelete(task._id)}>
                        <RiChatDeleteLine />
                      </button>
                    </div>
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

export default Completed;
