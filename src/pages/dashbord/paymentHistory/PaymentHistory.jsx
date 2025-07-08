import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxious from '../../../hooks/useAxious'
import { useQuery } from '@tanstack/react-query'

const PaymentHistory = () => {
  const { user } = useAuth()
  const axiosSecure = useAxious()

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['payment-history', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user.email}`)
      return res.data
    },
  })

  if (isLoading)
    return <p className='text-center'>Loading payment history...</p>
  return (
    <div className='p-4 max-w-6xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>🧾 Payment History</h2>

      <div className='overflow-x-auto'>
        <table className='table table-zebra w-full'>
          <thead className='bg-base-200 text-base-content'>
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Transaction ID</th>
              <th>Amount (৳)</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.parcelId}</td>
                <td className='text-xs'>{record.transactionId}</td>
                <td>৳{record.amount}</td>
                <td>{new Date(record.paymentDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <p className='text-center text-gray-500 mt-6'>No payments found.</p>
        )}
      </div>
    </div>
  )
}

export default PaymentHistory
