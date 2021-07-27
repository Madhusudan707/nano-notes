import "./login.module.css";
import { useLogin } from "../../hooks";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts";

export const Login = () => {
  const { loginUser, setEmail, setPassword, errorMsg, firebaseServerError } =
    useLogin();
  const { isLoading } = useAuth();

  return (
    <div className="lg:h-screen lg:mt-0 mt-12 flex items-center justify-center w-full  ">
      <div className="h-auto lg:w-1/4 w-3/4 text-white  rounded-lg relative text-center  lg:border lg:border-gray-300">
        <div>
        <div className='flex items-center justify-center w-full'><img src='icon-192x192.png' className='lg:w-24 lg:h-24 w-16 h-16' alt='logo'/></div> 
          <h1 className=" lg:text-5xl text-3xl p-4 w-full  font-bold">
            NANO NOTES
          </h1>
        
          <span className="text-2xl">Sign in</span>
        </div>
        <div className="text-red-500 mt-8">
          {firebaseServerError && <span>{firebaseServerError}</span>}
          {errorMsg && <span className="text-red-500">{errorMsg}</span>}
        </div>
        <div className="flex flex-col  mt-12">
          <div className="flex justify-center w-full">
            <label>
              <input
                type="email"
                className="text-black border p-2 py-4 lg:w-96 w-80 focus:outline-none focus:border-blue-500"
                defaultValue="mad@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p className="ml-1 placeholder ">Email</p>
            </label>
          </div>

          <div className="flex justify-center mt-12 w-full">
            <label>
              <input
                type="password"
                defaultValue="12345678"
                className="border text-black  p-2 py-4 lg:w-96 w-80 focus:outline-none focus:border-blue-500"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <p className="ml-1 placeholder ">Password</p>
            </label>
          </div>

          <div className="flex justify-center mt-4 w-full">
            <a href="!#" className=" text-1xl hover:text-blue-500">
              Forget Password?
            </a>
          </div>
          <div className="flex justify-center mt-16 mb-8 w-full">
            <button
              className="text-2xl p-4 bg-blue-500 lg:w-96 w-72 text-white focus:outline-none focus:bg-gray-500"
              onClick={loginUser}
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "SIGN IN"
              )}
            </button>
          </div>
          <div className="flex justify-center  mb-8 w-full">
            <span>
              Not registered?{" "}
              <Link to="/register" className="hover:text-blue-500">
                Create an account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
