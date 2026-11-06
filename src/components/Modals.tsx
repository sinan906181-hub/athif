import React from 'react';
import {
  X,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Phone,
  MessageCircle,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const ServiceDetailModal: React.FC = () => {
  const { selectedServiceModal, setSelectedServiceModal, data } = useContent();

  if (!selectedServiceModal) return null;

  const handleBookService = () => {
    const serviceTitle = selectedServiceModal.title;
    setSelectedServiceModal(null);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // prefill service in select if available
      setTimeout(() => {
        const select = document.querySelector('select') as HTMLSelectElement | null;
        if (select) {
          select.value = serviceTitle;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, 400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl p-[1.5px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_80px_rgba(168,85,247,0.4),0_0_120px_rgba(56,189,248,0.25)] overflow-hidden">
        <div className="w-full bg-[#070716] rounded-[22px] overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header Visual with Soft Cinematic Overlay */}
          <div className="relative aspect-[16/7] overflow-hidden bg-black/60 shrink-0">
            <img
              src={selectedServiceModal.image}
              alt={selectedServiceModal.title}
              className="w-full h-full object-cover filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070716] via-[#070716]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-transparent to-cyan-500/20" />

            {/* Close button */}
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0b0b1a]/80 backdrop-blur-md text-gray-300 hover:text-white hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest bg-purple-950/80 border border-purple-500/40 text-purple-200 backdrop-blur-md uppercase shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                  {selectedServiceModal.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  {selectedServiceModal.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Service Scope & Vision</span>
              </h4>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                {selectedServiceModal.shortDescription}
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>Deliverables & Outputs</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedServiceModal.deliverables?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#0c0c22]/80 border border-white/10 hover:border-purple-500/30 flex items-start gap-3 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-cyan-400" />
                    </div>
                    <span className="text-xs text-gray-200 font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Highlight */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-cyan-950/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
                  <Clock className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Fast Turnaround & Revisions</p>
                  <p className="text-[11px] text-gray-400">
                    Direct line: {data.contactInfo.phone || '+91 8113014526'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${data.contactInfo.phone || '+918113014526'}`}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${(data.contactInfo.phone || '8113014526').replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-5 sm:p-6 border-t border-white/10 bg-[#060612] flex items-center justify-between gap-4 shrink-0">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleBookService}
              className="px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_35px_rgba(56,189,248,0.65)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Book This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to provide comprehensive technologies, overview and capabilities for any skill
const getSkillExtendedDetails = (skill: ToolSkill) => {
  const name = skill.name.toLowerCase();
  const code = (skill.shortCode || '').toLowerCase();

  if (name.includes('premiere') || code === 'pr') {
    return {
      overview:
        'Adobe Premiere Pro forms the core non-linear editing pipeline at Athif Creative Studio. Engineered for commercial reels, documentary pacing, multi-track timeline management, and frame-accurate storytelling, every cut is synchronized to narrative cadence and musical rhythm.',
      technologies: [
        'Lumetri Color Engine',
        'Essential Sound Suite',
        'Multi-Cam Sync',
        'Dynamic Link',
        'ProRes 4K Pipeline',
        'Speed Ramping',
        'Beat-Matched Cuts',
      ],
      capabilities: [
        {
          title: 'High-Retention Narrative Cuts',
          description: 'Surgically timed edits engineered to maximize audience watch time and emotional hook.',
        },
        {
          title: 'Multi-Track Sound Design',
          description: 'Audio restoration, dynamic dialogue ducking, whooshes, risers, and punchy impact SFX.',
        },
        {
          title: 'Cinematic Color & Tone Matching',
          description: 'Harmonizing multi-camera footage with custom LUT grading and exposure balance.',
        },
        {
          title: 'Vertical 9:16 Social Mastery',
          description: 'Platform-optimized exports calibrated for Instagram Reels, YouTube Shorts, and TikTok.',
        },
      ],
    };
  }

  if (name.includes('resolve') || code === 'resolve') {
    return {
      overview:
        'DaVinci Resolve is the gold standard for high-end color science and finishing. Athif utilizes node-based grading graphs, custom film emulation curves, skin-tone isolation, and HDR color management to elevate raw footage into cinematic masterworks.',
      technologies: [
        'Node-Based Color Trees',
        'Film Emulation Curves',
        'ACES Color Pipeline',
        'Power Windows & Tracking',
        'Color Match & Scopes',
        'HDR Tone Mapping',
      ],
      capabilities: [
        {
          title: 'Hollywood-Grade Film Emulation',
          description: 'Recreating timeless 35mm and 16mm analog textures with grain, halation, and roll-off.',
        },
        {
          title: 'Surgical Skin Tone Isolation',
          description: 'Flawless complexion preservation while stylizing background shadows and highlights.',
        },
        {
          title: 'Shot-to-Shot Color Matching',
          description: 'Seamless continuity across varying lighting setups, times of day, and camera sensors.',
        },
        {
          title: 'Custom LUT & Look Development',
          description: 'Designing bespoke color profiles tailored to specific brand aesthetics.',
        },
      ],
    };
  }

  if (name.includes('after effects') || code === 'ae') {
    return {
      overview:
        'Adobe After Effects empowers kinetic motion graphics, title sequences, visual effects, and graphic composites. Every keyframe is tuned with custom velocity graphs to achieve ultra-fluid, modern studio motion design.',
      technologies: [
        'Kinetic Typography',
        'Graph Editor Easing',
        '3D Camera Tracker',
        'Rotoscoping & VFX',
        'Shape Layer Morphing',
        'Particle Simulations',
      ],
      capabilities: [
        {
          title: 'Kinetic Typography & Titles',
          description: 'Energetic text animations that elevate brand messaging with visual weight.',
        },
        {
          title: 'Seamless Transition Systems',
          description: 'Whip-pans, zoom transitions, glitch overlays, and custom spatial wipes.',
        },
        {
          title: 'Logo Reveals & Stingers',
          description: 'Memorable brand logo animations complete with matching sound design stems.',
        },
        {
          title: 'Motion Tracking & Clean Plate VFX',
          description: 'Screen replacements, object removals, and 3D floating graphic elements.',
        },
      ],
    };
  }

  if (name.includes('photoshop') || code === 'ps') {
    return {
      overview:
        'Adobe Photoshop is the creative powerhouse for digital compositing, poster manipulation, and commercial retouching. Combining advanced layer masks, custom brushwork, and frequency separation, Athif crafts visuals that command immediate attention.',
      technologies: [
        'Frequency Separation',
        'Advanced Compositing',
        'Camera Raw Filters',
        'Displacement Maps',
        'Smart Objects & Filters',
        'Color Grading & Curves',
      ],
      capabilities: [
        {
          title: 'Commercial Poster Key Art',
          description: 'Cinema, sports, and festival posters with commanding focal points and depth.',
        },
        {
          title: 'High-End Editorial Retouching',
          description: 'Natural texture preservation, blemish removal, and atmospheric studio lighting.',
        },
        {
          title: 'Complex Subject Extraction',
          description: 'Hair, smoke, and fine detail isolation on complex contrasting backgrounds.',
        },
        {
          title: 'Creative Lighting & Rim Glows',
          description: 'Dual-tone lighting passes that embed subjects naturally into futuristic environments.',
        },
      ],
    };
  }

  if (name.includes('illustrator') || code === 'ai') {
    return {
      overview:
        'Adobe Illustrator delivers crisp, infinitely scalable vector artwork, typographic emblems, and brand identity assets. Athif utilizes precision bezier paths and grid alignment to engineer vector badges that look sharp on any screen or billboard.',
      technologies: [
        'Vector Bezier Pen Tool',
        'Custom Typography',
        'Pathfinder & Shape Builder',
        'Isometric Grid Systems',
        'Scalable SVG Architecture',
      ],
      capabilities: [
        {
          title: 'Brand Iconography & Emblems',
          description: 'Distinctive visual marks designed with geometric balance and symbolic impact.',
        },
        {
          title: 'Print-Ready Vector Key Art',
          description: 'CMYK color-calibrated assets ready for large-format physical print.',
        },
        {
          title: 'Custom Lettering & Monograms',
          description: 'Bespoke typographic marks crafted specifically for creative creators and studios.',
        },
        {
          title: 'Social Identity Systems',
          description: 'Scalable badges, watermarks, and verification badges for cross-platform presence.',
        },
      ],
    };
  }

  if (name.includes('image generator') || code === 'genai') {
    return {
      overview:
        'Harnessing cutting-edge generative AI models (Midjourney, Imagen 3, Stable Diffusion, Flux) for rapid concept prototyping, high-detail texture generation, and creative direction. Athif blends AI generation with professional manual retouching to deliver pristine, commercial-grade imagery without AI artifacts.',
      technologies: [
        'Advanced Prompt Syntax',
        'Inpainting & Outpainting',
        'ControlNet Pose Guidance',
        'Multi-Pass Upscaling',
        'Style Consistency LoRA',
        'Lighting & Atmosphere Prompting',
      ],
      capabilities: [
        {
          title: 'Concept Ideation & Storyboards',
          description: 'Translating creative briefs into dozens of visual moodboards in minutes.',
        },
        {
          title: 'Hybrid AI + Manual Compositing',
          description: 'Fixing hands, facial features, and text in Photoshop to ensure zero AI slop.',
        },
        {
          title: '4K/8K Texture & Background Assets',
          description: 'Generating bespoke cyberpunk, futuristic, and editorial studio backdrops.',
        },
        {
          title: 'Consistent Character & Mood Styling',
          description: 'Retaining character fidelity and color palette across serialized content.',
        },
      ],
    };
  }

  if (name.includes('voice') || code === 'voice') {
    return {
      overview:
        'AI Voice and Speech Synthesis allows rapid creation of natural, expressive vocal narrations for video reels, explainers, and promotional campaigns. Combined with EQ, compression, and room acoustics matching, Athif produces studio-quality voice tracks.',
      technologies: [
        'Neural Voice Modeling',
        'Pacing & Emotion Modulation',
        'Spectrogram Denoising',
        'Dynamic Range Compression',
        'Multi-Language Accent Tuning',
        'Binaural Spatial Panning',
      ],
      capabilities: [
        {
          title: 'Natural Narrative Voiceovers',
          description: 'Engaging narration with human cadence, warmth, and dynamic inflections.',
        },
        {
          title: 'Surgical Audio Noise Cleanup',
          description: 'Removing room echo, plosives, hums, and background hiss effortlessly.',
        },
        {
          title: 'Multilingual Dubbing & Accents',
          description: 'Reaching diverse audiences across regional and global language variations.',
        },
        {
          title: 'Complete Commercial Audio Mix',
          description: 'Mastered to standard loudness levels (-14 LUFS) ready for broadcast and social.',
        },
      ],
    };
  }

  if (name.includes('blender') || code === '3d') {
    return {
      overview:
        'Blender 3D allows Athif to model, light, and render three-dimensional assets, product mockups, and atmospheric spatial environments. Utilizing Cycles ray-tracing and real-time Eevee, 3D elements are composited seamlessly into video projects.',
      technologies: [
        'Cycles Raytracing',
        'PBR Material Shaders',
        'Studio Light Rigs',
        'Camera Motion Tracking',
        'Geometry Nodes',
        'Cloth & Particle Physics',
      ],
      capabilities: [
        {
          title: 'Photorealistic 3D Product Renders',
          description: 'Showcasing packaging, tech gear, and digital hardware with physical accuracy.',
        },
        {
          title: 'Spatial Studio Environments',
          description: 'Building volumetric neon rooms, reflective stages, and atmospheric fog.',
        },
        {
          title: '3D & 2D Hybrid Compositing',
          description: 'Merging 3D rendered elements directly into live-action video timelines.',
        },
        {
          title: 'Dynamic Camera Fly-Throughs',
          description: 'Sweeping cinematic camera movements impossible to capture on standard physical rigs.',
        },
      ],
    };
  }

  if (name.includes('cinema 4d') || code === 'c4d') {
    return {
      overview:
        'Cinema 4D paired with Redshift provides fluid 3D broadcast motion graphics, kinetic typography, and abstract simulation. Athif uses MoGraph arrays and rigid body dynamics to build high-octane 3D title sequences.',
      technologies: [
        'MoGraph Cloner Arrays',
        'Redshift GPU Rendering',
        'Rigid Body Dynamics',
        'Subsurface Scattering',
        'Cineware Integration',
      ],
      capabilities: [
        {
          title: 'High-Impact 3D Title Sequences',
          description: 'Volumetric, textured kinetic type that hits the screen with weight.',
        },
        {
          title: 'Abstract Particle Animations',
          description: 'Swirling energy ribbons, neon shards, and fluid physics.',
        },
        {
          title: 'Broadcast Ident & Stingers',
          description: 'Polished 3D brand logo reveals built for television and commercial web.',
        },
        {
          title: 'Dynamic Lighting & Materials',
          description: 'Chrome, iridescent glass, brushed aluminum, and carbon fiber materials.',
        },
      ],
    };
  }

  // Default fallback for any other skill (Figma, Framer Motion, HTML/CSS, etc.)
  return {
    overview:
      skill.description ||
      `${skill.name} is a key asset in Athif's creative toolkit, enabling high-precision visual craftsmanship, modern aesthetic trends, and streamlined delivery across professional creative engagements.`,
    technologies: [
      'Modern Studio Standards',
      'Advanced Asset Optimization',
      'High-Speed Keyframe Pacing',
      'Production Pipeline Integration',
      'Cross-Platform Fidelity',
    ],
    capabilities: [
      {
        title: 'Professional Workflows',
        description: 'Industry-standard execution with clean file structures and fast turnarounds.',
      },
      {
        title: 'Advanced Creative Techniques',
        description: 'Pushing software capabilities beyond default presets to achieve distinctive results.',
      },
      {
        title: 'Production Experience',
        description: 'Battle-tested across commercial reels, editorial posters, and brand identities.',
      },
      {
        title: 'Creative Problem Solving',
        description: 'Overcoming technical and artistic challenges with flexible, innovative solutions.',
      },
    ],
  };
};

export const SkillDetailModal: React.FC = () => {
  const { selectedSkillModal, setSelectedSkillModal, data } = useContent();
  const [animatedPercent, setAnimatedPercent] = React.useState(0);

  // Trigger smooth progress bar fill-up when modal opens
  React.useEffect(() => {
    if (selectedSkillModal) {
      setAnimatedPercent(0);
      const timer = setTimeout(() => {
        setAnimatedPercent(selectedSkillModal.percentage || 90);
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [selectedSkillModal]);

  if (!selectedSkillModal) return null;

  const details = getSkillExtendedDetails(selectedSkillModal);

  const handleConsultSkill = () => {
    const skillName = selectedSkillModal.name;
    setSelectedSkillModal(null);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // prefill in textarea message or service
      setTimeout(() => {
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement | null;
        if (textarea && !textarea.value) {
          textarea.value = `Hi Athif, I would like to start a project utilizing your expertise in ${skillName}...`;
          textarea.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, 400);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedSkillModal(null);
      }}
    >
      {/* Centered Large Modal Container with Thin Animated Gradient Border */}
      <div className="relative w-full max-w-2xl sm:max-w-3xl my-auto rounded-3xl p-[1.5px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_80px_rgba(168,85,247,0.35),0_0_120px_rgba(56,189,248,0.25)] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out overflow-hidden">
        {/* Modal Inner Window */}
        <div className="w-full bg-[#070716] rounded-[22px] overflow-hidden flex flex-col max-h-[90vh] relative">
          {/* Subtle Ambient Studio Glows inside Modal */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Section: Header with Logo, Name, Badges and Close Button */}
          <div className="relative p-6 sm:p-8 pb-5 border-b border-white/10 shrink-0 bg-gradient-to-b from-[#0c0c24]/90 to-transparent">
            {/* Elegant Circular Close Button */}
            <button
              onClick={() => setSelectedSkillModal(null)}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/50 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-110 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20"
              aria-label="Close Modal"
              title="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pr-10">
              {/* Large Stylized Tool Icon with Multi-Color Rim */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-400 p-[2px] shadow-[0_0_30px_rgba(168,85,247,0.5)] shrink-0 group">
                <div className="w-full h-full bg-[#050512] rounded-[14px] flex items-center justify-center font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-200 to-white">
                  {selectedSkillModal.shortCode || '✦'}
                </div>
              </div>

              {/* Title & Status Badges */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-purple-300 uppercase px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40">
                    <Sparkles className="w-3 h-3 text-cyan-300" />
                    <span>{selectedSkillModal.category} ARSENAL</span>
                  </span>

                  <span className="text-[10px] font-semibold text-cyan-300 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-400/30">
                    {selectedSkillModal.level}
                  </span>

                  <span className="text-[10px] font-bold text-gray-200 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {selectedSkillModal.percentage || 90}% Proficiency
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {selectedSkillModal.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                  {selectedSkillModal.description}
                </p>
              </div>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-7 flex-1">
            {/* 1. PROFICIENCY ANIMATED BAR */}
            <div className="p-5 rounded-2xl bg-[#09091c]/90 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs mb-2.5">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                    PROFICIENCY & EXECUTION SPEED
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-cyan-300">
                    {animatedPercent}%
                  </span>
                  <span className="text-[10px] text-gray-400">Mastery</span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-black/60 p-[1.5px] border border-white/10 overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] transition-all duration-1000 ease-out"
                  style={{ width: `${animatedPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-2 flex items-center justify-between">
                <span>Production-ready workflows</span>
                <span>Fast turnaround & Revision Support</span>
              </p>
            </div>

            {/* 2. SKILL OVERVIEW */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>SKILL OVERVIEW</span>
              </h4>
              <div className="p-4 sm:p-5 rounded-2xl bg-[#08081a]/70 border border-white/5 text-gray-200 text-xs sm:text-sm leading-relaxed font-normal">
                {details.overview}
              </div>
            </div>

            {/* 3. SKILLS / TECHNOLOGIES (Animated Pills/Tags) */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>RELATED TECHNOLOGIES & PIPELINES</span>
              </h4>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {details.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="group/pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c0c24] border border-white/10 hover:border-cyan-400/60 hover:bg-[#101032] text-xs font-semibold text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover/pill:animate-ping" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* 4. EXPERIENCE / CAPABILITIES (Clean Animated Cards) */}
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>EXPERIENCE & CAPABILITIES</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {details.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="group/card p-4 rounded-2xl bg-[#08081c]/90 border border-white/10 hover:border-cyan-400/50 hover:bg-[#0c0c2a] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover/card:scale-110 group-hover/card:border-cyan-400/50 group-hover/card:bg-cyan-500/10 transition-all">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white group-hover/card:text-cyan-300 transition-colors">
                        {cap.title}
                      </h5>
                      <p className="text-[11px] text-gray-400 mt-1 leading-snug">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Line with Phone / WhatsApp */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/30 via-indigo-950/20 to-cyan-950/30 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
                  <Clock className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Direct Project Inquiries</p>
                  <p className="text-[11px] text-gray-400">
                    Call / WhatsApp: {data.contactInfo.phone || '+91 8113014526'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${data.contactInfo.phone || '+918113014526'}`}
                  className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${(data.contactInfo.phone || '8113014526').replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Modal Footer with Actions */}
          <div className="p-5 sm:p-6 border-t border-white/10 bg-[#050510] flex items-center justify-between gap-4 shrink-0">
            <button
              onClick={() => setSelectedSkillModal(null)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handleConsultSkill}
              className="px-6 sm:px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_35px_rgba(56,189,248,0.65)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Start a Project with {selectedSkillModal.name}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

