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

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 min-h-[80vh]">
          
          {/* Left half - Content */}
          <div className="flex flex-col items-start justify-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium mb-4 border border-white/20 animate-fade-in">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span className="text-white">For Innovators, Dreamers, and Achievers</span>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white animate-slide-up">
                Transform Your Career
                <br />
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  With RES-VA
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-blue-50 mb-6 leading-relaxed animate-slide-up-delay">
                Join a world-class team of innovators, dreamers, and achievers. 
                We're not just building careers—we're building futures.
              </p>

              {/* CTA Button */}
              <div className="flex justify-start animate-slide-up-delay-2 mb-8">
                <Link 
                  to="/apply" 
                  className="group relative px-8 py-4 bg-[#31a9df] text-white font-bold text-lg md:text-xl transition-all duration-300 shadow-2xl flex items-center gap-3"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { number: '300+', label: 'team members' },
                  { number: '3+', label: 'countries' },
                  { number: '98%', label: 'satisfaction' }
                ].map((stat, i) => (
                  <div key={i} className="text-left animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">{stat.number}</div>
                    <div className="text-blue-100 text-xs">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right half - CEO Message Video Card */}
          <div className="flex items-center justify-center">
            <div className="relative animate-fade-in w-full max-w-lg">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl"></div>
              
              {/* Video card container */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                <div className="mb-4 text-center">
                  <h3 className="text-gray-700 text-2xl font-bold">
                    Our CEO's message to you
                  </h3>
                </div>
                
                {/* Video */}
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                  <video 
                    className="w-full h-full object-contain"
                    controls
                    poster=""
                  >
                    <source src="/Ziad front page.mov" type="video/quicktime" />
                    <source src="/Ziad front page.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white rounded-full opacity-20 blur-2xl"></div>
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