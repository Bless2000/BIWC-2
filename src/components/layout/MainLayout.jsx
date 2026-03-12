import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background elements are handled by body::before and orbs in CSS */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Navigation Layer */}
      <header className="relative z-[1000]">
        <TopBar />
        <Navbar />
      </header>
      
      {/* Page Content Layer */}
      <main className="flex-grow pt-40 relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
