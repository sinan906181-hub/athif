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
          {/* Left Column: Portrait with Dream Create Inspire */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Handwritten Floating Text */}
            <div className="absolute -top-6 -left-4 z-20 hidden sm:block">
              <p className="font-script text-3xl sm:text-4xl text-purple-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)] rotate-[-6deg] leading-tight">
                Dream <br />
                Create <br />
                Inspire
              </p>
            </div>

            {/* Glowing Frame */}
            <div className="relative w-full max-w-[390px] aspect-[4/5] rounded-3xl p-[1.5px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_50px_rgba(168,85,247,0.35),0_0_70px_rgba(56,189,248,0.2)]">
              <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-[#050509]">
                <img
                  src={data.brand.aboutPortrait}
                  alt="Athif Abdul Azeez"
                  className="w-full h-full object-cover object-top filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050509] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-cyan-500/20 pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#090914]/85 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">Athif Abdul Azeez</p>
                      <p className="text-[10px] text-gray-400">Founder & Creative Director</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                      Studio Lead
                    </span>
                  </div>
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
