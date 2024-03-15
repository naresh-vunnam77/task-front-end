import React, { useState, useEffect, useRef } from 'react';
import useTaskApi from '../hooks/useTaskApi';
import { calculateReminders } from '../helpers/reminder';
import { calculateElapsedTime } from '../utils/util';
import LoadingSpinner from "../UI/Loader";

const Notification = ({ onClose, setReminderCount }) => {
  const token = localStorage.getItem('token');
  const { tasks, loading } = useTaskApi(token);
  const [reminders, setReminders] = useState([]);
  const pendingTasks = tasks.filter((task) => task.status === 'pending');
  const notificationRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      const upcomingReminders = calculateReminders(pendingTasks);
      setReminders(upcomingReminders);
      setReminderCount(upcomingReminders.length);
    }
  }, [tasks, loading, setReminderCount]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div ref={ notificationRef } className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto h-full overflow-y-auto bg-white shadow p-4 rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 font-semibold">Reminders</h2>
        <button onClick={ handleClose } className="text-gray-600 hover:text-gray-800 focus:outline-none">
          Close
        </button>
      </div>
      <div>
        { loading ? (
          <LoadingSpinner />
        ) : reminders.length === 0 ? (
          <p className="text-gray-600">No reminders available.</p>
        ) : (
          reminders.map((reminder) => {
            const { days, hours, minutes } = calculateElapsedTime(new Date(reminder.date));
            const isElapsed = days > 0 || hours > 0 || minutes > 0;

            return (
              <div key={ reminder.id } className={ `mb-4 p-2 rounded ${isElapsed ? 'bg-red-200' : 'bg-green-200'}` }>
                <strong className="text-sm sm:text-base md:text-lg lg:text-xl">{ reminder.title }</strong>
                <p className="text-sm sm:text-base text-gray-600">{ reminder.message }</p>
                <p className="text-xs sm:text-sm text-gray-500">Date: { reminder.date }</p>
              </div>
            );
          })
        ) }
      </div>
    </div>
  );
};

export default Notification;
