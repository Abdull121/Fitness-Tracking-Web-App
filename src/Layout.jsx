import React from 'react';
import {Header, Footer, SideBar} from './components/index'
import { Outlet, Navigate} from 'react-router-dom';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  const user = false;


  return (user ? 
  <>
    <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="md:flex bg-gray-100 md:pr-5">
          <SideBar isSidebarOpen={isSidebarOpen} />
          <div className="md:flex-1">
            <Outlet />
           </div>
       </div>
        <Footer />
  </>:
   <Navigate to="/login"/>)


  // return (
     
  //   <>
      
  //     <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
  //     <div className="md:flex bg-gray-100 md:pr-5">
  //       <SideBar isSidebarOpen={isSidebarOpen} />
  //       <div className="md:flex-1">
  //         <Outlet />
  //       </div>
  //     </div>
  //     <Footer />
  //   </>
  // );
}

export default Layout;
