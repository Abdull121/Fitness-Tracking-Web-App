import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import service from '../Appwrite/config'
import authService from '../Appwrite/auth'
import conf from '../conf/conf'

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ProgressCharts() {

  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Weight',
        data: [59, 60, 64, 63.2, 63, 63],
        backgroundColor: '#4f46e5',
      },
    ],
  }


  React.useEffect(()=>{

    const fetchData  =  async()=>{
      const currentUser =  await authService.getCurrentUser()
      if(currentUser){
        const userInfo = await service.getUserInformation(conf.appwriteUserInfoCollectionId,currentUser.$id )
        if(userInfo){
          console.log("user data::", userInfo)
        }
      }
    }
    fetchData()

  },[])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Weight Progress</h2>
      <div className="h-64 w-full">
        <Bar data={data} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  )
}
