// /* eslint-disable react/prop-types */
// import React, { useMemo } from "react";
// import { set, useForm } from "react-hook-form";
// import { Flame, Footprints, Clock } from "lucide-react";
// import service from "../Appwrite/config";

// import authService from '../Appwrite/auth'

// import conf from "../conf/Conf";


// function DailyGoals({
//   tittle = "Daily Goals",
//   TargetCalories = 1000,
//   burnedCalories = 500,
//   currentSteps = 300,
//   TotalSteps = 700,
//   spendWorkout = 45,
//   workoutTime = 60,
//   // onProgressUpdate,
 
// }) {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setError,
//     clearErrors,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       caloriesBurned: burnedCalories,
//       outOfCaloriesBurned: TargetCalories,
//       stepsTaken: currentSteps,
//       targetSteps: TotalSteps,
//       SpendWorkoutTime: spendWorkout,
//       outOfWorkoutTime: workoutTime,
//     },
//   });

//   const [button, setButton]= React.useState(false)
//   const [getDailyGoalData, setGetDailyGoalData]=React.useState(null)

//   const [weeklyData,setWeeklyData] = React.useState(null)


//   // const createWeeklyGoal = async(userId)=>{

//   //   console.log("daily Data is here::", getDailyGoalData)

//   //   try {
      
//   //     //create weekly Goals
//   //     const initialWeeklyGoal = {
//   //       caloriesBurned: getDailyGoalData.caloriesBurned,
//   //       outOfCaloriesBurned: getDailyGoalData.outOfCaloriesBurned,
//   //       stepsTaken: getDailyGoalData.stepsTaken,
//   //       targetSteps: getDailyGoalData.targetSteps,
//   //       spendWorkoutTimeMinutes: getDailyGoalData.spendWorkoutTimeMinutes,
//   //       outOfWorkoutTimeMinutes: getDailyGoalData.outOfWorkoutTimeMinutes,
//   //     };
  
  
//   //     const initializeData = await service.weeklyGoals(userId, { ...initialWeeklyGoal });
  
//   //     if (initializeData) {
//   //       setWeeklyData(initializeData);
//   //       console.log("Weekly goals data created successfully", initializeData);
         
//   //     } else {
//   //       console.log("Failed to create weekly goals");
//   //       return null;
//   //     }
      
//   //   } catch (error) {
//   //     console.log(error)
      
//   //   }

//   // }

//   //update weekly Goals



//   const createWeeklyGoal = React.useCallback(async (userId) => {
//     if (!getDailyGoalData) {
//       console.log("Daily goal data is not available yet");
//       return;
//     }

//     try {
//       const initialWeeklyGoal = {
//         caloriesBurned: getDailyGoalData.caloriesBurned,
//         outOfCaloriesBurned: getDailyGoalData.outOfCaloriesBurned,
//         stepsTaken: getDailyGoalData.stepsTaken,
//         targetSteps: getDailyGoalData.targetSteps,
//         spendWorkoutTimeMinutes: getDailyGoalData.spendWorkoutTimeMinutes,
//         outOfWorkoutTimeMinutes: getDailyGoalData.outOfWorkoutTimeMinutes,
//       };

//       const initializeData = await service.weeklyGoals(userId, initialWeeklyGoal);

//       if (initializeData) {
//         setWeeklyData(initializeData);
//         console.log("Weekly goals data created successfully", initializeData);
//       } else {
//         console.log("Failed to create weekly goals");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [getDailyGoalData]);

  

//   const updateWeeklyGoals = React.useCallback (async (userId) => {

//       if (!weeklyData || !getDailyGoalData) {
//         console.log("weeklyData::", weeklyData)
//         console.log("getDailyGoalData::", getDailyGoalData)
//       console.log("Weekly data or daily goal data is not available");
//       return;
//       }

//     try {
      
//       const updatedWeeklyData = {
//         caloriesBurned: weeklyData.caloriesBurned + getDailyGoalData.caloriesBurned,
//         stepsTaken: weeklyData.stepsTaken + getDailyGoalData.stepsTaken,
//         spendWorkoutTimeMinutes: weeklyData.spendWorkoutTimeMinutes + getDailyGoalData.spendWorkoutTimeMinutes,
//       };

