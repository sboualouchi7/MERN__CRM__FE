import React, { useState, useEffect } from 'react';
import { createManager, updateManager } from '../../../utils/api';
import './managerForm.css';

const ManagerForm = ({ manager, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (manager) {
      setFormData({
        name: manager.name || '',
        email: manager.email || '',
        password: '',  // Don't populate password on edit
      });
    }
  }, [manager]);

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
      if (manager?._id) {
        // Only include password if it's been changed
        const updateData = {
          name: formData.name,
          email: formData.email,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await updateManager(manager._id, updateData);
      } else {
        await createManager(formData);
      }
      onSuccess();
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save manager');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-form-container">
      <h2 className="manager-form-title">{manager ? 'Edit Manager' : 'Create Manager'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="manager-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label className="form-label">Email:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <label className="form-label">
            Password: {manager && <span className="password-hint">(Leave blank to keep current)</span>}
          </label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!manager}
          />
        </div>
        <div className="buttons-container">
          <button 
            type="submit" 
            className="submit-button" 
            disabled={loading}
          >
            {loading ? 'Saving...' : (manager ? 'Update' : 'Create')}
          </button>
          {onCancel && (
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ManagerForm;