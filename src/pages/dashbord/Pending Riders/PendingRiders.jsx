import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Swal from 'sweetalert2'
import useAxious from '../../../hooks/useAxious'

const PendingRiders = () => {
  const axiosSecure = useAxious()
  const [selectedRider, setSelectedRider] = useState(null)

  // 🔁 Get all pending riders
  const { data: riders = [], refetch } = useQuery({
    queryKey: ['pending-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders?status=pending')
      return res.data
    },
  })

  // ✅ Approve rider
  const handleApprove = async (id) => {
    const res = await axiosSecure.patch(`/riders/approve/${id}`)
    if (res.data.modifiedCount > 0) {
      Swal.fire('Approved!', 'Rider has been approved.', 'success')
      refetch()
    }
  }

  // ❌ Cancel/Delete application
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will remove the application.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    })

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/riders/${id}`)
      if (res.data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Rider application removed.', 'success')
        refetch()
      }
    }
  }

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>🚧 Pending Riders</h2>

      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead className='bg-base-200'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.phone}</td>
                <td className='space-x-2'>
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className='btn btn-sm btn-info'
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleApprove(rider._id)}
                    className='btn btn-sm btn-success'
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {riders.length === 0 && (
          <p className='text-gray-500 mt-4 text-center'>No pending riders.</p>
        )}
      </div>

      {/* Rider Info Modal */}
      {selectedRider && (
        <div
          className='fixed inset-0 text-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50'
          onClick={() => setSelectedRider(null)}
        >
          <div
            className='bg-white p-6 rounded-xl w-full max-w-3xl relative shadow-lg'
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className='text-2xl font-semibold mb-4 text-center text-primary'>
              🛵 Rider Application Details
            </h2>
            <button
              className='absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-red-500'
              onClick={() => setSelectedRider(null)}
            >
              ✕
            </button>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p>
                  <strong>👤 Name:</strong> {selectedRider.name}
                </p>
                <p>
                  <strong>📧 Email:</strong> {selectedRider.email}
                </p>
                <p>
                  <strong>📱 Phone:</strong> {selectedRider.phone}
                </p>
                <p>
                  <strong>🎂 Age:</strong> {selectedRider.age}
                </p>
                <p>
                  <strong>🌍 Region:</strong> {selectedRider.region}
                </p>
                <p>
                  <strong>🏙️ District:</strong> {selectedRider.district}
                </p>
              </div>
              <div>
                <p>
                  <strong>🪪 NID:</strong> {selectedRider.nid}
                </p>
                <p>
                  <strong>🏍️ Bike Brand:</strong> {selectedRider.bike_brand}
                </p>
                <p>
                  <strong>🚘 Bike Reg No:</strong> {selectedRider.bike_reg}
                </p>
                <p>
                  <strong>📄 Status:</strong>{' '}
                  <span className='badge badge-warning'>
                    {selectedRider.status}
                  </span>
                </p>
              </div>
            </div>

            <div className='mt-6 flex justify-center gap-4'>
              <button
                onClick={() => handleApprove(selectedRider._id)}
                className='btn btn-success'
              >
                ✅ Approve
              </button>
              <button
                onClick={() => handleCancel(selectedRider._id)}
                className='btn btn-error'
              >
                ❌ Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PendingRiders
