import axios from 'axios';

const API_URL =  'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Employer API calls
export const getDashboardStats = async () => {
  const response = await api.get('/employer/dashboard-stats');
  return response.data;
};

export const getManagers = async () => {
  const response = await api.get('/employer/managers');
  return response.data;
};

export const createManager = async (managerData) => {
  const response = await api.post('/employer/managers', managerData);
  return response.data;
};

export const updateManager = async (managerId, managerData) => {
  const response = await api.put(`/employer/managers/${managerId}`, managerData);
  return response.data;
};

export const deleteManager = async (managerId) => {
  const response = await api.delete(`/employer/managers/${managerId}`);
  return response.data;
};

export const getEmployerLeads = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.managerId) queryParams.append('managerId', filters.managerId);
  if (filters.statusId) queryParams.append('statusId', filters.statusId);
  
  const response = await api.get(`/employer/leads?${queryParams}`);
  return response.data;
};

export const createLead = async (leadData) => {
  const response = await api.post('/employer/leads', leadData);
  return response.data;
};

export const updateLead = async (leadId, leadData) => {
  const response = await api.put(`/employer/leads/${leadId}`, leadData);
  return response.data;
};

export const deleteLead = async (leadId) => {
  const response = await api.delete(`/employer/leads/${leadId}`);
  return response.data;
};

// Manager API calls
export const getManagerLeads = async () => {
  const response = await api.get('/managers/leads');
  return response.data;
};

export const updateManagerLead = async (leadId, updateData) => {
  const response = await api.patch(`/managers/leads/${leadId}`, updateData);
  return response.data;
};

export default api;