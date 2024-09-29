
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import {Dashboard} from './components/index.js'
import Workouts from './pages/Workouts.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Progress from './pages/Progress.jsx'
import History from './pages/History.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'





// import React, { useRef } from 'react';
// import { DailyGoals } from './components/index.js';
// import GoalsProgress from './components/GoalsProgress.jsx';



const router =  createBrowserRouter(
  createRoutesFromElements(
    
    <Route>
     <Route path='login' element={<Login/>}/>
     <Route path='signup' element={<SignUp/>}/>

    <Route path='/' element={<Layout/>}>

          <Route path='' element={<Dashboard/>} />
           <Route  path='userprofile'element={<UserProfile/>}/>
          <Route path='workout' element={<Workouts/>}/> 
          <Route path='progress' element={<Progress/>}/>
          <Route path='history' element={<History/>}/>

    </Route>
    </Route>
  )
)

//TODO: useprams for url parameter
 


function App() {

  // const weeklyGoalsRef = useRef();

  // const handleProgressUpdate = () => {
  //   if (weeklyGoalsRef.current) {
  //     weeklyGoalsRef.current.updateWeeklyGoals();
  //   }
  // };
  

  return (
    <>
    <RouterProvider router={router} />

    {/* <div className="App">
      <DailyGoals onProgressUpdate={handleProgressUpdate} />
      <GoalsProgress ref={weeklyGoalsRef} />
    </div> */}

    
    </>
  )
}

export default App
