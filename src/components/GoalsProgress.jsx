import React from 'react'
import { Target, Footprints, Clock } from 'lucide-react'
import authService from '../Appwrite/auth'
import service from '../Appwrite/config'
import conf from '../conf/Conf'

export default function GoalsProgress({ 
  title="n/a",
  
 }) {


  const getUserData =  async()=>{
    try {
      const currentUser =  await authService.getCurrentUser() //get the user id
      if(currentUser) {
        const existingUserData = await service.getUserInformation(conf.appwriteDailyGoalsCollectionId, currentUser.$id)

        if(existingUserData){
          console.log("daily goal data",existingUserData)
        }
        else{
          alert("data is not found")
        }

      }
      
    } catch (error) {
      console.log(error)
      
    }
  }

  React.useEffect(()=>{
    getUserData()
  })


  const goals = [
    { name: 'Calories Burned', current: 1200, target: 1500, icon: Target },
    { name: 'Steps Taken', current: 8500, target: 10000, icon: Footprints },
    { name: 'Workout Time', current: 45, target: 60, icon: Clock },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.name} className="flex items-center">
            <goal.icon className="w-5 h-5 text-indigo-600 mr-2" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{goal.name}</span>
                <span className="text-gray-600">{goal.current}/{goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}