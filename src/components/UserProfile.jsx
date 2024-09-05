import React from 'react'
import { User } from 'lucide-react'

export default function UserProfile() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-indigo-100 rounded-full p-3">
          <User className="h-16 w-16 text-indigo-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800">John Doe</h2>
      <p className="text-gray-600 text-center mb-6">Fitness Enthusiast</p>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-indigo-600">23</p>
          <p className="text-gray-600">Age</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-indigo-600">65kg</p>
          <p className="text-gray-600">weight</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-indigo-600">5'10"</p>
          <p className="text-gray-600">Hight</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-indigo-600"> Weight Gain</p>
          <p className="text-gray-600">Fitness goals</p>
        </div>
      </div>
    </div>
  )
}