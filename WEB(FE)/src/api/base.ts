import axios from 'axios'

export const BASE_URL = 'http://my.parkjeongseop.com:8000/api/v1'

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
