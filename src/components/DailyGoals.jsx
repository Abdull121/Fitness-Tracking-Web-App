import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Flame, Footprints, Clock } from "lucide-react";
import service from "../Appwrite/config";

import authService from '../Appwrite/auth'

import conf from "../conf/Conf";


function DailyGoals({
  tittle = "Daily Goals",
  TargetCalories = 1000,
  burnedCalories = 500,
  currentSteps = 300,
  TotalSteps = 700,
  spendWorkout = 45,
  workoutTime = 60,
}) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      caloriesBurned: burnedCalories,
      outOfCaloriesBurned: TargetCalories,
      stepsTaken: currentSteps,
      targetSteps: TotalSteps,
      SpendWorkoutTime: spendWorkout,
      outOfWorkoutTime: workoutTime,
    },
  });

  const [button, setButton]= React.useState(false)


  const handleData=  async(data)=>{
    try {
      // Send data to backend
      // console.log(data)
      
     
      const currentUser =  await authService.getCurrentUser() //get the user id
      if(currentUser) {
        const existingUserData = await service.getUserInformation(conf.appwriteDailyGoalsCollectionId, currentUser.$id)

        if(existingUserData){

          setButton(true)  //update show in the button

          if(data){
            const updateGoals =  await service.updateGoals(currentUser.$id,{...data})
            if(updateGoals){
              alert("Daily Goal is Updated!")
              
            }
            else{
              alert("Failed to updated Goals!")
  
            }


          }

         

        }

        else{

          //set new goals

          setButton(false) // Add show in the button

          if(data){

            const progressAdd =   await service.DailyGoals(currentUser.$id,{...data})
            if(progressAdd){
              alert("Daily goals Added")
            }
            else{
              alert("Daily goals not Added")
            }
    
            console.log("data is ::", progressAdd )
            
          }

       
        }

        

      }

    
    
  } catch (error) {
    console.log(error)
  }
  }




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

    if (data.SpendWorkoutTime > data.outOfWorkoutTime) {
      setValue("SpendWorkoutTime", data.outOfWorkoutTime);
      alert(
        "Spend workout time cannot exceed out of workout time. Adjusting value."
      );
      return;
    }

    console.log("Progress updated:", data);


    // send  data  to backend 

        handleData(data)

    

   
  };

  const caloriesBurned = watch("caloriesBurned");
  const outOfCaloriesBurned = watch("outOfCaloriesBurned");
  const stepsTaken = watch("stepsTaken");
  const targetSteps = watch("targetSteps");
  const SpendWorkoutTime = watch("SpendWorkoutTime");
  const outOfWorkoutTime = watch("outOfWorkoutTime");

  // Memoize calculations to prevent unnecessary rerenders
  const caloriesProgress = useMemo(
    () => Math.min((caloriesBurned / outOfCaloriesBurned) * 100, 100),
    [caloriesBurned, outOfCaloriesBurned]
  );
  const stepsProgress = useMemo(
    () => Math.min((stepsTaken / targetSteps) * 100, 100),
    [stepsTaken, targetSteps]
  );
  const workoutProgress = useMemo(
    () =>
      outOfWorkoutTime > 0
        ? Math.min((SpendWorkoutTime / outOfWorkoutTime) * 100, 100)
        : 0,
    [SpendWorkoutTime, outOfWorkoutTime]
  );

  // Validate steps, calories and time inputs
  React.useEffect(()=>{

    handleData()

  },[])

  React.useEffect(() => {

   

    if (stepsTaken > targetSteps) {
      setError("stepsTaken", {
        type: "manual",
        message: "Steps cannot exceed the target Steps",
      });
    } else {
      clearErrors("stepsTaken");
    }
    if (caloriesBurned > outOfCaloriesBurned) {
      setError("caloriesBurned", {
        type: "value",
        message: "calories Burned  cannot exceed the out of Burned calories",
      });
    } else {
      clearErrors("caloriesBurned");
    }
    if (SpendWorkoutTime > outOfWorkoutTime) {
      setError("SpendWorkoutTime", {
        type: "manual",
        message: "Workout time cannot exceed the total workout time",
      });
    } else {
      clearErrors("SpendWorkoutTime");
    }
  }, [
    stepsTaken,
    targetSteps,
    SpendWorkoutTime,
    outOfWorkoutTime,
    caloriesBurned,
    outOfCaloriesBurned,
    setError,
    clearErrors,
  ]);

  return (
    <div className="w-full max-w-6xl mt-10 mx-auto bg-white p-6 rounded-lg shadow-xl overflow-hidden">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">{tittle}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="caloriesBurned"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
            <p className="mt-1 text-sm text-red-500">
              {errors.caloriesBurned.message}
            </p>
          )}
        </div>

        {/* out of calories Burned input field */}
        <div>
          <label
            htmlFor="outOfCaloriesBurned"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <Flame className="inline-block mr-2 h-5 w-5 text-blue-500" />
            out of Calories Burned:
          </label>
          <input
            type="number"
            id="outOfCaloriesBurned"
            {...register("outOfCaloriesBurned", {
              required: "out of Calories burned is required",
              min: {
                value: 0,
                message: " out of Calories must be a positive number",
              },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-2">
            <div className="text-sm font-medium text-gray-700 mb-1">
              calories Progress:
            </div>
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
              {caloriesBurned}/{outOfCaloriesBurned}kcals
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="stepsTaken"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <Footprints className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Steps Taken :
          </label>
          <input
            type="number"
            id="stepsTaken"
            {...register("stepsTaken", {
              required: "Steps Taken is required",
              min: { value: 1, message: "Steps must be a positive number" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.stepsTaken && (
            <p className="mt-1 text-sm text-red-500">
              {errors.stepsTaken.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="targetSteps"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <Footprints className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Steps Target:
          </label>
          <input
            type="number"
            id="targetSteps"
            {...register("targetSteps", {
              required: "Steps target is required",
              min: {
                value: 1,
                message: "Steps target must be a positive number",
              },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.targetSteps && (
            <p className="mt-1 text-sm text-red-500">
              {errors.targetSteps.message}
            </p>
          )}
        </div>

        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">
            Steps Progress:
          </div>
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

        <div>
          <label
            htmlFor="SpendWorkoutTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <Clock className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Spend Workout Time (minutes):
          </label>
          <input
            type="number"
            id="SpendWorkoutTime"
            {...register("SpendWorkoutTime", {
              required: "Workout time is required",
              min: {
                value: 1,
                message: "Workout time must be a positive number",
              },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.SpendWorkoutTime && (
            <p className="mt-1 text-sm text-red-500">
              {errors.SpendWorkoutTime.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="outOfWorkoutTime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            <Clock className="inline-block mr-2 h-5 w-5 text-blue-500" />
            Out of Workout Time (minutes):
          </label>
          <input
            type="number"
            id="outOfWorkoutTime"
            {...register("outOfWorkoutTime", {
              required: "Total workout time is required",
              min: {
                value: 0,
                message: "Workout time must be a positive number",
              },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.outOfWorkoutTime && (
            <p className="mt-1 text-sm text-red-500">
              {errors.outOfWorkoutTime.message}
            </p>
          )}
        </div>

        <div className="mt-2">
          <div className="text-sm font-medium text-gray-700 mb-1">
            Workout Time Progress:
          </div>
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
            {SpendWorkoutTime}/{outOfWorkoutTime} minutes
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          {button ? "Update Progress":"Add Progress"}
            
          </button>
        </div>
      </form>
    </div>
  );
}

export default DailyGoals;
