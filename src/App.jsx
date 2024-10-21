import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import { Dashboard } from "./components/index.js";
import Workouts from "./pages/Workouts.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Progress from "./pages/Progress.jsx";
import History from "./pages/History.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />

      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="workout" element={<Workouts />} />
        <Route path="progress" element={<Progress />} />
        <Route path="history" element={<History />} />
      </Route>
    </Route>
  )
);

function App() {
  

  return (
    <>
      <RouterProvider router={router} />

    </>
  );
}

export default App;
