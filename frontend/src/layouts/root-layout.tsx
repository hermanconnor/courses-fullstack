import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 '>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