//       // Update weekly progress in the backend
//      const updateWeeklyGoals = await service.updateWeeklyGoals(userId, { ...updatedWeeklyData });
//      if(updateWeeklyGoals){
//       alert("weekly Goal is Updated!")
//      }
//     } catch (error) {
//       console.error('Error updating weekly goals:', error);
//     }
//   },[weeklyData, getDailyGoalData]);


//   const handleData= React.useCallback( async(data)=>{
//     try {
//       // Send data to backend
//       // console.log(data)
      
     
//       const currentUser =  await authService.getCurrentUser() //get the user id
//       if(currentUser) {
//         //check is existing "Daily Goal" is present in the Database
//         const existingUserData = await service.getUserInformation(conf.appwriteDailyGoalsCollectionId, currentUser.$id)

//         if(existingUserData){

//           setButton(true)  //update show in the button


//           if(data){
//             const updateGoals =  await service.updateGoals(currentUser.$id,{...data})

            
//             // if(updateGoals){
//             //   alert("Daily Goal is Updated!")

//             //   const exitWeeklyGoal =  await service.getUserInformation(conf.appwriteWeeklyGoalsCollectionId, currentUser.$id )

//             //     if(exitWeeklyGoal){
//             //       updateWeeklyGoals(currentUser.$id)
                  
//             //     }
                
             
              
//             // }
//             // else{
//             //   alert("Failed to updated Goals!")
  
//             // }


//             if (updateGoals) {
//               setGetDailyGoalData(updateGoals);
//               alert("Daily Goal is Updated!");
//               updateWeeklyGoals(currentUser.$id);
//             }


//           }

         

//         }

//         else{

//           //set new goals

//           setButton(false) // Add show in the button

//           if(data){

//               //add Daily Goals
//             const progressAdd =   await service.DailyGoals(currentUser.$id,{...data})
//             if (progressAdd) {
//               setGetDailyGoalData(progressAdd);
//               alert("Daily goals Added");
//               createWeeklyGoal(currentUser.$id);
//             }
//             else{
//               alert("Daily goals not Added")
//             }
    
//             console.log("data is ::", progressAdd )
            
//           }

       
//         }

        

//       }

    
    
//       } catch (error) {
//     console.log(error)
//       }
//   },[updateWeeklyGoals])




//   const onSubmit = async (data) => {
//     if (data.stepsTaken > data.targetSteps) {
//       setValue("stepsTaken", data.targetSteps);
//       alert("Steps taken cannot exceed target Steps. Adjusting value.");
//       return;
//     }

//     if (data.caloriesBurned > data.outOfCaloriesBurned) {
//       setValue("caloriesBurned", data.outOfCaloriesBurned);
//       alert(
//         "calories Burn cannot exceed out of out of calories. Adjusting value."
//       );
//       return;
//     }

//     if (data.SpendWorkoutTime > data.outOfWorkoutTime) {
//       setValue("SpendWorkoutTime", data.outOfWorkoutTime);
//       alert(
//         "Spend workout time cannot exceed out of workout time. Adjusting value."
//       );
//       return;
//     }

//     console.log("Progress updated:", data);


//     // send  data  to backend 

//     await handleData(data);
    

   
//   };

//   const caloriesBurned = watch("caloriesBurned");
//   const outOfCaloriesBurned = watch("outOfCaloriesBurned");
//   const stepsTaken = watch("stepsTaken");
//   const targetSteps = watch("targetSteps");
//   const SpendWorkoutTime = watch("SpendWorkoutTime");
//   const outOfWorkoutTime = watch("outOfWorkoutTime");

//   // Memoize calculations to prevent unnecessary rerenders
//   const caloriesProgress = useMemo(
//     () => Math.min((caloriesBurned / outOfCaloriesBurned) * 100, 100),
//     [caloriesBurned, outOfCaloriesBurned]
//   );
//   const stepsProgress = useMemo(
//     () => Math.min((stepsTaken / targetSteps) * 100, 100),
//     [stepsTaken, targetSteps]
//   );
//   const workoutProgress = useMemo(
//     () =>
//       outOfWorkoutTime > 0
//         ? Math.min((SpendWorkoutTime / outOfWorkoutTime) * 100, 100)
//         : 0,
//     [SpendWorkoutTime, outOfWorkoutTime]
//   );

//   // Validate steps, calories and time inputs
//   React.useEffect(()=>{

//     handleData()

//   },[])

