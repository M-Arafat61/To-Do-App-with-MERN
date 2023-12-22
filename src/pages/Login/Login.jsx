import { useForm } from "react-hook-form";
import Container from "../../components/Shared/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../../components/Shared/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
    <Container>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-amber-400/25 px-10 py-5'>
          <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
            {/* mail field */}
            <div className=''>
              <label className=''>
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
                })}
                placeholder='Password'
                className='input'
              />
              {errors.password?.type === "required" && (
                <p className='text-red-600 ml-4'>Password is required</p>
              )}
            </div>

            <div className=' mt-6'>
              <button
                type='submit'
                className='px-4 py-1  bg-white rounded-xl overflow-hidden  font-semibold '
              >
                Sign In
              </button>
            </div>
            <div className=' mt-2 text-center space-y-1 text-lg'>
              <div className=''>
                New here?
                <span>
                  <Link className='underline ml-1 mr-1' to='/register'>
                    register
                  </Link>
                  a New Account
                </span>
              </div>
              <p>Or sign in with</p>
            </div>
          </form>
          <SocialLogin />
        </div>
      </div>
    </Container>
  );
};

export default Login;
