import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import LeadList from '../../components/Employer/Leads/LeadList';
import LeadForm from '../../components/Employer/Leads/LeadForm';
import { getManagers } from '../../utils/api';

const LeadsPage = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const data = await getManagers();
        setManagers(data);
      } catch (err) {
        setError('Failed to load managers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  const handleCreateClick = () => {
    setSelectedLead(null);
    setIsFormVisible(true);
  };

  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setIsFormVisible(true);
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    setSelectedLead(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setSelectedLead(null);
  };

  if (loading) return <Layout><div>Loading...</div></Layout>;
  if (error) return <Layout><div>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div>
        <h1>Manage Leads</h1>
        {isFormVisible ? (
          <LeadForm 
            lead={selectedLead}
            managers={managers}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
            <button onClick={handleCreateClick}>Create New Lead</button>
            <LeadList 
              onEdit={handleEditClick} 
              refreshTrigger={refreshTrigger}
              managers={managers}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default LeadsPage;