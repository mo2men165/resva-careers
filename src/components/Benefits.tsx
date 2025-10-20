import React, { useState } from 'react';
import { TrendingUp, Globe, DollarSign, Users, Zap, Heart, Shield, Clock, Award, Star } from 'lucide-react';

export const Benefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const benefits = [
    { 
      icon: <TrendingUp className="w-7 h-7" />, 
      title: "Exponential Growth", 
      desc: "Fast-track your career with personalized development plans, mentorship programs, and clear advancement pathways.",
      color: "from-purple-500 to-pink-500"
    },
    { 
      icon: <Globe className="w-7 h-7" />, 
      title: "Global Impact", 
      desc: "Work on projects that span continents and make a real difference in people's lives across the world.",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <DollarSign className="w-7 h-7" />, 
      title: "Premium Compensation", 
      desc: "Industry-leading salaries, performance bonuses, equity options, and comprehensive benefits package.",
      color: "from-green-500 to-emerald-500"
    },
    { 
      icon: <Users className="w-7 h-7" />, 
      title: "Elite Team", 
      desc: "Collaborate with top-tier professionals from Fortune 500 companies and leading startups worldwide.",
      color: "from-orange-500 to-red-500"
    },
    { 
      icon: <Zap className="w-7 h-7" />, 
      title: "Cutting-Edge Tech", 
      desc: "Work with the latest technologies, tools, and frameworks. Stay ahead of industry trends.",
      color: "from-yellow-500 to-orange-500"
    },
    { 
      icon: <Heart className="w-7 h-7" />, 
      title: "Work-Life Harmony", 
      desc: "Flexible schedules, unlimited PTO, remote-first culture, and wellness programs that prioritize you.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#31a9df]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#31a9df]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#31a9df]/10 rounded-full text-[#31a9df] font-semibold text-sm mb-4">
            Why Choose Us
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            More Than Just a Job
          </h2>
          <p className="text-xl text-[#9a9a9a] max-w-2xl mx-auto">
            Experience workplace excellence that goes beyond traditional employment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div 
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                {benefit.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#31a9df] transition-colors">
                {benefit.title}
              </h3>
              
              <p className="text-[#9a9a9a] leading-relaxed">
                {benefit.desc}
              </p>

              <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${benefit.color} transform origin-left transition-transform duration-500 ${hoveredIndex === i ? 'scale-x-100' : 'scale-x-0'}`}></div>
            </div>
          ))}
        </div>

        {/* Additional perks section */}
        <div className="mt-20 bg-gradient-to-br from-[#31a9df] to-[#29aae0] rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-5 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">Even More Perks</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: <Shield className="w-6 h-6" />, text: 'Health & Dental' },
                { icon: <Clock className="w-6 h-6" />, text: 'Flexible Hours' },
                { icon: <Award className="w-6 h-6" />, text: 'Learning Budget' },
                { icon: <Star className="w-6 h-6" />, text: 'Career Coaching' }
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    {perk.icon}
                  </div>
                  <span className="font-medium">{perk.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;