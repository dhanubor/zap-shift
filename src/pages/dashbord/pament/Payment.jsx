import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe(
  'pk_test_51RiC9n2Kybq2GvxCAZqv1xGJ5NysDQvwQV0LM4yBMjYPEXApRAi5h68AcR8VYIEmqpJTjRPq7IRBLnc9ay5yzQ1R00G3s9fmSr'
)

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm></CheckoutForm>
    </Elements>
  )
}

export default Payment
