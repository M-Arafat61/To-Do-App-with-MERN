/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const UpdateTask = ({
  updateFormOpen,
  setUpdateFormOpen,
  taskIdBeingEdited,
  task,
  handleTaskUpdate,
  showUpdate,
}) => {
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("priority", task.priority);
      setValue("deadline", task.deadline);
    }
  }, [task, setValue]);

  const onSubmit = data => {
    const taskInfo = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      deadline: data.deadline,
      postCreatedAt: new Date(),
      status: task.status,
    };
    if (task && task._id) {
      handleTaskUpdate(task._id, taskInfo);
    }
  };

  return (
    <>
      {updateFormOpen && showUpdate && taskIdBeingEdited === task._id && (
        <div className='mx-auto flex flex-col items-center'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-2  w-full'>
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

            <select
              {...register("priority", { required: true })}
              className='rounded-md px-3 py-2 focus:outline-none'
            >
              <option value={"basic"}>Basic</option>
              <option value={"standard"}>Standard</option>
              <option value={"urgent"}>Urgent</option>
            </select>
            <input
              {...register("deadline", { required: true })}
              type='date'
              className='rounded-md px-3 py-2 focus:outline-none '
            />

            <div className='flex gap-x-2'>
              <button
                type='submit'
                className='w-full bg-gradient-to-l from-cyan-600/20 to-blue-600/30 py-1 px-5 rounded-full text-white font-semibold'
              >
                Add Task
              </button>
            </div>
          </form>
          <button
            onClick={() => {
              setUpdateFormOpen(false);
            }}
            className='w-full bg-white/60 text-black font-semibold px-5 py-1 rounded-full'
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateTask;
