import React, { useState } from 'react';
import DatetimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import useTaskApi from '../hooks/useTaskApi';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 3);
    return now;
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [inputsTouched, setInputsTouched] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const { loading, createTask } = useTaskApi(token);

  const validateForm = () => {
    let newErrors = {};

    if (!title.trim() && inputsTouched) {
      newErrors = { ...newErrors, title: 'Task title is required.' };
    } else if (title.trim().length < 4 && inputsTouched) {
      newErrors = { ...newErrors, title: 'Task title should be at least 4 characters.' };
    }

    if (!description.trim() && inputsTouched) {
      newErrors = { ...newErrors, description: 'Task description is required.' };
    } else if (description.trim().length < 6 && inputsTouched) {
      newErrors = { ...newErrors, description: 'Task description should be at least 6 characters.' };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    if (!inputsTouched) {
      setInputsTouched(true);
    }
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleCreateTask = async () => {
    if (!validateForm()) return;

    try {

      const newTask = {
        title,
        description,
        dueDate: selectedDateTime,
        createdBy: user.id
      };

      await createTask(newTask);
      setTitle('');
      setDescription('');
      setSelectedDateTime(new Date());
      window.location.replace('/');
    } catch (error) {
      setFormError('Error creating task: ' + error.message);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={ title }
          onChange={ handleInputChange }
          className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          required
          minLength={ 4 }
        />
        { errors.title && <p className="text-red-500">{ errors.title }</p> }
        <textarea
          name="description"
          placeholder="Task Description"
          value={ description }
          onChange={ handleInputChange }
          className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          required
          minLength={ 6 }
        />
        { errors.description && <p className="text-red-500">{ errors.description }</p> }
        <DatetimePicker
          onChange={ (date) => setSelectedDateTime(date) }
          value={ selectedDateTime }
          className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300 "
        />
        <button
          onClick={ handleCreateTask }
          className={ `bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300` }
        >
          Create Task
        </button>
        { formError && <p className="text-red-500">{ formError }</p> }
      </div>
    </div>
  );
};

export default TaskForm;
