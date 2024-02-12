import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./useAuth";

const instance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://task-management-server-coral-chi.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    instance.interceptors.response.use(
      function (response) {
        // console.log("from axios", response);
        return response;
      },
      function (error) {
        console.log("error tracked in the interceptor", error);
        if (error.response.status === 401 || error.response.status === 403) {
          console.log("logout the user");
          logout()
            .then(() => {
              navigate("/login");
            })
            .catch(error => console.log(error));
        }
      }
    );
  }, [logout, navigate]);
  return instance;
};

export default useAxiosSecure;
