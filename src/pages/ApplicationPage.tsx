import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ApplicationForm } from '../components/ApplicationForm';

export const ApplicationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-[#31a9df] hover:text-[#29aae0] transition-colors font-medium group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex items-center">
            <img 
              src="/Res-Va-Blue-Logo.png" 
              alt="RES-VA Logo" 
              className="h-10 w-auto"
            />
          </div>
        </div>
      </header>

      <ApplicationForm />
      
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

export default ApplicationPage;
