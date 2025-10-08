// src/utils/http.ts
import axios from 'axios'
import API_BASE_URL from '@/config/api'

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

// 请求拦截
http.interceptors.request.use((config) => {
  // 可以加 token 等逻辑
  return config
})

// 响应拦截
http.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
)

export default http
