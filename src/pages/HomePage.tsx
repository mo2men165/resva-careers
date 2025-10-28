import React from 'react';
import { Hero } from '../components/Hero';
import { Gallery } from '../components/Gallery';
import { Benefits } from '../components/Benefits';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Gallery />
      <Benefits />
      
      <footer className="bg-gray-900 text-[#9a9a9a] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <img 
              src="/Res-Va-Blue-Logo.png" 
              alt="RES-VA Logo" 
              className="h-12 w-auto"
            />
          </div>
          <div className="text-center md:text-right">
            <p>&copy; 2025 RES-VA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
