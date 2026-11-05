import React from 'react';
import { X, CheckCircle, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const ServiceDetailModal: React.FC = () => {
  const { selectedServiceModal, setSelectedServiceModal } = useContent();

  if (!selectedServiceModal) return null;

  const handleBookService = () => {
    setSelectedServiceModal(null);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090916] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.35)] flex flex-col max-h-[90vh]">
        {/* Header Image */}
        <div className="relative aspect-[16/8] overflow-hidden bg-black/60 shrink-0">
          <img
            src={selectedServiceModal.image}
            alt={selectedServiceModal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090916] via-transparent to-black/30" />

          {/* Close button */}
          <button
            onClick={() => setSelectedServiceModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-black/90 transition-colors border border-white/10"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-purple-900/70 border border-purple-500/40 text-purple-200 backdrop-blur-md uppercase">
              {selectedServiceModal.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {selectedServiceModal.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Overview
            </h4>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              {selectedServiceModal.shortDescription}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Included Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedServiceModal.deliverables?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5"
                >
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-300 font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/10 bg-[#070712] flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={() => setSelectedServiceModal(null)}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleBookService}
            className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Book This Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProjectDetailModal: React.FC = () => {
  const { selectedPortfolioModal, setSelectedPortfolioModal } = useContent();

  if (!selectedPortfolioModal) return null;

  const handleInquireProject = () => {
    setSelectedPortfolioModal(null);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#090916] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(56,189,248,0.3)] flex flex-col max-h-[90vh]">
        {/* Header Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-black/60 shrink-0">
          <img
            src={selectedPortfolioModal.thumbnail}
            alt={selectedPortfolioModal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090916] via-transparent to-black/30" />

          {/* Close button */}
          <button
            onClick={() => setSelectedPortfolioModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-black/90 transition-colors border border-white/10"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-cyan-900/70 border border-cyan-400/40 text-cyan-200 backdrop-blur-md uppercase">
              {selectedPortfolioModal.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
              {selectedPortfolioModal.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Project Description
            </h4>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              {selectedPortfolioModal.description}
            </p>
          </div>

          {/* Tools & Software */}
          {selectedPortfolioModal.tools && selectedPortfolioModal.tools.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                Software & Arsenal
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedPortfolioModal.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-cyan-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables */}
          {selectedPortfolioModal.deliverables && selectedPortfolioModal.deliverables.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Deliverables Provided
              </h4>
              <div className="space-y-2">
                {selectedPortfolioModal.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                    <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/10 bg-[#070712] flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={() => setSelectedPortfolioModal(null)}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleInquireProject}
            className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Inquire About A Project Like This</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
