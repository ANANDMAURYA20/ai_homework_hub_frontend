import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email, password, classCode = null) => api.post('/api/auth/login', { email, password, classCode }),
  register: (payload) => api.post('/api/auth/register', payload),
  getAnalytics: () => api.get('/analytics'),
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
  patch: (url, data) => api.patch(url, data),
  delete: (url) => api.delete(url),
};

export const classApi = {
  getClasses: () => api.get('/api/classes'),
  switchClass: (classCode) => api.post('/api/classes/switch', { classCode }),
};

export const adminApi = {
  getAnalytics: () => api.get('/api/admin/analytics'),
  getUsers: (params) => api.get('/api/admin/users', { params }),
  toggleUser: (id) => api.patch(`/api/admin/users/${id}/toggle`),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  getHomework: (params) => api.get('/api/admin/homework', { params }),
  deleteHomework: (id) => api.delete(`/api/admin/homework/${id}`),
  getSystemStats: () => api.get('/api/admin/system-stats'),
};

export const homeworkApi = {
  list: (params) => api.get('/api/homework', { params }),
  create: (formData) => api.post('/api/homework', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put(`/api/homework/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/api/homework/${id}`),
  submit: (id, formData) => api.post(`/api/homework/${id}/submit`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getSubmissions: (id) => api.get(`/api/homework/${id}/submissions`),
  gradeSubmission: (id, data) => api.patch(`/api/submissions/${id}/grade`, data),
  deleteSubmission: (id) => api.delete(`/api/submissions/${id}`),
  downloadAttachment: (homeworkId, attachmentId) => api.get(`/api/homework/${homeworkId}/attachments/${attachmentId}/download`, { responseType: 'blob' }),
};

export const notificationApi = {
  list: () => api.get('/api/notifications'),
  markRead: (id) => api.patch(`/api/notifications/${id}/read`),
};

export const discussionApi = {
  list: (homeworkId) => api.get(`/api/homework/${homeworkId}/discussions`),
  create: (homeworkId, data) => api.post(`/api/homework/${homeworkId}/discussions`, data),
  addAnswer: (id, data) => api.post(`/api/discussions/${id}/answers`, data),
  upvote: (discussionId, answerId) => api.post(`/api/discussions/${discussionId}/answers/${answerId}/upvote`),
};

export const analyticsApi = {
  general: () => api.get('/api/analytics'),
  admin: () => api.get('/api/admin/analytics'),
  teacher: () => api.get('/api/analytics/teacher'),
  getStudentAnalytics: (params) => api.get('/api/analytics/student', { params }),
  leaderboard: () => api.get('/api/leaderboard'),
};

export const notesApi = {
  list: (params) => api.get('/api/notes', { params }),
  create: (formData) => api.post('/api/notes', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/api/notes/${id}`),
};

export const aiApi = {
  summarize: (data) => api.post('/api/ai/summarize', data),
  chat: (message) => api.post('/api/chat', { message }),
};

export const USERS = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
};

export default api;



