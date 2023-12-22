import { NavLink } from "react-router-dom";
import Container from "./Container";
import useAuth from "../../hooks/useAuth";
import { IoPersonCircleOutline } from "react-icons/io5";
import logo from "/logo-todo.png";
import toast from "react-hot-toast";

const Nav = () => {
  const { user, logout } = useAuth();

  const handleLogOut = () => {
    logout()
      .then(() => {
        toast.success("Logout successful!");
      })
      .catch(err => {
        console.log(err);
      });
  };
  const navLinks = (
    <div className='mx-auto flex flex-col gap-x-5 md:flex-row'>
      <div className=''>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          Home
        </NavLink>
      </div>
      <div className=''>
        <NavLink to='/task-management'>Task Management</NavLink>
      </div>
      {user ? (
        <div className=''>
          <NavLink onClick={handleLogOut}>Logout</NavLink>
        </div>
      ) : (
        <div className=''>
          <NavLink to='/login'>Login</NavLink>
        </div>
      )}
    </div>
  );

  return (
    <Container>
      <div className='navbar text-white/80 h-20 text-sm md:text-xl'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost md:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-8 w-10'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box text-start w-36'
            >
              <li>{navLinks}</li>
            </ul>
          </div>
          <div className='w-12 md:w-16'>
            <img src={logo} className='w-full object-cover' alt='' />
          </div>
        </div>
        <div className='navbar-center hidden md:flex'>
          <ul className='flex gap-x-5'>
            <li>{navLinks}</li>
          </ul>
        </div>
        <div className='navbar-end hidden md:flex'>
          <div className='dropdown dropdown-end'>
            {user?.photoURL ? (
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div className='w-10 rounded-full'>
                  <img src={user?.photoURL} alt='' />
                </div>
              </div>
            ) : (
              <button>
                <IoPersonCircleOutline className='text-3xl' />
              </button>
            )}
            <ul
              tabIndex={0}
              className='menu menu-sm items-end dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-36 text-lg hover:bg-white/40'
            >
              {user && (
                <>
                  <li className='mb-2'>{user?.displayName}</li>
                  <li className='mb-2'>{user?.email}</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Nav;
