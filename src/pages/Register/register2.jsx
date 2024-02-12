const register2 = () => {
  return (
    <div className='my-20 md:my-32 container mx-auto flex flex-col lg:flex-row space-x-10 justify-between items-center'>
      <div className='w-full mx-auto'>
        <img
          className=''
          src='https://i.ibb.co/VCWMv70/10173919-8619.jpg'
          alt=''
        />
      </div>
      <div className='w-full mx-auto lg:w-3/4 border rounded-2xl overflow-hidden px-10 md:px-16 lg:px-24 py-10 md:py-14 lg:py-20'>
        <div className='card '>
          <div className='flex flex-col w-full'>
            <div className='text-center'>
              <h1 className='text-2xl md:text-3xl font-semibold mb-5'>
                Log in to HireMaster{" "}
              </h1>
            </div>
            <div>
              <form className='space-y-4' onSubmit={handleLogin}>
                <div className='form-control'>
                  <input
                    type='email'
                    name='email'
                    placeholder='Your Email'
                    className='border border-gray-300 px-3 py-2 outline-none'
                    required
                  />
                </div>
                <div className='form-control'>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    className='border border-gray-300 px-3 py-2 outline-none'
                    required
                  />
                </div>
                <p className='text-red-500 px-3'>{invalidAuth}</p>
                <div className='form-control'>
                  <button
                    type='submit'
                    className='group relative overflow-hidden py-2 rounded-2xl bg-[#FF3811] font-semibold text-white'
                  >
                    Login
                    <div className='absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30'></div>
                  </button>
                </div>
                <div className='flex justify-center items-center'>
                  <span className='w-full border border-[#FF3811]'></span>
                  <span className='px-4'>Or</span>
                  <span className='w-full border border-[#FF3811]'></span>
                </div>
                <button
                  onClick={handleGoogleSignIn}
                  className='btn btn-outline btn-warning w-full rounded-md overflow-hidden text-xs sm:text-xl  font-bold'
                >
                  <FcGoogle className='text-xl' /> Continue with Google
                </button>
              </form>
              <div className='form-control mt-16 space-y-5'>
                <div className='flex justify-between items-center'>
                  <span className='w-full border border-[#FF3811]'></span>
                  <span className='text-xs sm:text-base w-full text-nowrap px-2'>
                    Do not have an account?
                  </span>
                  <span className='w-full border border-[#FF3811]'></span>
                </div>
                <Link to='/signup' className='w-full mx-auto'>
                  <button className='flex font-semibold mx-auto justify-center w-full sm:w-1/2 border px-5 py-2 rounded-full border-yellow-300'>
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default register2;
