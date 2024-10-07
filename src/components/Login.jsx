import React, { useState } from 'react'
import { useForm} from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Input from './Input'
import { Link ,useNavigate} from 'react-router-dom'
import authService from '../Appwrite/auth'

import { Dumbbell} from 'lucide-react';


export default function SignInForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

   const [error, setError] = useState("")

   const onSubmit = async (data) => {
    setError(""); // Clear any previous error messages
  
    try {
      // console.log('Sign in attempt:', data);
  
      const session = await authService.login(data); 

      //console.log("sessions:: ", session)
  
      if (session) {
        const userData = await authService.getCurrentUser();
       // console.log("user login response:: ",userData)
        
        if (userData) {
          // Navigate to the dashboard if user data exists
          navigate("/");
        } else {
          // If user data is not returned, throw an error
          throw new Error("User not found");
        }
      } else {
        // If session is invalid, set "User not found" error
        setError("User not found");
      }
    } catch (error) {
      // Handle any errors from the login attempt
      console.log("login error:", error);
      
      if (error.message.includes("User not found")) {
        setError("User not found");
      } else {
        setError("Login failed: " + error.message);
      }
    }
  };
  


  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      <div className='flex justify-center items-center'>
          <Dumbbell className="h-14 w-14 mr-3 text-blue-600" />
          <h1 className="text-4xl font-bold text-blue-600">Fitness World</h1>
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Stay updated on your fitness journey
          </p>
        </div>
        <div className="text-center text-red-600">
  {error && <p>{error}</p>}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>

              <Input 
                label="Email: "
                 placeholder="Enter your email"
                type="email"
                autoComplete="email"
                {...register("email", {
                    required: "Email is Required",
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}

                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>


            <div className="relative">
              
              <Input 
                label="password"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
                className="appearance-none relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff className="h-5 w-5 text-gray-500 absolute right-4 top-9 z-10" /> : <FiEye className="h-5 w-5 text-gray-500 absolute right-4 top-9 z-10" />}
              </button>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            New to FitnessApp?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Join now
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}