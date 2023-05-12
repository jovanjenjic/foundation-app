import React, { lazy, Suspense } from 'react';
import Layout from '@components/Layouts/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Spinner from '@components/Layouts/Spinner';

const EmployeeListPage = lazy(() => import('@pages/EmployeeListPage'));
const DeletedEmployeesListPage = lazy(
  () => import('@pages/DeletedEmployeesListPage'),
);
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
            <EmployeeListPage />
          </Suspense>
        ),
      },
      {
        path: 'deleted-employees',
        element: (
          <Suspense fallback={<Spinner />}>
            <DeletedEmployeesListPage />
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
