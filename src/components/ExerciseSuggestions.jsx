import React from 'react';
import { Plus, Dumbbell, Activity, RefreshCw, Check, Heart, Weight, RefreshCcw, BicepsFlexed } from 'lucide-react';
import conf from '../conf/conf';
import service from '../Appwrite/config';
import authService from '../Appwrite/auth';

export default function ExerciseSuggestions() {

  const [suggestions, setSuggestions] = React.useState(null); // Suggestions state
  const [checkedState, setCheckedState] = React.useState([]); // Checked state for exercises
  const [hasData, setHasData] = React.useState(true); // To track if we have enough data

  const getExercisesByMuscle = async (muscle) => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': `${conf.exerciseApiNinja}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.length === 0) {
        // If no exercises are returned, set data flag to false
        setHasData(false);
      } else {
        // Shuffle and select 3 random exercises
        const shuffled = result.sort(() => 0.5 - Math.random());
        const randomThreeExercises = shuffled.slice(0, 3);
        setSuggestions(randomThreeExercises);
        setHasData(true); // We have data, so reset the flag
      }

    } catch (error) {
      console.error('Error:', error.message);
      setHasData(false); // Set flag to false on error
    }
  };

  const getData = async (userID) => {
    try {
      const getWorkout = await service.getAllWorkoutHistory(userID);
      if (getWorkout && getWorkout.documents.length > 0) {
        // Sort the workout history by Date (most recent first)
        const recentWorkout = getWorkout.documents.reduce((mostRecent, currentWorkout) => {
          return new Date(currentWorkout.Date) > new Date(mostRecent.Date)
            ? currentWorkout
            : mostRecent;
        });

        switch (recentWorkout.Workout.toLowerCase()) {
          case "tricep":
            getExercisesByMuscle("triceps");
            break;
          case "lower back":
          case "back":
            getExercisesByMuscle("lower_back");
            break;
          case "middle back":
            getExercisesByMuscle("middle_back");
            break;
          default:
            getExercisesByMuscle(recentWorkout.Workout);
            break;
        }
        

      } else {
        setHasData(false); // No workout data found
        console.log('No workout data found!');
      }
    } catch (error) {
      console.log(error);
      setHasData(false); // Handle error
    }
  };

  // Icon mapping based on exercise type
  const getExerciseIcon = (type) => {
    switch (type) {
      case 'strength':
        return <Dumbbell className="w-6 h-6 text-indigo-600 mr-3" />;
      case 'cardio':
        return <RefreshCcw className="w-6 h-6 text-indigo-600 mr-3" />;
      case 'stretching':
        return <RefreshCw className="w-6 h-6 text-indigo-600 mr-3" />;
      case 'Aerobic':
        return <Heart className="w-6 h-6 text-indigo-600 mr-3" />;
      case 'powerlifting':
        return <Weight className="w-6 h-6 text-indigo-600 mr-3" />;
        case 'strongman':
        return <BicepsFlexed className="w-6 h-6 text-indigo-600 mr-3" />;

        
      default:
        return <Activity className="w-6 h-6 text-indigo-600 mr-3" />;
    }
  };

  // Update checkedState when suggestions are updated
  React.useEffect(() => {
    if (suggestions) {
      setCheckedState(new Array(suggestions.length).fill(false));
    }
  }, [suggestions]);

  // Toggle the specific exercise's checked state
  const handleToggle = (index) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  React.useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        getData(currentUser.$id);
      } else {
        console.log("current user not found!");
        setHasData(false); // No current user
      }
    };
    getCurrentUser();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Exercise Suggestions</h2>
      {!hasData ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-2xl font-bold text-gray-400 text-center">Not enough data available.</p>
        </div>
      ) : suggestions ? (
        <div className="space-y-4">
          {suggestions.map((exercise, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                {getExerciseIcon(exercise.type)}
                <div>
                  <p className="font-semibold text-gray-800">{exercise.name}</p>
                  <p className="text-sm text-gray-600">{exercise.type}</p>
                </div>
              </div>
              <button
                onClick={() => handleToggle(index)}
                className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                {checkedState[index] ? (
                  <Check className="h-6 w-6 text-green-500" />
                ) : (
                  <Plus className="h-6 w-6" />
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading exercises...</p>
      )}
    </div>
  );
}
