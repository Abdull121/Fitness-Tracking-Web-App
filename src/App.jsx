
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Dashboard from './components/Dashboard.jsx'
import Workouts from './components/pages/Workouts.jsx'


const router =  createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>

          <Route path='' element={<Dashboard/>} />

          <Route path='workout' element={<Workouts/>}/>


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
