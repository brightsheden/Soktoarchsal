import React, { useEffect, useState } from "react";
import { useLogin } from "../ApiHook";
import { Hand } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@material-tailwind/react";
import { UserStore } from "../state/store";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {mutate, isLoading, isSuccess,error, isError} = useLogin()
    const userData  = UserStore.useState(s => s.user)
   
    useEffect(()=>{
      console.log(userData, "from user data")
    },[userData])

    const HandleLogin = (e)=>{
        e.preventDefault()
        mutate({email,password})
        console.log(email,password)
        
        setEmail('')
        setPassword('')
    }

    const navigate = useNavigate()

    useEffect(() => {
      if (userData) {
        navigate('/admin');
  
      }
    }, [userData, navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image */}
      <div
        className="w-1/2 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: "url('/images/img3.jpeg')", // Replace with your image path
        }}
      ></div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-3/4 max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-center ">Staff Login</h2>
        <span className="text-sm text-gray-600 text-center">Login to the Admin Pannel</span>
        </div>
        
          <form onSubmit={HandleLogin}>
            {isError && (<Alert>{error?.response?.data?.detail}</Alert>)}


            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Remember Me</span>
                </label>
              </div>
              <a
                href="#"
                className="text-blue-500 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}

            {isLoading ? ( <button
              type="submit"
              disabled
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              loading..
            </button>):
            ( <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Login
              </button>)}
           
          </form>

          {/* Divider */}
          <div className="my-6 text-center text-gray-500">or</div>

          {/* Social Login */}
          <button
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center hover:bg-gray-200"
          >
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12V14.708h-3.056v-3.633H12V8.533c0-3.019 1.826-4.662 4.505-4.662 1.29 0 2.396.096 2.718.14v3.153h-1.865c-1.463 0-1.744.695-1.744 1.712v2.246h3.488l-.454 3.633h-3.034V24h5.957c.731 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"
              />
            </svg>
            Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
