import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/Shared/Container";
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
    <Container>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-amber-400/25 px-10 py-5'>
          <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
            {/* name field */}
            <div className=''>
              <label>
                <span className=''>Full name</span>
              </label>
              <input
                type='text'
                {...register("name", { required: true })}
                placeholder='Full Name'
                className='input'
              />
              {errors.name?.type === "required" && (
                <p className='text-red-500 ml-4' role='alert'>
                  Name is required
                </p>
              )}
            </div>
            {/* photo url */}
            <div className=''>
              <label>
                <span className=''>Photo URL</span>
              </label>
              <input
                type='text'
                {...register("photo", { required: true })}
                placeholder='Photo url'
                className='input'
              />
              {errors.photo?.type === "required" && (
                <p className='text-red-500 ml-4' role='alert'>
                  Photo url is required
                </p>
              )}
            </div>
            {/* mail field */}
            <div className=''>
              <label>
                <span className=''>Email</span>
              </label>
              <input
                type='email'
                {...register("email", {
                  required: "Email Address is required",
                })}
                placeholder='Email'
                className='input'
              />

              {errors.email && (
                <p className='text-red-500 ml-4' role='alert'>
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* password field */}
            <div className=''>
              <label>
                <span className=''>Password</span>
              </label>
              <input
                type='password'
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                placeholder='Choose a password'
                className='input'
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
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>
            {/* register button */}
            <div className=' mt-6'>
              <button
                type='submit'
                className='px-4 py-1  bg-white rounded-xl overflow-hidden  font-semibold '
              >
                Register
              </button>
            </div>
          </form>
          {/* login page redirect */}
          <div className=' mt-3 mb-1 text-center text-lg'>
            <div className=''>
              Already registered? Please
              <span>
                <Link className='underline ml-1' to='/login'>
                  Login
                </Link>
              </span>
              <p>Or register with</p>
            </div>
          </div>
          <SocialLogin />
        </div>
      </div>
    </Container>
  );
};

export default Register;
