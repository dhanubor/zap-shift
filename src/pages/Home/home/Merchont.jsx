import React from 'react'
import locationMerchot from '../../../assets/location-merchant.png'

const Merchont = () => {
  return (
    <div>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <img
            src={locationMerchot}
            alt='Merchant Location'
            className='max-w-sm rounded-lg shadow-2xl'
          />
          <div>
            <h1 className='text-5xl font-bold'>Box Office News!</h1>
            <p className='py-6'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className='btn btn-primary mx-5'>Get Started</button>
            <button class='btn btn-dash btn-success '>Success</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Merchont
