// components/ServiceCard.jsx
import React from 'react'

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className='bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition duration-300'>
      <div className='flex flex-col items-center text-center space-y-4'>
        <div className='bg-gray-100 p-4 rounded-full'>{icon}</div>
        <h3 className='text-lg font-semibold text-black'>{title}</h3>
        <p className='text-gray-600 text-sm'>{description}</p>
      </div>
    </div>
  )
}

export default ServiceCard
