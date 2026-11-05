import React, { useState } from 'react';
import {
  X,
  Shield,
  LayoutDashboard,
  Briefcase,
  Layers,
  User,
  Wrench,
  Mail,
  Settings,
  Palette,
  Lock,
  Unlock,
  KeyRound,
  Plus,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Check,
  Download,
  Upload,
  RotateCcw,
  Star,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Clock,
  Send,
  Video,
  Image as ImageIcon,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { ServiceItem, PortfolioProject, ToolSkill, StatItem, ValueCard } from '../types';

type AdminTab =
  | 'dashboard'
  | 'portfolio'
  | 'services'
  | 'about'
  | 'skills'
  | 'messages'
  | 'settings'
  | 'appearance'
  | 'security';

export const AdminPortal: React.FC = () => {
  const {
    data,
    updateBrand,
    updateSettings,
    updateAppearance,
    updateContactInfo,
    updateService,
    addService,
    deleteService,
    toggleServiceEnabled,
    reorderServices,
    updatePortfolioProject,
    addPortfolioProject,
    deletePortfolioProject,
    togglePortfolioFeatured,
    reorderPortfolio,
    updateStats,
    addStat,
    deleteStat,
    updateWhyChooseMe,
    addWhyCard,
    deleteWhyCard,
    updateSkill,
    addSkill,
    deleteSkill,
    markMessageRead,
    toggleMessageRead,
    deleteMessage,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    changePassword,
    resetPasswordWithSecurity,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
    isAdminOpen,
    setIsAdminOpen,
    showToast,
  } = useContent();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Security Login Form State
  const [passcodeInput, setPasscodeInput] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotAnswer, setForgotAnswer] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  // Service Edit/Add State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceForm, setServiceForm] = useState<Omit<ServiceItem, 'id'>>({
    title: '',
    category: 'VIDEO',
    shortDescription: '',
    image: '/assets/athif_real_photo.png',
    iconName: 'Video',
    deliverables: ['High-Paced Edit', 'Sound FX & Mix'],
    enabled: true,
  });
  const [newDeliverableInput, setNewDeliverableInput] = useState('');

  // Portfolio Edit/Add State
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Omit<PortfolioProject, 'id'>>({
    title: '',
    category: 'VIDEO',
    thumbnail: '/assets/athif_real_photo.png',
    description: '',
    tools: ['Premiere Pro', 'After Effects'],
    deliverables: ['Master Render'],
    clientOrYear: 'Commercial Project · 2026',
    featured: false,
    videoUrl: '',
  });

  // Skills Edit/Add State
  const [editingSkill, setEditingSkill] = useState<ToolSkill | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [skillForm, setSkillForm] = useState<Omit<ToolSkill, 'id'>>({
    name: '',
    shortCode: 'Tool',
    category: 'VIDEO',
    description: '',
    level: 'Advanced',
    percentage: 90,
  });

  // About & Bio Form State
  const [aboutBioText, setAboutBioText] = useState(data.brand.aboutBio);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(data.brand.heroPortrait);
  const [newStatValue, setNewStatValue] = useState('');
  const [newStatLabel, setNewStatLabel] = useState('');
  const [newWhyTitle, setNewWhyTitle] = useState('');
  const [newWhyDesc, setNewWhyDesc] = useState('');
  const [newWhyIcon, setNewWhyIcon] = useState('Rocket');

  // Website Settings Form State
  const [settingsForm, setSettingsForm] = useState(data.settings);
  const [brandForm, setBrandForm] = useState(data.brand);
  const [contactForm, setContactForm] = useState(data.contactInfo);

  // Appearance State
  const [appearanceForm, setAppearanceForm] = useState(data.appearance);

  if (!isAdminOpen) return null;

  // Handle local file uploads by converting to base64 Data URL
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onComplete(result);
          showToast('Image uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(passcodeInput);
    setPasscodeInput('');
  };

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (changePassword(oldPass, newPass)) {
      setOldPass('');
      setNewPass('');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetPasswordWithSecurity(forgotAnswer, forgotNewPass)) {
      setShowForgotModal(false);
      setForgotAnswer('');
      setForgotNewPass('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#070712] border border-purple-500/40 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.35)] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0a0a1a] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1.5px] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <div className="w-full h-full bg-[#070714] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  {data.brand.name} Creative Studio
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  Ctrl+Shift+S Portal
                </span>
                {isAuthenticated ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                    <Unlock className="w-3 h-3" /> Unlocked
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">
                Studio Management Suite • All control in one portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-red-500/20 text-red-300 transition-colors border border-white/10"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Portal</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOCKED SCREEN: Authenticate before granting sensitive access */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#05050c]">
            <div className="w-full max-w-md bg-[#0a0a1a] border border-purple-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.25)] text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px] shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                <div className="w-full h-full bg-[#080816] rounded-[14px] flex items-center justify-center">
                  <KeyRound className="w-8 h-8 text-cyan-400" />
                </div>
              </div>

              <h4 className="text-2xl font-black text-white">Admin Authentication</h4>
              <p className="text-xs text-gray-400 mt-2">
                Enter your master password to access the full control dashboard.
              </p>

              <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter passcode (Default: athif2026)"
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    className="w-full bg-[#0d0d1e] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 text-center focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all cursor-pointer"
                >
                  Unlock Admin Portal →
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                <span>Default Key: <code className="text-cyan-400">athif2026</code></span>
                <button
                  onClick={() => setShowForgotModal(true)}
                  className="text-purple-400 hover:text-purple-300 underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Forgot Password Modal */}
              {showForgotModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                  <div className="w-full max-w-sm bg-[#0e0e22] border border-purple-500/40 rounded-2xl p-6 text-left space-y-4">
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      <span>Reset Admin Password</span>
                    </h5>
                    <p className="text-xs text-gray-300">
                      Security Question: <br />
                      <strong className="text-white">{data.security?.securityQuestion}</strong>
                    </p>
                    <form onSubmit={handleForgotSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Security Answer (Athif Creative Studio)"
                        value={forgotAnswer}
                        onChange={(e) => setForgotAnswer(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                      <input
                        type="password"
                        placeholder="Enter New Password"
                        value={forgotNewPass}
                        onChange={(e) => setForgotNewPass(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        required
                      />
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowForgotModal(false)}
                          className="px-3 py-1.5 rounded-lg text-xs text-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* AUTHENTICATED: Full 9-Module Admin Dashboard */
          <>
            {/* Navigation Tabs Bar */}
            <div className="px-6 py-2.5 bg-[#080816] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                {
                  id: 'portfolio',
                  label: `Portfolio (${data.portfolio?.length || 0})`,
                  icon: Briefcase,
                },
                {
                  id: 'services',
                  label: `Services (${data.services?.length || 0})`,
                  icon: Layers,
                },
                { id: 'about', label: 'About & Bio', icon: User },
                { id: 'skills', label: `Skills (${data.skills?.length || 0})`, icon: Wrench },
                {
                  id: 'messages',
                  label: `Inquiries (${data.messages?.filter((m) => !m.read).length || 0})`,
                  icon: Mail,
                },
                { id: 'settings', label: 'Website Settings', icon: Settings },
                { id: 'appearance', label: 'Appearance', icon: Palette },
                { id: 'security', label: 'Security', icon: Lock },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as AdminTab)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Content Area */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#05050c]">
              {/* MODULE 1: Overview / Dashboard */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Quick Stat Tiles */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-[#090918] border border-white/10 flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Total Projects</p>
                        <p className="text-2xl font-black text-white">{data.portfolio.length}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090918] border border-white/10 flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0">
                        <Layers className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Total Services</p>
                        <p className="text-2xl font-black text-white">{data.services.length}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090918] border border-white/10 flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-pink-950/60 border border-pink-500/30 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Messages</p>
                        <p className="text-2xl font-black text-white">
                          {data.messages.length}
                          <span className="text-xs text-cyan-400 font-normal ml-1.5">
                            ({data.messages.filter((m) => !m.read).length} unread)
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090918] border border-white/10 flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center shrink-0">
                        <Wrench className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Skills / Tools</p>
                        <p className="text-2xl font-black text-white">{data.skills.length}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Shortcuts */}
                  <div className="p-5 rounded-2xl bg-[#090918] border border-white/10">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Quick Action Center
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => {
                          setActiveTab('services');
                          setIsAddingService(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600/40 hover:bg-purple-600 border border-purple-500/40 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Service</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('portfolio');
                          setIsAddingProject(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600/40 hover:bg-cyan-600 border border-cyan-500/40 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Portfolio Work</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('about')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Edit Profile & Bio</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('messages')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-pink-400" />
                        <span>Check Inquiries ({data.messages.filter((m) => !m.read).length})</span>
                      </button>

                      <button
                        onClick={exportDataJSON}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Download Full Backup</span>
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity Stream */}
                  <div className="p-5 rounded-2xl bg-[#090918] border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>Recent Activity Log</span>
                      </h4>
                      <span className="text-[10px] text-gray-500">Auto-recorded</span>
                    </div>

                    <div className="space-y-2.5 max-h-64 overflow-y-auto">
                      {(data.activityLog || []).map((act) => (
                        <div
                          key={act.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-cyan-400" />
                            <div>
                              <p className="font-bold text-white">{act.action}</p>
                              <p className="text-[11px] text-gray-400">{act.details}</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-500 shrink-0">{act.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 2: Portfolio Management */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Portfolio Projects</h4>
                      <p className="text-xs text-gray-400">
                        Add, edit, reorder, feature, and manage projects.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddingProject(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {/* Add Project Form */}
                  {isAddingProject && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!projectForm.title) return;
                        addPortfolioProject(projectForm);
                        setIsAddingProject(false);
                      }}
                      className="p-5 rounded-2xl bg-[#0c0c20] border border-cyan-500/40 space-y-4"
                    >
                      <h5 className="text-xs font-bold text-cyan-300 uppercase">Create New Project</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Project Title"
                          required
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <select
                          value={projectForm.category}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              category: e.target.value as any,
                            })
                          }
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="VIDEO">VIDEO</option>
                          <option value="POSTERS">POSTERS</option>
                          <option value="PHOTO">PHOTO</option>
                          <option value="SOCIAL">SOCIAL</option>
                          <option value="MOTION">MOTION</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-gray-400 mb-1">
                            Thumbnail URL or Upload File
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Thumbnail image URL"
                              value={projectForm.thumbnail}
                              onChange={(e) =>
                                setProjectForm({ ...projectForm, thumbnail: e.target.value })
                              }
                              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                            />
                            <label className="px-3 py-2 bg-white/10 hover:bg-white/15 rounded-xl text-xs text-white cursor-pointer shrink-0">
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageFileUpload(e, (url) =>
                                    setProjectForm({ ...projectForm, thumbnail: url })
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] text-gray-400 mb-1">
                            Video Preview URL (YouTube, Vimeo, or MP4)
                          </label>
                          <input
                            type="text"
                            placeholder="Optional video embed URL"
                            value={projectForm.videoUrl || ''}
                            onChange={(e) =>
                              setProjectForm({ ...projectForm, videoUrl: e.target.value })
                            }
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Detailed project description..."
                        value={projectForm.description}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, description: e.target.value })
                        }
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />

                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={projectForm.featured}
                            onChange={(e) =>
                              setProjectForm({ ...projectForm, featured: e.target.checked })
                            }
                            className="rounded accent-purple-600"
                          />
                          <span>Mark as Featured Project</span>
                        </label>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setIsAddingProject(false)}
                            className="px-4 py-1.5 rounded-lg text-xs text-gray-400"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-1.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
                          >
                            Save Project
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* List of Projects */}
                  <div className="space-y-3">
                    {data.portfolio.map((proj, idx) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-2xl bg-[#090918] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-12 rounded-xl overflow-hidden bg-black/50 shrink-0">
                            <img
                              src={proj.thumbnail}
                              alt={proj.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-bold text-white">{proj.title}</h5>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-cyan-300 font-semibold">
                                {proj.category}
                              </span>
                              {proj.featured && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold flex items-center gap-0.5">
                                  <Star className="w-3 h-3 fill-amber-300" /> Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-1 max-w-md">
                              {proj.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          {/* Reorder Up */}
                          <button
                            disabled={idx === 0}
                            onClick={() => reorderPortfolio(idx, idx - 1)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-gray-300"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          {/* Reorder Down */}
                          <button
                            disabled={idx === data.portfolio.length - 1}
                            onClick={() => reorderPortfolio(idx, idx + 1)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-gray-300"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          {/* Toggle Featured */}
                          <button
                            onClick={() => togglePortfolioFeatured(proj.id)}
                            className={`p-1.5 rounded-lg ${
                              proj.featured
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                            title="Toggle Featured"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => deletePortfolioProject(proj.id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODULE 3: Services Management */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Studio Services</h4>
                      <p className="text-xs text-gray-400">
                        Add, edit, reorder, toggle visibility, and update deliverables.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddingService(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Service</span>
                    </button>
                  </div>

                  {/* Add Service Modal */}
                  {isAddingService && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!serviceForm.title) return;
                        addService(serviceForm);
                        setIsAddingService(false);
                      }}
                      className="p-5 rounded-2xl bg-[#0c0c20] border border-purple-500/40 space-y-4"
                    >
                      <h5 className="text-xs font-bold text-purple-300 uppercase">
                        Create New Service
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Service Title (e.g. 3D Product Visuals)"
                          required
                          value={serviceForm.title}
                          onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Icon (Video, Palette, Camera, Smartphone, Sparkles)"
                          value={serviceForm.iconName}
                          onChange={(e) =>
                            setServiceForm({ ...serviceForm, iconName: e.target.value })
                          }
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 mb-1">
                          Service Image URL or File Upload
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Image URL"
                            value={serviceForm.image}
                            onChange={(e) =>
                              setServiceForm({ ...serviceForm, image: e.target.value })
                            }
                            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          />
                          <label className="px-3 py-2 bg-white/10 hover:bg-white/15 rounded-xl text-xs text-white cursor-pointer shrink-0">
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageFileUpload(e, (url) =>
                                  setServiceForm({ ...serviceForm, image: url })
                                )
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Short service description..."
                        value={serviceForm.shortDescription}
                        onChange={(e) =>
                          setServiceForm({ ...serviceForm, shortDescription: e.target.value })
                        }
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingService(false)}
                          className="px-4 py-1.5 rounded-lg text-xs text-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-1.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
                        >
                          Add Service
                        </button>
                      </div>
                    </form>
                  )}

                  {/* List of Services */}
                  <div className="space-y-3">
                    {data.services.map((svc, idx) => (
                      <div
                        key={svc.id}
                        className="p-4 rounded-2xl bg-[#090918] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/50 shrink-0">
                            <img
                              src={svc.image}
                              alt={svc.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-bold text-white">{svc.title}</h5>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                                  svc.enabled !== false
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-gray-500/20 text-gray-400'
                                }`}
                              >
                                {svc.enabled !== false ? 'Active' : 'Disabled'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-1 max-w-md">
                              {svc.shortDescription}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          {/* Reorder Up */}
                          <button
                            disabled={idx === 0}
                            onClick={() => reorderServices(idx, idx - 1)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-gray-300"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          {/* Reorder Down */}
                          <button
                            disabled={idx === data.services.length - 1}
                            onClick={() => reorderServices(idx, idx + 1)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 text-gray-300"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          {/* Enable/Disable Toggle */}
                          <button
                            onClick={() => toggleServiceEnabled(svc.id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300"
                            title="Toggle Visibility"
                          >
                            {svc.enabled !== false ? (
                              <Eye className="w-3.5 h-3.5" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                            )}
                          </button>
                          {/* Edit Service */}
                          <button
                            onClick={() => setEditingService(svc)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-indigo-300"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => deleteService(svc.id)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Edit Service Modal */}
                  {editingService && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                      <div className="w-full max-w-lg bg-[#0e0e22] border border-purple-500/40 rounded-2xl p-6 space-y-4">
                        <h4 className="text-sm font-bold text-white">
                          Edit Service: {editingService.title}
                        </h4>
                        <input
                          type="text"
                          value={editingService.title}
                          onChange={(e) =>
                            setEditingService({ ...editingService, title: e.target.value })
                          }
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <textarea
                          rows={3}
                          value={editingService.shortDescription}
                          onChange={(e) =>
                            setEditingService({
                              ...editingService,
                              shortDescription: e.target.value,
                            })
                          }
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            onClick={() => setEditingService(null)}
                            className="px-4 py-2 rounded-xl text-xs text-gray-400"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              updateService(editingService);
                              setEditingService(null);
                            }}
                            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
                          >
                            Save Service
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MODULE 4: About Management */}
              {activeTab === 'about' && (
                <div className="max-w-4xl space-y-8">
                  {/* Profile Photo & Bio */}
                  <div className="p-5 rounded-2xl bg-[#090918] border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-cyan-400" />
                      <span>Profile Photo & About Bio</span>
                    </h4>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-24 h-28 rounded-2xl overflow-hidden bg-black/50 border border-purple-500/40 shrink-0">
                        <img
                          src={profilePhotoUrl}
                          alt="Profile Preview"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="flex-1 space-y-2 w-full">
                        <label className="block text-xs text-gray-400">
                          Upload New Profile Photo
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={profilePhotoUrl}
                            onChange={(e) => setProfilePhotoUrl(e.target.value)}
                            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                          />
                          <label className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl text-xs font-bold text-white cursor-pointer shrink-0">
                            <span>Browse Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageFileUpload(e, (url) => {
                                  setProfilePhotoUrl(url);
                                  updateBrand({ heroPortrait: url, aboutPortrait: url });
                                })
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">About Bio Paragraph</label>
                      <textarea
                        rows={4}
                        value={aboutBioText}
                        onChange={(e) => setAboutBioText(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
                      />
                    </div>

                    <button
                      onClick={() =>
                        updateBrand({
                          aboutBio: aboutBioText,
                          heroPortrait: profilePhotoUrl,
                          aboutPortrait: profilePhotoUrl,
                        })
                      }
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
                    >
                      Save Bio & Photo
                    </button>
                  </div>

                  {/* Statistics Management */}
                  <div className="p-5 rounded-2xl bg-[#090918] border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Star className="w-4 h-4 text-purple-400" />
                      <span>Key Statistics (4 Cards)</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {data.stats.map((st, idx) => (
                        <div
                          key={st.id || idx}
                          className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3"
                        >
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={st.value}
                              onChange={(e) => {
                                const newStats = [...data.stats];
                                newStats[idx].value = e.target.value;
                                updateStats(newStats);
                              }}
                              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-cyan-300 font-bold"
                            />
                            <input
                              type="text"
                              value={st.label}
                              onChange={(e) => {
                                const newStats = [...data.stats];
                                newStats[idx].label = e.target.value;
                                updateStats(newStats);
                              }}
                              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300"
                            />
                          </div>
                          <button
                            onClick={() => deleteStat(idx)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Stat Row */}
                    <div className="pt-2 flex gap-2">
                      <input
                        type="text"
                        placeholder="Value (e.g. 100+)"
                        value={newStatValue}
                        onChange={(e) => setNewStatValue(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white w-28"
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Satisfied Clients)"
                        value={newStatLabel}
                        onChange={(e) => setNewStatLabel(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white flex-1"
                      />
                      <button
                        onClick={() => {
                          if (newStatValue && newStatLabel) {
                            addStat({ value: newStatValue, label: newStatLabel });
                            setNewStatValue('');
                            setNewStatLabel('');
                          }
                        }}
                        className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500"
                      >
                        Add Stat
                      </button>
                    </div>
                  </div>

                  {/* Why Athif Cards Management */}
                  <div className="p-5 rounded-2xl bg-[#090918] border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      <span>“Why Athif?” Value Cards</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {data.whyChooseMe.map((why, idx) => (
                        <div
                          key={why.id || idx}
                          className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={why.title}
                              onChange={(e) => {
                                const newCards = [...data.whyChooseMe];
                                newCards[idx].title = e.target.value;
                                updateWhyChooseMe(newCards);
                              }}
                              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-white font-bold"
                            />
                            <button
                              onClick={() => deleteWhyCard(idx)}
                              className="p-1 text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={why.description}
                            onChange={(e) => {
                              const newCards = [...data.whyChooseMe];
                              newCards[idx].description = e.target.value;
                              updateWhyChooseMe(newCards);
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="Title (e.g. Innovative)"
                        value={newWhyTitle}
                        onChange={(e) => setNewWhyTitle(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Description..."
                        value={newWhyDesc}
                        onChange={(e) => setNewWhyDesc(e.target.value)}
                        className="bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white sm:col-span-2"
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (newWhyTitle && newWhyDesc) {
                          addWhyCard({
                            title: newWhyTitle,
                            description: newWhyDesc,
                            iconName: newWhyIcon,
                          });
                          setNewWhyTitle('');
                          setNewWhyDesc('');
                        }
                      }}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
                    >
                      Add Value Card
                    </button>
                  </div>
                </div>
              )}

              {/* MODULE 5: Skills Management */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Skills & Creative Arsenal</h4>
                      <p className="text-xs text-gray-400">
                        Manage tools, software badges, proficiency levels and percentages.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddingSkill(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Tool</span>
                    </button>
                  </div>

                  {/* Add Skill Form */}
                  {isAddingSkill && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!skillForm.name) return;
                        addSkill(skillForm);
                        setIsAddingSkill(false);
                      }}
                      className="p-5 rounded-2xl bg-[#0c0c20] border border-cyan-500/40 space-y-3"
                    >
                      <h5 className="text-xs font-bold text-cyan-300 uppercase">Add Arsenal Tool</h5>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Tool Name (e.g. Cinema 4D)"
                          required
                          value={skillForm.name}
                          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Short Code (e.g. C4D)"
                          value={skillForm.shortCode}
                          onChange={(e) =>
                            setSkillForm({ ...skillForm, shortCode: e.target.value })
                          }
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <select
                          value={skillForm.category}
                          onChange={(e) =>
                            setSkillForm({ ...skillForm, category: e.target.value as any })
                          }
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="VIDEO">VIDEO</option>
                          <option value="DESIGN">DESIGN</option>
                          <option value="MOTION">MOTION</option>
                          <option value="AI">AI</option>
                          <option value="WEB">WEB</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Level (Advanced / Proficient)"
                          value={skillForm.level}
                          onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                        <input
                          type="number"
                          placeholder="Percentage (90)"
                          value={skillForm.percentage}
                          onChange={(e) =>
                            setSkillForm({ ...skillForm, percentage: Number(e.target.value) })
                          }
                          className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <textarea
                        rows={2}
                        placeholder="Tool description..."
                        value={skillForm.description}
                        onChange={(e) =>
                          setSkillForm({ ...skillForm, description: e.target.value })
                        }
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />

                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingSkill(false)}
                          className="px-4 py-1.5 rounded-lg text-xs text-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-1.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500"
                        >
                          Save Tool
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.skills.map((sk) => (
                      <div
                        key={sk.id}
                        className="p-3.5 rounded-xl bg-[#090918] border border-white/10 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">{sk.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-purple-300">
                              {sk.category}
                            </span>
                            <span className="text-[10px] font-bold text-cyan-300">
                              {sk.percentage}%
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                            {sk.description}
                          </p>
                        </div>

                        <button
                          onClick={() => deleteSkill(sk.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400"
                          title="Delete Tool"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODULE 6: Messages / Inquiries */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Client Inquiries & Messages</h4>
                      <p className="text-xs text-gray-400">
                        Direct inquiries sent from visitors through the contact form.
                      </p>
                    </div>
                  </div>

                  {data.messages.length === 0 ? (
                    <div className="py-20 text-center text-gray-500 text-xs">
                      No inquiries yet. New submissions will appear here instantly!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            msg.read
                              ? 'bg-[#090914] border-white/5 opacity-80'
                              : 'bg-[#0d0d24] border-cyan-500/40 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">{msg.name}</span>
                              <span className="text-xs text-gray-400">({msg.email})</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                                {msg.service}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                          </div>

                          <p className="text-xs text-gray-200 whitespace-pre-wrap bg-black/40 p-3.5 rounded-xl border border-white/5 leading-relaxed">
                            {msg.message}
                          </p>

                          <div className="mt-3 flex items-center justify-end gap-3">
                            <a
                              href={`mailto:${msg.email}?subject=Athif Creative Studio - Regarding your ${msg.service} inquiry`}
                              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Reply via Email</span>
                            </a>

                            <button
                              onClick={() => toggleMessageRead(msg.id)}
                              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{msg.read ? 'Mark Unread' : 'Mark as Read'}</span>
                            </button>

                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* MODULE 7: Website Settings */}
              {activeTab === 'settings' && (
                <div className="max-w-3xl space-y-6">
                  <div className="p-5 rounded-2xl bg-[#090918] border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Settings className="w-4 h-4 text-cyan-400" />
                      <span>General Brand & Site Settings</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Studio Name</label>
                        <input
                          type="text"
                          value={brandForm.name}
                          onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Subname</label>
                        <input
                          type="text"
                          value={brandForm.subname}
                          onChange={(e) => setBrandForm({ ...brandForm, subname: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Kicker Badge</label>
                      <input
                        type="text"
                        value={brandForm.kicker}
                        onChange={(e) => setBrandForm({ ...brandForm, kicker: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Hero Headline</label>
                        <input
                          type="text"
                          value={brandForm.heroHeadline}
                          onChange={(e) =>
                            setBrandForm({ ...brandForm, heroHeadline: e.target.value })
                          }
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Hero Script Accent</label>
                        <input
                          type="text"
                          value={brandForm.heroScript}
                          onChange={(e) => setBrandForm({ ...brandForm, heroScript: e.target.value })}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Hero Tagline</label>
                      <input
                        type="text"
                        value={brandForm.tagline}
                        onChange={(e) => setBrandForm({ ...brandForm, tagline: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Social Media & Contact Details */}
                  <div className="p-5 rounded-2xl bg-[#090918] border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white">Social Media & Contact Details</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Direct Email</label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, email: e.target.value })
                          }
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Pinterest Link</label>
                        <input
                          type="text"
                          value={contactForm.pinterest}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, pinterest: e.target.value })
                          }
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">Instagram URL</label>
                        <input
                          type="text"
                          value={contactForm.socials.instagram}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              socials: { ...contactForm.socials, instagram: e.target.value },
                            })
                          }
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-300 mb-1">YouTube URL</label>
                        <input
                          type="text"
                          value={contactForm.socials.youtube}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              socials: { ...contactForm.socials, youtube: e.target.value },
                            })
                          }
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SEO Settings */}
                  <div className="p-5 rounded-2xl bg-[#090918] border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white">SEO & Meta Configuration</h4>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Browser Title</label>
                      <input
                        type="text"
                        value={settingsForm.seoTitle}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, seoTitle: e.target.value })
                        }
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Meta Description</label>
                      <textarea
                        rows={2}
                        value={settingsForm.seoDescription}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, seoDescription: e.target.value })
                        }
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      updateBrand(brandForm);
                      updateContactInfo(contactForm);
                      updateSettings(settingsForm);
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  >
                    Save All Settings
                  </button>
                </div>
              )}

              {/* MODULE 8: Appearance */}
              {activeTab === 'appearance' && (
                <div className="max-w-3xl space-y-6">
                  <div className="p-5 rounded-2xl bg-[#090918] border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Palette className="w-4 h-4 text-cyan-400" />
                      <span>Theme & Visual Styling</span>
                    </h4>

                    <div>
                      <label className="block text-xs text-gray-300 mb-2">Theme Preset</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { id: 'neon-cyberpunk', name: 'Neon Cyberpunk', color: 'from-purple-600 to-cyan-500' },
                          { id: 'electric-blue', name: 'Electric Cyan', color: 'from-cyan-500 to-blue-600' },
                          { id: 'emerald-cyber', name: 'Emerald Matrix', color: 'from-emerald-500 to-teal-600' },
                          { id: 'sunset-violet', name: 'Sunset Violet', color: 'from-pink-500 to-purple-600' },
                        ].map((theme) => (
                          <div
                            key={theme.id}
                            onClick={() => {
                              setAppearanceForm({
                                ...appearanceForm,
                                themePreset: theme.id as any,
                              });
                              updateAppearance({ themePreset: theme.id as any });
                            }}
                            className={`p-3 rounded-xl border cursor-pointer transition-all ${
                              appearanceForm.themePreset === theme.id
                                ? 'bg-white/10 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                                : 'bg-black/40 border-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${theme.color} mb-2`} />
                            <p className="text-xs font-bold text-white text-center">{theme.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-2">Background Palette</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'deep-charcoal', label: 'Deep Charcoal (#050509)', hex: '#050509' },
                          { id: 'midnight-navy', label: 'Midnight Navy (#04060e)', hex: '#04060e' },
                          { id: 'pure-black', label: 'Pure Black (#000000)', hex: '#000000' },
                        ].map((bg) => (
                          <div
                            key={bg.id}
                            onClick={() => {
                              setAppearanceForm({ ...appearanceForm, bgStyle: bg.id as any });
                              updateAppearance({ bgStyle: bg.id as any });
                            }}
                            className={`p-3 rounded-xl border cursor-pointer ${
                              appearanceForm.bgStyle === bg.id
                                ? 'border-cyan-400 bg-white/10'
                                : 'border-white/5 bg-black/40'
                            }`}
                          >
                            <div
                              className="w-full h-6 rounded-md mb-1.5 border border-white/10"
                              style={{ backgroundColor: bg.hex }}
                            />
                            <p className="text-[11px] font-semibold text-gray-300">{bg.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-2">Glow Effects Intensity</label>
                      <div className="flex gap-3">
                        {['subtle', 'vibrant', 'ultra'].map((glow) => (
                          <button
                            key={glow}
                            type="button"
                            onClick={() => {
                              setAppearanceForm({ ...appearanceForm, glowIntensity: glow as any });
                              updateAppearance({ glowIntensity: glow as any });
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize ${
                              appearanceForm.glowIntensity === glow
                                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                                : 'bg-white/5 text-gray-400 hover:text-white'
                            }`}
                          >
                            {glow}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 9: Admin Security */}
              {activeTab === 'security' && (
                <div className="max-w-2xl space-y-6">
                  {/* Password Change Box */}
                  <form
                    onSubmit={handlePasswordChangeSubmit}
                    className="p-5 rounded-2xl bg-[#090918] border border-white/10 space-y-4"
                  >
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-cyan-400" />
                      <span>Change Master Password</span>
                    </h4>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Current Password</label>
                      <input
                        type="password"
                        required
                        placeholder="Current password (Default: athif2026)"
                        value={oldPass}
                        onChange={(e) => setOldPass(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-300 mb-1">New Password</label>
                      <input
                        type="password"
                        required
                        placeholder="New password (min 4 chars)"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    >
                      Update Password
                    </button>
                  </form>

                  {/* Security Status Box */}
                  <div className="p-5 rounded-2xl bg-[#090918] border border-white/10 space-y-3">
                    <h4 className="text-sm font-bold text-white">Active Session Details</h4>
                    <div className="space-y-1.5 text-xs text-gray-300">
                      <p>
                        Status: <span className="text-emerald-400 font-bold">Authorized Session Active</span>
                      </p>
                      <p>Last Login: <span className="text-gray-400">{data.security?.lastLogin || 'Today'}</span></p>
                      <p>Keyboard Shortcut: <code className="text-cyan-400">Ctrl + Shift + S</code></p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={logoutAdmin}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-red-300 bg-red-950/40 border border-red-500/30 hover:bg-red-900/40"
                      >
                        End Session & Logout
                      </button>
                    </div>
                  </div>

                  {/* Reset Defaults */}
                  <div className="p-5 rounded-2xl bg-[#090918] border border-red-500/20 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-red-400 uppercase">Emergency Reset</h5>
                      <p className="text-xs text-gray-400">Reset all database records back to defaults.</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all studio data to defaults?')) {
                          resetToDefaults();
                        }
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-300 bg-red-950/40 border border-red-500/40"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
