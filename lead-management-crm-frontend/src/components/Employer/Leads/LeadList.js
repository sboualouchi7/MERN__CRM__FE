import React, { useState, useEffect } from 'react';
import { getEmployerLeads, deleteLead } from '../../../utils/api';
import './leadList.css';

const LeadList = ({ onEdit, refreshTrigger, managers }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    managerId: '',
    statusId: ''
  });

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const data = await getEmployerLeads(filters);
        setLeads(data);
      } catch (err) {
        setError('Failed to load leads');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [refreshTrigger, filters]);

  const handleDelete = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await deleteLead(leadId);
        setLeads(leads.filter(lead => lead._id !== leadId));
      } catch (err) {
        setError('Failed to delete lead');
        console.error(err);
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const getManagerName = (managerId) => {
    const manager = managers.find(m => m._id === managerId);
    return manager ? manager.name : 'Unassigned';
  };

  if (loading) return <div>Loading leads...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="lead-list-container">
      <h2 className="lead-list-header">Leads</h2>
      <div className="filters-container">
        <div className="filter-group">
          <label className="filter-label">Filter by Manager:</label>
          <select 
            className="filter-select"
            name="managerId" 
            value={filters.managerId} 
            onChange={handleFilterChange}
          >
            <option value="">All Managers</option>
            {managers.map(manager => (
              <option key={manager._id} value={manager._id}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>
  
        <div className="filter-group">
          <label className="filter-label">Filter by Status:</label>
          <select 
            className="filter-select"
            name="statusId" 
            value={filters.statusId} 
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </div>
      </div>
  
      {leads.length === 0 ? (
        <p className="no-leads-message">No leads found.</p>
      ) : (
        <table className="leads-table">
          <thead>
            <tr>
              <th>Contact Name</th>
              <th>Contact Email</th>
              <th>Company</th>
              <th>Status</th>
              <th>Manager</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.contactName}</td>
                <td>{lead.contactEmail}</td>
                <td>{lead.companyName}</td>
                <td>{lead.status}</td>
                <td>{getManagerName(lead.managerId)}</td>
                <td>
                  <button className="action-button edit-button" onClick={() => onEdit(lead)}>Edit</button>
                  <button className="action-button delete-button" onClick={() => handleDelete(lead._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );}
  export default LeadList;