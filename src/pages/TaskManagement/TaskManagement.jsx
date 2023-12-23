import Container from "../../components/Shared/Container";
import { MdAddCard } from "react-icons/md";
import { DragDropContext } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import Todo from "../../components/TaskManagement/Todo";
import OnGoing from "../../components/TaskManagement/OnGoing";
import Completed from "../../components/TaskManagement/Completed";

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
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex justify-center md:mt-5'>
          {!showForm && (
            <button
              className='flex items-center gap-x-2 px-5 py-2 text-xl bg-blue-500/30 text-white/80 font-medium'
              onClick={() => setShowForm(true)}
            >
              New Task
              <MdAddCard className='text-2xl' />
            </button>
          )}
        </div>
        <div className='w-3/4 mx-auto flex flex-col items-center'>
          {showForm && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-2  w-full'
            >
              <div className=''>
                <input
                  {...register("title", { required: true })}
                  placeholder='Title'
                  className='w-full rounded-md px-3 py-2  focus:outline-none'
                />
              </div>
              <textarea
                {...register("description", { required: true })}
                placeholder='Description'
                className='w-full rounded-md px-3 py-2  focus:outline-none'
              />
              <div className='flex gap-x-5'>
                <select
                  {...register("priority", { required: true })}
                  className='rounded-md px-3 py-2 focus:outline-none '
                >
                  {priorityOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  {...register("deadline", { required: true })}
                  type='date'
                  className='rounded-md px-3 py-2 focus:outline-none '
                />
              </div>

              <div className='flex gap-x-5'>
                <button
                  onClick={() => setShowForm(false)}
                  className='w-full bg-white/60 text-black font-semibold px-5 py-1 rounded-full'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='w-full bg-gradient-to-l from-cyan-600/20 to-blue-600/30 py-1 px-5 rounded-full text-white font-semibold'
                >
                  Add Task
                </button>
              </div>
            </form>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 my-10 px-2 gap-5 overflow-hidden'>
          <div className=''>
            <Todo tasks={tasks} handleTaskDelete={handleTaskDelete} />
          </div>
          <div className=''>
            <OnGoing tasks={tasks} handleTaskDelete={handleTaskDelete} />
          </div>
          <div className=''>
            <Completed tasks={tasks} handleTaskDelete={handleTaskDelete} />
          </div>
        </div>
      </DragDropContext>
    </Container>
  );
};

export default TaskManagement;
