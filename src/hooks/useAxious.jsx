import axios from 'axios'
import React from 'react'
import useAuth from './useAuth'

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
})

const useAxious = () => {
  const { user } = useAuth()

  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${user.accessToken}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return axiosSecure
}

export default useAxious
