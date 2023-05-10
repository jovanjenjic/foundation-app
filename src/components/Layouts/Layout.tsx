import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '@components/Layouts/Topbar';

const Layout: React.FC = () => {
  return (
    <div>
      <Topbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
