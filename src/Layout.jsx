import React, { useState, useEffect } from 'react';
import { Header, Footer, SideBar } from './components/index';
import { Outlet, useNavigate } from 'react-router-dom';
import authService from './Appwrite/auth';
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setIsLogin(userData);
        } else {
          navigate("/login"); 
        }
      } catch (error) {
        console.log(error)
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height: '100vh' }}>
        <Loader size="md" />
      </div>
    );
  }

  return isLogin ? (
    <div id="root">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="md:flex bg-gray-100 md:pr-5 flex-grow">
        <SideBar isSidebarOpen={isSidebarOpen} />
        <main className="flex-grow">
          <div className="md:flex-1">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  ) : null;
}

export default Layout;
