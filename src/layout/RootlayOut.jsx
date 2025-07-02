import React from 'react'
import { Outlet } from 'react-router'
import Navber from '../components/Navber'
import Footer from '../components/Footer'

const RootlayOut = () => {
  return (
    <div>
      <Navber />
      {/* This Outlet will render the child routes */}
      <Outlet />
      <Footer />
    </div>
  )
}

export default RootlayOut
