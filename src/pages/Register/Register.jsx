import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/Shared/SocialLogin";
import toast from "react-hot-toast";
import { axiosPublic } from "../../hooks/useAxiosPublic";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = data => {
    createUser(data.email, data.password)
      .then(() => {
        // console.log(res.user);
        updateUserProfile(data.name, data.photo)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              createdAt: new Date(),
              role: "member",
            };
            //
            axiosPublic.post("/users", userInfo).then(res => {
              if (res.data.insertedId) {
                console.log("user updated to db");
                reset();
                navigate(from, { replace: true });
                toast.success("Account created successfully! 🥀");
              }
            });
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        toast.error(`${error.message}`);
      });
  };

  return (
    <div className='container mx-auto w-3/4 lg:w-3/5 overflow-hidden my-12 md:my-24 '>
      <div className='border px-3 md:px-12 lg:px-20 py-10 md:py-12 lg:py-14 rounded-2xl space-y-10'>
        <h2 className='text-2xl text-white md:text-3xl font-semibold text-center'>
          Task Management Sign Up
        </h2>
        <SocialLogin />
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
          {/* name field */}
          <div className=''>
            <input
              type='text'
              autoFocus
              {...register("name", { required: true })}
              placeholder='Full name'
              className='input text-xs sm:text-base text-white border border-gray-300 px-3 py-2 outline-none'
            />

            {errors.name?.type === "required" && (
              <p className='text-red-500 ml-4' role='alert'>
                Name is required
              </p>
            )}
          </div>
          {/* photo url */}
          <div className=''>
            <input
              type='text'
              {...register("photo", { required: true })}
              placeholder='Photo url'
              className='input text-white text-xs sm:text-base border border-gray-300 px-3 py-2 outline-none'
            />
            {errors.photo?.type === "required" && (
              <p className='text-red-500 ml-4' role='alert'>
                Photo url is required
              </p>
            )}
          </div>
          {/* mail field */}
          <div className=''>
            <input
              type='email'
              {...register("email", {
                required: "Email Address is required",
              })}
              placeholder='Email'
              className='input text-white text-xs sm:text-base border border-gray-300 px-3 py-2 outline-none'
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
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              placeholder='Choose a password'
              className='input text-white text-xs sm:text-base border border-gray-300 px-3 py-2 outline-none'
            />
            {errors.password?.type === "required" && (
              <p className='text-red-600 ml-4'>Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className='text-red-500  ml-4' role='alert'>
                Password must be 6 characters or long
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className='text-red-600 ml-4'>
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className='text-red-600 ml-4'>
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
          </div>
          {/* register button */}
          <div className='form-control'>
            <button
              type='submit'
              className='text-xs sm:text-base group relative overflow-hidden py-2 rounded-2xl bg-blue-500 font-semibold text-white'
            >
              Register
              <div className='absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30'></div>
            </button>
          </div>
          <div className='space-x-2 flex justify-start'>
            <div className='text-xs sm:text-base flex-shrink'>
              Already have an account?
              <Link to='/login'>
                <span className='inline-flex text-xs sm:text-base underline text-blue-500 font-bold'>
                  Login
                </span>
              </Link>
            </div>
          </div>
        </form>
        {/* login page redirect */}
      </div>
    </div>
  );
};

export default Register;
