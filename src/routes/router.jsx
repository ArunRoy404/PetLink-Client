import { createBrowserRouter } from 'react-router'
import MainLayout from '../Layouts/MainLayout';
import Home from '../pages/Home/Home';
import Error from '../pages/Error/Error';
import SignInPage from '../pages/Auth/SignInPage';
import AuthLayout from '../Layouts/AuthLayout';
import SignUpPage from '../pages/Auth/SignUpPage';
import DashboardLayout from '../Layouts/DashboardLayout';
import DashBoardHomeUser from '../pages/User Dashboard/DashBoardHomeUser';
import AddPet from '../pages/User Dashboard/AddPet';
import MyAddedPets from '../pages/User Dashboard/MyAddedPets';
import UpdatePet from '../components/UpdatePet.jsx/UpdatePet';
import CreateDonationCampaign from '../pages/User Dashboard/CreateDonationCampaign';
import MyDonationCampaigns from '../pages/User Dashboard/MyDonationCampaigns';
import UpdateCampaign from '../components/UpdateCampaign/UpdateCampaign';
import MyDonations from '../pages/User Dashboard/MyDonations';
import AdoptionRequests from '../pages/User Dashboard/AdoptionRequests';
import Users from '../pages/AdminDashboard.jsx/Users';
import AllPets from '../pages/AdminDashboard.jsx/AllPets';
import AllCampaigns from '../pages/AdminDashboard.jsx/AllCampaigns';
import PetListing from '../pages/PetListing/PetListing';
import PetDetails from '../pages/PetDetails/PetDetails';
import DonationCampaigns from '../pages/DonationCampaigns';
import DonationDetails from '../pages/DonationDetails/DonationDetails';
import Payment from '../pages/Payment/Payment';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AdminRoute from './PrivateRoute/AdminRoute';


const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/pet-listing',
                Component: PetListing
            },
            {
                path: 'pets/:petId',
                element: <PrivateRoute><PetDetails /></PrivateRoute>
            },
            {
                path: '/campaigns',
                Component: DonationCampaigns
            },
            {
                path: '/campaign/:campaignId',
                element: <PrivateRoute><DonationDetails /></PrivateRoute>
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: 'sign-in',
                Component: SignInPage
            },
            {
                path: 'sign-up',
                Component: SignUpPage
            }
        ]
    },
    {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
            {
                index: true,
                element: <PrivateRoute><DashBoardHomeUser /></PrivateRoute>
            },
            {
                path: 'add-pet',
                element: <PrivateRoute><AddPet /></PrivateRoute>
            },
            {
                path: 'my-added-pets',
                element: <PrivateRoute><MyAddedPets /></PrivateRoute>
            },
            {
                path: 'adoption-requests',
                element: <PrivateRoute><AdoptionRequests /></PrivateRoute>
            },
            {
                path: 'update-pet/:id',
                element: <PrivateRoute><UpdatePet /></PrivateRoute>
            },
            {
                path: 'create-campaign',
                element: <PrivateRoute><CreateDonationCampaign /></PrivateRoute>
            },
            {
                path: 'my-campaigns',
                element: <PrivateRoute><MyDonationCampaigns /></PrivateRoute>
            },
            {
                path: 'update-campaign/:id',
                element: <PrivateRoute><UpdateCampaign /></PrivateRoute>
            },
            {
                path: 'my-donations',
                element: <PrivateRoute><MyDonations /></PrivateRoute>
            },
            {
                path: 'users',
                element: <AdminRoute><Users/></AdminRoute>
            },
            {
                path: 'all-pets',
                 element: <AdminRoute><AllPets/></AdminRoute>
            },
            {
                path: 'all-campaigns',
                 element: <AdminRoute><AllCampaigns/></AdminRoute>
            }
        ]
    },
    {
        path: '/*',
        Component: Error
    }
])

export default router;