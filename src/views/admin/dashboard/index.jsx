



import { useDocumentTitle, useScrollTop } from '@/hooks';
import React from 'react';


const Dashboard = () => {
  useDocumentTitle('Welcome | Admin Dashboard');
  useScrollTop();

  return (
    <div className="loader">
      <h2>Welcome to admin dashboard</h2>
      <p>Here you can manage your products and users</p>
    </div>
  );
};

export default Dashboard;
