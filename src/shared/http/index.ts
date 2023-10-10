import axios from "axios"
import { AVAILABLE_LS_KEYS } from "../constants"

const http = axios.create({
  // baseURL: process.env.NODE_ENV === "development" ? "http://213.189.201.213:8000" : "https://monoframe.ru",
  // withCredentials: process.env.NODE_ENV === "development" ? false : true,
  baseURL: "https://monoframe.ru",
  withCredentials: true,
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AVAILABLE_LS_KEYS.token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log('error global');
    
    return Promise.reject(error)
  },
)

export { http }
