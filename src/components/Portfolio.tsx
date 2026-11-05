import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { PortfolioProject } from '../types';

type CategoryFilter = 'ALL' | 'VIDEO' | 'POSTERS' | 'PHOTO' | 'SOCIAL' | 'MOTION';

export const Portfolio: React.FC = () => {
  const { data, setSelectedPortfolioModal } = useContent();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Video', value: 'VIDEO' },
    { label: 'Posters', value: 'POSTERS' },
    { label: 'Photo', value: 'PHOTO' },
    { label: 'Social', value: 'SOCIAL' },
    { label: 'Motion', value: 'MOTION' },
  ];

  const filteredProjects =
    activeCategory === 'ALL'
      ? data.portfolio
      : data.portfolio.filter((p) => p.category === activeCategory);

  const handleOpenProject = (project: PortfolioProject) => {
    setSelectedPortfolioModal(project);
  };

  return (
    <section id="portfolio" className="relative py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-700/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>MY WORK</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
              Selected{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
                Work
              </span>
            </h2>
            <p className="mt-3 text-base text-gray-400 max-w-xl">
              A curated collection of commercial edits, graphic posters, and digital experiences crafted with precision.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 md:mt-0 flex flex-wrap items-center gap-2 bg-[#0b0b14]/80 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <Filter className="w-4 h-4 text-gray-500 ml-2 mr-1 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="group relative rounded-3xl overflow-hidden bg-[#0a0a14] border border-white/10 cursor-pointer transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] hover:-translate-y-1.5 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />

                {/* Dark Vignette & Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] transform scale-75 group-hover:scale-100 transition-transform">
                    {project.category === 'VIDEO' || project.category === 'MOTION' ? (
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-black/70 border border-white/20 text-cyan-300 backdrop-blur-md uppercase">
                    {project.category}
                  </span>
                </div>

                {project.clientOrYear && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-gray-300 backdrop-blur-sm">
                      {project.clientOrYear}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="mt-2 text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Software tags */}
                {project.tools && project.tools.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-gray-400 border border-white/5"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
