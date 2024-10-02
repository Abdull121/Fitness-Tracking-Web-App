import React from 'react'
import { useForm} from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import Input from './Input'
import { Link,useNavigate } from 'react-router-dom'
import authService from '../Appwrite/auth'


export default function SignInForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showPassword, setShowPassword] = React.useState(false)

  const [error, setError] = React.useState("")
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setError(""); // Clear previous errors
  
    try {
  
      // Attempt to create an account with the provided data
         const response =  await authService.createAccount(data);
         console.log(response)
          navigate("/login")
          
        //  const currentUser =  await authService.getCurrentUser();

        //  console.log("getCurrentuserDATA:: ",currentUser) 


        // if (currentUser) {
        //   console.log('User created and logged in:', currentUser);
        //   navigate("/"); // Redirect to home page
        // } else {
        //   throw new Error("User account was created, but fetching user data failed.");
        // }
       
    } catch (error) {
      console.log("Signup error:", error);
      setError("Signup failed: " + (error.message || "Unknown error"));
    }
  };
  


//   const create = async(data) => {
//     setError("")
//     try {
//         const userData = await authService.createAccount(data)
//         if (userData) {
//             const userData = await authService.getCurrentUser()
//             if(userData) dispatch(login(userData));
//             navigate("/")
//         }
//     } catch (error) {
//         setError(error.message)
//     }
// }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Stay updated on your fitness journey
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">




          <div>

              <Input 
                label="Name: "
                placeholder="Enter your Name"
                type="name"
                {...register("name", {
                    required: "name is Required"
                })}

                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>



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
                {...register("password", { required: "Password is required",
                    minLength:{
                      value:8,
                     message: "Password must be at least 8 characters long"
                    }
                
                
                 })}
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

        
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create account
            </button>
          </div>
          <div className="text-center text-red-600">
              {error && <p>{error}</p>}
          </div>

          <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to = "/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
        </form>

        
      </div>
    </div>
  )
}