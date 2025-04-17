import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../../utils/api';
import './dashboard.css';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    inProgress: 0,
    completed: 0,
    canceled: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
      const fetchStats = async () => {
          try {
              const data = await getDashboardStats();
              
              console.log({data});
        
        // Assurez-vous que les noms des propriétés correspondent à ceux renvoyés par l'API
        // Si l'API renvoie des noms différents, ajustez ici en conséquence
        setStats({
          inProgress:  data.inProgressCount || 0,
          completed: data.leadsCompleted || 0,
          canceled: data.leadsCanceled || 0
        });
      } catch (err) {
        setError('Failed to load dashboard statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="dashboard-loading">Loading statistics...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-stats-container">
      <h2 className="dashboard-title">Dashboard Statistics</h2>
      <div className="stats-cards-container">
        <div className="stats-card stats-card-progress">
          <h3 className="stats-card-title">Leads in Progress</h3>
          <p className="stats-card-value">{stats.inProgress}</p>
        </div>
        <div className="stats-card stats-card-completed">
          <h3 className="stats-card-title">Leads Completed</h3>
          <p className="stats-card-value">{stats.completed}</p>
        </div>
        <div className="stats-card stats-card-canceled">
          <h3 className="stats-card-title">Leads Canceled</h3>
          <p className="stats-card-value">{stats.canceled}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;