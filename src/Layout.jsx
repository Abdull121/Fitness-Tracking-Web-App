import React, { useState, useEffect } from 'react';
import { Header, Footer, SideBar } from './components/index';
import { Outlet, useNavigate } from 'react-router-dom';
import authService from './Appwrite/auth';
import service from './Appwrite/config';
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading
  const [isLogin, setIsLogin] = useState(null); // Initially null to distinguish between not fetched and no user
  // const [existingData, setExistingData] = useState(null);
  const navigate = useNavigate();

  // Effect to handle user login and data fetching
  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setIsLogin(userData); // Set user data once retrieved
          
        } else {
          navigate("/login"); 
        }
      } catch (error) {
        console.log(error)
        navigate("/login"); // Handle errors by redirecting to login
      } finally {
        setLoading(false); // Stop loading when finished
      }
    };

    checkUser();
  }, [navigate]); // Add navigate to dependency array

  // Additional useEffect to handle navigation based on login state
  // useEffect(() => {
  //   if (!loading) {
  //     if (isLogin && existingData) {
  //       navigate("/"); 
  //     } else if (isLogin && !existingData) {
  //       navigate("/userprofile"); 
  //     }
  //   }
  // }, [isLogin, existingData, loading, navigate]);
  
  

  // Toggle sidebar state
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Loader while waiting for user data
  if (loading) {
    return (
      <div className='flex justify-center items-center' style={{ height: '100vh' }}>
        <Loader size="md" />
      </div>
    );
  }

  // Conditionally render based on `isLogin` and `existingData`
  return isLogin ? (
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
  ) : null; // If not logged in, return null (navigate will handle redirection)
}

export default Layout;
