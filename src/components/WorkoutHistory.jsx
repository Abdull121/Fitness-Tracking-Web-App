import React from 'react'
import { Calendar, Clock, Flame } from 'lucide-react'

export default function WorkoutHistory() {
  const workouts = [
    { date: '2023-04-01', workout: 'Strength Training', duration: '60 mins', calories: '450 kcal' },
    { date: '2023-03-30', workout: 'Cardio', duration: '45 mins', calories: '350 kcal' },
    { date: '2023-03-28', workout: 'Yoga', duration: '75 mins', calories: '250 kcal' },
    { date: '2023-03-25', workout: 'HIIT', duration: '30 mins', calories: '300 kcal' },
    { date: '2023-03-22', workout: 'Strength Training', duration: '90 mins', calories: '550 kcal' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Workout History</h2>
      <table className="w-full min-w-max table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 border-b">
            <th className="py-2 px-4 font-semibold">Date</th>
            <th className="py-2 px-4 font-semibold">Workout</th>
            <th className="py-2 px-4 font-semibold">Duration</th>
            <th className="py-2 px-4 font-semibold">Calories</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-indigo-600 mr-2" />
                  {workout.date}
                </div>
              </td>
              <td className="py-2 px-4">{workout.workout}</td>
              <td className="py-2 px-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-indigo-600 mr-2" />
                  {workout.duration}
                </div>
              </td>
              <td className="py-2 px-4">
                <div className="flex items-center">
                  <Flame className="w-4 h-4 text-indigo-600 mr-2" />
                  {workout.calories}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
