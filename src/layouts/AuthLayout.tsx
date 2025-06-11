import { Outlet } from 'react-router-dom';
import React from 'react';

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </main>
  );
};

export default AuthLayout;