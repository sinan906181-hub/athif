export interface StatItem {
  id?: string;
  value: string;
  label: string;
}

export interface ValueCard {
  id?: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  image: string;
  iconName: string;
  deliverables: string[];
  enabled?: boolean;
  order?: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'VIDEO' | 'POSTERS' | 'PHOTO' | 'SOCIAL' | 'MOTION';
  thumbnail: string;
  description: string;
  tools: string[];
  deliverables: string[];
  clientOrYear?: string;
  featured?: boolean;
  videoUrl?: string;
  order?: number;
}

export interface ToolSkill {
  id: string;
  name: string;
  shortCode?: string;
  category: 'VIDEO' | 'DESIGN' | 'MOTION' | 'AI' | 'WEB';
  description: string;
  level: string;
  percentage?: number;
  badgeColor?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  tagline: string;
  iconName: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface RecentActivity {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'service' | 'portfolio' | 'skill' | 'message' | 'security' | 'setting' | 'appearance';
}

export interface WebsiteSettings {
  siteName: string;
  subname: string;
  logoText: string;
  kicker: string;
  seoTitle: string;
  seoDescription: string;
  showPortfolioSection: boolean;
  showProcessSection: boolean;
}

export interface AppearanceSettings {
  themePreset: 'neon-cyberpunk' | 'electric-blue' | 'emerald-cyber' | 'sunset-violet';
  accentColor: string;
  bgStyle: 'deep-charcoal' | 'midnight-navy' | 'pure-black';
  glowIntensity: 'subtle' | 'vibrant' | 'ultra';
  enableAnimations: boolean;
  fontScale: 'normal' | 'large';
}

export interface SecuritySettings {
  adminPassword: string;
  isLoggedIn: boolean;
  securityQuestion: string;
  securityAnswer: string;
  lastLogin: string;
}

export interface CreativeStudioData {
  brand: {
    name: string;
    subname: string;
    kicker: string;
    heroHeadline: string;
    heroScript: string;
    tagline: string;
    heroDesc: string;
    heroPortrait: string;
    aboutBio: string;
    aboutPortrait: string;
  };
  stats: StatItem[];
  whyChooseMe: ValueCard[];
  contactValues: ValueCard[];
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  skills: ToolSkill[];
  process: ProcessStep[];
  contactInfo: {
    email: string;
    pinterest: string;
    responseSpeed: string;
    socials: {
      youtube: string;
      instagram: string;
      twitter: string;
      discord: string;
      telegram: string;
    };
  };
  messages: ContactMessage[];
  activityLog: RecentActivity[];
  settings: WebsiteSettings;
  appearance: AppearanceSettings;
  security: SecuritySettings;
}
