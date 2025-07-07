import React from 'react'
import { Navigate, useLocation } from 'react-router' // ✅ Correct import
import useAuth from '../hooks/useAuth'

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  const from = location.pathname

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <span className='loading loading-bars loading-lg text-primary'></span>
      </div>
    )
  }

  if (!user) {
    return <Navigate state={{from}} to='/auth/login' replace />
  }

  return children
}

export default PrivateRoutes
