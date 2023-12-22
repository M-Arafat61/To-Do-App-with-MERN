import useAuth from "../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
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
        onClick={handleGoogleSignIn}
        className='gap-x-2 border p-1 border-black rounded-full flex justify-center items-center w-full'
      >
        <FaGoogle className='text-xl' />
        <p>Google</p>
      </button>
    </div>
  );
};

export default SocialLogin;
