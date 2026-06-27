/**
 * API Client - Axios instance with interceptors
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiError } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mamaguard.onrender.com';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('currentUser');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Helper function for setting auth token
export const setAuthToken = (token: string) => {
  if (token) {
    localStorage.setItem('access_token', token);
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('access_token');
    delete apiClient.defaults.headers.common.Authorization;
  }
};

// Helper function for clearing auth
export const clearAuth = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('currentUser');
  delete apiClient.defaults.headers.common.Authorization;
};

// Helper function for getting auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('access_token');
};
