import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import useAxious from '../../../hooks/useAxious'

const ActiveRiders = () => {
  const axiosSecure = useAxious()
  const [searchText, setSearchText] = useState('')

  // Fetch active riders from backend
  const { data: riders = [], refetch } = useQuery({
    queryKey: ['active-riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders?status=active')
      return res.data
    },
  })

  // Handle deactivation
  const handleDeactivate = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Rider will be deactivated!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate!',
    })

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/riders/deactivate/${id}`)
      if (res.data.modifiedCount > 0) {
        Swal.fire('Done!', 'Rider deactivated.', 'success')
        refetch()
      }
    }
  }

  // Filter by name
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>✅ Active Riders</h2>

      {/* Search Box */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search by name...'
          className='input input-bordered w-full max-w-sm'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead className='bg-base-200'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Region</th>
              <th>Phone</th>
              <th>Bike Reg</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.phone}</td>
                <td>{rider.bike_reg}</td>
                <td>
                  <span className='badge badge-success'>{rider.status}</span>
                </td>
                <td>
                  <button
                    onClick={() => handleDeactivate(rider._id)}
                    className='btn btn-sm btn-error'
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRiders.length === 0 && (
          <p className='text-center text-gray-500 mt-4'>
            No active riders found.
          </p>
        )}
      </div>
    </div>
  )
}

export default ActiveRiders
