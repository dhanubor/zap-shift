import axios from 'axios'
import React from 'react'


const axioosSecure = axios.create({
  baseURL:`http://localhost:5000/`
})
const useAxious = () => {
  return axioosSecure
}

export default useAxious