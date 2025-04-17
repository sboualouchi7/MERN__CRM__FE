import React, { useState, useEffect } from 'react';
import { getManagers, deleteManager } from '../../../utils/api';
import './managerList.css';
const ManagerList = ({ onEdit, refreshTrigger }) => {
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
  }, [refreshTrigger]);

  const handleDelete = async (managerId) => {
    if (window.confirm('Are you sure you want to delete this manager?')) {
      try {
        await deleteManager(managerId);
        setManagers(managers.filter(manager => manager._id !== managerId));
      } catch (err) {
        setError('Failed to delete manager');
        console.error(err);
      }
    }
  };

  if (loading) return <div>Loading managers...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="manager-list-container">
      <h2 className="manager-list-header">Managers</h2>
      {managers.length === 0 ? (
        <p className="no-managers-message">No managers found.</p>
      ) : (
        <table className="managers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager._id}>
                <td>{manager.name}</td>
                <td>{manager.email}</td>
                <td>
                  <button 
                    className="action-button edit-button" 
                    onClick={() => onEdit(manager)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-button delete-button" 
                    onClick={() => handleDelete(manager._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagerList;