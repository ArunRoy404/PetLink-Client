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


const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
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
                Component: DashBoardHomeUser
            },
            {
                path: 'add-pet',
                Component: AddPet
            },
            {
                path: 'my-added-pets',
                Component: MyAddedPets,
            },
            {
                path: 'update-pet/:id',
                Component: UpdatePet
            },
            {
                path: 'create-campaign',
                Component: CreateDonationCampaign
            },
            {
                path: 'my-campaigns',
                Component: MyDonationCampaigns
            }
        ]
    },
    {
        path: '/*',
        Component: Error
    }
])

export default router;