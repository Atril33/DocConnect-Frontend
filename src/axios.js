import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = '*/*';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const tokenTime = localStorage.getItem('token_time');
  const newConfig = { ...config };
  if (token && Math.abs((Date.now() - tokenTime)) < 1_800_000) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }
  return newConfig;
});
export default axios;
