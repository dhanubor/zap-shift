import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import Google from './socical/Google'
import useAuth from '../../hooks/useAuth'
import useUserAxios from '../../hooks/useUserAxios'

const Register = () => {
  const navigate = useNavigate()
  const [profilePhoto, setProfilePhoto] = useState('')
  const axiosInstance = useUserAxios()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { createUser, updatphoto } = useAuth()

  const handlePhoto = async (e) => {
    const image = e.target.files[0]
    if (!image) return

    const formData = new FormData()
    formData.append('image', image)

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_key}`,
        formData
      )
      const imageUrl = res.data.data.url
      setProfilePhoto(imageUrl) // ✅ শুধু state এ রাখবেন
      alert('Photo uploaded successfully!')
    } catch (error) {
      console.error(error)
      alert('Upload failed!')
    }
  }

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password)
      console.log(result)

      //uudate userInfo in the database
      const userInfo = {
        email: data.email,
        role: 'user', //default role
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      }
      const userRes = await axiosInstance.post('/users', userInfo)
      console.log(userRes.data)
      // ✅ এখন ইউজার তৈরি হওয়ার পরে profile update করুন
      await updatphoto({
        displayName: data.name,
        photoURL: profilePhoto || '', // fallback
      })

      navigate('/')
    } catch (error) {
      console.log(error)
      alert('Registration failed')
    }
  }

  return (
    <div className='hero bg-base-200 min-h-screen'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div>
          <h1 className='text-5xl font-bold'>Register</h1>
          <p className='py-6'>
            Please fill in the details to create an account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <input
              {...register('name', { required: 'Name is required' })}
              type='text'
              placeholder='Username'
              autoComplete='username'
              className='input input-bordered w-full max-w-xs mb-2'
            />
            {errors.name && (
              <p className='text-red-600'>{errors.name.message}</p>
            )}

            {/* Upload Photo */}
            <label htmlFor='file'>Upload Photo</label>
            <br />
            <input
              type='file'
              name='photo'
              onChange={handlePhoto}
              className='file-input file-input-bordered w-full max-w-xs mb-2'
            />

            {/* Email */}
            <input
              {...register('email', { required: 'Email is required' })}
              type='email'
              autoComplete='email'
              placeholder='Email'
              className='input input-bordered w-full max-w-xs mb-2'
            />
            {errors.email && (
              <p className='text-red-600'>{errors.email.message}</p>
            )}

            {/* Password */}
            <input
              {...register('password', { required: 'Password is required' })}
              type='password'
              autoComplete='current-password'
              placeholder='Password'
              className='input input-bordered w-full max-w-xs mb-4'
            />
            {errors.password && (
              <p className='text-red-600'>{errors.password.message}</p>
            )}

            {/* Submit Button */}
            <button type='submit' className='btn btn-primary w-full'>
              Register
            </button>
          </form>

          <p className='mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='text-blue-500 hover:underline'>
              Login
            </Link>
          </p>

          <div className='mt-4'>
            <Google />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
