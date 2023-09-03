import axios from "axios"

export const http = axios.create({
  withCredentials: true,
  baseURL: "http://213.189.201.213:3000",
})
