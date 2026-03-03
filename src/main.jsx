import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";
import Root from './Components/Root';
import Home from './Components/Home';
import PetLists from './Components/PetLists';
import DonationCampaigns from './Components/DonationCampaigns';
import Login from './Components/Login';
import Register from './Components/Register';
import AuthProvider from './Components/Provider/AuthProvider';
import PetDetails from './Components/PetDetails';
import Dashboard from './Components/Dashboard';
import Addpet from './Components/User/Addpet';
import MyAddedpets from './Components/User/MyAddedpets';
import AdoptionRequest from './Components/User/AdoptionRequest';
import CreateDonationCampaign from './Components/User/CreateDonationCampaign';
import MyDonationCampaign from './Components/User/MyDonationCampaign';
import MyDonations from './Components/User/MyDonations';
import UpdatePet from './Components/User/UpdatePet';
import DonationDetails from './Components/DonationDetails';
import EditDonation from './Components/User/EditDonation';
import User from './Components/Admin/User';
import AllPets from './Components/Admin/AllPets';
import AllDonations from './Components/Admin/AllDonations';
import ErrorPage from './Components/ErrorPage';
import DashboardRedirect from './Components/DashboardRedirect';

import Success from './Components/Success';
import PrivateRoute from './Components/PrivateRoute';
import Addproduct from './Components/User/Addproduct';
import MngProducts from './Components/Admin/MngProducts';
import PetAccesories from './Components/PetAccesories';
import Mycart from './Components/User/Mycart';
import Orders from './Components/User/Orders';
import MngPets from './Components/Admin/MngPets';
import MngDonations from './Components/Admin/MngDonations';
import AboutUs from './Components/AboutUS';
import OrderHistory from './Components/Admin/OrderHistory';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/petlist',
        element: <PetLists></PetLists>
      },
      {
        path: '/donationcampaigns',
        element: <DonationCampaigns></DonationCampaigns>,
      },
      {
        path: '/donation-details/:id',
        element: <DonationDetails></DonationDetails>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/petlist/:id',
        element: <PetDetails></PetDetails>
      },
      {
        path: '/success',
        element: <PrivateRoute><Success></Success> </PrivateRoute>
      },
      {
        path: '/petaccesories',
        element: <PetAccesories></PetAccesories>
      },
      {
        path: '/aboutus',
        element: <AboutUs></AboutUs>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>

      <Dashboard></Dashboard>
    </PrivateRoute>,
    children: [
      {
        index: true,
        element: <DashboardRedirect></DashboardRedirect>
      },
      {

        path: '/dashboard/addpet',
        element: <PrivateRoute>


          <Addpet></Addpet>
        </PrivateRoute>
      },
      {
        path: '/dashboard/myaddedpets',
        element: <PrivateRoute>

          <MyAddedpets></MyAddedpets>
        </PrivateRoute>
      },
      {
        path: '/dashboard/adoptionrequest',
        element: <PrivateRoute>

          <AdoptionRequest></AdoptionRequest>
        </PrivateRoute>
      },
      {
        path: '/dashboard/createdonationcampaign',
        element: <PrivateRoute>

          <CreateDonationCampaign></CreateDonationCampaign>
        </PrivateRoute>
      },
      {
        path: '/dashboard/mydonationcampaigns',
        element: <PrivateRoute>

          <MyDonationCampaign></MyDonationCampaign>
        </PrivateRoute>
      },
      {
        path: '/dashboard/mydonations',
        element: <PrivateRoute>

          <MyDonations></MyDonations>
        </PrivateRoute>
      },
      {
        path: '/dashboard/updatepet/:id',
        element: <PrivateRoute>

          <UpdatePet></UpdatePet>
        </PrivateRoute>
      },
      {
        path: '/dashboard/edit-donation/:id',
        element: <PrivateRoute>

          <EditDonation></EditDonation>
        </PrivateRoute>
      },
      {
        path: '/dashboard/mycart',
        element: <PrivateRoute>
          <Mycart></Mycart>
        </PrivateRoute>
      },
      {
        path: '/dashboard/orders',
        element: <PrivateRoute>
          <Orders></Orders>
        </PrivateRoute>
      },

      {
        path: '/dashboard/users',
        element: <PrivateRoute>

          <User></User>
        </PrivateRoute>
      },
      {
        path: '/dashboard/allpets',
        element: <PrivateRoute>

          <AllPets></AllPets>
        </PrivateRoute>
      },
      {
        path: '/dashboard/alldonations',
        element: <PrivateRoute>

          <AllDonations></AllDonations>
        </PrivateRoute>
      },
      {
        path: '/dashboard/addproduct',
        element: <PrivateRoute>
          <Addproduct></Addproduct>
        </PrivateRoute>
      },
      {
        path: '/dashboard/mngproducts',
        element: <PrivateRoute>


          <MngProducts></MngProducts>
        </PrivateRoute> 
      },
      {
        path: '/dashboard/mngpets',
        element: <PrivateRoute>
          <MngPets></MngPets>
        </PrivateRoute>
      },
      {
        path: '/dashboard/mngdonations',
        element: <PrivateRoute>
          <MngDonations></MngDonations>
        </PrivateRoute>
      },
      {
        path: '/dashboard/orderhistory',
        element: <PrivateRoute>
          <OrderHistory></OrderHistory>
        </PrivateRoute>
      }
      


    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
  
        <RouterProvider router={router} />
      
    </AuthProvider>
  </StrictMode>,
)
