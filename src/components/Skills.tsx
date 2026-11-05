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
  const { data } = useContent();
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
          <div className="w-12 h-12 rounded-2xl bg-[#00005b] border border-[#9999ff]/50 flex items-center justify-center font-black text-lg text-[#9999ff] shadow-[0_0_15px_rgba(153,153,255,0.4)]">
            Pr
          </div>
        );
      case 'Resolve':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#111] border border-cyan-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-500 via-green-500 to-blue-500 animate-spin duration-3000" />
          </div>
        );
      case 'Ae':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#00005b] border border-[#d291ff]/50 flex items-center justify-center font-black text-lg text-[#d291ff] shadow-[0_0_15px_rgba(210,145,255,0.4)]">
            Ae
          </div>
        );
      case 'Ps':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#001e36] border border-[#31a8ff]/50 flex items-center justify-center font-black text-lg text-[#31a8ff] shadow-[0_0_15px_rgba(49,168,255,0.4)]">
            Ps
          </div>
        );
      case 'Ai':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#330000] border border-[#ff9a00]/50 flex items-center justify-center font-black text-lg text-[#ff9a00] shadow-[0_0_15px_rgba(255,154,0,0.4)]">
            Ai
          </div>
        );
      case 'Figma':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#1e1e1e] border border-pink-500/40 flex items-center justify-center font-bold text-sm text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            Fi
          </div>
        );
      case 'FM':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#1a0b2e] border border-violet-500/40 flex items-center justify-center font-black text-base text-violet-400">
            ▲
          </div>
        );
      case 'AI':
        return (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-950 to-cyan-950 border border-emerald-400/50 flex items-center justify-center font-black text-base text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)]">
            G
          </div>
        );
      case 'Web':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#2b1204] border border-orange-500/40 flex items-center justify-center font-black text-base text-orange-400">
            5
          </div>
        );
      case 'TW':
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#04202c] border border-cyan-400/40 flex items-center justify-center font-black text-base text-cyan-300">
            ≈
          </div>
        );
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
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

        {/* Tool Grid (2 rows x 5 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group p-5 rounded-3xl bg-[#090914]/85 border border-white/10 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                    {getToolLogo(skill)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {skill.name}
                    </h3>
                    <span className="inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-purple-300 font-medium border border-white/5">
                      {skill.level}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Glowing Level Indicator Bar */}
              <div className="mt-5 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-gray-500 font-medium">Proficiency</span>
                  <span className="text-cyan-300 font-bold">{skill.percentage || 90}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden p-[1px] border border-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.7)] transition-all duration-700"
                    style={{ width: `${skill.percentage || 90}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom "My Creative Arsenal" Banner Matching Reference */}
        <div className="mt-14 relative rounded-3xl p-[1px] bg-gradient-to-r from-purple-600/60 via-indigo-600/40 to-cyan-500/60 shadow-[0_0_35px_rgba(168,85,247,0.2)]">
          <div className="w-full bg-[#070714] rounded-[23px] px-6 py-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-center md:text-left">
              {/* Studio Emblem */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px] shrink-0 hidden sm:block">
                <div className="w-full h-full bg-[#080816] rounded-[14px] flex items-center justify-center">
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

            {/* Quick software emblem badges */}
            <div className="flex items-center gap-2.5 overflow-x-auto py-1 max-w-full">
              {[
                { name: 'Premiere Pro', code: 'Pr', bg: 'bg-[#00005b]', border: 'border-[#9999ff]/50', text: 'text-[#9999ff]' },
                { name: 'Resolve', code: 'Resolve', bg: 'bg-black', border: 'border-cyan-400/50', text: 'text-cyan-300' },
                { name: 'After Effects', code: 'Ae', bg: 'bg-[#00005b]', border: 'border-[#d291ff]/50', text: 'text-[#d291ff]' },
                { name: 'Photoshop', code: 'Ps', bg: 'bg-[#001e36]', border: 'border-[#31a8ff]/50', text: 'text-[#31a8ff]' },
                { name: 'Illustrator', code: 'Ai', bg: 'bg-[#330000]', border: 'border-[#ff9a00]/50', text: 'text-[#ff9a00]' },
              ].map((sw, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${sw.bg} border ${sw.border} flex items-center justify-center font-bold text-xs ${sw.text} group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(0,0,0,0.5)]`}
                  >
                    {sw.code === 'Resolve' ? '●' : sw.code}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium group-hover:text-white transition-colors">
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
