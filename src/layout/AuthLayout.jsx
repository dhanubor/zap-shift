import React from 'react'
import authImage from '../../src/assets/authImage.png' // Adjust the path as necessary
import { Outlet, NavLink } from 'react-router'
import Logo from '../components/Logo'

const AuthLayout = () => {
  
  return (
    <div>
      <div className='p-3.5 lg:p-10 bg-base-200 min-h-screen'>
        <NavLink to={'/'} className='btn btn-ghost text-xl'>
          <Logo className='text-center text-3xl font-bold my-5' />
        </NavLink>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <img
            src={authImage}
            alt='Merchant Location'
            className='max-w-sm rounded-lg shadow-2xl'
          />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
