import React, { useState } from 'react';
import {
  Send,
  Zap,
  HeartHandshake,
  Gem,
  Clock,
  User,
  Mail,
  Grid,
  MessageSquare,
  Sparkles,
  Youtube,
  Instagram,
  CheckCircle2,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

export const Contact: React.FC = () => {
  const { data, addMessage, showToast } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Video Editing',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill out all required fields.', 'info');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addMessage({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        message: formData.message,
      });

      setIsSubmitting(false);
      setSubmitted(true);
      showToast('Message sent to Athif Creative Studio! We will get back shortly.');

      setFormData({
        name: '',
        email: '',
        service: 'Video Editing',
        message: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };

  const getValueIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'zap':
        return <Zap className="w-5 h-5 text-purple-400" />;
      case 'hearthandshake':
        return <HeartHandshake className="w-5 h-5 text-pink-400" />;
      case 'gem':
        return <Gem className="w-5 h-5 text-cyan-400" />;
      case 'clock':
      default:
        return <Clock className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-purple-700/15 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-cyan-600/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Get In Touch, Value Cards, Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>LET'S CONNECT</span>
              </div>

              <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none">
                Get In{' '}
                <span className="font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 inline-block pl-2">
                  Touch
                </span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
                Have an idea? Let’s turn it into something{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-bold">
                  amazing
                </span>{' '}
                together.
              </p>

              {/* 4 Value Badges (2x2 grid) - Upgraded Model & Style */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {data.contactValues.map((card, idx) => (
                  <div
                    key={idx}
                    className="relative group p-4 rounded-2xl bg-[#08081a]/90 border border-white/10 backdrop-blur-xl flex items-start gap-3.5 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Top edge neon accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-950/70 to-indigo-950/60 border border-purple-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      {getValueIcon(card.iconName)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow Me Socials */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="font-script text-2xl text-purple-300 mb-4 rotate-[-3deg]">
                Follow Me
              </p>

              <div className="flex items-center gap-3">
                <a
                  href={data.contactInfo.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#0b0b18] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/30 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all hover:scale-110"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>

                <a
                  href={data.contactInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#0b0b18] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600/30 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all hover:scale-110"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href={data.contactInfo.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#0b0b18] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-700/30 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all hover:scale-110"
                  aria-label="Pinterest"
                  title="Pinterest"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>

                <a
                  href={`tel:${data.contactInfo.phone || '+918113014526'}`}
                  className="w-11 h-11 rounded-full bg-[#0b0b18] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all hover:scale-110"
                  aria-label="Direct Phone"
                  title={`Call Athif (${data.contactInfo.phone || '8113014526'})`}
                >
                  <Phone className="w-5 h-5" />
                </a>

                <a
                  href={`https://wa.me/${(data.contactInfo.phone || '8113014526').replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-[#0b0b18] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-600/30 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:scale-110"
                  aria-label="WhatsApp"
                  title="WhatsApp Athif"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>

                <a
                  href={`mailto:${data.contactInfo.email}`}
                  className="w-11 h-11 rounded-full bg-[#0b0b18] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-600/30 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all hover:scale-110"
                  aria-label="Direct Email"
                  title={`Direct Email (${data.contactInfo.email})`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Neon Framed Send a Message Card - Upgraded Model & Style */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_50px_rgba(168,85,247,0.35),0_0_70px_rgba(56,189,248,0.25)]">
              <div className="w-full h-full bg-[#070718] rounded-[22px] p-6 sm:p-10 backdrop-blur-2xl relative overflow-hidden">
                {/* Decorative neon ambient gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* Form Header with Status Indicator */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-t-0 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px] shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                      <div className="w-full h-full bg-[#080816] rounded-[14px] flex items-center justify-center">
                        <Send className="w-5 h-5 text-cyan-300" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">
                        Send a{' '}
                        <span className="font-script text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                          Message
                        </span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Drop your project brief or inquiry below.
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 text-[11px] font-bold self-start sm:self-auto backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
                    <span>DIRECT INBOX</span>
                  </div>
                </div>

                {submitted ? (
                  <div className="py-12 flex flex-col items-center text-center animate-in fade-in duration-300">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                      <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Message Received!</h4>
                    <p className="text-xs text-gray-400 mt-2 max-w-sm">
                      Thank you for reaching out to Athif Creative Studio. I will review your project details and reply promptly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-2 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Your Name <span className="text-cyan-400">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[#0c0c1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                          Your Email <span className="text-cyan-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#0c0c1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Select Service */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Select Service
                      </label>
                      <div className="relative">
                        <Grid className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#0c0c1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white appearance-none focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer"
                        >
                          {data.services.map((s) => (
                            <option key={s.id} value={s.title} className="bg-[#0b0b14] text-white">
                              {s.title}
                            </option>
                          ))}
                          <option value="Full Creative Package" className="bg-[#0b0b14] text-white">
                            Full Creative Package (Custom)
                          </option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Message */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Your Message <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell me about your project, timeline, and vision..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-[#0c0c1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? 'Sending...' : 'Send Message →'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Contact Status Strip Matching Reference */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 p-4 rounded-2xl bg-[#090914]/60 border border-white/5 hover:border-purple-500/30 transition-all">
            <Phone className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Direct Phone</p>
              <a
                href={`tel:${data.contactInfo.phone || '+918113014526'}`}
                className="text-sm font-bold text-white hover:text-purple-300 transition-colors"
              >
                {data.contactInfo.phone || '+91 8113014526'}
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 p-4 rounded-2xl bg-[#090914]/60 border border-white/5 hover:border-cyan-500/30 transition-all">
            <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Direct Email</p>
              <a
                href={`mailto:${data.contactInfo.email}`}
                className="text-sm font-bold text-white hover:text-cyan-300 transition-colors truncate max-w-[170px] inline-block"
              >
                {data.contactInfo.email}
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 p-4 rounded-2xl bg-[#090914]/60 border border-white/5 hover:border-indigo-500/30 transition-all">
            <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Response Time</p>
              <p className="text-sm font-bold text-white">{data.contactInfo.responseSpeed}</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 p-4 rounded-2xl bg-[#090914]/60 border border-white/5 hover:border-pink-500/30 transition-all">
            <Sparkles className="w-5 h-5 text-pink-400 shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Creative Philosophy</p>
              <p className="text-sm font-bold text-white">Let's Create Great Work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
