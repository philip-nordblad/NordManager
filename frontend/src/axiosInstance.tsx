// filepath: /Users/philipnordblad/Commit/manager-app/frontend/src/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

export default axiosInstance;