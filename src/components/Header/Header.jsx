import React from 'react';
import { Dumbbell, Menu, X, User } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

function Header({ isSidebarOpen, toggleSidebar }) {
  return (
    // <header className="bg-indigo-600 text-white shadow-lg fixed w-full top-0 z-50">
    //   <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    //     <div className="flex items-center">
    //       <Dumbbell className="h-8 w-8 mr-2" />
    //       <h1 className="text-2xl font-bold">Fitness Tracker</h1>
    //     </div>
    //     <button onClick={toggleSidebar} className="ml-2 md:hidden">
    //       {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
    //     </button>

    
    //     <nav className="hidden md:flex space-x-4">
    //       <NavLink
    //         to="/"
    //         className={({ isActive }) =>
    //           `hover:text-white transition-colors duration-200 ${
    //             isActive ? 'text-white' : 'text-indigo-100'
    //           }`
    //         }
    //       >
    //         Dashboard
    //       </NavLink>
    //       <NavLink
    //         to="/workout"
    //         className={({ isActive }) =>
    //           `hover:text-white transition-colors duration-200 ${
    //             isActive ? 'text-white' : 'text-indigo-100'
    //           }`
    //         }
    //       >
    //         Workouts
    //       </NavLink>
    //       <NavLink
    //         to="/progress"
    //         className={({ isActive }) =>
    //           `hover:text-white transition-colors duration-200 ${
    //             isActive ? 'text-white' : 'text-indigo-100'
    //           }`
    //         }
    //       >
    //         Progress
    //       </NavLink>
    //       <NavLink
    //         to="/history"
    //         className={({ isActive }) =>
    //           `hover:text-white transition-colors duration-200 ${
    //             isActive ? 'text-white' : 'text-indigo-100'
    //           }`
    //         }
    //       >
    //         History
    //       </NavLink>
    //       <Link to="/user">
    //         <User className='ml-5'/>
    //       </Link>
    //     </nav>
    //   </div>
    // </header>

    
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className=" absolute right-0 4 mr-2 md:hidden">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Dumbbell className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Fitness Tracker</h1>
          </div>


              <nav className="hidden md:flex space-x-4">
    
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-white transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-indigo-100'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/workout"
            className={({ isActive }) =>
              `hover:text-white transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-indigo-100'
              }`
            }
          >
            Workouts
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              `hover:text-white transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-indigo-100'
              }`
            }
          >
            Progress
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `hover:text-white transition-colors duration-200 ${
                isActive ? 'text-white' : 'text-indigo-100'
              }`
            }
          >
            History
          </NavLink>
          <Link to="/user">
            <User className='ml-5'/>
          </Link>
        </nav>
        </div>
      </header>



  );
  
}

export default Header;


