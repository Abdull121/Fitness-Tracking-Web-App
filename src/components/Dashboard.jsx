import React, { useState } from 'react'
import { Home, Dumbbell, BarChart2, Clock, Settings, Menu, X } from 'lucide-react'
import UserProfile from './UserProfile'
import GoalsProgress from './GoalsProgress'
import WorkoutHistory from './WorkoutHistory'
import ProgressCharts from './ProgressCharts'
import ExerciseSuggestions from './ExerciseSuggestions'

import SideBar from './SideBar/SideBar'

export default function Dashboard() {



  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      

      {/* Main Content */}
      <main className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          {/* <SideBar/> */}
          

          {/* Dashboard Content */}
          <div className="flex-1 space-y-8 mt-8 md:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <UserProfile />
              <GoalsProgress title="Daily Goals" />
              <GoalsProgress title="Weekly Goals" />
            </div>
            <WorkoutHistory />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProgressCharts />
              <ProgressCharts />
              <ExerciseSuggestions />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      
    </div>
  )
}