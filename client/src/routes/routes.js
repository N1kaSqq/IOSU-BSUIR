import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import MainPage from '../pages/MainPage';
import EmployeesPage from '../pages/EmployeesPage';
import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    MAIN_ROUTE,
    EMPLOYEES_ROUTE,
    DEPARTMENTS_ROUTE
} from '../utils/constants'
import UserPage from '../pages/UserPage';
import DepartmentPage from '../pages/DepartmentPage';
import AllDepartmentsPage from '../pages/AllDepartmentsPage';

export const authRoutes = [
    {
        path: EMPLOYEES_ROUTE,
        Component: EmployeesPage
    },
    {
        path: EMPLOYEES_ROUTE + '/:id',
        Component: UserPage
    },
    {
        path: DEPARTMENTS_ROUTE,
        Component: AllDepartmentsPage
    },
    {
        path: DEPARTMENTS_ROUTE + '/:id',
        Component: DepartmentPage
    },
];
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