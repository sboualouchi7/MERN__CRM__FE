import React, { useState, useEffect } from 'react';
import { createLead, updateLead } from '../../../utils/api';
import './leadForm.css';
const LeadForm = ({ lead, managers, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    companyName: '',
    status: 'PENDING',
    managerId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lead) {
      setFormData({
        contactName: lead.contactName || '',
        contactEmail: lead.contactEmail || '',
        companyName: lead.companyName || '',
        status: lead.status || 'PENDING',
        managerId: lead.managerId || '',
      });
    }
  }, [lead]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (lead?._id) {
        await updateLead(lead._id, formData);
      } else {
        await createLead(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form-container">
      <h2 className="form-title">{lead ? 'Edit Lead' : 'Create Lead'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="lead-form">
        <div className="form-group">
          <label htmlFor="contactName" className="form-label">Contact Name:</label>
          <input
            id="contactName"
            className="form-input"
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactEmail" className="form-label">Contact Email:</label>
          <input
            id="contactEmail"
            className="form-input"
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName" className="form-label">Company Name:</label>
          <input
            id="companyName"
            className="form-input"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status" className="form-label">Status:</label>
          <select
            id="status"
            className="form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="managerId" className="form-label">Assign to Manager:</label>
          <select
            id="managerId"
            className="form-select"
            name="managerId"
            value={formData.managerId}
            onChange={handleChange}
            required
          >
            <option value="">Select Manager</option>
            {managers.map(manager => (
              <option key={manager._id} value={manager._id}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (lead ? 'Update' : 'Create')}
          </button>
          {onCancel && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default LeadForm;