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
  login: (email, password, classCode = null) => api.post('/auth/login', { email, password, classCode }),
  register: (payload) => api.post('/auth/register', payload),
  getAnalytics: () => api.get('/analytics'),
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
  patch: (url, data) => api.patch(url, data),
  delete: (url) => api.delete(url),
};

export const classApi = {
  getClasses: () => api.get('/classes'),
  switchClass: (classCode) => api.post('/classes/switch', { classCode }),
};

export const adminApi = {
  getAnalytics: () => api.get('/admin/analytics'),
  getUsers: (params) => api.get('/admin/users', { params }),
  toggleUser: (id) => api.patch(`/admin/users/${id}/toggle`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getHomework: (params) => api.get('/admin/homework', { params }),
  deleteHomework: (id) => api.delete(`/admin/homework/${id}`),
  getSystemStats: () => api.get('/admin/system-stats'),
};

export const homeworkApi = {
  list: (params) => api.get('/homework', { params }),
  create: (formData) => api.post('/homework', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put(`/homework/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/homework/${id}`),
  submit: (id, formData) => api.post(`/homework/${id}/submit`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getSubmissions: (id) => api.get(`/homework/${id}/submissions`),
  gradeSubmission: (id, data) => api.patch(`/submissions/${id}/grade`, data),
  deleteSubmission: (id) => api.delete(`/submissions/${id}`),
  downloadAttachment: (homeworkId, attachmentId) => api.get(`/homework/${homeworkId}/attachments/${attachmentId}/download`, { responseType: 'blob' }),
};

export const notificationApi = {
  list: () => api.get('/notifications'),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
};

export const discussionApi = {
  list: (homeworkId) => api.get(`/homework/${homeworkId}/discussions`),
  create: (homeworkId, data) => api.post(`/homework/${homeworkId}/discussions`, data),
  addAnswer: (id, data) => api.post(`/discussions/${id}/answers`, data),
  upvote: (discussionId, answerId) => api.post(`/discussions/${discussionId}/answers/${answerId}/upvote`),
};

export const analyticsApi = {
  general: () => api.get('/analytics'),
  admin: () => api.get('/admin/analytics'),
  teacher: () => api.get('/analytics/teacher'),
  getStudentAnalytics: (params) => api.get('/analytics/student', { params }),
  leaderboard: () => api.get('/leaderboard'),
};

export const notesApi = {
  list: (params) => api.get('/notes', { params }),
  create: (formData) => api.post('/notes', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/notes/${id}`),
};

export const aiApi = {
  summarize: (data) => api.post('/ai/summarize', data),
  chat: (message) => api.post('/chat', { message }),
};

export const USERS = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
};

export default api;



