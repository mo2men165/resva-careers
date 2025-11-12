import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Phone, TrendingUp, Rocket, ArrowRight } from 'lucide-react';

export const CareerRoadmap = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      number: "01",
      title: "Begin with Training",
      description: "Start with our dedicated training program built for real success. You'll learn from a company that closes 200+ deals a year, master sales and objection-handling skills, and understand how the real estate industry connects from end to end. This foundation prepares you for the next stage in your career.",
      color: "from-[#1f7fb3] via-[#2793c9] to-[#31a9df]"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      number: "02",
      title: "Put Training into Action",
      description: "Next, you'll begin having real conversations with homeowners. Our Coaching Department will help you sharpen communication, raise your call quality, and grow your confidence through continuous feedback and performance training.",
      color: "from-[#2793c9] via-[#31a9df] to-[#48b9e8]"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "03",
      title: "Choose Your Growth Path",
      description: "Once your foundation is set, choose the direction that fits your goals:\n\nOperations: Learn how to manage systems, delegate tasks, and support business performance.\n\nSales: Advance your lead management and conversion skills, preparing for leadership opportunities.",
      color: "from-[#258cc0] via-[#31a9df] to-[#5fc5ed]"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      number: "04",
      title: "Grow with RES-VA",
      description: "Your growth accelerates here. Through ongoing mentorship and advanced leadership training, you'll develop skills for roles like Team Lead, Department Coach, or Account Manager—learning to lead by example and guide the next generation of RES-VA talent.",
      color: "from-[#31a9df] via-[#48b9e8] to-[#73d4f6]"
    }
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSteps((prev) => new Set(prev).add(index));
              }
            });
          },
          { threshold: 0.3 }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div id="roadmap" className="py-24 px-6 bg-gradient-to-b from-white via-[#f3f9fd] to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#31a9df]/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1f7fb3]/12 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1f7fb3]/12 to-[#31a9df]/12 rounded-full text-[#2793c9] font-semibold text-sm mb-4">
            Your Journey with Us
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Career Road Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every successful career starts with one call. At RES-VA, that call sets you on a clear path for growth.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Guiding lines */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#31a9df]/20 md:hidden"></div>
          <div className="hidden md:block absolute left-0 right-0 top-12 h-1 bg-[#31a9df]/20"></div>

          {/* Steps */}
          <div className="flex flex-col md:flex-row md:items-stretch gap-16 md:gap-12 overflow-x-auto md:overflow-visible pb-12 md:pb-0 snap-x snap-mandatory md:snap-none">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => { stepRefs.current[index] = el; }}
                className={`relative transition-all duration-700 snap-center flex md:flex-1 ${
                  visibleSteps.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-1 md:max-w-sm xl:max-w-md gap-8 md:gap-10 items-start md:items-center md:text-center h-full">
                  {/* Icon and connector */}
                  <div className="relative z-20 flex items-center md:flex-col md:items-center">
                    <div className={`relative w-16 h-16 md:w-20 md:h-20 bg-linear-to-br ${step.color} rounded-full flex items-center justify-center text-white shadow-2xl transform transition-all duration-500 ${
                      activeStep === index ? 'scale-110 rotate-6' : 'scale-100'
                    } ${visibleSteps.has(index) ? 'scale-100' : 'scale-0'}`}>
                      <div className={`absolute inset-0 bg-linear-to-br ${step.color} rounded-full animate-ping opacity-20`}></div>
                      <div className="relative z-10">
                        {step.icon}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute left-full top-1/2 w-24 h-1 bg-[#31a9df]/20"></div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div className="w-full h-full">
                    <div
                      onMouseEnter={() => setActiveStep(index)}
                      onMouseLeave={() => setActiveStep(null)}
                      className={`group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden cursor-pointer h-full ${
                        activeStep === index ? 'ring-2 ring-[#31a9df]/35' : ''
                      }`}
                    >
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-linear-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      
                      {/* Step number badge */}
                      <div className="inline-flex items-center justify-center px-4 py-1 rounded-full text-sm font-bold mb-4">
                        <span className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent text-2xl`}>
                          Step {step.number}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 group-hover:bg-gradient-to-r group-hover:from-[#1f7fb3] group-hover:to-[#31a9df] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-lg leading-[1.8] whitespace-pre-line">
                        {step.description}
                      </p>

                      {/* Progress bar */}
                      <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${step.color} transform origin-left transition-transform duration-500 ${
                        activeStep === index ? 'scale-x-100' : 'scale-x-0'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-24 text-center">
          <div className="inline-block bg-gradient-to-br from-[#1f7fb3] to-[#31a9df] rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-[#d8eff9] text-lg mb-6 max-w-2xl mx-auto">
                Join RES-VA today and begin your path to success. Your career transformation is just one call away.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a 
                  href="/apply"
                  className="group px-8 py-4 bg-[#31a9df] text-white font-bold text-lg transition-all duration-300 shadow-lg flex items-center gap-3"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#31a9df] rounded-full opacity-20"
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
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default CareerRoadmap;