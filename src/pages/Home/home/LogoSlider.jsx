// components/LogoSlider.jsx
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import amazon from '../../../assets/brands/amazon.png'
import casio from '../../../assets/brands/casio.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randstad from '../../../assets/brands/randstad.png'
import startpeople from '../../../assets/brands/start-people 1.png'
import start from '../../../assets/brands/start.png'

const logos = [
  amazon,
  casio,
  amazon_vector,
  moonstar,
  randstad,
  startpeople,
  start,
]

const LogoSlider = () => {
  return (
    <div className='py-10 bg-white'>
      <h2 className='text-4xl text-black md:text-4xl font-bold text-center mb-4'>
        Our Partners
      </h2>
      <p className='text-center text-gray-600 max-w-2xl mx-auto mb-10'>
        We are proud to partner with leading brands and companies to provide
        exceptional delivery and logistics services across Bangladesh.
      </p>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        dir='rtl' // right to left
        className='flex items-center'
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img
              src={logo}
              alt={`Logo ${index + 1}`}
              className='h-7 w-auto object-contain mx-auto'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default LogoSlider
