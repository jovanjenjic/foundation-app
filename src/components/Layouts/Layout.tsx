import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '@components/Layouts/Topbar';

const Layout: React.FC = () => {
  return (
    <div>
      <Topbar />
      <main style={{ margin: '30px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
