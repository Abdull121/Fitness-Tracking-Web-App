import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="md:flex">
        <SideBar isSidebarOpen={isSidebarOpen} />
        <div className="md:flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
