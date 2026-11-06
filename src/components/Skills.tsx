import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Video,
  Palette,
  Bot,
  Layers,
  Code2,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { ToolSkill } from '../types';

type SkillTab = 'ALL' | 'VIDEO' | 'DESIGN' | 'MOTION' | 'AI';

export const Skills: React.FC = () => {
  const { data, setSelectedSkillModal } = useContent();
  const [activeTab, setActiveTab] = useState<SkillTab>('ALL');

  const tabs: { label: string; value: SkillTab; icon: React.FC<{ className?: string }> }[] = [
    { label: 'All', value: 'ALL', icon: Code2 },
    { label: 'Video', value: 'VIDEO', icon: Video },
    { label: 'Design', value: 'DESIGN', icon: Palette },
    { label: 'Motion', value: 'MOTION', icon: Zap },
    { label: 'AI', value: 'AI', icon: Bot },
  ];

  const filteredSkills =
    activeTab === 'ALL'
      ? data.skills
      : data.skills.filter((s) => s.category === activeTab);

  const getToolLogo = (skill: ToolSkill) => {
    switch (skill.shortCode) {
      case 'Pr':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#00005b] border border-[#9999ff]/60 flex items-center justify-center font-black text-lg text-[#9999ff] shadow-[0_0_20px_rgba(153,153,255,0.45)] group-hover:scale-110 transition-transform">
            Pr
          </div>
        );
      case 'Resolve':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#0d0d14] border border-cyan-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.45)] group-hover:scale-110 transition-transform">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-500 via-amber-400 via-emerald-400 to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
          </div>
        );
      case 'Ae':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#00005b] border border-[#d291ff]/60 flex items-center justify-center font-black text-lg text-[#d291ff] shadow-[0_0_20px_rgba(210,145,255,0.45)] group-hover:scale-110 transition-transform">
            Ae
          </div>
        );
      case 'Ps':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#001e36] border border-[#31a8ff]/60 flex items-center justify-center font-black text-lg text-[#31a8ff] shadow-[0_0_20px_rgba(49,168,255,0.45)] group-hover:scale-110 transition-transform">
            Ps
          </div>
        );
      case 'Ai':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#330000] border border-[#ff9a00]/60 flex items-center justify-center font-black text-lg text-[#ff9a00] shadow-[0_0_20px_rgba(255,154,0,0.45)] group-hover:scale-110 transition-transform">
            Ai
          </div>
        );
      case 'Figma':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#1e1e1e] border border-pink-500/50 flex items-center justify-center font-bold text-sm text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.4)] group-hover:scale-110 transition-transform">
            Fi
          </div>
        );
      case 'FM':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#1a0b2e] border border-violet-500/50 flex items-center justify-center font-black text-base text-violet-300 shadow-[0_0_15px_rgba(168,85,247,0.35)] group-hover:scale-110 transition-transform">
            ▲
          </div>
        );
      case 'AI':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-950 to-cyan-950 border border-emerald-400/60 flex items-center justify-center font-black text-base text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.45)] group-hover:scale-110 transition-transform">
            G
          </div>
        );
      case 'Web':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#2b1204] border border-orange-500/50 flex items-center justify-center font-black text-base text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.35)] group-hover:scale-110 transition-transform">
            5
          </div>
        );
      case 'GenAI':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#20003b] border border-purple-400/60 flex items-center justify-center font-black text-sm text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.45)] group-hover:scale-110 transition-transform">
            ✦ AI
          </div>
        );
      case 'Voice':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#002236] border border-cyan-400/60 flex items-center justify-center font-black text-sm text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.45)] group-hover:scale-110 transition-transform">
            ılılı
          </div>
        );
      case '3D':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#2e1200] border border-orange-500/60 flex items-center justify-center font-black text-sm text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.45)] group-hover:scale-110 transition-transform">
            3D
          </div>
        );
      case 'C4D':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#050e33] border border-indigo-400/60 flex items-center justify-center font-black text-sm text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.45)] group-hover:scale-110 transition-transform">
            C4D
          </div>
        );
      case 'TW':
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#04202c] border border-cyan-400/50 flex items-center justify-center font-black text-base text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.35)] group-hover:scale-110 transition-transform">
            ≈
          </div>
        );
    }
  };

  const handleOpenArsenalSkill = (code: string, fallbackName: string) => {
    const matched =
      data.skills.find((s) => s.shortCode?.toLowerCase() === code.toLowerCase()) ||
      data.skills.find((s) => s.name.toLowerCase().includes(fallbackName.toLowerCase())) ||
      data.skills[0];
    if (matched) {
      setSelectedSkillModal(matched);
    }
  };

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Handwritten brush notes on top left/right matching reference */}
        <div className="hidden lg:flex justify-between items-center px-4 -mb-4">
          <p className="font-script text-2xl text-purple-300/80 rotate-[-5deg]">
            Learn Create Grow
          </p>
          <p className="font-script text-2xl text-cyan-300/80 rotate-[4deg]">
            Turn Ideas Into Reality
          </p>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>MY SKILLS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Skills &{' '}
            <span className="font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 inline-block pl-2">
              Arsenal
            </span>
          </h2>

          <p className="mt-3 text-base text-gray-400 max-w-xl">
            Tools, skills and creative weapons I use to bring ideas to life.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-2 bg-[#0b0b14]/80 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tool Grid (2 rows x 5 columns on desktop) - Upgraded Model & Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              onClick={() => setSelectedSkillModal(skill)}
              className="group cursor-pointer relative p-5 rounded-3xl bg-[#090918]/85 border border-white/10 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(56,189,248,0.25),0_0_20px_rgba(168,85,247,0.2)] flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle neon gradient shimmer overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/0 via-transparent to-cyan-400/0 group-hover:from-purple-600/10 group-hover:to-cyan-400/10 transition-colors pointer-events-none" />

              <div>
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div className="shrink-0">
                    {getToolLogo(skill)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug truncate">
                      {skill.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-purple-300 font-semibold border border-white/10">
                        {skill.level}
                      </span>
                      <span className="text-[10px] font-bold text-cyan-400">
                        {skill.percentage || 90}%
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Glowing Level Indicator Bar with Click Hint */}
              <div className="mt-5 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-gray-500 font-medium">Proficiency</span>
                  <span className="text-[10px] text-purple-400 font-medium group-hover:text-cyan-300 transition-colors">
                    Click to explore →
                  </span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden p-[1px] border border-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.7)] group-hover:brightness-125 transition-all duration-500"
                    style={{ width: `${skill.percentage || 90}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom "My Creative Arsenal" Banner Matching Reference - Upgraded Model & Style */}
        <div className="mt-14 relative rounded-3xl p-[1.5px] bg-gradient-to-r from-purple-600/70 via-indigo-600/50 to-cyan-500/70 shadow-[0_0_40px_rgba(168,85,247,0.25)]">
          <div className="w-full bg-[#08081a] rounded-[23px] px-6 py-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-center md:text-left">
              {/* Studio Emblem */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px] shrink-0 hidden sm:block shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <div className="w-full h-full bg-[#050512] rounded-[14px] flex items-center justify-center">
                  <Layers className="w-6 h-6 text-cyan-400" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-purple-300 uppercase tracking-widest mb-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>MORE TOOLS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  My Creative{' '}
                  <span className="font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    Arsenal
                  </span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  A powerful, constantly evolving toolkit to create, edit, and inspire.
                </p>
              </div>
            </div>

            {/* Quick software emblem badges - Clickable & Glowing */}
            <div className="flex items-center gap-3 overflow-x-auto py-1 max-w-full">
              {[
                { name: 'Premiere Pro', code: 'Pr', bg: 'bg-[#00005b]', border: 'border-[#9999ff]/60', text: 'text-[#9999ff]' },
                { name: 'Resolve', code: 'Resolve', bg: 'bg-[#0d0d14]', border: 'border-cyan-400/60', text: 'text-cyan-300' },
                { name: 'After Effects', code: 'Ae', bg: 'bg-[#00005b]', border: 'border-[#d291ff]/60', text: 'text-[#d291ff]' },
                { name: 'Photoshop', code: 'Ps', bg: 'bg-[#001e36]', border: 'border-[#31a8ff]/60', text: 'text-[#31a8ff]' },
                { name: 'Illustrator', code: 'Ai', bg: 'bg-[#330000]', border: 'border-[#ff9a00]/60', text: 'text-[#ff9a00]' },
              ].map((sw, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOpenArsenalSkill(sw.code, sw.name)}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                  title={`View ${sw.name} skill modal`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${sw.bg} border ${sw.border} flex items-center justify-center font-bold text-xs ${sw.text} group-hover:scale-115 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]`}
                  >
                    {sw.code === 'Resolve' ? '●' : sw.code}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium group-hover:text-cyan-300 transition-colors">
                    {sw.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
