// components/CompleteTasks.jsx
import React from 'react';

import Layout from '../layouts/Layout';
import CompletedTaskList from '../components/CompletedTaskList';

const CompleteTasks = () => {
  const completedTasks = []

  return (
    <Layout>
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
        <CompletedTaskList completedTasks={ completedTasks } />
      </div>
    </Layout>
  );
};

export default CompleteTasks;
