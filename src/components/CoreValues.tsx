import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, TrendingUp, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

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
      highlights: ['Own the outcome', 'Communicate progress', 'Celebrate consistency'],
      image: '/accountability.jpeg'
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
      highlights: ['Lead with empathy', 'Assume positive intent', 'Amplify every voice'],
      image: '/respect.avif'
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
      highlights: ['Invest in learning', 'Measure what matters', 'Iterate with courage'],
      image: '/growth.jpg'
    }
  ];

  const activeValue = values[activeIndex];

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

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#31a9df]/20 bg-white/85 px-5 py-2.5 text-sm font-medium text-[#2793c9] backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#31a9df]" />
            <span>Culture at RES-VA</span>
          </div>
          <div className="space-y-4 text-center lg:max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">Our Core Values</h2>
            <p className="text-lg text-slate-600 md:text-xl">
              The way we show up for one another defines the experience of working at RES-VA.
              These values anchor every decision, project, and partnership we lead.
            </p>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Core values"
          className="flex flex-wrap justify-center gap-3 rounded-full bg-white/70 px-4 py-3 backdrop-blur"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            const isActive = activeIndex === index;

            return (
              <button
                key={value.title}
                type="button"
                role="tab"
                id={`core-value-tab-${index}`}
                aria-selected={isActive}
                aria-controls={`core-value-panel-${index}`}
                className={`relative flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.15em] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#31a9df]/30 ${
                  isActive
                    ? 'border-[#2793c9] bg-white text-[#2793c9] shadow-lg shadow-black/5'
                    : 'border-slate-200/70 text-slate-500 hover:border-[#2793c9]/40 hover:text-[#2793c9]'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-[#2793c9]' : 'text-[#31a9df]'}`} />
                <span className="hidden text-xs font-semibold text-slate-400 md:block">
                  {value.number}
                </span>
                <span>{value.title}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`core-value-panel-${activeIndex}`}
          aria-labelledby={`core-value-tab-${activeIndex}`}
          className="relative w-full overflow-hidden rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-2xl backdrop-blur md:p-12"
        >
          <div
            className={`pointer-events-none absolute inset-0 bg-linear-to-br ${activeValue.color} opacity-5`}
          ></div>
          <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-3 text-[#2793c9]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#31a9df]/12">
                  {React.createElement(activeValue.icon, { className: 'h-6 w-6' })}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.5em] text-slate-400">
                    {activeValue.number}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    {activeValue.title}
                  </h3>
                </div>
              </div>
              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                {activeValue.details}
              </p>
              <ul className="space-y-3">
                {activeValue.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2793c9]" />
                    <span className="text-sm font-medium md:text-base">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 bg-[#31a9df] px-8 py-3 text-base font-semibold text-white shadow-[0_20px_45px_rgba(49,169,223,0.35)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(39,150,203,0.45)]"
              >
                Start your journey
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[360px]">
                <div className="absolute -inset-4 rounded-[32px] bg-[#31a9df]/10 blur-3xl"></div>
                <div className="relative aspect-4/5 overflow-hidden rounded-[28px] border border-white/60 bg-white/80 shadow-xl">
                  <img
                    src={activeValue.image}
                    alt={`${activeValue.title} illustration`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;

