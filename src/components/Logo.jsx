import React from 'react'
import logo from '../assets/logo.png' // Adjust the path as necessary
import { Link } from 'react-router'

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <img src={logo} alt='logo' />
      <p className='font-bold'>Profast</p>
    </div>
  )
}

export default Logo
