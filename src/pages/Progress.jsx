import React from 'react'
import DailyGoals from '../components/DailyGoals'

function Progress() {
  return (
    <div>

      <DailyGoals
          tittle="Daily Goals"
          burnedCalories= "300"
          TargetCalories="500"
          currentSteps= "250"
          TotalSteps= "600"
          spendWorkout= "45"
          workoutTime="60" 

      />


      <DailyGoals
          tittle="weekly Goals"
          burnedCalories= "800"
          TargetCalories="1500"
          currentSteps= "1000"
          TotalSteps= "1600"
          spendWorkout= "150"
          workoutTime="300" 

      />

    </div>
    

    
  )
}

export default Progress
