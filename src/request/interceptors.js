import axios from 'axios';

// 获取API基础URL，支持多种环境
const getBaseURL = () => {
  // 优先使用环境变量
  if (import.meta.env.VITE_BASE_URL) {
    return import.meta.env.VITE_BASE_URL;
  }
  
  // 根据当前环境判断
  if (import.meta.env.PROD) {
    // 生产环境使用固定域名
    return 'https://ind.thecapitalfirst.com/';
  } else {
    // 开发环境使用代理路径
    return '/v1';
  }
};

const service = axios.create({
  baseURL: getBaseURL(),
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