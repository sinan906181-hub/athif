import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CreativeStudioData,
  ServiceItem,
  PortfolioProject,
  ToolSkill,
  ContactMessage,
  StatItem,
  ValueCard,
  WebsiteSettings,
  AppearanceSettings,
  RecentActivity,
} from '../types';
import { initialStudioData } from '../data/initialData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info';
}

interface ContentContextType {
  data: CreativeStudioData;
  // Dashboard & Activity
  addActivity: (action: string, details: string, type?: RecentActivity['type']) => void;
  // Brand & Settings
  updateBrand: (brand: Partial<CreativeStudioData['brand']>) => void;
  updateSettings: (settings: Partial<WebsiteSettings>) => void;
  updateAppearance: (appearance: Partial<AppearanceSettings>) => void;
  updateContactInfo: (contact: Partial<CreativeStudioData['contactInfo']>) => void;
  // Services
  updateService: (service: ServiceItem) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  deleteService: (id: string) => void;
  toggleServiceEnabled: (id: string) => void;
  reorderServices: (startIndex: number, endIndex: number) => void;
  // Portfolio
  updatePortfolioProject: (project: PortfolioProject) => void;
  addPortfolioProject: (project: Omit<PortfolioProject, 'id'>) => void;
  deletePortfolioProject: (id: string) => void;
  togglePortfolioFeatured: (id: string) => void;
  reorderPortfolio: (startIndex: number, endIndex: number) => void;
  // About Management
  updateStats: (stats: StatItem[]) => void;
  addStat: (stat: StatItem) => void;
  deleteStat: (index: number) => void;
  updateWhyChooseMe: (cards: ValueCard[]) => void;
  addWhyCard: (card: ValueCard) => void;
  deleteWhyCard: (index: number) => void;
  // Skills
  updateSkill: (skill: ToolSkill) => void;
  addSkill: (skill: Omit<ToolSkill, 'id'>) => void;
  deleteSkill: (id: string) => void;
  // Messages
  addMessage: (message: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  toggleMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  // Security
  isAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changePassword: (oldPass: string, newPass: string) => boolean;
  resetPasswordWithSecurity: (answer: string, newPass: string) => boolean;
  // Backup & Storage
  resetToDefaults: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
  // Modals & UI
  toasts: ToastState[];
  dismissToast: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'info') => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  selectedServiceModal: ServiceItem | null;
  setSelectedServiceModal: (service: ServiceItem | null) => void;
  selectedPortfolioModal: PortfolioProject | null;
  setSelectedPortfolioModal: (project: PortfolioProject | null) => void;
  selectedSkillModal: ToolSkill | null;
  setSelectedSkillModal: (skill: ToolSkill | null) => void;
}

