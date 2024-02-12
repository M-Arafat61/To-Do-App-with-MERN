import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        console.log(result);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          createdAt: new Date(),
          role: "member",
        };
        axiosPublic.post("/users", userInfo).then(res => {
          console.log(res.data);
          navigate(from, { replace: true });
          toast.success("Login Successful 👍");
        });
      })
      .catch(error => {
        toast.error(`${error.message}`);
      });
  };
  return (
    <div>
      <button
        type='button'
        onClick={handleGoogleSignIn}
        className='btn btn-outline bg-[#2111ff] text-white w-full rounded-md overflow-hidden text-xs sm:text-lg font-bold'
      >
        <FcGoogle className='text-xl' /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
