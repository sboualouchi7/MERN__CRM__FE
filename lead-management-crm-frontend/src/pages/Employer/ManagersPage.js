import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import ManagerList from '../../components/Employer/Managers/ManagerList';
import ManagerForm from '../../components/Employer/Managers/ManagerForm';
import './managerPage.css';
const ManagersPage = () => {
  const [selectedManager, setSelectedManager] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateClick = () => {
    setSelectedManager(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (manager) => {
    setSelectedManager(manager);
    setIsFormVisible(true);
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    setSelectedManager(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setSelectedManager(null);
  };

  return (
    <Layout>
      <div>
        <h1>Manage Managers</h1>
        {isFormVisible ? (
          <ManagerForm 
            manager={selectedManager}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
            <button onClick={handleCreateClick}>Create New Manager</button>
            <ManagerList 
              onEdit={handleEditClick} 
              refreshTrigger={refreshTrigger}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default ManagersPage;