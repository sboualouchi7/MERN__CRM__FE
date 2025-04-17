import React, { useState, useEffect } from 'react';
import { getManagerLeads, updateManagerLead } from '../../../utils/api';
import './managerleads.css';

const ManagerLeadList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingLead, setUpdatingLead] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await getManagerLeads();
        setLeads(data);
      } catch (err) {
        setError('Failed to load leads');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    setUpdatingLead(leadId);
    try {
      const updatedLead = await updateManagerLead(leadId, { status: newStatus });
      setLeads(leads.map(lead => 
        lead._id === leadId ? { ...lead, status: updatedLead.status } : lead
      ));
    } catch (err) {
      setError('Failed to update lead status');
      console.error(err);
    } finally {
      setUpdatingLead(null);
    }
  };

  const handleAddNote = async (leadId, note) => {
    if (!note.trim()) return;
    
    setUpdatingLead(leadId);
    try {
      const updatedLead = await updateManagerLead(leadId, { 
        notes: [...(leads.find(l => l._id === leadId)?.notes || []), note]
      });
      
      setLeads(leads.map(lead => 
        lead._id === leadId ? { ...lead, notes: updatedLead.notes } : lead
      ));
    } catch (err) {
      setError('Failed to add note');
      console.error(err);
    } finally {
      setUpdatingLead(null);
    }
  };

  if (loading) return <div>Loading leads...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="manager-leads-container">
      <h2 className="manager-leads-header">My Leads</h2>
      {leads.length === 0 ? (
        <p className="no-leads-message">No leads assigned to you.</p>
      ) : (
        <div>
          {leads.map((lead) => (
            <div key={lead._id} className="lead-card">
              <h3 className="company-name">{lead.companyName}</h3>
              <p className="contact-info">
                <strong>Contact:</strong> {lead.contactName} ({lead.contactEmail})
              </p>
              <div className="status-container">
                <span className="status-label">Status:</span>
                <select
                  className="status-select"
                  value={lead.status}
                  onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                  disabled={updatingLead === lead._id}
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELED">Canceled</option>
                </select>
              </div>
              <div className="notes-section">
                <h4 className="notes-title">Notes:</h4>
                <ul className="notes-list">
                  {lead.notes && lead.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
                <div className="note-input-container">
                  <input
                    type="text"
                    id={`note-${lead._id}`}
                    className="note-input"
                    placeholder="Add a note..."
                    disabled={updatingLead === lead._id}
                  />
                  <button 
                    className="add-note-button"
                    onClick={() => {
                      const noteInput = document.getElementById(`note-${lead._id}`);
                      handleAddNote(lead._id, noteInput.value);
                      noteInput.value = '';
                    }}
                    disabled={updatingLead === lead._id}
                  >
                    Add Note
                  </button>
                </div>
              </div>
              <hr className="divider" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagerLeadList;