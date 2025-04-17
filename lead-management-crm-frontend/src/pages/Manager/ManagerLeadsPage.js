import React from 'react';
import Layout from '../../components/Layout/Layout';
import ManagerLeadList from '../../components/Manager/Leads/ManagerLeadList';

const ManagerLeadsPage = () => {
  return (
    <Layout>
      <div>
        <h1>Manage Your Leads</h1>
        <ManagerLeadList />
      </div>
    </Layout>
  );
};

export default ManagerLeadsPage;