import React from 'react'
import { Plus, Dumbbell, Activity, RefreshCw, Check } from 'lucide-react'

export default function ExerciseSuggestions() {
  const exercises = [
    { name: 'Dumbbell Bicep Curls', type: 'Strength Training', icon: Dumbbell },
    { name: 'Jumping Jacks', type: 'Cardio', icon: Activity },
    { name: 'Yoga Sun Salutation', type: 'Flexibility', icon: RefreshCw },
  ];

  // Initialize an array of false values to track which exercises are checked
  const [checkedState, setCheckedState] = React.useState(
    new Array(exercises.length).fill(false)
  );

  // Toggle the specific exercise's checked state
  const handleToggle = (index) => {
    console.log(index)
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };



  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Exercise Suggestions</h2>
      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <exercise.icon className="w-6 h-6 text-indigo-600 mr-3" />
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
    </div>
  );
}
