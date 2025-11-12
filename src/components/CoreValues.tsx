import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

export const CoreValues = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const values = [
    {
      number: '01',
      title: 'Accountability',
      icon: Shield,
      description: 'We own every outcome and keep promises visible to the team.',
      details:
        'Each team member at RES-VA is empowered to deliver on commitments, share progress transparently, and hold themselves to elite professional standards.',
      color: 'from-[#1f7fb3] via-[#2793c9] to-[#31a9df]',
      glow: 'shadow-[0_25px_60px_rgba(49,169,223,0.28)]',
      highlights: ['Own the outcome', 'Communicate progress', 'Celebrate consistency']
    },
    {
      number: '02',
      title: 'Respect',
      icon: Heart,
      description: 'We build trust by listening first and elevating every perspective.',
      details:
        'Collaboration at RES-VA is rooted in empathy. We give feedback with care, lead with clarity, and make space for voices that challenge the status quo.',
      color: 'from-[#2793c9] via-[#31a9df] to-[#48b9e8]',
      glow: 'shadow-[0_25px_60px_rgba(73,185,232,0.28)]',
      highlights: ['Lead with empathy', 'Assume positive intent', 'Amplify every voice']
    },
    {
      number: '03',
      title: 'Continuous Improvement',
      icon: TrendingUp,
      description: 'We pursue measurable growth in our craft, mindset, and impact.',
      details:
        'From ongoing mentorship to advanced training, we embrace experimentation and data-driven refinement. Progress is tracked, celebrated, and shared.',
      color: 'from-[#258cc0] via-[#31a9df] to-[#5fc5ed]',
      glow: 'shadow-[0_25px_60px_rgba(95,197,237,0.28)]',
      highlights: ['Invest in learning', 'Measure what matters', 'Iterate with courage']
    }
  ];

  return (
    <section
      id="values"
      className="relative overflow-hidden bg-linear-to-br from-[#f3f9fd] via-white to-[#e8f4fb] py-24 lg:py-32"
    >
      <style>{`
        @keyframes float-soft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-20 h-[420px] w-[420px] rounded-full bg-[#31a9df]/12 blur-3xl"></div>
        <div className="absolute bottom-[-160px] left-[-120px] h-[520px] w-[520px] rounded-full bg-[#1f7fb3]/15 blur-3xl"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(49,169,223,0.25) 1px, transparent 0)',
            backgroundSize: '54px 54px'
          }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 lg:grid lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#31a9df]/20 bg-white/85 px-5 py-2.5 text-sm font-medium text-[#2793c9] backdrop-blur">
              <Sparkles className="h-4 w-4 text-[#31a9df]" />
              <span>Culture at RES-VA</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">
                Our Core Values
              </h2>
              <p className="text-lg text-slate-600 md:text-xl">
                The way we show up for one another defines the experience of working at RES-VA.
                These values anchor every decision, project, and partnership we lead.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-10 shadow-xl backdrop-blur">
            <div className="absolute -left-6 -top-6 h-24 w-24 animate-[float-soft_6s_ease-in-out_infinite] rounded-full bg-[#31a9df]/12 blur-xl"></div>
            <div className="absolute -bottom-10 -right-4 h-40 w-40 rounded-full bg-[#1f7fb3]/15 blur-3xl"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-[#31a9df]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#31a9df]/12">
                  {React.createElement(values[activeIndex].icon, { className: 'h-6 w-6' })}
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  Currently spotlighting
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.6em] text-slate-400">
                  {values[activeIndex].number}
                </span>
                <h3 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                  {values[activeIndex].title}
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-slate-600">{values[activeIndex].details}</p>
              <ul className="grid gap-3 text-sm font-medium text-slate-500 md:grid-cols-2">
                {values[activeIndex].highlights.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#31a9df]"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            to="/apply"
            className="group inline-flex items-center justify-center gap-1 bg-[#31a9df] px-10 py-4 text-lg font-semibold text-white shadow-[0_20px_45px_rgba(49,169,223,0.35)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(39,150,203,0.45)]"
          >
            Start your journey
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7">
          {values.map((value, index) => {
            const Icon = value.icon;
            const isActive = activeIndex === index;

            return (
              <button
                key={value.title}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={`group relative overflow-hidden rounded-[32px] border border-white/60 bg-white/80 p-8 text-left transition-all duration-500 backdrop-blur hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#31a9df]/20 md:p-10 ${
                  isActive ? `shadow-2xl ${value.glow}` : 'shadow-lg shadow-black/5'
                }`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-linear-to-br ${value.color} opacity-0 transition-opacity duration-500 ${
                    isActive ? 'opacity-10' : 'group-hover:opacity-10'
                  }`}
                ></div>
                <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
                  <div className="flex shrink-0 items-start gap-5 md:flex-col md:items-start md:gap-6">
                    <span className="text-sm font-semibold uppercase tracking-[0.6em] text-slate-300">
                      {value.number}
                    </span>
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br ${value.color} text-white shadow-lg shadow-black/5 transition-transform duration-500 ${
                        isActive ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">{value.title}</h3>
                      <span
                        className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] transition-colors ${
                          isActive ? 'text-[#31a9df]' : 'text-slate-400'
                        }`}
                      >
                        {isActive ? 'In focus' : 'Preview'}
                        <ArrowRight
                          className={`h-4 w-4 transition-transform ${isActive ? 'translate-x-1' : ''}`}
                        />
                      </span>
                    </div>

                    <p className="text-base text-slate-600 md:text-lg">{value.description}</p>

                    <div className="flex flex-wrap gap-3">
                      {value.highlights.map((point) => (
                        <span
                          key={point}
                          className={`inline-flex items-center gap-2 rounded-full border border-slate-200/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 transition-colors ${
                            isActive ? 'border-[#31a9df]/40 text-[#31a9df]' : ''
                          }`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;