//   React.useEffect(() => {
//     const fetchUserAndInitialize = async () => {
//       try {
//         const currentUser = await authService.getCurrentUser();
//         if (currentUser) {
//           const existingWeeklyData = await service.getUserInformation(conf.appwriteWeeklyGoalsCollectionId, currentUser.$id);
//           if (existingWeeklyData) {
//             setWeeklyData(existingWeeklyData);
//           } else if (getDailyGoalData) {
//             createWeeklyGoal(currentUser.$id);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching user or initializing weekly goals:", error);
//       }
//     };
  
//     fetchUserAndInitialize();
//   }, [getDailyGoalData, createWeeklyGoal]);
  

//   React.useEffect(() => {

   

//     if (stepsTaken > targetSteps) {
//       setError("stepsTaken", {
//         type: "manual",
//         message: "Steps cannot exceed the target Steps",
//       });
//     } else {
//       clearErrors("stepsTaken");
//     }
//     if (caloriesBurned > outOfCaloriesBurned) {
//       setError("caloriesBurned", {
//         type: "value",
//         message: "calories Burned  cannot exceed the out of Burned calories",
//       });
//     } else {
//       clearErrors("caloriesBurned");
//     }
//     if (SpendWorkoutTime > outOfWorkoutTime) {
//       setError("SpendWorkoutTime", {
//         type: "manual",
//         message: "Workout time cannot exceed the total workout time",
//       });
//     } else {
//       clearErrors("SpendWorkoutTime");
//     }
//   }, [
//     stepsTaken,
//     targetSteps,
//     SpendWorkoutTime,
//     outOfWorkoutTime,
//     caloriesBurned,
//     outOfCaloriesBurned,
//     setError,
//     clearErrors,
//   ]);

//   return (
//     <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
//       <h2 className="text-2xl font-bold text-blue-600 mb-6">{tittle}</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label
//             htmlFor="caloriesBurned"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             <Flame className="inline-block mr-2 h-5 w-5 text-blue-500" />
//             Calories Burned:
//           </label>

//           <input
//             type="number"
//             id="caloriesBurned"
//             {...register("caloriesBurned", {
//               required: "Calories burned is required",
//               min: { value: 0, message: "Calories must be a positive number" },
//               valueAsNumber: true,
//             })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.caloriesBurned && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.caloriesBurned.message}
//             </p>
//           )}
//         </div>

//         {/* out of calories Burned input field */}
//         <div>
//           <label
//             htmlFor="outOfCaloriesBurned"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             <Flame className="inline-block mr-2 h-5 w-5 text-blue-500" />
//             out of Calories Burned:
//           </label>
//           <input
//             type="number"
//             id="outOfCaloriesBurned"
//             {...register("outOfCaloriesBurned", {
//               required: "out of Calories burned is required",
//               min: {
//                 value: 0,
//                 message: " out of Calories must be a positive number",
//               },
//               valueAsNumber: true,
//             })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <div className="mt-2">
//             <div className="text-sm font-medium text-gray-700 mb-1">
//               calories Progress:
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div
//                 className="bg-blue-600 h-2.5 rounded-full"
//                 style={{
//                   width: `${caloriesProgress}%`,
//                   transition: "width 0.5s ease-in-out",
//                 }}
//               ></div>
//             </div>
//             <div className="text-sm text-gray-600 mt-1">
//               {caloriesBurned}/{outOfCaloriesBurned}kcals
//             </div>
//           </div>
//         </div>

//         <div>
//           <label
//             htmlFor="stepsTaken"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             <Footprints className="inline-block mr-2 h-5 w-5 text-blue-500" />
//             Steps Taken :
//           </label>
//           <input
//             type="number"
//             id="stepsTaken"
//             {...register("stepsTaken", {
//               required: "Steps Taken is required",
//               min: { value: 1, message: "Steps must be a positive number" },
//               valueAsNumber: true,
//             })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.stepsTaken && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.stepsTaken.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="targetSteps"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             <Footprints className="inline-block mr-2 h-5 w-5 text-blue-500" />
//             Steps Target:
//           </label>
//           <input
//             type="number"
//             id="targetSteps"
//             {...register("targetSteps", {
//               required: "Steps target is required",
//               min: {
//                 value: 1,
//                 message: "Steps target must be a positive number",
//               },
//               valueAsNumber: true,
//             })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.targetSteps && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.targetSteps.message}
//             </p>
//           )}
//         </div>

