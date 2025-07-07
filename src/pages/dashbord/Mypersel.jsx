import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useAxious from '../../hooks/useAxious'
import { Link, useNavigate } from 'react-router'
import Swal from 'sweetalert2'

const Mypersel = () => {
  const { user } = useAuth()
  const axiosSecure = useAxious()
  const navigate = useNavigate()
  const [parcels, setParcels] = useState([])

  // Fetch Parcels
  const { isLoading } = useQuery({
    queryKey: ['my-parcels', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`)
      setParcels(res.data)
      return res.data
    },
  })
  const onPay = (id) => {
    console.log('first', id)
    navigate(`/dashbord/payment/${id}`)
  }
  // Delete Parcel Handler
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This parcel will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${id}`)
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Your parcel has been deleted.', 'success')
            // Update local state
            setParcels((prev) => prev.filter((p) => p._id !== id))
          } else {
            Swal.fire('Error', 'Failed to delete the parcel.', 'error')
          }
        } catch (error) {
          console.error(error)
          Swal.fire('Error', 'Something went wrong!', 'error')
        }
      }
    })
  }

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>📦 My Parcels</h2>
      <div className='overflow-x-auto'>
        <table className='table table-zebra w-full'>
          <thead>
            <tr className='bg-base-200 text-base-content'>
              <th>#</th>
              <th>Type</th>
              <th>Title</th>
              <th>Created At</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td className='capitalize'>{parcel.type}</td>
                <td>{parcel.title}</td>
                <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === 'paid'
                        ? 'badge-success'
                        : 'badge-error'
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className='space-x-2'>
                  <Link
                    to={`/dashboard/parcel/${parcel._id}`}
                    className='btn btn-sm btn-info'
                  >
                    View
                  </Link>
                  {parcel.payment_status === 'unpaid' && (
                    <button
                      onClick={() => onPay(parcel._id)}
                      className='btn btn-sm btn-warning'
                    >
                      Pay
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className='btn btn-sm btn-error'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {parcels.length === 0 && !isLoading && (
          <div className='text-center mt-4 text-gray-500'>
            No parcels found.
          </div>
        )}
      </div>
    </div>
  )
}

export default Mypersel
