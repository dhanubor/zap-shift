import { createBrowserRouter } from 'react-router'
import RootlayOut from '../layout/RootlayOut'
import Home from '../pages/Home/home/Home'
import AuthLayout from '../layout/AuthLayout'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Coverrage from '../pages/Map/Coverrage'
import PrivateRoutes from './PrivateRoutes'
import DashbordLayout from '../layout/DashbordLayout'
import Mypersel from '../pages/dashbord/Mypersel'
import Payment from '../pages/dashbord/pament/Payment'
import SendParcel from '../pages/sendPersel/SendPersel'
import PaymentHistory from '../pages/dashbord/paymentHistory/PaymentHistory'
import BeARider from '../pages/BeARider/BeARider'
import PendingRiders from '../pages/dashbord/Pending Riders/PendingRiders'
import ActiveRiders from '../pages/dashbord/Active Riders/ActiveRiders'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootlayOut,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/coverrage',
        Component: Coverrage,
        loader: () => fetch('./warehouses.json'),
      },
      {
        path: '/sendPersel',
        element: (
          <PrivateRoutes>
            <SendParcel />
          </PrivateRoutes>
        ),
        loader: () => fetch('./warehouses.json'),
      },
      {
        path: '//beARider',
        element: (
          <PrivateRoutes>
            <BeARider />
          </PrivateRoutes>
        ),
        loader: () => fetch('./warehouses.json'),
      },
    ],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  {
    path: '/dashbord',
    element: (
      <PrivateRoutes>
        <DashbordLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <Mypersel />, // ✅ Component → element হওয়া উচিত
      },
      {
        path: 'payment/:perselId',
        Component: Payment,
      },
      {
        path: 'paymentHistory',
        Component: PaymentHistory,
      },
      {
        path: 'pending-riders',
        Component: PendingRiders,
      },
      {
        path: 'active-riders',
        Component: ActiveRiders,
      },
    ],
  },
])
