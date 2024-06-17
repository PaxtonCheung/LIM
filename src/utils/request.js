// src/request.js
import axios from 'axios';
import { ElMessage } from 'element-plus'; // 引入Element Plus组件

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000', // 默认API基础路径
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么（例如设置token）
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = `Bearer ${token}`);

    // 处理params参数
    // if (config.params && typeof config.params === 'object') {
    //   config.url = config.url + `?${new URLSearchParams(config.params).toString()}`;
    // }

    // 处理data参数，如果需要序列化JSON字符串
    if (config.data && typeof config.data === 'object') {
      config.data = JSON.stringify(config.data);
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    ElMessage.error('请求错误信息');
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.data.code === 200) {
      // 处理成功的情况
      return response.data.data;
    } else {
      // 处理错误的情况，例如弹出提示信息
      ElMessage.error(response.data.message || '未知错误');
    }
  },
  (error) => {
    // 对响应错误做点什么
    const { response, message } = error;
    if (response) {
      // 请求已发出，服务器响应了状态码 2xx 之外的其他状态
      ElMessage.error(response.data.message || '服务器错误');
    } else {
      // 处理网络错误，例如请求超时
      ElMessage.error(message || '网络错误');
    }
    return Promise.reject(error);
  }
);

export default service;