import React from 'react';
import {
  ArrowUp,
  Youtube,
  Instagram,
  Mail,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Footer: React.FC = () => {
  const { data } = useContent();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040408] border-t border-white/10 py-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-20 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand Lockup */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-sm font-black tracking-widest text-white uppercase">
              {data.brand.name} {data.brand.subname}
            </h4>
            <p className="text-[11px] font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 uppercase mt-0.5">
              CREATE • EDIT • DESIGN • INSPIRE
            </p>
          </div>

          {/* Center Brand Emblem */}
          <div
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px] cursor-pointer hover:scale-110 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            title="Back to Top"
          >
            <div className="w-full h-full bg-[#070712] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-base text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                A
              </span>
            </div>
          </div>

          {/* Right Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={data.contactInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="YouTube"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={data.contactInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-pink-400 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={data.contactInfo.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Pinterest"
                title="Pinterest"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={`mailto:${data.contactInfo.email}`}
                className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Direct Email"
                title="Direct Email (athifeeeafkp@gmail.com)"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 flex items-center justify-center transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
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
