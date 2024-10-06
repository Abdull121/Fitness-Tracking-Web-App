import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import service from '../Appwrite/config';
import authService from '../Appwrite/auth';
import moment from 'moment'; // For date formatting

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ProgressCharts() {
  const [chartData, setChartData] = useState(null); // Set initial state to null

  // Helper function to get the next 6 months starting from the current month
  const getNextSixMonths = () => {
    return Array.from({ length: 6 }, (_, i) =>
      moment().add(i, 'months').format('MMM')
    );
  };

  const groupDataByMonth = (weights) => {
    const monthData = {};
    const nextSixMonths = getNextSixMonths();
    //console.log(nextSixMonths)

    // Initialize all months with 0
    nextSixMonths.forEach((month) => {
      monthData[month] = 0;
    });
    // console.log(nextSixMonths)

    // Loop through weights data and group by month
    weights.forEach((entry) => {
      const month = moment(entry.$createdAt).format('MMM'); // Get the month from the data
      if (nextSixMonths.includes(month)) {
        // Only consider months in the next 6 months
        if (!monthData[month]) {
          monthData[month] = [];
        }
        monthData[month].push(entry.weight);
      }
    });

    // Calculate average weight per month
    const data = nextSixMonths.map((month) => {
      const weights = monthData[month];
      return weights.length > 0 ? weights.reduce((sum, weight) => sum + weight, 0) / weights.length : 0;
    });

    return { labels: nextSixMonths, data };
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        const userInfo = await service.getAllWeights(currentUser.$id);
        if (userInfo && userInfo.documents.length > 0) {
          const groupedData = groupDataByMonth(userInfo.documents);
          setChartData({
            labels: groupedData.labels,
            datasets: [
              {
                label: 'Weight',
                data: groupedData.data,
                backgroundColor: '#4f46e5',
              },
            ],
          });
        } else {
          setChartData(null); // No data available
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Weight Progress</h2>
      <div className="h-64 w-full">
        {chartData ? (
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-400">No weight data available for this period</p>
          </div>
        )}
      </div>
    </div>
  );
}