//         <div className="mt-2">
//           <div className="text-sm font-medium text-gray-700 mb-1">
//             Steps Progress:
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="bg-blue-600 h-2.5 rounded-full"
//               style={{
//                 width: `${stepsProgress}%`,
//                 transition: "width 0.5s ease-in-out",
//               }}
//             ></div>
//           </div>
//           <div className="text-sm text-gray-600 mt-1">
//             {stepsTaken}/{targetSteps}
//           </div>
//         </div>

//         <div>
//           <label
//             htmlFor="SpendWorkoutTime"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             <Clock className="inline-block mr-2 h-5 w-5 text-blue-500" />
//             Spend Workout Time (minutes):
//           </label>
//           <input
//             type="number"
//             id="SpendWorkoutTime"
//             {...register("SpendWorkoutTime", {
//               required: "Workout time is required",
//               min: {
//                 value: 1,
//                 message: "Workout time must be a positive number",
//               },
//               valueAsNumber: true,
//             })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.SpendWorkoutTime && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.SpendWorkoutTime.message}
//             </p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="outOfWorkoutTime"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             <Clock className="inline-block mr-2 h-5 w-5 text-blue-500" />
//             Out of Workout Time (minutes):
//           </label>
//           <input
//             type="number"
//             id="outOfWorkoutTime"
//             {...register("outOfWorkoutTime", {
//               required: "Total workout time is required",
//               min: {
//                 value: 0,
//                 message: "Workout time must be a positive number",
//               },
//               valueAsNumber: true,
//             })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.outOfWorkoutTime && (
//             <p className="mt-1 text-sm text-red-500">
//               {errors.outOfWorkoutTime.message}
//             </p>
//           )}
//         </div>

//         <div className="mt-2">
//           <div className="text-sm font-medium text-gray-700 mb-1">
//             Workout Time Progress:
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="bg-blue-600 h-2.5 rounded-full"
//               style={{
//                 width: `${workoutProgress}%`,
//                 transition: "width 0.5s ease-in-out",
//               }}
//             ></div>
//           </div>
//           <div className="text-sm text-gray-600 mt-1">
//             {SpendWorkoutTime}/{outOfWorkoutTime} minutes
//           </div>
//         </div>

//         <div className="flex justify-end pt-4">
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//           {button ? "Update Progress":"Add Progress"}
            
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default DailyGoals;







import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Flame, Footprints, Clock } from "lucide-react";
import service from "../Appwrite/config";
import authService from '../Appwrite/auth';
import conf from "../conf/Conf";

