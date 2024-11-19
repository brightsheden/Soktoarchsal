import React, { useEffect, useState } from "react";
import { useRegister } from "../ApiHook";
import { Alert } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message,setMessage] =useState('')

  const {mutate, isError,error, isLoading, isSuccess} = useRegister()

const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess){
        navigate('/admin')


    }

  },[isSuccess,navigate])
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform form validation
    const isUsernameValid = /^[a-zA-Z0-9]{3,20}$/.test(username);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isMobileValid = /^\+234\d{10}$/.test(mobile);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    if(password != confirmPassword){
        setMessage("Password doesnot match")
    }

    mutate({username, email, mobile, password})


  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/img4.jpeg')",
        }}
      ></div>

      {/* Right Section - Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="w-3/4 max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            {message && (<Alert>{message}</Alert>)}
            {isError && (<Alert color="red">{error.response.data.error || error.response.data.details || error.message }</Alert>)}
            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Number Input */}
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>


            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="confirmpassword" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            {isLoading ? ( <button
            disabled
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"

            >
              loading...
            </button>): (
                          <button

                          type="submit"
                          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            
                        >
                          Register
                        </button>
            )}
  
          </form>

          {/* Already have an account */}
          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;