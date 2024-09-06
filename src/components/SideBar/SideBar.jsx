import React from 'react';
import { Dumbbell, Home, BarChart2, Clock, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function SideBar({ isSidebarOpen }) {
  return (
    // <div
    //   className={` fixed top-0 left-0 h-full md:bg-gray-100 bg-gray-200  transition-transform duration-300 ease-in-out ${
    //     isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    //   } md:translate-x-0 md:static md:w-64 md:h-auto`}
    // >
    //   <nav className="flex flex-col space-y-2 p-4 mt-16 md:mt-20">
    //     <NavLink
    //       to="/"
    //       className={({ isActive }) =>
    //         `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 ${
    //           isActive ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700'
    //         }`
    //       }
    //     >
    //       <Home className="mr-3 h-5 w-5" />
    //       Dashboard
    //     </NavLink>
    //     <NavLink
    //       to="/workout"
    //       className={({ isActive }) =>
    //         `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 ${
    //           isActive ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700'
    //         }`
    //       }
    //     >
    //       <Dumbbell className="mr-3 h-5 w-5" />
    //       Workout
    //     </NavLink>
    //     <NavLink
    //       to="/progress"
    //       className={({ isActive }) =>
    //         `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 ${
    //           isActive ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700'
    //         }`
    //       }
    //     >
    //       <BarChart2 className="mr-3 h-5 w-5" />
    //       Progress
    //     </NavLink>
    //     <NavLink
    //       to="/history"
    //       className={({ isActive }) =>
    //         `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 ${
    //           isActive ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700'
    //         }`
    //       }
    //     >
    //       <Clock className="mr-3 h-5 w-5" />
    //       History
    //     </NavLink>
    //   </nav>

    // </div>


    <div className={`md:w-64 h-auto md:mr-0 pt-8 bg-gray-100 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>


  <nav className="flex flex-col space-y-2 pl-4">
        <NavLink  
          to="/"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 ${
              isActive ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700'
            }`
          }
        >
          <Home className="mr-3 h-5 w-5" />
          Dashboard
        </NavLink>


        <NavLink  
          to="/userprofile"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 ${
              isActive ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700'
            }`
          }
        >
          <User className="mr-3 h-5 w-5" />
          Profile
        </NavLink>


        <NavLink
          to="/workout"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 ${
              isActive ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700'
            }`
          }
        >
          <Dumbbell className="mr-3 h-5 w-5" />
          Workout
        </NavLink>
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 ${
              isActive ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700'
            }`
          }
        >
          <BarChart2 className="mr-3 h-5 w-5" />
          Progress
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 hover:text-indigo-700 hover:bg-indigo-100 rounded-md transition-colors duration-300 ${
              isActive ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700'
            }`
          }
        >
          <Clock className="mr-3 h-5 w-5" />
          History
        </NavLink>
      </nav>


    </div>


    
  );
}

export default SideBar;