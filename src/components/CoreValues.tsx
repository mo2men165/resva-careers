import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, TrendingUp, ArrowRight } from 'lucide-react';

export const CoreValues = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const values = [
    {
      number: '01',
      title: 'Accountability',
      icon: <Shield className="w-8 h-8" />,
      description: 'We take ownership of our actions, our results, and our growth.',
      details: 'Each team member at RES-VA is empowered to deliver on promises, follow through on tasks, and hold themselves and others to the highest professional standard. Because when everyone is accountable, excellence becomes predictable.',
      color: 'from-cyan-400 to-blue-500',
      accentColor: '#31a9df'
    },
    {
      number: '02',
      title: 'Respect',
      icon: <Heart className="w-8 h-8" />,
      description: 'Respect is the foundation of every interaction with clients, colleagues, and ourselves.',
      details: 'We listen, communicate clearly, and treat every voice as valuable.',
      color: 'from-purple-400 to-pink-500',
      accentColor: '#a855f7'
    },
    {
      number: '03',
      title: 'Continuous Improvement',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Progress is part of our DNA.',
      details: 'From training programs and performance reviews to leadership opportunities, we believe in consistent learning and measurable growth. Our people don\'t just complete tasks; they get better at them every single day.',
      color: 'from-emerald-400 to-teal-500',
      accentColor: '#10b981'
    }
  ];

  return (
    <div id="values" className="relative py-24 px-6 overflow-hidden bg-white">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#31a9df] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 rounded-full text-sm font-medium mb-6 border border-blue-100">
            <div className="w-2 h-2 bg-[#31a9df] rounded-full animate-pulse"></div>
            <span className="text-blue-600">What Drives Us</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
            Our Core Values
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our core values shape how we work, lead, and grow together. With us, you'll build a career that strengthens both your skills and your mindset.
          </p>
        </div>

        {/* Values Cards */}
        <div className="space-y-8">
          {values.map((value, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
              style={{
                animation: `fade-in-up 0.8s ease-out ${i * 0.2}s forwards`,
                opacity: 0
              }}
            >
              <div className="relative bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 overflow-hidden transition-all duration-500 hover:bg-white hover:border-gray-300 hover:shadow-2xl">
                {/* Gradient overlay on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(49,169,223,0.1), transparent)`,
                    backgroundSize: '1000px 100%',
                    animation: hoveredIndex === i ? 'shimmer 2s infinite' : 'none'
                  }}
                ></div>

                <div className="relative z-10 grid md:grid-cols-12 gap-8 items-start">
                  {/* Number & Icon */}
                  <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-4">
                    <div className="text-6xl md:text-7xl font-bold text-gray-200 group-hover:text-gray-300 transition-all duration-500">
                      {value.number}
                    </div>
                    <div 
                      className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                    >
                      {value.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-10">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#31a9df] transition-colors duration-300">
                      {value.title}
                    </h3>
                    
                    <p className="text-xl text-gray-700 mb-4 font-medium">
                      {value.description}
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {value.details}
                    </p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${value.color} transform origin-left transition-transform duration-500 ${hoveredIndex === i ? 'scale-x-100' : 'scale-x-0'}`}
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 flex justify-center">
          <div className="flex gap-2">
            {values.map((value, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  hoveredIndex === i ? 'w-12 bg-gradient-to-r ' + value.color : 'w-8 bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <Link 
            to="/apply" 
            className="group px-10 py-5 bg-[#31a9df] text-white font-bold text-xl md:text-2xl transition-all duration-300 shadow-2xl flex items-center gap-3"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-6 h-6 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoreValues;

