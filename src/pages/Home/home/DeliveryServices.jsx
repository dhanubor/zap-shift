// components/DeliveryServices.jsx
import React from 'react'
import ServiceCard from './ServiceCard'
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from 'react-icons/fa'

const services = [
  {
    title: 'Express & Standard Delivery',
    description:
      'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
    icon: <FaShippingFast className='text-4xl text-green-600' />,
  },
  {
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
    icon: <FaMapMarkedAlt className='text-4xl text-blue-600' />,
  },
  {
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
    icon: <FaWarehouse className='text-4xl text-yellow-600' />,
  },
  {
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
    icon: <FaMoneyBillWave className='text-4xl text-purple-600' />,
  },
  {
    title: 'Corporate Service / Contract In Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.',
    icon: <FaBuilding className='text-4xl text-indigo-600' />,
  },
  {
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
    icon: <FaUndo className='text-4xl text-red-500' />,
  },
]

const DeliveryServices = () => {
  return (
    <div className='py-16 px-4 max-w-7xl mx-auto'>
      <h2 className='text-4xl md:text-4xl font-bold text-center mb-4'>
        Our Delivery & Fulfillment Services
      </h2>
      <p className='text-center text-gray-600 max-w-2xl mx-auto mb-10'>
        We offer fast, secure and reliable delivery services across Bangladesh
        including corporate logistics, inventory management, and return
        handling. Explore our six key solutions below.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  )
}

export default DeliveryServices
