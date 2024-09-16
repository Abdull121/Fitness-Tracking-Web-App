import React from 'react';
import { Header, Footer, SideBar } from './components/index';
import { Outlet, useNavigate } from 'react-router-dom';
import authService from './Appwrite/auth';
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

/**
 * Layout component that handles the main layout of the application.
 * It includes the Header, SideBar, and Footer components.
 * It also manages the loading state and user authentication.
 */

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  // const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

   /**
   * Toggles the sidebar open and close state.
   * @returns {void}
   */

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  React.useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      // const data= true
      if (userData) {
        // setUser(userData);
        navigate('/userprofile');
      } else {
        navigate('/login');
      }
      setLoading(false);
    }).catch(() => {
      navigate('/login');
      setLoading(false);
    });
  }, []);


  // loader 
  if (loading) {
    return (
    <div className='flex justify-center items-center' style={{ height: '100vh' }}>
        <Loader size="md" />
    </div>
    )
    
    
  }

  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="md:flex bg-gray-100 md:pr-5">
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