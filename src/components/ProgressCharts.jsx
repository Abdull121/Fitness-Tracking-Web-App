import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ProgressCharts() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Weight',
        data: [180, 178, 176, 174, 172, 170],
        backgroundColor: '#4f46e5',
      },
    ],
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Weight Progress</h2>
      <div className="h-64 w-full">
        <Bar data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  )
}
