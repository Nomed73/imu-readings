import { Navigate } from 'react-router-dom';
import { DefaultLayout } from '../layouts';
import { Dev } from "../Views";


const publicRoutes = [
  {
    path: '/',
    exact: true,
    layout: DefaultLayout,
    element: () => <Navigate to="/dev" />,
  },
  {
    path: '/dev',
    exact: true,
    layout: DefaultLayout,
    element: Dev,
  },
];

export default publicRoutes;
