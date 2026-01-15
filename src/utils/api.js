// API utility functions with authentication
import config from '../config';

const BASE_URL = config.BASE_URL;

// Get auth headers with token
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || localStorage.getItem('admintoken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// Authenticated fetch wrapper
export const authFetch = async (url, options = {}) => {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  });

  // Handle unauthorized
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('admintoken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return response;
};

// Example usage functions
export const fetchUserData = async () => {
  const response = await authFetch('/users/profile');
  return response.json();
};

export const fetchRegistrations = async () => {
  const response = await authFetch('/users/registrations');
  return response.json();
};

export const fetchAdminData = async () => {
  const response = await authFetch('/admin/dashboard');
  return response.json();
};
