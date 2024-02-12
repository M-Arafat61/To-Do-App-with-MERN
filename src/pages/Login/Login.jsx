import { useForm } from "react-hook-form";
import Container from "../../components/Shared/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../../components/Shared/SocialLogin";
import { useEffect } from "react";

const Login = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (user?.email) {
      return navigate("/");
    }
  }, [user?.email, navigate]);
  const { signIn } = useAuth();
  const onSubmit = async data => {
    const email = data.email;
    const password = data.password;
    await signIn(email, password)
      .then(res => {
        console.log(res.user);
        navigate(from, { replace: true });
        toast.success("Login successful 👍");
      })
      .catch(error => {
        toast.error(`${error}`);
        console.log(error);
      });
  };
  return (
    <div className='container mx-auto my-10 md:my-14 px-3 '>
      <div className='w-full mx-auto lg:w-3/4 border rounded-2xl overflow-hidden md:px-12 lg:px-20 py-10 md:py-12 lg:py-14  space-y-6'>
        <div className='text-center'>
          <h1 className='text-2xl md:text-3xl font-semibold mb-5 text-white'>
            Log in to Task Management
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='card-body space-y-5'>
          <SocialLogin />
          {/* mail field */}
          <div className=''>
            <input
              type='email'
              {...register("email", {
                required: "Email Address is required",
              })}
              placeholder='Email'
              className='input border border-gray-300 px-3 py-2 outline-none'
            />

            {errors.email && (
              <p className='text-red-500 ml-4' role='alert'>
                {errors.email.message}
              </p>
            )}
          </div>
          {/* password field */}
          <div className=''>
            <input
              type='password'
              {...register("password", {
                required: true,
              })}
              placeholder='Password'
              className='input border border-gray-300 px-3 py-2 outline-none'
            />
            {errors.password?.type === "required" && (
              <p className='text-red-600 ml-4'>Password is required</p>
            )}
          </div>

          <div className=' mt-6'>
            <button
              type='submit'
              className='border py-2 bg-[#2111ff] w-full text-white rounded-xl overflow-hidden  font-semibold '
            >
              Sign In
            </button>
          </div>
          <div className='form-control space-y-5'>
            <div className='flex justify-between items-center'>
              <span className='w-full border border-[#2111ff]'></span>
              <span className='text-xs text-white sm:text-base text-nowrap px-2'>
                Do not have an account?
              </span>
              <span className='w-full border border-[#2111ff]'></span>
            </div>
            <Link to='/register' className='w-full mx-auto'>
              <button className='flex text-white font-semibold mx-auto justify-center w-full sm:w-1/2 border px-5 py-2 rounded-full border-[#2111ff]'>
                Sign up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
