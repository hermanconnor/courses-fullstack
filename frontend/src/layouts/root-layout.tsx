import { Outlet } from "react-router";
import Navbar from "@/components/navigation/navbar";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
