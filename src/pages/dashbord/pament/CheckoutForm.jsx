import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxious from '../../../hooks/useAxious'

const CheckoutForm = () => {
  const { perselId } = useParams()
  const stripe = useStripe()
  const elements = useElements()
  const axiosSecoure = useAxious()

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [processing, setProcessing] = useState(false)

  // 🔄 পার্সেল ডেটা লোড করার জন্য
  const { isPending, data: parcelInfo } = useQuery({
    queryKey: ['parcels', perselId],
    queryFn: async () => {
      const res = await axiosSecoure.get(`/parcels/${perselId}`)
      return res.data
    },
  })

  // 🔄 লোডিং হলে দেখাবে
  if (isPending) {
    return <div className='text-center mt-10'>⏳ Loading Parcel Info...</div>
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess(false)
    setProcessing(true)

    if (!stripe || !elements) return

    const card = elements.getElement(CardElement)
    if (!card) return

    const amount = parcelInfo.cost
    const amountInCents = amount * 100

    // ✅ Step 1: Backend থেকে clientSecret আনা
    const intentRes = await axiosSecoure.post('/create-payment-intent', {
      amountInCents: amountInCents,
      parcelInfo, // আপনি চাইলে ব্যাকএন্ডে অর্ডার ডেটাও পাঠাতে পারেন
    })

    const clientSecret = intentRes.data.clientSecret
    console.log('Client Secret:', intentRes.data.clientSecret)

    // ✅ Step 2: Stripe থেকে confirm করা
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: 'Dhanu Bor Mondal', // চাইলে ইউজার নাম দিন
          },
        },
      })

    if (confirmError) {
      setError(confirmError.message)
      setProcessing(false)
    } else if (paymentIntent.status === 'succeeded') {
      // ✅ Payment Success হলে আপনি চাইলে Backend এ অর্ডার আপডেট পাঠাতে পারেন
      // await axiosSecoure.post('/update-payment', { paymentIntent, perselId })

      setSuccess(true)
      setError('')
      setProcessing(false)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-lg bg-white p-8 shadow-lg rounded-lg'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          💳 Make Your Payment
        </h2>

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* 🔘 Stripe কার্ড ইনপুট */}
          <div className='p-5 border rounded-md bg-gray-50'>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '18px',
                    color: '#32325d',
                    '::placeholder': { color: '#aab7c4' },
                    padding: '12px 16px',
                  },
                  invalid: { color: '#e53e3e' },
                },
              }}
            />
          </div>

          {/* ✅ সাবমিট বাটন */}
          <button
            type='submit'
            disabled={!stripe || processing}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200'
          >
            {processing ? 'Processing... ' : 'Pay Now '}${parcelInfo.cost}
          </button>

          {/* 🔴 Error ও ✅ Success Message */}
          {error && (
            <p className='text-center text-red-600 font-medium'>{error}</p>
          )}
          {success && (
            <p className='text-center text-green-600 font-medium'>
              ✅ Payment successful!
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default CheckoutForm
