import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import MainPage from '../pages/MainPage';

import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_ROUTE
} from '../utils/constants'

export const authRoutes = [];
export const publickRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Register
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    }
];