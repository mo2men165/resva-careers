import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';

export const Hero = () => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#31a9df] via-[#29aae0] to-[#31a9df]">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-slide-up-delay { animation: slide-up 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delay-2 { animation: slide-up 0.8s ease-out 0.4s forwards; opacity: 0; }
      `}</style>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 -left-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl animate-pulse"
          style={{ transform: `translateY(${offset * 0.3}px)` }}
        ></div>
        <div 
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-white rounded-full opacity-5 blur-3xl"
          style={{ transform: `translateY(${-offset * 0.2}px)` }}
        ></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-300 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-8 border border-white/20 animate-fade-in">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-white">Now Hiring Top Talent</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white animate-slide-up">
          Transform Your Career
          <br />
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            With RES-VA
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-50 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay">
          Join a world-class team of innovators, dreamers, and achievers. 
          We're not just building careers—we're building futures.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay-2">
          <a 
            href="#application" 
            className="group px-8 py-4 bg-white text-[#31a9df] rounded-full font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-2"
          >
            Apply Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
          {[
            { number: '500+', label: 'Team Members' },
            { number: '50+', label: 'Countries' },
            { number: '98%', label: 'Satisfaction' }
          ].map((stat, i) => (
            <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronRight className="w-6 h-6 text-white rotate-90" />
      </div>
    </div>
  );
};

export default Hero;