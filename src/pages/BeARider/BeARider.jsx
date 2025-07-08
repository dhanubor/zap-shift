import React from 'react'
import { useForm } from 'react-hook-form'
import { useLoaderData } from 'react-router'
import Swal from 'sweetalert2'
import useAuth from './../../hooks/useAuth'
import useAxious from './../../hooks/useAxious'

const BeARider = () => {
  const { user } = useAuth()
  const axiosSecure = useAxious()
  const serviceCenters = useLoaderData() // Preloaded via route loader

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const selectedRegion = watch('region')

  // Extract unique regions
  const uniqueRegions = [...new Set(serviceCenters.map((w) => w.region))]

  // Filter districts based on selected region
  const getDistrictsByRegion = (region) =>
    serviceCenters
      .filter((center) => center.region === region)
      .map((center) => center.district)

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user.displayName,
      email: user.email,
      status: 'pending', // Default status
      appliedAt: new Date().toISOString(),
    }

    try {
      const res = await axiosSecure.post('/riders', riderData)
      if (res.data.insertedId) {
        Swal.fire(
          '✅ Application Submitted',
          'We’ll review and get back to you.',
          'success'
        )
      }
      
    } catch (error) {
      console.error('Rider application error:', error)
      Swal.fire('❌ Error', 'Could not submit application.', 'error')
    }
  }

  return (
    <div className='p-6 max-w-3xl mx-auto  bg-white shadow-lg rounded-xl'>
      <h2 className='text-3xl font-bold mb-4 text-center text-black'>
        🏍️ Apply to Be a Rider
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Name */}
        <div className='text-black'>
          <label className='label'>Full Name</label>
          <input
            value={user?.displayName || ''}
            readOnly
            className='input input-bordered w-full bg-gray-100'
          />
        </div>

        {/* Email */}
        <div className='text-black'>
          <label className='label'>Email</label>
          <input
            value={user?.email || ''}
            readOnly
            className='input input-bordered w-full bg-gray-100'
          />
        </div>

        {/* Age */}
        <div>
          <label className='label'>Age</label>
          <input
            type='number'
            {...register('age', { required: true })}
            placeholder='Enter your age'
            className='input input-bordered w-full'
          />
          {errors.age && (
            <p className='text-red-500 text-sm'>Age is required</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className='label'>Phone Number</label>
          <input
            type='tel'
            {...register('phone', { required: true })}
            placeholder='Enter your phone number'
            className='input input-bordered w-full'
          />
        </div>

        {/* NID */}
        <div>
          <label className='label'>National ID Number</label>
          <input
            type='text'
            {...register('nid', { required: true })}
            placeholder='Your NID Number'
            className='input input-bordered w-full'
          />
        </div>

        {/* Region */}
        <div>
          <label className='label'>Region</label>
          <select
            {...register('region', { required: true })}
            className='select select-bordered w-full'
          >
            <option value=''>Select Region</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className='label'>District / Center</label>
          <select
            {...register('district', { required: true })}
            className='select select-bordered w-full'
          >
            <option value=''>Select District</option>
            {getDistrictsByRegion(selectedRegion).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Bike Brand */}
        <div>
          <label className='label'>Bike Brand</label>
          <input
            {...register('bikeBrand', { required: true })}
            placeholder='Example: Yamaha, Honda...'
            className='input input-bordered w-full'
          />
        </div>

        {/* Registration Number */}
        <div>
          <label className='label'>Bike Registration Number</label>
          <input
            {...register('bikeRegNo', { required: true })}
            placeholder='Example: DHA-12345'
            className='input input-bordered w-full'
          />
        </div>

        {/* Submit */}
        <div className='text-center'>
          <button className='btn btn-primary'>🚀 Submit Application</button>
        </div>
      </form>
    </div>
  )
}

export default BeARider
