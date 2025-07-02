// components/BenefitsSection.jsx
import React from 'react'
import { FaBolt, FaShieldAlt, FaHandsHelping, FaSmile } from 'react-icons/fa'

const benefits = [
  {
    title: 'Lightning Fast',
    description:
      'Get your deliveries done faster than ever before with our optimized logistics.',
    icon: <FaBolt className='text-4xl text-yellow-500' />,
  },
  {
    title: 'Secure & Reliable',
    description:
      'We ensure product safety with trusted delivery agents and tracking.',
    icon: <FaShieldAlt className='text-4xl text-green-600' />,
  },
  {
    title: 'Friendly Support',
    description:
      'Need help? Our team is always ready with instant solutions and care.',
    icon: <FaHandsHelping className='text-4xl text-blue-500' />,
  },
  {
    title: 'Customer Satisfaction',
    description: 'Over 98% of our users are satisfied and come back again.',
    icon: <FaSmile className='text-4xl text-pink-500' />,
  },
]

const BenefitsSection = () => {
  return (
    <div className='py-16 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-4 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6'>
          Benefits of Using Our Service
        </h2>
        <p className='text-gray-600 max-w-2xl mx-auto mb-12'>
          Discover the powerful advantages of partnering with us — from fast
          deliveries to outstanding support, we are here to grow your business.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {benefits.map((item, index) => (
            <div
              key={index}
              className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-left'
            >
              <div className='mb-4'>{item.icon}</div>
              <h3 className='text-lg font-semibold mb-2'>{item.title}</h3>
              <p className='text-gray-600 text-sm'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BenefitsSection
