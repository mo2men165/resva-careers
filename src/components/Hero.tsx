import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 60px rgba(255, 255, 255, 0.4), 0 0 120px rgba(255, 255, 255, 0.2); }
        }
        @keyframes logo-glow {
          0%, 100% { filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.4)); }
          50% { filter: drop-shadow(0 0 50px rgba(255, 255, 255, 0.6)); }
        }
        .animate-float { animation: float ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-slide-up-delay { animation: slide-up 0.8s ease-out 0.2s forwards; opacity: 0; }
        .animate-slide-up-delay-2 { animation: slide-up 0.8s ease-out 0.4s forwards; opacity: 0; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-logo-glow { animation: logo-glow 4s ease-in-out infinite; }
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

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 min-h-[80vh]">
          
          {/* Left half - Logo centered */}
          <div className="flex items-center justify-center">
            <div className="relative animate-fade-in">
              {/* Glowing background circles */}
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl scale-110"></div>
              <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
              
              {/* Logo container */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
                <img 
                  src="/Res-Va-Blue-Logo.png" 
                  alt="RES-VA Logo" 
                  className="w-full max-w-md h-auto animate-logo-glow"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-full opacity-20 blur-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Right half - Content centered */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-8 border border-white/20 animate-fade-in">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-white">For Innovators, Dreamers, and Achievers</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white animate-slide-up">
                Transform Your Career
                <br />
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  With RES-VA
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-50 mb-10 leading-relaxed animate-slide-up-delay">
                Join a world-class team of innovators, dreamers, and achievers. 
                We're not just building careers—we're building futures.
              </p>

              {/* CTA Button */}
              <div className="flex justify-center animate-slide-up-delay-2 mb-12">
                <Link 
                  to="/apply" 
                  className="group relative px-10 py-5 bg-white text-[#31a9df] rounded-full font-bold text-xl md:text-2xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-3 animate-pulse-glow"
                >
                  <span>Apply Now</span>
                  <div className="w-10 h-10 bg-[#31a9df] rounded-full flex items-center justify-center group-hover:bg-[#29aae0] transition-colors">
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: '200+', label: 'Team Members' },
                  { number: '10+', label: 'Countries' },
                  { number: '98%', label: 'Satisfaction' }
                ].map((stat, i) => (
                  <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

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