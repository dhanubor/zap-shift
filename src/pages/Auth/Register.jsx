import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router'
import Google from './socical/Google'

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm()
  const { createUser } = useAuth()

  const onSubmit = (data) => {
    console.log(data)
    createUser(data.email, data.password)
      .then((result) => {
        navigate('/')
        console.log(result.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <div>
            <h1 className='text-5xl font-bold'>Register</h1>
            <p className='py-6'>
              Please fill in the details to create an account.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('name', { required: true })}
                type='text'
                name='name'
                placeholder='Username'
                className='input input-bordered w-full max-w-xs mb-4'
              />
              {errors.exampleRequired && (
                <p className='text-red-600'>This field is required</p>
              )}
              <input
                {...register('email', { required: true })}
                type='email'
                name='email'
                placeholder='Email'
                className='input input-bordered w-full max-w-xs mb-4'
              />
              {errors.exampleRequired && (
                <p className='text-red-600'>This field is required</p>
              )}

              <input
                {...register('password', { required: true })}
                name='password'
                type='password'
                placeholder='Password'
                className='input input-bordered w-full max-w-xs mb-4'
              />
              {errors.exampleRequired && (
                <p className='text-red-600'>This field is required</p>
              )}
              <br />
              <button className='btn btn-primary'>Register</button>
            </form>
            <p>
              Already have a account <Link to={'login'}>Login</Link>
            </p>
            <Google />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
