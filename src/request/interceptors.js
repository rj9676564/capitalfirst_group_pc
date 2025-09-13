import axios from 'axios';
 
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
 
// Request interceptors
service.interceptors.request.use(
  (config) => {
    if(config.method === 'post'){
      const token = sessionStorage.getItem('token')
      if( token) config.headers['token'] = token
      config.headers['Content-Type'] = 'application/json'
      config.headers['Accept'] = 'application/json'
      if(config.config) config.headers['Content-Type'] = config.config
    }
    
    // do something
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
 
// Response interceptors
service.interceptors.response.use(
  async (response) => {
    // do something
    return response.data;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
 
export default service;