function DailyGoals({
  title = "Daily Goals",
  defaultTargetCalories = 1000,
  defaultBurnedCalories = 500,
  defaultCurrentSteps = 300,
  defaultTotalSteps = 700,
  defaultSpendWorkout = 45,
  defaultWorkoutTime = 60,
}) {
  const [dailyGoalData, setDailyGoalData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      caloriesBurned: defaultBurnedCalories,
      outOfCaloriesBurned: defaultTargetCalories,
      stepsTaken: defaultCurrentSteps,
      targetSteps: defaultTotalSteps,
      spendWorkoutTime: defaultSpendWorkout,
      outOfWorkoutTime: defaultWorkoutTime,
    },
  });



  const caloriesBurned = watch("caloriesBurned");
  const outOfCaloriesBurned = watch("outOfCaloriesBurned");
  const stepsTaken = watch("stepsTaken");
  const targetSteps = watch("targetSteps");
  const spendWorkoutTime = watch("spendWorkoutTime");
  const outOfWorkoutTime = watch("outOfWorkoutTime");

  const fetchDailyGoals = useCallback(async (userId) => {
    try {
      const existingUserData = await service.getUserInformation(conf.appwriteDailyGoalsCollectionId, userId);
      if (existingUserData) {
        setDailyGoalData(existingUserData);
        setIsUpdating(true);
        
        Object.keys(existingUserData).forEach(key => {
          setValue(key, existingUserData[key]);
          // console.log(existingUserData[key])
        });
      }
    } catch (error) {
      console.error("Error fetching daily goals:", error);
    }
  }, [setValue]);


  const initializeData = async () => {
    const currentUser = await authService.getCurrentUser();
    if (currentUser) {
      await fetchDailyGoals(currentUser.$id);
      console.log("calling..")
    }
  };




  const createOrUpdateWeeklyGoal = useCallback(async (userId, newDailyData) => {
    try {
      let currentWeeklyData = weeklyData;
      if (!currentWeeklyData) {
        currentWeeklyData = await service.getUserInformation(conf.appwriteWeeklyGoalsCollectionId, userId);
      }

      if (currentWeeklyData) {
        // Update existing weekly goal
        const updatedWeeklyData = {
          caloriesBurned: currentWeeklyData.caloriesBurned + newDailyData.caloriesBurned,
          stepsTaken: currentWeeklyData.stepsTaken + newDailyData.stepsTaken,
          spendWorkoutTimeMinutes: currentWeeklyData.spendWorkoutTimeMinutes + newDailyData.spendWorkoutTime,
        };
        const updatedWeeklyGoal = await service.updateWeeklyGoals(userId, updatedWeeklyData);
        setWeeklyData(updatedWeeklyGoal);
      } else {
        // Create new weekly goal
        const initialWeeklyGoal = {
          caloriesBurned: newDailyData.caloriesBurned,
          outOfCaloriesBurned: newDailyData.outOfCaloriesBurned,
          stepsTaken: newDailyData.stepsTaken,
          targetSteps: newDailyData.targetSteps,
          spendWorkoutTimeMinutes: newDailyData.spendWorkoutTime,
          outOfWorkoutTimeMinutes: newDailyData.outOfWorkoutTime,
        };
        const newWeeklyGoal = await service.weeklyGoals(userId, initialWeeklyGoal);
        setWeeklyData(newWeeklyGoal);
      }
    } catch (error) {
      console.error("Error creating/updating weekly goal:", error);
    }
  }, [weeklyData]);

  useEffect(() => {
    // const initializeData = async () => {
    //   const currentUser = await authService.getCurrentUser();
    //   if (currentUser) {
    //     await fetchDailyGoals(currentUser.$id);
    //     console.log("calling..")
    //   }
    // };
    // initializeData();



    const initializeDataOnMount = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        await fetchDailyGoals(currentUser.$id);
      }
    };

    initializeDataOnMount();



  }, [fetchDailyGoals]);





  

  const onSubmit = async (data) => {


    if (data.stepsTaken > data.targetSteps) {
            setValue("stepsTaken", data.targetSteps);
            alert("Steps taken cannot exceed target Steps. Adjusting value.");
            return;
          }
      
          if (data.caloriesBurned > data.outOfCaloriesBurned) {
            setValue("caloriesBurned", data.outOfCaloriesBurned);
            alert(
              "calories Burn cannot exceed out of out of calories. Adjusting value."
            );
            return;
          }
      
          if (data.spendWorkoutTime > data.outOfWorkoutTime) {
            setValue("spendWorkoutTime", data.outOfWorkoutTime);
            alert(
              "Spend workout time cannot exceed out of workout time. Adjusting value."
            );
            return;
          }
    const currentUser = await authService.getCurrentUser();
    if (!currentUser) {
      alert("User not logged in");
      return;
    }

    try {
      let updatedDailyGoal;
      console.log("updating value:", isUpdating)
      if (isUpdating) {
        updatedDailyGoal = await service.updateGoals(currentUser.$id, {...data});
      } else {
        const existingData = await service.getUserInformation(conf.appwriteDailyGoalsCollectionId,currentUser.$id)
        if(!existingData){
          updatedDailyGoal = await service.DailyGoals(currentUser.$id, {...data, SpendWorkoutTime: data.spendWorkoutTime});
          console.log(data)
        }else{
          console.log("Goal daily data is already found! ")
        }
        
      }

      if (updatedDailyGoal) {
        setDailyGoalData(updatedDailyGoal);
        await createOrUpdateWeeklyGoal(currentUser.$id, {...data});
        alert(isUpdating ? "Daily Goal Updated!" : "Daily Goal Added!");

        await initializeData(); 


      } else {
        alert("Failed to update/add Daily Goal");
      }
    } catch (error) {
      console.error("Error updating/adding daily goal:", error);
      alert("An error occurred. Please try again.");
    }
  };




  

  const caloriesProgress = Math.min((caloriesBurned / outOfCaloriesBurned) * 100, 100);
  const stepsProgress = Math.min((stepsTaken / targetSteps) * 100, 100);
  const workoutProgress = outOfWorkoutTime > 0 ? Math.min((spendWorkoutTime / outOfWorkoutTime) * 100, 100) : 0;



  
  React.useEffect(() => {

      
    if (targetSteps < stepsTaken  ) {
      setError("stepsTaken", {
        type: "manual",
        message: "targetSteps cannot be lower than stepsTaken ",
      });
    } else {
      clearErrors("stepsTaken");
    }
    if (outOfCaloriesBurned <  caloriesBurned  ) {
      setError("caloriesBurned", {
        type: "value",
        message: "outOfCaloriesBurned cannot be lower than caloriesBurned",
      });
    } else {
      clearErrors("caloriesBurned");
    }
    if (outOfWorkoutTime < spendWorkoutTime ) {
      setError("spendWorkoutTime", {
        type: "manual",
        message: "Out of Workout Time cannot be lower than spendWorkoutTime ",
      });
    } else {
      clearErrors("spendWorkoutTime");
    }
  }, [
    stepsTaken,
    targetSteps,
    spendWorkoutTime,
    outOfWorkoutTime,
    caloriesBurned,
    outOfCaloriesBurned,
    setError,
    clearErrors,
  ]);



  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Calories Burned Input */}
        <div>
          <label htmlFor="caloriesBurned" className="block text-sm font-medium text-gray-700 mb-1">
            <Flame className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Calories Burned:
          </label>
          <input
            type="number"
            id="caloriesBurned"
            {...register("caloriesBurned", {
              required: "Calories burned is required",
              min: { value: 0, message: "Calories must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.caloriesBurned && (
            <p className="mt-1 text-sm text-red-500">{errors.caloriesBurned.message}</p>
          )}
        </div>

        {/* Out of Calories Burned Input */}
        <div>
          <label htmlFor="outOfCaloriesBurned" className="block text-sm font-medium text-gray-700 mb-1">
            <Flame className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Out of Calories Burned:
          </label>
          <input
            type="number"
            id="outOfCaloriesBurned"
            {...register("outOfCaloriesBurned", {
              required: "Out of Calories burned is required",
              min: { value: 0, message: "Out of Calories must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Calories Progress Bar */}
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">Calories Progress:</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${caloriesProgress}%`,
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {caloriesBurned}/{outOfCaloriesBurned} kcals
          </div>
        </div>

        {/* Steps Taken Input */}
        <div>
          <label htmlFor="stepsTaken" className="block text-sm font-medium text-gray-700 mb-1">
            <Footprints className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Steps Taken:
          </label>
          <input
            type="number"
            id="stepsTaken"
            {...register("stepsTaken", {
              required: "Steps Taken is required",
              min: { value: 0, message: "Steps must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.stepsTaken && (
            <p className="mt-1 text-sm text-red-500">{errors.stepsTaken.message}</p>
          )}
        </div>

        {/* Steps Target Input */}
        <div>
          <label htmlFor="targetSteps" className="block text-sm font-medium text-gray-700 mb-1">
            <Footprints className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Steps Target:
          </label>
          <input
            type="number"
            id="targetSteps"
            {...register("targetSteps", {
              required: "Steps target is required",
              min: { value: 1, message: "Steps target must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.targetSteps && (
            <p className="mt-1 text-sm text-red-500">{errors.targetSteps.message}</p>
          )}
        </div>

        {/* Steps Progress Bar */}
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">Steps Progress:</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${stepsProgress}%`,
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {stepsTaken}/{targetSteps}
          </div>
        </div>

        {/* Spend Workout Time Input */}
        <div>
          <label htmlFor="spendWorkoutTime" className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Spend Workout Time (minutes):
          </label>
          <input
            type="number"
            id="spendWorkoutTime"
            {...register("spendWorkoutTime", {
              required: "Workout time is required",
              min: { value: 0, message: "Workout time must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.spendWorkoutTime && (
            <p className="mt-1 text-sm text-red-500">{errors.spendWorkoutTime.message}</p>
          )}
        </div>

        {/* Out of Workout Time Input */}
        <div>
          <label htmlFor="outOfWorkoutTime" className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Out of Workout Time (minutes):
          </label>
          <input
            type="number"
            id="outOfWorkoutTime"
            {...register("outOfWorkoutTime", {
              required: "Total workout time is required",
              min: { value: 0, message: "Workout time must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.outOfWorkoutTime && (
            <p className="mt-1 text-sm text-red-500">{errors.outOfWorkoutTime.message}</p>
          )}
        </div>

        {/* Workout Time Progress Bar */}
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">Workout Time Progress:</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${workoutProgress}%`,
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {spendWorkoutTime}/{outOfWorkoutTime} minutes
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isUpdating ? "Update Progress" : "Add Progress"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DailyGoals;