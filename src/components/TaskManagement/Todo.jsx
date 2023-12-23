import { Draggable, Droppable } from "react-beautiful-dnd";
import { LuListTodo } from "react-icons/lu";
import { RiChatDeleteLine } from "react-icons/ri";

// eslint-disable-next-line react/prop-types
const Todo = ({ tasks, handleTaskDelete }) => {
  return (
    <Droppable droppableId='to-do'>
      {provided => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <p className='flex items-center gap-x-2 px-5 py-2 text-xl bg-blue-500/30 text-white/80 font-medium mb-5'>
            <LuListTodo />
            To Do
          </p>
          {tasks
            // eslint-disable-next-line react/prop-types
            .filter(task => task.status === "to-do")
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

export default Todo;
