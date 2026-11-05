import React from 'react';
import { Search, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Process: React.FC = () => {
  const { data } = useContent();

  const getStepIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'search':
        return <Search className="w-5 h-5 text-purple-400" />;
      case 'compass':
        return <Compass className="w-5 h-5 text-indigo-400" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'checkcircle2':
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="process" className="relative py-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>HOW I WORK</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            How I{' '}
            <span className="font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 inline-block pl-2">
              Create
            </span>
          </h2>

          <p className="mt-3 text-base text-gray-400 max-w-xl">
            A collaborative, streamlined workflow that takes your initial idea to high-impact execution.
          </p>
        </div>

        {/* 4 Process Cards with Connected Line */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {data.process.map((step, idx) => (
            <div
              key={step.step}
              className="group relative p-6 rounded-3xl bg-[#090914]/80 border border-white/10 backdrop-blur-md hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] flex flex-col justify-between"
            >
              <div>
                {/* Step Number + Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-black text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white/5 group-hover:from-purple-400 group-hover:to-cyan-400 transition-colors">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getStepIcon(step.iconName)}
                  </div>
                </div>

                <h3 className="text-xl font-black text-white tracking-wide uppercase">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-cyan-400 mt-1 mb-3">
                  {step.tagline}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress Notch */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span>Phase {idx + 1} of 4</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400/50 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
