import React from 'react'
import { useForm } from 'react-hook-form'
import { User } from 'lucide-react'

export default function ProfileForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-8 rounded-lg shadow-xl">
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center">
          <User size={64} className="text-indigo-600" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-indigo-700 mb-1">Name:</label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-3 py-2 bg-indigo-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="age" className="block text-sm font-medium text-indigo-700 mb-1">Age:</label>
            <input
              type="number"
              id="age"
              {...register("age", { 
                required: "Age is required", 
                min: { value: 1, message: "Age must be positive" },
                valueAsNumber: true
              })}
              className="w-full px-3 py-2 bg-indigo-200 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="weight" className="block text-sm font-medium text-indigo-700 mb-1">Weight:</label>
            <input
              type="number"
              id="weight"
              {...register("weight", { 
                required: "Weight is required", 
                min: { value: 1, message: "Weight must be positive" },
                valueAsNumber: true
              })}
              className="w-full px-3 py-2 bg-indigo-200 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.weight && <p className="mt-1 text-sm text-red-500">{errors.weight.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-indigo-700 mb-1">Height:</label>
          <input
            type="number"
            id="height"
            {...register("height", { 
              required: "Height is required", 
              min: { value: 1.1, message: "Height must be positive" },
              valueAsNumber: true
            })}
            className="w-full px-3 py-2 bg-indigo-200 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.height && <p className="mt-1 text-sm text-red-500">{errors.height.message}</p>}
        </div>
        <div>
          <label htmlFor="fitnessGoal" className="block text-sm font-medium text-indigo-700 mb-1">Fitness Goal:</label>
          <input
            id="fitnessGoal"
            {...register("fitnessGoal", { required: "Fitness goal is required" })}
            className="w-full px-3 py-2 bg-indigo-200 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fitnessGoal && <p className="mt-1 text-sm text-red-500">{errors.fitnessGoal.message}</p>}
        </div>
        <div className="flex justify-end space-x-4">
          <button 
            type="button" 
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}