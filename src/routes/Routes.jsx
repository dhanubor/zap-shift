import { createBrowserRouter } from 'react-router'
import RootlayOut from '../layout/RootlayOut'
import Home from '../pages/Home/home/Home'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootlayOut,
    children:[
      {
        index: true,
        Component: Home
      }
    ]
  },
])
