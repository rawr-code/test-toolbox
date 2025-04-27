import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

function createAxiosClient() {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const axiosClient = createAxiosClient()
