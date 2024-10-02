import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import authService from '../Appwrite/auth';
import service from '../Appwrite/config';
import conf from '../conf/Conf';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  //const [weeklyData, setWeeklyData] = useState(null); // Weekly data from the backend
  const [piChartData, setPiChartData] = useState(null); // Data for the chart

  // Function to get user weekly data
  const userWeeklyData = async (usId) => {
    if (usId) {
      const getWeeklyData = await service.getUserInformation(conf.appwriteWeeklyGoalsCollectionId, usId);
      if (getWeeklyData) {
        // setWeeklyData(getWeeklyData);
        const data = calculateAvg(getWeeklyData);
        setPiChartData(data);
      } else {
        console.log("Failed to fetch weekly data for PiChart");
        setPiChartData(null); // Set to null when no data is available
      }
    } else {
      console.log("Current user ID not found");
    }
  };

  // Function to calculate the average data for the chart
  const calculateAvg = (data) => {
    const calories = data ? Math.floor((data.caloriesBurned / (data.outOfCaloriesBurned * 7)) * 100) : 0;
    const steps = data ? Math.floor((data.stepsTaken / (data.targetSteps * 7)) * 100) : 0;
    const workOutTime = data ? Math.floor((data.spendWorkoutTimeMinutes / (data.outOfWorkoutTimeMinutes * 7)) * 100) : 0;

    return {
      labels: ['Calories', 'Steps', 'Workout Time'],
      datasets: [
        {
          label: 'Progress Percentage',
          data: [calories, steps, workOutTime],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4,
        },
      ],
    };
  };

  // Fetch user data on component mount
  React.useEffect(() => {
    const getUserId = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        userWeeklyData(currentUser.$id);
      }
    };
    getUserId();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Weekly Progress</h2>
      {piChartData && piChartData.datasets && piChartData.datasets.length > 0 ? (
        <Doughnut data={piChartData} />
      ) : (
        <div className="flex justify-center items-center" style={{ height: '300px' }}>
          <p style={{ fontSize: '20px', color: '#d3d3d3', textAlign: 'center' }}>
            No data available for this week.
          </p>
        </div>
      )}
    </div>
  );
}

export default DoughnutChart;
