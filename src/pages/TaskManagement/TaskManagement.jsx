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
import useAuth from "../../hooks/useAuth";

const TaskManagement = () => {
  const { register, handleSubmit, reset } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: addedTasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks");
      setTasks(res.data);
      return res.data;
    },
  });

  const timeStamp = user?.reloadUserInfo?.createdAt;
  let formattedDate = "Invalid Date";

  if (timeStamp && !isNaN(timeStamp)) {
    const date = new Date(parseInt(timeStamp, 10));
    formattedDate = date.toLocaleString();
  }

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
      <h2 className='text-3xl text-center text-white my-10 md:my-24'>
        Create and Manage Tasks.
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='my-10 md:my-24'>
          {user && (
            <div className='flex items-center justify-around gap-x-10'>
              <div className='flex flex-1 items-center justify-center'>
                <img className='w-1/2 rounded-box' src={user.photoURL} alt='' />
              </div>
              <div className='flex-1'>
                <hr className='my-5  mx-auto border-1 border-gray-600' />
                <div className='flex items-center gap-x-2'>
                  <p>Name-</p>
                  <h3>{user.displayName}</h3>
                </div>
                <div className='flex items-center gap-x-2'>
                  <p>Email-</p>
                  <h3>{user.email}</h3>
                </div>
                <div className='flex gap-x-2'>
                  <p>Account Creation Time-</p>
                  <h3>{formattedDate}</h3>
                </div>
                <hr className='my-5  mx-auto border-1 border-gray-600' />
              </div>
            </div>
          )}
        </div>
        <div className=''>
          <div className='flex justify-center'>
            {!showForm && (
              <button
                className='flex items-center gap-x-2 px-5 py-2 text-xl bg-blue-500 text-white font-medium'
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

                <div className='flex gap-x-2 my-5'>
                  <button
                    onClick={() => setShowForm(false)}
                    className='w-full bg-yellow-500 text-white font-semibold px-5 rounded-full'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='w-full bg-gradient-to-l from-cyan-600 to-blue-600 px-5 rounded-full text-white font-semibold'
                  >
                    Add Task
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 my-10 md:mt-24 px-2 gap-5 overflow-hidden'>
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
      <hr className='my-5  mx-auto border-1 border-gray-600' />
    </Container>
  );
};

export default TaskManagement;
