import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
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
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import EditDonation from './Components/User/EditDonation';
import User from './Components/Admin/User';
import AllPets from './Components/Admin/AllPets';
import AllDonations from './Components/Admin/AllDonations';
import ErrorPage from './Components/ErrorPage';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

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
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        
        path: '/dashboard/addpet',
        element: <Addpet></Addpet>
      },
      {
        path: '/dashboard/myaddedpets',
        element: <MyAddedpets></MyAddedpets>
      },
      {
        path: '/dashboard/adoptionrequest',
        element: <AdoptionRequest></AdoptionRequest>
      },
      {
        path: '/dashboard/createdonationcampaign',
        element: <CreateDonationCampaign></CreateDonationCampaign>
      },
      {
        path: '/dashboard/mydonationcampaigns',
        element: <MyDonationCampaign></MyDonationCampaign>
      },
      {
        path: '/dashboard/mydonations',
        element: <MyDonations></MyDonations>
      },
      {
        path: '/dashboard/updatepet/:id',
        element: <UpdatePet></UpdatePet>
      },
      {
        path: '/dashboard/edit-donation/:id',
        element: <EditDonation></EditDonation>
      },
      {
        path: '/dashboard/users',
        element: <User></User>
      },
      {
        path: '/dashboard/allpets',
        element: <AllPets></AllPets>
      },
      {
        path: '/dashboard/alldonations',
        element: <AllDonations></AllDonations>
      }
      

    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
      </Elements>
    </AuthProvider>
  </StrictMode>,
)
