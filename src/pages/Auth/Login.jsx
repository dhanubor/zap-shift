import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { loginUser } = useAuth() // ✅ Corrected here
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        console.log('Login Success:', result)
        navigate(from, { replace: true }) // ✅ Navigate after login
      })
      .catch((error) => {
        console.error('Login Error:', error)
      })
  }

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div>
          <h1 className='text-5xl font-bold'>Login</h1>
          <p className='py-6'>Please enter your credentials to login.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('email', { required: true })}
              type='email'
              placeholder='Email'
              className='input input-bordered w-full max-w-xs mb-4'
            />
            {errors.email && (
              <span className='text-red-600'>Email is required</span>
            )}
            <input
              {...register('password', { required: true })}
              type='password'
              placeholder='Password'
              className='input input-bordered w-full max-w-xs mb-4'
            />
            {errors.password && (
              <span className='text-red-600'>Password is required</span>
            )}
            <br />
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
