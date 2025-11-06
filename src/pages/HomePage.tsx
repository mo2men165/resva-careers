import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Benefits } from '../components/Benefits';
import { CoreValues } from '../components/CoreValues';
import { TeamGrowth } from '../components/TeamGrowth';
import { CareerRoadmap } from '../components/CareerRoadmap';
import { Gallery } from '../components/Gallery';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      {/* <Benefits /> */}
      <CoreValues />
      <CareerRoadmap />
      <TeamGrowth />
      <Gallery />
      
      <footer 
        className="relative py-8 px-6 overflow-hidden"
        style={{
          backgroundColor: '#0F2346',
          backgroundImage: 'url(/Lines-Dark-BG.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center">
            <img 
              src="/Res-Va-Blue-Logo.png" 
              alt="RES-VA Logo" 
              className="h-12 w-auto"
            />
          </div>
          <div className="text-center md:text-right">
            <p className="text-white/70">&copy; 2025 RES-VA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
