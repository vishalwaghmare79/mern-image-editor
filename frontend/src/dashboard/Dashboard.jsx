import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <DashboardSidebar />
      <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-800 transition-colors duration-300 pt-12 sm:pt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;