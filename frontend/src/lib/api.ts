/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  google: () => api.post('/auth/google'),
  sendMagicLink: (email: string) => api.post('/auth/email/send', { email }),
  verifyMagicLink: (email: string, code: string) => api.post('/auth/email/verify', { email, code }),
  sendOTP: (phone: string) => api.post('/auth/phone/send', { phone }),
  verifyOTP: (phone: string, code: string) => api.post('/auth/phone/verify', { phone, code }),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refresh_token: refreshToken }),
  logout: () => api.delete('/auth/session'),
};

export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data: any) => api.put('/profile', data),
  enrich: () => api.post('/profile/enrich'),
};

export const resumeAPI = {
  list: () => api.get('/resume'),
  generate: (data: any) => api.post('/resume/generate', data),
  get: (id: string) => api.get(`/resume/${id}`),
  update: (id: string, data: any) => api.put(`/resume/${id}`, data),
  downloadPDF: (id: string) => api.get(`/resume/${id}/pdf`),
};

export const jobsAPI = {
  list: (params?: any) => api.get('/jobs', { params }),
  get: (id: string) => api.get(`/jobs/${id}`),
  getConfidence: (id: string) => api.get(`/jobs/${id}/confidence`),
  save: (id: string) => api.post(`/jobs/${id}/save`),
};

export const salaryAPI = {
  get: (params?: any) => api.get('/salary', { params }),
};

export const prepAPI = {
  generate: (jobId: string) => api.post('/prep', { job_id: jobId }),
  get: (id: string) => api.get(`/prep/${id}`),
  updateProgress: (id: string, data: any) => api.patch(`/prep/${id}/progress`, data),
};

export const settingsAPI = {
  listKeys: () => api.get('/settings/keys'),
  addKey: (data: any) => api.post('/settings/keys', data),
  removeKey: (id: string) => api.delete(`/settings/keys/${id}`),
  activateKey: (id: string) => api.post(`/settings/keys/${id}/activate`),
  testKey: (data: any) => api.post('/settings/keys/test', data),
};

export default api;