import React from 'react';
import { Calendar, Clock, Flame } from 'lucide-react';
import service from '../Appwrite/config';
import authService from '../Appwrite/auth';
import { Loader } from 'rsuite';

function WorkoutHistory({
  width = '',
  marginTop = '',
  marginLR = '',
  renderHistory = false,
}) {
  const [workouts, setWorkouts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Date formatting function
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getAllworkout = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        const listWorkout = await service.getAllWorkoutHistory(currentUser.$id);
        if (listWorkout) {
          setWorkouts(listWorkout.documents);
          setLoading(false);
        } else {
          alert('Workout list not found');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getAllworkout();
  }, []);

  const firstFiveHistory = workouts.slice(0, 5);
  const renderWorkout = renderHistory ? workouts : firstFiveHistory;

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md overflow-x-auto ${width} ${marginTop} ${marginLR}`}
    >
      {loading ? (
        <div className="flex justify-center items-center h-full">
        <Loader size="sm" />
        </div>
      ) : (
        <>
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
              {renderWorkout.map((workout) => (
                <tr key={workout.$id} className="border-b">
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-indigo-600 mr-2" />
                      {formatDate(workout.Date)} {/* Format date here */}
                    </div>
                  </td>
                  <td className="py-2 px-4">{workout.Workout}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-indigo-600 mr-2" />
                      {workout.Duration}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <Flame className="w-4 h-4 text-indigo-600 mr-2" />
                      {`${workout.CaloriesBurned} kcals`}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default WorkoutHistory;
