import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import banner1 from '../../../assets/banner/banner1.png'
import banner2 from '../../../assets/banner/banner2.png'
import banner3 from '../../../assets/banner/banner3.png'

const Banner = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
      >
        <div>
          <img src={banner1} alt='banner1' />
          <p className='legend'>Legend 1</p>
        </div>
        <div>
          <img src={banner2} alt='banner2' />
          <p className='legend'>Legend 2</p>
        </div>
        <div>
          <img src={banner3} alt='banner3' />
          <p className='legend'>Legend 3</p>
        </div>
      </Carousel>
    </div>
  )
}

export default Banner
