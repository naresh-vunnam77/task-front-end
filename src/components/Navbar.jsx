import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Notification from './Notifications';
import useTaskApi from '../hooks/useTaskApi';

const NavBar = () => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [reminderCount, setReminderCount] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  let isAuthenticated = false;

  if (user && token) {
    isAuthenticated = true;
  }

  const { tasks, loading } = useTaskApi(token);

  useEffect(() => {
    const fetchAndSetReminderCount = async () => {
      try {
        const pendingTasksCount = tasks.filter(task => task.status === 'pending').length;
        setReminderCount(pendingTasksCount);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchAndSetReminderCount();
  }, [tasks]);

  const handleLogout = () => {
    window.location.replace('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleToggleNotification = () => {
    setIsNotificationVisible(!isNotificationVisible);

    if (!isNotificationVisible) {
      setReminderCount(0);
      localStorage.setItem('reminderCount', '0');
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <NavLink to="/" className="text-white text-lg font-semibold">
            Task Scheduler
          </NavLink>
        </div>
        <div className="flex items-center space-x-4 ">
          { isAuthenticated ? (
            <>
              <NavLink to="/completed-tasks" className="text-gray-300 hover:text-white px-1 sm:px-10">
                Completed Tasks
              </NavLink>
              <button onClick={ handleLogout } className="text-gray-300 hover:text-white px-1 sm:px-10">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signup" className="text-gray-300 hover:text-white">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="text-gray-300 hover:text-white">
                Login
              </NavLink>
            </>
          ) }
          { isAuthenticated && (
            <span className="text-gray-300 hover:text-white relative">
              { reminderCount > 0 && (
                <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  { reminderCount }
                </span>
              ) }
              <button onClick={ handleToggleNotification }>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="notifications" className='text-white fill-current'>
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z"></path>
                </svg>
              </button>
            </span>
          ) }

        </div>
      </div>
      { isAuthenticated && isNotificationVisible && (
        <div className="w-full sm:w-[400px] fixed top-15 right-0 m-4 rounded-sm">
          <Notification onClose={ handleToggleNotification } setReminderCount={ setReminderCount } />
        </div>
      ) }
    </nav>
  );
};

export default NavBar;
