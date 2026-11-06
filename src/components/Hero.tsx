import React from 'react';
import {
  Play,
  ArrowRight,
  Clapperboard,
  Camera,
  Film,
  Sparkles,
  Youtube,
  Instagram,
  Mail,
  ChevronDown,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const PinterestIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
);

export const Hero: React.FC = () => {
  const { data } = useContent();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: Youtube,
      href: data.contactInfo.socials.youtube,
      label: 'YouTube',
      hoverColor: 'hover:text-red-400 hover:bg-red-500/10',
    },
    {
      icon: Instagram,
      href: data.contactInfo.socials.instagram,
      label: 'Instagram',
      hoverColor: 'hover:text-pink-400 hover:bg-pink-500/10',
    },
    {
      icon: PinterestIcon,
      href: data.contactInfo.pinterest,
      label: 'Pinterest',
      hoverColor: 'hover:text-red-500 hover:bg-red-600/10',
    },
    {
      icon: Mail,
      href: `mailto:${data.contactInfo.email}`,
      label: 'Email Athif',
      hoverColor: 'hover:text-cyan-300 hover:bg-cyan-500/10',
    },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background Ambient Glows & Cyber Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Floating Left Social Bar (Desktop) */}
      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 py-4 px-2 rounded-full bg-[#0b0b14]/60 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        {socialLinks.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={`p-2 text-gray-400 ${item.hoverColor} rounded-full transition-all duration-200 hover:scale-110`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 pb-8">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 backdrop-blur-md mb-6">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest text-purple-200 uppercase">
                {data.brand.kicker}
              </span>
            </div>

            {/* Massive Heading */}
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase leading-[0.9] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              {data.brand.heroHeadline}
            </h1>

            {/* Handwritten Brush Accent */}
            <div className="mt-1 mb-5">
              <span className="font-script text-4xl sm:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 transform -rotate-1 inline-block drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">
                {data.brand.heroScript}
              </span>
            </div>

            {/* Tagline & Description */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-100 max-w-xl leading-snug">
              {data.brand.tagline}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed">
              {data.brand.heroDesc}
            </p>

            {/* Dual Action Buttons with Micro-Interactions */}
            <div className="mt-8 flex flex-wrap items-center gap-4 animate-fade-slide-up">
              <button
                onClick={() => handleScrollTo('services')}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_35px_rgba(56,189,248,0.65)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer interactive-tap"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                </div>
                <span>Explore Services</span>
              </button>

              <button
                onClick={() => handleScrollTo('contact')}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-gray-300 hover:text-white bg-[#0f0f1b]/80 border border-white/10 hover:border-cyan-500/50 backdrop-blur-md transition-all duration-200 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:scale-105 active:scale-95 cursor-pointer interactive-tap"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Handwritten Signature Tagline */}
            <div className="mt-12 flex items-center gap-3">
              <div className="w-8 h-[2px] bg-gradient-to-r from-purple-500 to-transparent" />
              <p className="font-script text-xl sm:text-2xl text-purple-300 tracking-wider">
                Create • Edit • Design • Inspire
              </p>
            </div>
          </div>

          {/* Right Visual Portrait with Premium Cinematic Studio Treatment (Resized & Animated) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Soft Purple & Cyan Atmospheric Studio Glow Behind Subject */}
            <div className="absolute inset-0 max-w-[370px] max-h-[440px] mx-auto rounded-3xl bg-gradient-to-br from-purple-600/30 via-indigo-600/25 to-cyan-500/25 blur-3xl -z-10 animate-pulse-glow" />

            {/* Premium Portrait Card - Compact, Balanced & Smoothly Animated */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] lg:max-w-[390px] aspect-[3/4] rounded-3xl p-[1.5px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_40px_rgba(168,85,247,0.35),0_0_60px_rgba(56,189,248,0.2)] animate-float-slow">
              {/* Inner Cutout Card */}
              <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-[#050509]">
                <img
                  src={data.brand.heroPortrait}
                  alt="Athif - Creative Studio"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01] transition-transform duration-700 hover:scale-105"
                />

                {/* Subtle Cinematic Atmospheric Lighting & Dark Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-[#050509]/30 to-transparent opacity-85 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/15 via-transparent to-cyan-500/15 pointer-events-none" />

                {/* Elegant "AVAILABLE FOR PROJECTS" Badge near bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050509]/85 backdrop-blur-md border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.9)] animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-200 tracking-wider uppercase">
                      AVAILABLE FOR PROJECTS
                    </span>
                  </div>

                  <div className="px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-[9px] font-semibold text-purple-300 backdrop-blur-md">
                    CREATIVE LEAD
                  </div>
                </div>
              </div>

              {/* Floating Creative Accent 1: Editing Clapperboard (Top Right) */}
              <div
                className="absolute -top-3.5 -right-3.5 p-3 rounded-2xl bg-[#080816]/95 border border-purple-500/40 backdrop-blur-xl shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-all duration-300 hover:scale-115 animate-float-reverse cursor-pointer"
                title="Cinematic Video Editing"
              >
                <Clapperboard className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              </div>

              {/* Floating Creative Accent 2: Play Button (Bottom Right) */}
              <div
                className="absolute -bottom-3.5 -right-3.5 p-3 rounded-2xl bg-[#080816]/95 border border-cyan-400/40 backdrop-blur-xl shadow-[0_0_25px_rgba(56,189,248,0.45)] transition-all duration-300 hover:scale-115 animate-float-slow cursor-pointer"
                title="Creative Motion & Video"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 fill-cyan-400/20" />
              </div>

              {/* Floating Creative Accent 3: Camera Icon (Top Left) */}
              <div
                className="absolute top-8 -left-4 p-2.5 rounded-2xl bg-[#080816]/95 border border-purple-400/30 backdrop-blur-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hidden sm:block transition-all duration-300 hover:scale-115 animate-float-reverse cursor-pointer"
                title="Visual Photography & Art Direction"
              >
                <Camera className="w-4 h-4 text-indigo-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Services Quick Strip Matching Reference */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="flex flex-col items-center mb-6">
            <span className="text-[11px] font-semibold tracking-widest text-gray-500 uppercase">
              WHAT I DO
            </span>
            <p className="text-sm sm:text-base font-semibold text-gray-300 mt-1">
              Creative services built to make your content{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                stand out.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {data.services.slice(0, 5).map((service) => (
              <div
                key={service.id}
                onClick={() => handleScrollTo('services')}
                className="group cursor-pointer p-3.5 rounded-2xl bg-[#0b0b14]/70 border border-white/5 hover:border-purple-500/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] flex flex-col items-center text-center"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Film className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">
                  {service.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="hidden lg:flex absolute right-8 bottom-8 flex-col items-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest">
        <span>Scroll Down</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
      </div>
    </section>
  );
};
