import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { RiseLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <RiseLoader className='' color='#001B79' />
      </div>
    );
  }

  if (user?.email) {
    return children;
  }
  return <Navigate state={{ from: location }} to='/login' replace></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
