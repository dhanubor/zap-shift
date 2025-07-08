import React from 'react'
import { Navigate, NavLink } from 'react-router'
import Logo from './Logo'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const { user, logOut } = useAuth()

  const handdleLogout = () => {
    logOut()
    .then(result =>{console.log(result)})
    .catch(error=>console.log(error))
  }
  const navLinks = (
    <>
      <li>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/about'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/coverrage'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Coverrage
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/sendPersel'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          SendPersel
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to='/dashbord'>Dashbord</NavLink>
          </li>
          <li>
            <NavLink to='/beARider'>BeARider</NavLink>
          </li>
        </>
      )}
    </>
  )

  return (
    <nav className='navbar bg-base-100 shadow-sm'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <button
            tabIndex={0}
            className='btn btn-ghost lg:hidden'
            aria-label='Open menu'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow'
          >
            {navLinks}
          </ul>
        </div>
        <NavLink to='/' className='btn btn-ghost text-xl' aria-label='Home'>
          <Logo />
        </NavLink>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>{navLinks}</ul>
      </div>
      <div className='navbar-end'>
        {user ? (
          <button onClick={handdleLogout} className='btn btn-error'>
            Logout
          </button>
        ) : (
          <>
            <NavLink to='/auth/login' className='btn btn-primary'>
              Login
            </NavLink>
            <NavLink to='/auth/register' className='btn btn-secondary ml-2'>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
