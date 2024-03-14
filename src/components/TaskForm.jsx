import React, { useState } from 'react';
import DatetimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import useTaskApi from '../hooks/useTaskApi';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [formError, setFormError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputsTouched, setInputsTouched] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const { loading, createTask } = useTaskApi(token);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim() && inputsTouched) {
      setTitleError('Task title is required.');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!description.trim() && inputsTouched) {
      setDescriptionError('Task description is required.');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    setIsFormValid(isValid);
  };

  const handleInputChange = (e) => {
    if (!inputsTouched) {
      setInputsTouched(true);
    }
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else if (e.target.name === 'description') {
      setDescription(e.target.value);
    }
  };

  const handleCreateTask = () => {
    validateForm();

    if (isFormValid) {
      const newTask = {
        title,
        description,
        dueDate: selectedDateTime,
        createdBy: user.id
      };

      createTask(newTask)
        .then(() => {
          setTitle('');
          setDescription('');
          setSelectedDateTime(new Date());
          window.location.replace('/');
        })
        .catch((error) => {
          setFormError(error);
        });
    } else {
      setFormError('Form is invalid. Task not created.');
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
        { titleError && <p className="text-red-500">{ titleError }</p> }
        <textarea
          name="description"
          placeholder="Task Description"
          value={ description }
          onChange={ handleInputChange }
          className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
          required
          minLength={ 6 }
        />
        { descriptionError && <p className="text-red-500">{ descriptionError }</p> }
        <DatetimePicker
          onChange={ (date) => setSelectedDateTime(date) }
          value={ selectedDateTime }
          className="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={ handleCreateTask }
          className={ `bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300` }
        >
          Create Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