const STORAGE_KEY = 'athif_creative_studio_v7_cinematic_photo';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<CreativeStudioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.brand && parsed.services) {
          return {
            ...initialStudioData,
            ...parsed,
            brand: {
              ...initialStudioData.brand,
              ...parsed.brand,
              heroPortrait:
                parsed.brand.heroPortrait &&
                !parsed.brand.heroPortrait.includes('aistudio/Neon_') &&
                !parsed.brand.heroPortrait.includes('athif_real_photo.png')
                  ? parsed.brand.heroPortrait
                  : '/assets/athif_cinematic_portrait.png',
              aboutPortrait:
                parsed.brand.aboutPortrait &&
                !parsed.brand.aboutPortrait.includes('aistudio/Neon_') &&
                !parsed.brand.aboutPortrait.includes('athif_real_photo.png')
                  ? parsed.brand.aboutPortrait
                  : '/assets/athif_cinematic_portrait.png',
            },
            services: parsed.services || initialStudioData.services,
            portfolio: parsed.portfolio || initialStudioData.portfolio,
            skills: initialStudioData.skills.map((initSkill) => {
              const found = parsed.skills?.find((s: any) => s.id === initSkill.id);
              return found ? { ...initSkill, ...found } : initSkill;
            }).concat(
              (parsed.skills || []).filter(
                (s: any) => !initialStudioData.skills.some((init) => init.id === s.id)
              )
            ),
            stats: parsed.stats || initialStudioData.stats,
            whyChooseMe: parsed.whyChooseMe || initialStudioData.whyChooseMe,
            messages: parsed.messages || initialStudioData.messages,
            contactInfo: {
              ...initialStudioData.contactInfo,
              ...(parsed.contactInfo || {}),
              phone: parsed.contactInfo?.phone || initialStudioData.contactInfo.phone,
            },
            settings: { ...initialStudioData.settings, ...(parsed.settings || {}) },
            appearance: { ...initialStudioData.appearance, ...(parsed.appearance || {}) },
            security: { ...initialStudioData.security, ...(parsed.security || {}) },
          };
        }
      }
    } catch {
      // fallback
    }
    return initialStudioData;
  });

  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [selectedPortfolioModal, setSelectedPortfolioModal] = useState<PortfolioProject | null>(null);
  const [selectedSkillModal, setSelectedSkillModal] = useState<ToolSkill | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  // Global Keyboard Shortcut: Ctrl + Shift + S to toggle Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.ctrlKey || e.metaKey;
      const isS = e.key?.toLowerCase() === 's' || e.code === 'KeyS';
      if (isModifier && e.shiftKey && isS) {
        e.preventDefault();
        e.stopPropagation();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addActivity = (
    action: string,
    details: string,
    type: RecentActivity['type'] = 'setting'
  ) => {
    const newActivity: RecentActivity = {
      id: `act-${Date.now()}`,
      action,
      details,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
      }),
      type,
    };
    setData((prev) => ({
      ...prev,
      activityLog: [newActivity, ...(prev.activityLog || []).slice(0, 49)],
    }));
  };

  const updateBrand = (brand: Partial<CreativeStudioData['brand']>) => {
    setData((prev) => ({
      ...prev,
      brand: { ...prev.brand, ...brand },
    }));
    addActivity('Brand Updated', 'Brand information & hero text updated', 'setting');
    showToast('Brand settings updated!');
  };

  const updateSettings = (settings: Partial<WebsiteSettings>) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
    addActivity('Settings Saved', 'Website global configuration modified', 'setting');
    showToast('Website settings saved!');
  };

  const updateAppearance = (appearance: Partial<AppearanceSettings>) => {
    setData((prev) => ({
      ...prev,
      appearance: { ...prev.appearance, ...appearance },
    }));
    addActivity('Appearance Tweaked', 'Theme and style preferences updated', 'appearance');
    showToast('Appearance theme updated!');
  };

  const updateContactInfo = (contact: Partial<CreativeStudioData['contactInfo']>) => {
    setData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        ...contact,
        socials: { ...prev.contactInfo.socials, ...(contact.socials || {}) },
      },
    }));
    addActivity('Contact Updated', 'Contact details & socials updated', 'setting');
    showToast('Contact info updated!');
  };

  // SERVICES
  const updateService = (service: ServiceItem) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === service.id ? service : s)),
    }));
    addActivity('Service Updated', `Modified ${service.title}`, 'service');
    showToast(`Updated service: ${service.title}`);
  };

  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `service-${Date.now()}`,
      enabled: service.enabled !== false,
      order: (data.services.length || 0) + 1,
    };
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
    addActivity('Service Added', `Created new service ${newService.title}`, 'service');
    showToast(`Added service: ${newService.title}`);
  };

  const deleteService = (id: string) => {
    const sName = data.services.find((s) => s.id === id)?.title || 'Service';
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
    addActivity('Service Deleted', `Removed ${sName}`, 'service');
    showToast('Service removed.', 'info');
  };

  const toggleServiceEnabled = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) =>
        s.id === id ? { ...s, enabled: s.enabled === false ? true : false } : s
      ),
    }));
    showToast('Service visibility toggled');
  };

  const reorderServices = (startIndex: number, endIndex: number) => {
    setData((prev) => {
      const result = Array.from(prev.services);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, services: result };
    });
    showToast('Services reordered');
  };

  // PORTFOLIO
  const updatePortfolioProject = (project: PortfolioProject) => {
    setData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((p) => (p.id === project.id ? project : p)),
    }));
    addActivity('Project Updated', `Modified project ${project.title}`, 'portfolio');
    showToast(`Updated project: ${project.title}`);
  };

  const addPortfolioProject = (project: Omit<PortfolioProject, 'id'>) => {
    const newProject: PortfolioProject = {
      ...project,
      id: `port-${Date.now()}`,
      featured: project.featured || false,
      order: (data.portfolio.length || 0) + 1,
    };
    setData((prev) => ({
      ...prev,
      portfolio: [newProject, ...prev.portfolio],
    }));
    addActivity('Project Added', `Published project ${newProject.title}`, 'portfolio');
    showToast(`Added project: ${newProject.title}`);
  };

  const deletePortfolioProject = (id: string) => {
    const pTitle = data.portfolio.find((p) => p.id === id)?.title || 'Project';
    setData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((p) => p.id !== id),
    }));
    addActivity('Project Deleted', `Removed ${pTitle}`, 'portfolio');
    showToast('Project removed.', 'info');
  };

  const togglePortfolioFeatured = (id: string) => {
    setData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((p) =>
        p.id === id ? { ...p, featured: !p.featured } : p
      ),
    }));
    showToast('Project featured status updated');
  };

  const reorderPortfolio = (startIndex: number, endIndex: number) => {
    setData((prev) => {
      const result = Array.from(prev.portfolio);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, portfolio: result };
    });
    showToast('Portfolio reordered');
  };

  // ABOUT & STATS
  const updateStats = (stats: StatItem[]) => {
    setData((prev) => ({ ...prev, stats }));
    addActivity('Stats Updated', 'Key studio metrics changed', 'setting');
    showToast('Statistics updated!');
  };

  const addStat = (stat: StatItem) => {
    setData((prev) => ({
      ...prev,
      stats: [...prev.stats, { ...stat, id: `stat-${Date.now()}` }],
    }));
    showToast('New statistic added!');
  };

  const deleteStat = (index: number) => {
    setData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
    showToast('Statistic removed', 'info');
  };

  const updateWhyChooseMe = (cards: ValueCard[]) => {
    setData((prev) => ({ ...prev, whyChooseMe: cards }));
    addActivity('Why Choose Me Updated', 'Value propositions edited', 'setting');
    showToast('Why Athif cards updated!');
  };

  const addWhyCard = (card: ValueCard) => {
    setData((prev) => ({
      ...prev,
      whyChooseMe: [...prev.whyChooseMe, { ...card, id: `why-${Date.now()}` }],
    }));
    showToast('Added value card');
  };

  const deleteWhyCard = (index: number) => {
    setData((prev) => ({
      ...prev,
      whyChooseMe: prev.whyChooseMe.filter((_, i) => i !== index),
    }));
    showToast('Card removed', 'info');
  };

  // SKILLS
  const updateSkill = (skill: ToolSkill) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === skill.id ? skill : s)),
    }));
    addActivity('Tool Updated', `Edited ${skill.name}`, 'skill');
    showToast(`Updated tool: ${skill.name}`);
  };

  const addSkill = (skill: Omit<ToolSkill, 'id'>) => {
    const newSkill: ToolSkill = {
      ...skill,
      id: `skill-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
    addActivity('Tool Added', `Added arsenal tool ${newSkill.name}`, 'skill');
    showToast(`Added tool: ${newSkill.name}`);
  };

  const deleteSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
    showToast('Tool removed.', 'info');
  };

  // MESSAGES
  const addMessage = (message: Omit<ContactMessage, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
      }),
      read: false,
    };
    setData((prev) => ({
      ...prev,
      messages: [newMessage, ...(prev.messages || [])],
    }));
    addActivity('New Message', `Inquiry received from ${message.name}`, 'message');
  };

  const markMessageRead = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: (prev.messages || []).map((m) => (m.id === id ? { ...m, read: true } : m)),
    }));
  };

  const toggleMessageRead = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: (prev.messages || []).map((m) => (m.id === id ? { ...m, read: !m.read } : m)),
    }));
  };

  const deleteMessage = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: (prev.messages || []).filter((m) => m.id !== id),
    }));
    showToast('Message deleted.', 'info');
  };

  // SECURITY
  const loginAdmin = (password: string): boolean => {
    const correctPassword = data.security?.adminPassword || 'athif2026';
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setData((prev) => ({
        ...prev,
        security: {
          ...prev.security,
          lastLogin: new Date().toLocaleString(),
          isLoggedIn: true,
        },
      }));
      addActivity('Admin Logged In', 'Authorized session started', 'security');
      showToast('Admin session unlocked!');
      return true;
    }
    showToast('Incorrect passcode. Default is athif2026', 'info');
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    setData((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        isLoggedIn: false,
      },
    }));
    addActivity('Admin Logged Out', 'Session ended securely', 'security');
    showToast('Logged out of Admin Portal.');
  };

  const changePassword = (oldPass: string, newPass: string): boolean => {
    const correctPassword = data.security?.adminPassword || 'athif2026';
    if (oldPass !== correctPassword) {
      showToast('Current password does not match.', 'info');
      return false;
    }
    if (!newPass || newPass.length < 4) {
      showToast('New password must be at least 4 characters.', 'info');
      return false;
    }
    setData((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        adminPassword: newPass,
      },
    }));
    addActivity('Password Changed', 'Master admin key updated', 'security');
    showToast('Password updated successfully!');
    return true;
  };

  const resetPasswordWithSecurity = (answer: string, newPass: string): boolean => {
    const expected = (data.security?.securityAnswer || 'Athif Creative Studio').toLowerCase().trim();
    if (answer.toLowerCase().trim() === expected) {
      setData((prev) => ({
        ...prev,
        security: {
          ...prev.security,
          adminPassword: newPass,
        },
      }));
      setIsAuthenticated(true);
      addActivity('Password Reset', 'Admin password reset via security challenge', 'security');
      showToast('Password reset successfully!');
      return true;
    }
    showToast('Incorrect security answer.', 'info');
    return false;
  };

  // BACKUP & RESTORE
  const resetToDefaults = () => {
    setData(initialStudioData);
    localStorage.removeItem(STORAGE_KEY);
    showToast('All data reset to initial studio defaults.');
  };

  const exportDataJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `athif_studio_data_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported studio backup JSON!');
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.brand && parsed.services) {
        setData(parsed);
        showToast('Successfully imported and restored studio data!');
        return true;
      }
    } catch {
      showToast('Invalid JSON file format.', 'info');
    }
    return false;
  };

  return (
    <ContentContext.Provider
      value={{
        data,
        addActivity,
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
        addMessage,
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
        toasts,
        dismissToast,
        showToast,
        isAdminOpen,
        setIsAdminOpen,
        selectedServiceModal,
        setSelectedServiceModal,
        selectedPortfolioModal,
        setSelectedPortfolioModal,
        selectedSkillModal,
        setSelectedSkillModal,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
