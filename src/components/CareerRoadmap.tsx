import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Phone, TrendingUp, Rocket, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

export const CareerRoadmap = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      number: "01",
      title: "Start with Our Dedicated Training Program",
      description: "Begin your journey with RES-VA through our in-depth training program — designed to set you up for real success.",
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "Learn directly from a company that actively invests and closes 200+ deals a year.",
        "Gain a full understanding of the real estate industry and how every part connects.",
        "Master objection handling and sales skills that turn conversations into opportunities.",
        "Learn how to qualify leads effectively so you can focus on what really drives results."
      ],
      footer: "This step builds the foundation for your career growth and prepares you for the next phase at RES-VA."
    },
    {
      icon: <Phone className="w-8 h-8" />,
      number: "02",
      title: "Start Having Meaningful Conversations & Continue Your Growth",
      description: "Now that you've built your foundation, it's time to put your training into action.",
      color: "from-purple-500 to-pink-500",
      highlights: [
        "You'll begin having real conversations with homeowners, applying everything you've learned to create real impact.",
        "Our Coaching Department will work closely with you to help increase your call quality score, enhance your communication skills, and ensure every call delivers value.",
        "Through continuous coaching and performance training, you'll see measurable progress in both your confidence and results."
      ],
      footer: null
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "03",
      title: "Choose Your Career Growth Roadmap",
      description: "At this stage, you'll decide the direction that best fits your skills and ambitions:",
      color: "from-orange-500 to-red-500",
      highlights: [
        "Operational Growth: Join our Delegating and Training Program to understand how operations function, manage systems, and support business performance.",
        "Sales Growth: Enroll in our Lead Management Training Program, designed to help you advance your sales skills, master conversions, and take your next step toward leadership."
      ],
      footer: "Whichever path you choose, RES-VA will guide you toward your next level of success."
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      number: "04",
      title: "Grow with RES-VA",
      description: "Your growth doesn't stop when you choose your path — it accelerates.",
      color: "from-green-500 to-emerald-500",
      highlights: [
        "Receive ongoing mentorship and leadership development focused on scaling your skills and impact.",
        "Access advanced training that prepares you for roles like Team Lead, Department Coach, or Account Manager.",
        "Learn how to analyze performance metrics, lead by example, and mentor the next generation of RES-VA talent."
      ],
      footer: "At this stage, you're not just working for RES-VA; you're growing with RES-VA."
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
    <div id="roadmap" className="py-24 px-6 bg-linear-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#31a9df]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-linear-to-r from-[#31a9df]/10 to-purple-500/10 rounded-full text-[#31a9df] font-semibold text-sm mb-4">
            Your Journey with Us
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Career Road Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every successful career starts with one call, and at RES-VA, that call leads to a clear path for growth.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-[#31a9df] via-purple-500 to-green-500 opacity-20 transform md:-translate-x-1/2"></div>

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className={`relative transition-all duration-700 ${
                  visibleSteps.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content Card */}
                  <div className={`w-full md:w-[calc(50%-4rem)] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      onMouseEnter={() => setActiveStep(index)}
                      onMouseLeave={() => setActiveStep(null)}
                      className={`group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden cursor-pointer ${
                        activeStep === index ? 'ring-2 ring-[#31a9df]/50' : ''
                      }`}
                    >
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-linear-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      
                      {/* Step number badge */}
                      <div className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-sm font-bold mb-4 ${index % 2 === 0 ? 'md:float-left' : 'md:float-right'}`}>
                        <span className={`bg-linear-to-r ${step.color} bg-clip-text text-transparent text-2xl`}>
                          Step {step.number}
                        </span>
                      </div>

                      <div className="clear-both"></div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 group-hover:bg-linear-to-r group-hover:from-[#31a9df] group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {step.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-3 mb-6">
                        {step.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className={`flex gap-3 items-start ${index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                            <div className={`shrink-0 mt-1 w-6 h-6 bg-linear-to-br ${step.color} rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                              {highlight}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      {step.footer && (
                        <div className={`pt-4 border-t border-gray-200 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                          <p className="text-gray-600 italic">
                            {step.footer}
                          </p>
                        </div>
                      )}

                      {/* Progress bar */}
                      <div className={`absolute bottom-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} h-1 w-full bg-linear-to-r ${step.color} transform origin-${index % 2 === 0 ? 'right' : 'left'} transition-transform duration-500 ${
                        activeStep === index ? 'scale-x-100' : 'scale-x-0'
                      }`}></div>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="relative z-20 shrink-0">
                    <div className={`w-20 h-20 bg-linear-to-br ${step.color} rounded-full flex items-center justify-center text-white shadow-2xl transform transition-all duration-500 ${
                      activeStep === index ? 'scale-125 rotate-12' : 'scale-100'
                    } ${visibleSteps.has(index) ? 'scale-100' : 'scale-0'}`}>
                      <div className={`absolute inset-0 bg-linear-to-br ${step.color} rounded-full animate-ping opacity-20`}></div>
                      <div className="relative z-10">
                        {step.icon}
                      </div>
                    </div>

                    {/* Connecting dots */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 hidden md:block">
                        <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                      </div>
                    )}
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-4rem)]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-24 text-center">
          <div className="inline-block bg-linear-to-br from-[#31a9df] to-purple-600 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
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

