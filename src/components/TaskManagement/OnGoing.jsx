import { Draggable, Droppable } from "react-beautiful-dnd";
import { GiRunningNinja } from "react-icons/gi";
import { RiChatDeleteLine } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
const OnGoing = ({ tasks, handleTaskDelete }) => {
  return (
    <Droppable droppableId='ongoing'>
      {provided => (
        <div className='' {...provided.droppableProps} ref={provided.innerRef}>
          <p className='flex items-center gap-x-2 px-5 py-2 text-xl bg-blue-500 text-white font-medium mb-5'>
            <GiRunningNinja />
            Ongoing
          </p>
          {/* Render the tasks that are in the 'Ongoing' status */}
          {tasks
            // eslint-disable-next-line react/prop-types
            .filter(task => task.status === "ongoing") // Assuming 'status' field in tasks
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

export default OnGoing;
