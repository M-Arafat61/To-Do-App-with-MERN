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
import TaskCounter from "../../components/TaskManagement/TaskCounter";

const TaskManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [taskUpdateStates, setTaskUpdateStates] = useState({});
  const [tasks, setTasks] = useState([]);
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [todoUpdateFormOpen, setTodoUpdateFormOpen] = useState(false);
  const [onGoingUpdateFormOpen, setOnGoingUpdateFormOpen] = useState(false);
  const [completedUpdateFormOpen, setCompletedUpdateFormOpen] = useState(false);

  const [search, setSearch] = useState("");

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

  const handleTaskUpdate = async (taskId, taskInfo) => {
    try {
      const response = await axiosSecure.patch(
        `/updateTasks/${taskId}`,
        taskInfo
      );
      console.log(response.data);
      if (response.data.modifiedCount) {
        refetch();
        setUpdateFormOpen(false);
        toast.success("Task updates successful!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditTask = taskId => {
    setTaskUpdateStates(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };
  console.log(updateFormOpen);
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
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];
  const tasksFilter = (tasks, priority) => {
    return tasks.filter(task =>
      task.priority.toLowerCase().includes(priority.toLowerCase())
    );
  };
  const filteredTasks = tasksFilter(tasks, search);

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='mx-auto px-2 md:flex space-y-5 md:space-y-0 space-x-0 md:space-x-5 items-center justify-center mt-5'>
          <div className='w-3/4 md:w-1/2 mx-auto'>
            <input
              type='search'
              value={search}
              autoFocus
              placeholder='Search by priority'
              onChange={e => setSearch(e.target.value)}
              className='px-3 py-3 w-full outline-none bg-transparent border overflow-hidden border-white/55 text-white'
            />
          </div>

          <div className='w-3/4 md:w-1/2 mx-auto'>
            {!showForm && (
              <button
                className='flex items-center gap-x-2 px-6 py-4 text-xl bg-blue-500/30 text-white/80 font-medium'
                onClick={() => setShowForm(true)}
              >
                New Task
                <MdAddCard className='text-2xl' />
              </button>
            )}
          </div>
        </div>

        <div className='w-3/4 mx-auto flex flex-col items-center'>
          {showForm && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-2 mt-5 w-full'
            >
              <div className=''>
                <input
                  {...register("title", { required: "Title is required" })}
                  placeholder='Title'
                  className='w-full rounded-md px-3 py-2  focus:outline-none'
                />
                {errors.title && (
                  <p className='text-red-500' role='alert'>
                    {errors.title.message}
                  </p>
                )}
              </div>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder='Description'
                className='w-full rounded-md px-3 py-2  focus:outline-none'
              />
              {errors.description && (
                <p className='text-red-500' role='alert'>
                  {errors.description.message}
                </p>
              )}
              <div className='flex gap-x-5'>
                <div>
                  <select
                    {...register("priority", {
                      required: "Priority is required",
                    })}
                    className='rounded-md px-3 py-2 focus:outline-none '
                  >
                    <option value=''>Priority</option>
                    {priorityOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.priority && (
                    <p className='text-red-500 block' role='alert'>
                      {errors.priority.message}
                    </p>
                  )}
                </div>
                <input
                  {...register("deadline", { required: true })}
                  type='date'
                  className='rounded-md px-3 py-2 focus:outline-none '
                />
              </div>

              <div className='flex gap-x-5 gap-y-2 md:gap-y-0'>
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
        <TaskCounter tasks={tasks} />
        <div className='grid grid-cols-1 md:grid-cols-3 my-10 px-2 gap-5 overflow-hidden'>
          <Todo
            updateFormOpen={todoUpdateFormOpen}
            setUpdateFormOpen={setTodoUpdateFormOpen}
            // tasks={tasks}
            tasks={filteredTasks}
            showUpdate={taskUpdateStates}
            handleEditTask={handleEditTask}
            handleTaskDelete={handleTaskDelete}
            handleTaskUpdate={handleTaskUpdate}
          />

          <OnGoing
            updateFormOpen={onGoingUpdateFormOpen}
            setUpdateFormOpen={setOnGoingUpdateFormOpen}
            // tasks={tasks}
            tasks={filteredTasks}
            showUpdate={taskUpdateStates}
            handleEditTask={handleEditTask}
            handleTaskDelete={handleTaskDelete}
            handleTaskUpdate={handleTaskUpdate}
          />

          <Completed
            updateFormOpen={completedUpdateFormOpen}
            setUpdateFormOpen={setCompletedUpdateFormOpen}
            // tasks={tasks}
            tasks={filteredTasks}
            showUpdate={taskUpdateStates}
            handleEditTask={handleEditTask}
            handleTaskDelete={handleTaskDelete}
            handleTaskUpdate={handleTaskUpdate}
          />
        </div>
      </DragDropContext>
    </Container>
  );
};

export default TaskManagement;
