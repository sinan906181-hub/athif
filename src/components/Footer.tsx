import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  Youtube,
  Instagram,
  Mail,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

const PinterestIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
);

export const Footer: React.FC = () => {
  const { data } = useContent();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialItems = [
    {
      id: 'youtube',
      name: 'YouTube',
      href: data.contactInfo.socials.youtube,
      icon: Youtube,
      hoverGlow: 'hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.45)] hover:text-red-400',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      href: data.contactInfo.socials.instagram,
      icon: Instagram,
      hoverGlow: 'hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.45)] hover:text-pink-400',
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      href: data.contactInfo.pinterest,
      icon: PinterestIcon,
      hoverGlow: 'hover:border-red-600/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:text-red-400',
    },
    {
      id: 'email',
      name: 'Email Athif',
      href: `mailto:${data.contactInfo.email}`,
      icon: Mail,
      hoverGlow: 'hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.45)] hover:text-cyan-300',
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#040408] border-t border-white/10 pt-10 pb-8 overflow-hidden"
    >
      {/* Occasional Ambient Shimmer Light Beam Passing Across Footer */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] overflow-hidden pointer-events-none">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-400 to-purple-500 animate-beam-pass blur-[0.5px]" />
      </div>

      {/* Background Soft Purple/Indigo Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-24 bg-purple-700/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Brand Lockup */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left shrink-0">
            <h4 className="text-sm font-black tracking-widest text-white uppercase">
              {data.brand.name} {data.brand.subname}
            </h4>
            <p className="text-[10px] font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 uppercase mt-0.5">
              CREATE • EDIT • DESIGN • INSPIRE
            </p>
          </div>

          {/* Center: Brand Emblem with Divider Lines Matching Reference Image */}
          <div className="flex-1 max-w-md hidden md:flex items-center gap-3 px-4">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-purple-500/60" />
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1.5px] cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] group shrink-0"
              title="Athif Creative Studio - Scroll to Top"
            >
              <div className="w-full h-full bg-[#060610] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:brightness-125 transition-all">
                  A
                </span>
              </div>
            </button>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-cyan-400/30 to-cyan-400/60" />
          </div>

          {/* Right: Clean, Modern Social Media Row + Circular Back-to-Top Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* 4 Social Media Icons in a Single Centered Row */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {socialItems.map((item, index) => {
                const Icon = item.icon;
                const delayMs = index * 100;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    title={item.name}
                    style={{
                      transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                    }}
                    className={`relative p-2.5 rounded-full bg-[#0a0a14] border border-white/10 text-gray-400 transition-all duration-300 cursor-pointer ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    } ${item.hoverGlow} hover:scale-115 hover:-translate-y-1 hover:brightness-125 hover:bg-white/5 active:scale-95 group`}
                  >
                    {/* Subtle light ripple halo on hover */}
                    <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none" />
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-105" />
                  </a>
                );
              })}
            </div>

            {/* Circular Back-to-Top Button (Rotates 180° and slightly scales on hover) */}
            <button
              onClick={scrollToTop}
              className="group relative w-10 h-10 rounded-full bg-[#090914] border border-white/15 hover:border-cyan-400/60 hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-300 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] ml-1"
              aria-label="Back to Top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 transition-transform duration-500 ease-out group-hover:rotate-180" />
            </button>
          </div>
        </div>

        {/* Subtle Bottom Note */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
          <p>© {new Date().getFullYear()} Athif Creative Studio. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <span className="text-purple-400">♥</span>
            <span>for high-impact visual creation</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
