
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Dashboard from './components/Dashboard.jsx'
import Workouts from './pages/Workouts.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Progress from './pages/Progress.jsx'


const router =  createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>

          <Route path='' element={<Dashboard/>} />

          {/* //TODO:use Pramas */}
          <Route path='userprofile' element={<UserProfile/>}/>

          <Route path='workout' element={<Workouts/>}/> 


          <Route path='progress' element={<Progress/>}/>


    </Route>
  )
)

//TODO: useprams for url parameter
 


function App() {
  

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
