import React from 'react';
import {
  Video,
  Palette,
  Camera,
  Smartphone,
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { ServiceItem } from '../types';

export const Services: React.FC = () => {
  const { data, setSelectedServiceModal } = useContent();

  const getServiceIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'video':
        return <Video className="w-5 h-5 text-white" />;
      case 'palette':
        return <Palette className="w-5 h-5 text-white" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-white" />;
      case 'smartphone':
        return <Smartphone className="w-5 h-5 text-white" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  const handleGetStarted = (service: ServiceItem) => {
    setSelectedServiceModal(service);
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>WHAT I DO</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
                Services
              </span>
            </h2>
            <p className="mt-3 text-base text-gray-400 max-w-xl">
              Creative services built to make your content{' '}
              <span className="text-white font-medium">stand out</span> across digital platforms.
            </p>
          </div>

          {/* Handwritten Script Note */}
          <div className="mt-6 md:mt-0 text-left md:text-right">
            <p className="font-script text-2xl sm:text-3xl text-purple-300/90 tracking-wide rotate-[-2deg]">
              Create • Edit <br />
              Design • Inspire
            </p>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {data.services
            .filter((s) => s.enabled !== false)
            .map((service, index) => {
            const glowColors = [
              'group-hover:border-purple-500/60 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]',
              'group-hover:border-red-500/60 group-hover:shadow-[0_0_35px_rgba(239,68,68,0.25)]',
              'group-hover:border-cyan-500/60 group-hover:shadow-[0_0_35px_rgba(56,189,248,0.3)]',
              'group-hover:border-pink-500/60 group-hover:shadow-[0_0_35px_rgba(236,72,153,0.3)]',
              'group-hover:border-indigo-500/60 group-hover:shadow-[0_0_35px_rgba(99,102,241,0.3)]',
            ];
            const activeGlow = glowColors[index % glowColors.length];

            return (
              <div
                key={service.id}
                className={`group relative flex flex-col justify-between rounded-3xl bg-[#090914]/90 border border-white/10 backdrop-blur-xl p-4 transition-all duration-300 hover:-translate-y-2 ${activeGlow}`}
              >
                {/* Visual Thumbnail */}
                <div>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 mb-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090914] via-transparent to-black/20" />

                    {/* Service Icon Badge */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-white/20">
                      {getServiceIcon(service.iconName)}
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <div className="text-center px-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-400 line-clamp-3 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Deliverables Mini List */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-left">
                      {service.deliverables.slice(0, 2).map((item, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Get Started Button */}
                <div className="mt-6 pt-2">
                  <button
                    onClick={() => handleGetStarted(service)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action Strip Matching Reference */}
        <div className="mt-14 relative rounded-3xl p-[1px] bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_35px_rgba(168,85,247,0.25)]">
          <div className="w-full bg-[#070714] rounded-[23px] px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center shrink-0">
                <Send className="w-6 h-6 text-cyan-400 -rotate-12" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-white">
                  Have an idea? Let's create something{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    amazing
                  </span>{' '}
                  together.
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Available for custom video, design, and motion commissions.
                </p>
              </div>
            </div>

            <button
              onClick={handleScrollToContact}
              className="px-6 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              Start a Project →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
