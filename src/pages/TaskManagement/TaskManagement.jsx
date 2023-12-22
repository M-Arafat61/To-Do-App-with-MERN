// import Container from "../../components/Shared/Container";
// import { TiDeleteOutline } from "react-icons/ti";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";

const TaskManagement = () => {
  const { register, handleSubmit, reset } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { data: addedTasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks");
      setTasks(res.data);
      return res.data;
    },
  });
  console.log(addedTasks);
  const onSubmit = async data => {
    const taskInfo = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      deadline: data.deadline,
      status: "to-do",
      postCreatedAt: new Date(),
    };
    // console.log(taskInfo);
    try {
      const response = await axiosSecure.post("/tasks", taskInfo);
      if (response.data.insertedId) {
        reset();
        setShowForm(false);
        refetch();
        toast.success("Task added successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        const fetchDelete = async () => {
          try {
            const response = await axiosSecure.delete(`/deleteTask/${id}`);
            console.log(response.data);
            if (response.data.deletedCount > 0) {
              refetch();
            }
          } catch (error) {
            console.log(error);
            Swal.fire(
              "Error",
              "There was an error deleting the file.",
              "error"
            );
          }
        };
        fetchDelete();
      }
    });
  };

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ taskId, newStatus }) => {
      // Update task status via your API
      return axiosSecure.patch(`/tasks/${taskId}`, {
        status: newStatus,
      });
    },

    onError: error => {
      console.error("Error updating task status:", error);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const onDragEnd = async result => {
    const { destination, source, draggableId } = result;

    // Check if dropped outside droppable area
    if (!destination) {
      return;
    }

    try {
      // Call the mutation function to update task status
      await updateTaskStatusMutation.mutateAsync({
        taskId: draggableId,
        newStatus: destination.droppableId,
      });

      // Reorder tasks in frontend
      const updatedTasks = Array.from(tasks);
      const [removedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, removedTask);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  // console.log(addedTasks);
  const priorityOptions = [
    { label: "Basic", value: "basic" },
    { label: "Standard", value: "standard" },
    { label: "Urgent", value: "urgent" },
  ];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex justify-around '>
        <div className='border'>
          <Droppable droppableId='to-do'>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <p>To Do</p>
                {tasks
                  .filter(task => task.status === "to-do")
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {provided => (
                        <div
                          className='w-52 bg-gray-400 mb-2'
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <p>{task.deadline}</p>
                          <button onClick={() => handleTaskDelete(task._id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className='border'>
          <Droppable droppableId='ongoing'>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <p>Ongoing</p>
                {/* Render the tasks that are in the 'Ongoing' status */}
                {tasks
                  .filter(task => task.status === "ongoing") // Assuming 'status' field in tasks
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {provided => (
                        <div
                          className='w-52 bg-gray-400 mb-2'
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <p>{task.deadline}</p>
                          <button onClick={() => handleTaskDelete(task._id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className='border'>
          <Droppable droppableId='completed'>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <p>Completed</p>
                {/* Render the tasks that are in the 'Completed' status */}
                {tasks
                  .filter(task => task.status === "completed") // Assuming 'status' field in tasks
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {provided => (
                        <div
                          className='w-52 bg-gray-400 mb-2'
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <p>{task.deadline}</p>
                          <button onClick={() => handleTaskDelete(task._id)}>
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className='border'>
          {!showForm && (
            <button onClick={() => setShowForm(true)}>New Task</button>
          )}
          {showForm && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Title:</label>
                <input {...register("title", { required: true })} />
              </div>
              <div>
                <label>Description:</label>
                <textarea {...register("description", { required: true })} />
              </div>
              <div>
                <label>Priority:</label>
                <select {...register("priority", { required: true })}>
                  {priorityOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Deadline:</label>
                <input
                  {...register("deadline", { required: true })}
                  type='date'
                />
              </div>
              <button type='submit'>Add Task</button>
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskManagement;
