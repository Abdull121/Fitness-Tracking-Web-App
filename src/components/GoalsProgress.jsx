/* eslint-disable react/prop-types */
// import React, { useState } from 'react'
// import { Target, Footprints, Clock } from 'lucide-react'
// import authService from '../Appwrite/auth'
// import service from '../Appwrite/config'
// import conf from '../conf/Conf'

// export default function GoalsProgress({ 
//   tittle = "n/a",
// }) {
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const getUserData = async () => {
//     try {
//       const currentUser = await authService.getCurrentUser() // Get the user ID
//       if (currentUser) {
//         const existingUserData = await service.getUserInformation(conf.appwriteDailyGoalsCollectionId, currentUser.$id)
//         if (existingUserData) {
//           setData(existingUserData)
//         } else {
//           alert("Data is not found")
//         }
//       }
//       setLoading(false)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   React.useEffect(() => {
//     getUserData()
//   }, [])

//   if (loading) {
//     return <div className="spinner-border text-indigo-600" role="status">
//       <span className="visually-hidden">Loading...</span>
//     </div>
//   }

//   if (!data) {
//     return <div>Data not available</div>
//   }

//   const isWeekly = tittle === "Weekly Goals"
//   const caloriesBurnedTarget = isWeekly ? data.outOfCaloriesBurned * 7 : data.outOfCaloriesBurned
//   const stepsTarget = isWeekly ? data.targetSteps * 7 : data.targetSteps
//   const workoutTimeTarget = isWeekly ? data.outOfWorkoutTimeMinutes * 7 : data.outOfWorkoutTimeMinutes

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-gray-800">{tittle}</h2>
//       <div className="space-y-4">
        
//         {/* Calories Burned */}
//         <div className="flex items-center">
//           <Target className="w-5 h-5 text-indigo-600 mr-2" />
//           <div className="flex-1">
//             <div className="flex justify-between text-sm mb-1">
//               <span className="font-medium text-gray-700">Calories Burned</span>
//               <span className="text-gray-600">{data.caloriesBurned}/{caloriesBurnedTarget}</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div
//                 className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
//                 style={{ width: `${(data.caloriesBurned / caloriesBurnedTarget) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         {/* Steps Taken */}
//         <div className="flex items-center">
//           <Footprints className="w-5 h-5 text-indigo-600 mr-2" />
//           <div className="flex-1">
//             <div className="flex justify-between text-sm mb-1">
//               <span className="font-medium text-gray-700">Steps Taken</span>
//               <span className="text-gray-600">{data.stepsTaken}/{stepsTarget}</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div
//                 className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
//                 style={{ width: `${(data.stepsTaken / stepsTarget) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         {/* Workout Time */}
//         <div className="flex items-center">
//           <Clock className="w-5 h-5 text-indigo-600 mr-2" />
//           <div className="flex-1">
//             <div className="flex justify-between text-sm mb-1">
//               <span className="font-medium text-gray-700">Workout Time</span>
//               <span className="text-gray-600">{data.spendWorkoutTimeMinutes}/{workoutTimeTarget}</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div
//                 className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
//                 style={{ width: `${(data.spendWorkoutTimeMinutes / workoutTimeTarget) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>
        
//       </div>
//     </div>
//   )
// }


import React, { useState, useEffect } from 'react';
import { Target, Footprints, Clock } from 'lucide-react';
import authService from '../Appwrite/auth'; // Auth service to get the current user
import service from '../Appwrite/config';   // Appwrite config for accessing the backend
import conf from '../conf/conf.js';         // Configuration for collection IDs

export default function GoalsProgress({ tittle = "n/a" }) {
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [UpdatedWeeklyData, setUpdatedWeeklyData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create weekly goal if it's missing
  const createWeeklyGoal = async (userId) => {
    try {
      const getDailyGoalData = await service.getUserInformation(
        conf.appwriteDailyGoalsCollectionId,
        userId
      );

      if (!getDailyGoalData) {
        alert("Can't fetch daily goal data! Please add it!");
        console.log("Can't fetch daily goal data! Please add it!")
        return null; // Return null if no data is fetched
      }

      const initialWeeklyGoal = {
        caloriesBurned: 0,
        outOfCaloriesBurned: getDailyGoalData.outOfCaloriesBurned,
        stepsTaken: 0,
        targetSteps: getDailyGoalData.targetSteps,
        spendWorkoutTimeMinutes: 0,
        outOfWorkoutTimeMinutes: getDailyGoalData.outOfWorkoutTimeMinutes,
      };
        if(tittle==="Weekly Goals"){
          const initializeData = await service.weeklyGoals(userId, { ...initialWeeklyGoal });

      if (initializeData) {
        console.log("Weekly goals data created successfully", initializeData);
        return initializeData; // Return the newly created data
      } else {
        console.log("Failed to create weekly goals");
        return null;
      }
        }
      
    } catch (error) {
      console.error('Error creating weekly goal:', error);
      return null;
    }
  };

  // Fetch user data for daily and weekly goals
  const getUserData = async () => {
    try {
      const currentUser = await authService.getCurrentUser();

      if (currentUser) {
        // Fetch daily progress
        const dailyGoals = await service.getUserInformation(
          conf.appwriteDailyGoalsCollectionId,
          currentUser.$id
        );
        if (dailyGoals) {
          setDailyData(dailyGoals);

          // Fetch weekly progress, or create if missing
          let weeklyGoals = await service.getUserInformation(
            conf.appwriteWeeklyGoalsCollectionId,
            currentUser.$id
          );

          if (!weeklyGoals) {
            console.log("Weekly goals not found, creating new ones...");
            weeklyGoals = await createWeeklyGoal(currentUser.$id);
          }
          
          if (weeklyGoals) {
            setWeeklyData(weeklyGoals);
          }
        } else {
          alert("Daily goals not found, please add daily goals.");
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  // Reset weekly goals at the start of a new week
  const resetWeeklyGoals = async () => {
    const currentDay = new Date().getDay(); // Get the current day (0 is Sunday)

    if (currentDay === 0) {
      try {
        const currentUser = await authService.getCurrentUser();
        const resetData = {
          caloriesBurned: 0,
          stepsTaken: 0,
          spendWorkoutTimeMinutes: 0,
        };

        await service.updatedWeeklyData(currentUser.$id, { ...resetData });
        setWeeklyData(resetData); // Reset the state in the UI
      } catch (error) {
        console.error('Error resetting weekly goals:', error);
      }
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    getUserData();
  }, []);

  // Update weekly goals whenever dailyData changes, but only after both are fetched
  useEffect(() => {
    if (dailyData && weeklyData) {
      console.log("daily data:", dailyData);
      console.log("created weekly data:", weeklyData);

      // Update weekly goals with today's progress
  const updateWeeklyGoals = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      const dailyProgress = dailyData;
      const weeklyProgress = weeklyData;

      if (!dailyProgress || !weeklyProgress) {
        console.error('Data is missing.');
        return;
      }

      const updatedWeeklyData = {
        caloriesBurned: weeklyProgress.caloriesBurned + dailyProgress.caloriesBurned,
        stepsTaken: weeklyProgress.stepsTaken + dailyProgress.stepsTaken,
        spendWorkoutTimeMinutes: weeklyProgress.spendWorkoutTimeMinutes + dailyProgress.spendWorkoutTimeMinutes,
      };

      // Update weekly progress in the backend
      await service.updateWeeklyGoals(currentUser.$id, { ...updatedWeeklyData });
      setUpdatedWeeklyData(updatedWeeklyData);
    } catch (error) {
      console.error('Error updating weekly goals:', error);
    }
  };
  updateWeeklyGoals()
      

      
    }
  }, [dailyData, weeklyData]);

  // Check and reset weekly goals at the start of each week
  useEffect(() => {
    resetWeeklyGoals();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  console.log("weekly update data:", UpdatedWeeklyData);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{tittle}</h2>
      <div className="space-y-4">
        {tittle === "Daily Goals" && dailyData && (
          <>
            <GoalItem
              label="Calories Burned"
              icon={<Target className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={dailyData?.caloriesBurned || 0}
              target={dailyData?.outOfCaloriesBurned || 0}
            />
            <GoalItem
              label="Steps Taken"
              icon={<Footprints className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={dailyData?.stepsTaken || 0}
              target={dailyData?.targetSteps || 0}
            />
            <GoalItem
              label="Workout Time"
              icon={<Clock className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={dailyData?.spendWorkoutTimeMinutes || 0}
              target={dailyData?.outOfWorkoutTimeMinutes || 0}
            />
          </>
        )}

        {tittle === "Weekly Goals" && weeklyData && (
          <>
            <GoalItem
              label="Calories Burned"
              icon={<Target className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={UpdatedWeeklyData?.caloriesBurned || 0}
              target={dailyData?.outOfCaloriesBurned * 7 || 0} // Weekly target = daily * 7
            />
            <GoalItem
              label="Steps Taken"
              icon={<Footprints className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={UpdatedWeeklyData?.stepsTaken || 0}
              target={dailyData?.targetSteps * 7 || 0}
            />
            <GoalItem
              label="Workout Time"
              icon={<Clock className="w-5 h-5 text-indigo-600 mr-2" />}
              progress={UpdatedWeeklyData?.spendWorkoutTimeMinutes || 0}
              target={dailyData?.outOfWorkoutTimeMinutes * 7 || 0}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Helper component for rendering progress bars
function GoalItem({ label, icon, progress, target }) {
  return (
    <div className="flex items-center">
      {icon}
      <div className="flex-1">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">{label}</span>
          <span className="text-gray-600">{progress}/{target}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(progress / target) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}