import React from 'react';
import Layout from '../../components/Layout/Layout';
import DashboardStats from '../../components/Employer/Dashboard/DashboardStats';
import './dashbord.css';

const DashboardPage = () => {
  return (
    <Layout>
      <div className="dashboard-page">
        <div className="dashboard-content">
          <h1 className="dashboard-header">Employer Dashboard</h1>
          <DashboardStats />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;