import React, { useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

interface TeamMember {
  name: string;
  image: string;
  startPosition: string;
  currentPosition: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Boody Reda',
    image: '/Employees Success/Boody.jpeg',
    startPosition: 'Cold Caller',
    currentPosition: 'Head of Lead Management',
  },
  {
    name: 'Ahmed Hanafy',
    image: '/Employees Success/Ahmed Hanafy.png',
    startPosition: 'Cold Caller',
    currentPosition: 'Head of Operations',
  },
  {
    name: 'Hassan Mim',
    image: '/Employees Success/Hassan Mim.png',
    startPosition: 'Texter',
    currentPosition: 'Client Success Specialist',
  },
  {
    name: 'Kareem Amr',
    image: '/Employees Success/Kareem Amr.jpg',
    startPosition: 'Cold Caller',
    currentPosition: 'Trainer',
  },
  {
    name: 'Mohamed Nehad',
    image: '/Employees Success/Mohamed Nehad.jpeg',
    startPosition: 'Cold Caller',
    currentPosition: 'Account Manager',
  },
  {
    name: 'Youssef Mohamed',
    image: '/Employees Success/Youssef Mohamed.jpg',
    startPosition: 'Cold Caller',
    currentPosition: 'Project Manager',
  },
  {
    name: 'Dina Zahran',
    image: '/Employees Success/Dina Zahran.jpg',
    startPosition: 'Cold Caller',
    currentPosition: 'Account Manager',
  },
  {
    name: 'Ali Zaki',
    image: '/Employees Success/Ali Zaki.jpg',
    startPosition: 'Cold Caller',
    currentPosition: 'Quality Team Leader',
  },
];

export const TeamGrowth: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      id="team"
      className="relative py-24 px-6 overflow-hidden"
      style={{
        backgroundColor: '#0F2346',
        backgroundImage: 'url(/Lines-Dark-BG.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#31a9df] rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500 rounded-full opacity-5 blur-3xl animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes fade-slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer-card {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(49, 169, 223, 0.3); }
          50% { box-shadow: 0 0 40px rgba(49, 169, 223, 0.6); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-6 border border-white/20">
            <TrendingUp className="w-4 h-4 text-[#31a9df]" />
            <span className="text-white/80">Growth Stories</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
            See How Our Team Grows
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Real success stories from our team members who started their journey with us 
            and rose to leadership positions
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
              style={{
                animation: `fade-slide-up 0.8s ease-out ${index * 0.1}s forwards`,
                opacity: 0
              }}
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-[#31a9df]/50 hover:shadow-2xl hover:shadow-[#31a9df]/20 hover:-translate-y-2">
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 overflow-hidden">
                  <div 
                    className={`absolute inset-0 w-full h-full transition-transform duration-700 ${hoveredIndex === index ? 'translate-x-0' : '-translate-x-full'}`}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(49, 169, 223, 0.2), transparent)',
                    }}
                  ></div>
                </div>

                {/* Glow effect on image */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#31a9df] to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 group-hover:border-[#31a9df]/60 transition-all duration-500">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Status badge */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Promoted
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white text-center mb-6 group-hover:text-[#31a9df] transition-colors duration-300">
                  {member.name}
                </h3>

                {/* Career Progression */}
                <div className="space-y-4">
                  {/* Start Position */}
                  <div className="relative">
                    <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full"></div>
                    <div className="pl-4">
                      <p className="text-xs text-white/50 font-medium mb-1 uppercase tracking-wider">Started as</p>
                      <p className="text-sm text-white/80 font-semibold">
                        {member.startPosition}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center py-2">
                    <div className="relative">
                      <div className="h-8 w-0.5 bg-gradient-to-b from-white/30 via-[#31a9df]/50 to-emerald-500/50"></div>
                      <TrendingUp className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-5 text-emerald-400 animate-pulse" />
                    </div>
                  </div>

                  {/* Current Position */}
                  <div className="relative bg-gradient-to-br from-[#31a9df]/20 to-purple-500/20 border border-[#31a9df]/30 rounded-xl p-4 backdrop-blur-sm">
                    <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#31a9df] rounded-full animate-pulse"></div>
                    <p className="text-xs text-[#31a9df] font-bold mb-1 uppercase tracking-wider">Now</p>
                    <p className="text-base text-white font-bold">
                      {member.currentPosition}
                    </p>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#31a9df]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
            <p className="text-2xl md:text-3xl text-white font-bold mb-6">
              Start Your Success Story With Us
            </p>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Join a team where growth isn't just possible—it's inevitable. Your journey to leadership starts here.
            </p>
            <a
              href="/apply"
              className="inline-flex items-center gap-3 bg-[#31a9df] text-white font-bold px-10 py-5 transition-all duration-300 shadow-xl group"
            >
              <span>Join Our Team</span>
              <ArrowRight className="w-6 h-6 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

