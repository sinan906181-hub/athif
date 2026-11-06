import React from 'react';
import {
  Sparkles,
  Play,
  Users,
  Trophy,
  Infinity as InfinityIcon,
  Video,
  Palette,
  Camera,
  Zap,
  Share2,
  Rocket,
  Target,
  Handshake,
  Crown,
  Phone,
  MessageCircle,
  Mail,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const About: React.FC = () => {
  const { data } = useContent();

  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Play className="w-5 h-5 text-purple-400 fill-purple-400/20" />;
      case 1:
        return <Users className="w-5 h-5 text-indigo-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-cyan-400" />;
      case 3:
      default:
        return <InfinityIcon className="w-5 h-5 text-pink-400" />;
    }
  };

  const getWhyIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'rocket':
        return <Rocket className="w-6 h-6 text-purple-400" />;
      case 'target':
        return <Target className="w-6 h-6 text-indigo-400" />;
      case 'zap':
        return <Zap className="w-6 h-6 text-cyan-400" />;
      case 'handshake':
      default:
        return <Handshake className="w-6 h-6 text-pink-400" />;
    }
  };

  const skillPills = [
    { name: 'Video Editing', icon: Video },
    { name: 'Poster Design', icon: Palette },
    { name: 'Photo Editing', icon: Camera },
    { name: 'Motion Graphics', icon: Zap },
    { name: 'Social Media Design', icon: Share2 },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Screen Top About Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Creative Studio Identity & Direct Connect (Second photo removed as requested) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Handwritten Floating Text */}
            <div className="absolute -top-6 -left-4 z-20 hidden sm:block">
              <p className="font-script text-3xl sm:text-4xl text-purple-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] rotate-[-6deg] leading-tight">
                Dream <br />
                Create <br />
                Inspire
              </p>
            </div>

            {/* Glowing Studio Identity Card */}
            <div className="relative w-full max-w-[400px] rounded-3xl p-[1.5px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_50px_rgba(168,85,247,0.35),0_0_70px_rgba(56,189,248,0.2)]">
              <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-[#070714] p-6 sm:p-7 flex flex-col justify-between">
                {/* Background neon ambient gradients */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge & Studio Monogram */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      AVAILABLE FOR COMMISSIONS
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                      Studio Lead
                    </span>
                  </div>

                  {/* Iconic Glowing Studio Emblem */}
                  <div className="my-3 flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[2px] shadow-[0_0_25px_rgba(168,85,247,0.5)] shrink-0">
                      <div className="w-full h-full bg-[#05050e] rounded-[14px] flex items-center justify-center">
                        <span className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400">
                          A
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white tracking-wide">
                        ATHIF ABDUL AZEEZ
                      </h3>
                      <p className="text-[11px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold uppercase tracking-wider">
                        Creative Studio Visual Artist
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed mt-2">
                    Visual storyteller specializing in cinematic reel editing, bold poster design, and futuristic motion aesthetics.
                  </p>
                </div>

                {/* Direct Phone & WhatsApp Instant Connect */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      DIRECT CONTACT
                    </span>
                    <span className="text-[10px] text-cyan-400 font-medium">Quick Reply</span>
                  </div>

                  <a
                    href={`tel:${data.contactInfo.phone || '+918113014526'}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/30 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                        <Phone className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400">Direct Phone Call</p>
                        <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                          {data.contactInfo.phone || '8113014526'}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-purple-300 px-2 py-0.5 rounded bg-purple-500/20">
                      Call Now
                    </span>
                  </a>

                  <a
                    href={`https://wa.me/${(data.contactInfo.phone || '8113014526').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-900/30 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400">WhatsApp Chat</p>
                        <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          Instant Chat
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/20">
                      WhatsApp →
                    </span>
                  </a>

                  <a
                    href={`mailto:${data.contactInfo.email}`}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-900/30 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-400">Direct Email</p>
                        <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate max-w-[160px]">
                          {data.contactInfo.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/20">
                      Email
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Stats, Skills */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>ABOUT ME</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              About{' '}
              <span className="font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 inline-block pl-2">
                Athif
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
              {data.brand.aboutBio}
            </p>

            {/* 4 Stat Cards */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {data.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#0a0a14]/80 border border-white/10 backdrop-blur-md hover:border-purple-500/40 transition-all flex flex-col items-center text-center group hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    {getStatIcon(idx)}
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-400 font-medium mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* My Skills Strip */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                My Skills
              </p>
              <div className="flex flex-wrap gap-2.5">
                {skillPills.map((pill, idx) => {
                  const Icon = pill.icon;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0d1c] border border-white/10 text-xs font-medium text-gray-300 hover:text-white hover:border-cyan-500/50 transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{pill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Me Sub-Section Matching Reference */}
        <div className="mt-24 pt-16 border-t border-white/5 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>WHY CHOOSE ME?</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Why{' '}
                <span className="font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Athif?
                </span>
              </h3>
              <p className="text-sm text-gray-400 mt-2">
                Because creativity is not just a skill, it's my passion.
              </p>
            </div>

            {/* Crown icon badge on top right */}
            <div className="hidden sm:flex items-center gap-2 text-cyan-400">
              <Crown className="w-7 h-7 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.whyChooseMe.map((item, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-3xl bg-[#090914]/80 border border-white/10 backdrop-blur-md hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-900/50 to-indigo-900/40 border border-purple-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {getWhyIcon(item.iconName)}
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
