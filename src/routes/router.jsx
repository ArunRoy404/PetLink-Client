import { createBrowserRouter } from 'react-router'
import MainLayout from '../Layouts/MainLayout';
import Home from '../pages/Home/Home';
import Error from '../pages/Error/Error';


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
        path: '/*',
        Component: Error
    }
])

export default router;