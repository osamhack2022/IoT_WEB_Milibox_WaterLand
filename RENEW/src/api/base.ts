import axios from 'axios'

export const API = axios.create({
  baseURL: 'http://my.parkjeongseop.com:8000/api/v1/',
  withCredentials: true
})
