import React, { lazy, Suspense } from 'react';
import Layout from '@components/Layouts/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Spinner from '@components/Layouts/Spinner';

const EmployeePage = lazy(() => import('@pages/Employee'));
const Page404 = lazy(() => import('@pages/Page404'));

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'employees',
        element: (
          <Suspense fallback={<Spinner />}>
            <EmployeePage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Spinner />}>
            <Page404 />
          </Suspense>
        ),
      },
    ],
  },
];

const App: React.FC = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
