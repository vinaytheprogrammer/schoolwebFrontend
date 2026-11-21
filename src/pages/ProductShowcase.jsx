import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiMail,
  FiArrowRight,
  FiShield,
  FiCpu,
  FiLayers,
  FiCode,
  FiServer,
  FiExternalLink,
  FiStar,
  FiCopy,
  FiCheck,
  FiGlobe,
  FiSmartphone,
  FiDatabase,
  FiZap,
} from 'react-icons/fi';

const ProductShowcase = () => {
  window.scrollTo(0, 0);

  const developerEmail = 'vinaygupta.nitjsr@gmail.com';
  const [copied, setCopied] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    institutionName: '',
    licenseType: 'Single School License',
    notes: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Inquiry: School Web Portal Platform (${inquiryData.licenseType}) - ${inquiryData.institutionName || 'Client'}`
    );
    const body = encodeURIComponent(
      `Hello Vinay,\n\nI am interested in acquiring/customizing the School Web Portal Platform.\n\n` +
        `• Name: ${inquiryData.name}\n` +
        `• Contact Email: ${inquiryData.email}\n` +
        `• Institution / Organization: ${inquiryData.institutionName || 'N/A'}\n` +
        `• License of Interest: ${inquiryData.licenseType}\n` +
        `• Notes & Custom Requirements:\n${inquiryData.notes || 'None'}\n\n` +
        `Looking forward to your response regarding pricing and deployment assistance.\n\nBest regards,\n${inquiryData.name}`
    );
    window.location.href = `mailto:${developerEmail}?subject=${subject}&body=${body}`;
  };

  const featurePillars = [
    {
      category: 'Public Web Portal & Experience',
      icon: <FiGlobe className="text-orange-600" size={24} />,
      badge: 'Student & Parent Facing',
      items: [
        'Interactive Hero Showcase with high-res responsive slider and quick admission CTAs',
        'Official Notice Board with full-text search, category tags, and date filtering',
        'Academic Events Calendar & Interactive upcoming event scheduler',
        'High-Resolution Campus Photo Gallery with Cloudinary cloud storage and multi-photo batch upload',
        '6-Stage Online Admission Application Portal with instant document requirements',
        'Real-Time Public Admission Status Tracker (instant query by Application ID or Email/Phone)',
        'Administrative Reception & Inquiry Form with instant database logging',
        'Comprehensive Institutional History, Vision, Mission, and Principal Desk addresses',
      ],
    },
    {
      category: 'Administrative Control Center',
      icon: <FiShield className="text-orange-600" size={24} />,
      badge: 'Staff & Leadership Portal',
      items: [
        'Consolidated Real-Time Analytics Dashboard with one-click metric refresh',
        'End-to-End Admission Management: evaluate, approve, waitlist, or reject applications',
        'Contact Inquiries Manager with unread filters, response logging, and reply tracking',
        'Notice Board Publisher: compose, edit, schedule, draft, and pin featured notices',
        'Event Management Suite: schedule events with HTML5 datetime picker and instant publishing',
        'Gallery Asset Manager: create categorized albums with automatic cascade deletion',
        'Staff Governance & RBAC with secure bcrypt hashing and JSON Web Token (JWT) sessions',
        'Password Reset & Profile Updating API endpoints for administrative users',
      ],
    },
    {
      category: 'Architecture & Engineering',
      icon: <FiCpu className="text-orange-600" size={24} />,
      badge: 'Production Grade Stack',
      items: [
        'Frontend: React 18, Vite 6, Tailwind CSS 3, Framer Motion animations, Outfit font typography',
        'Backend: Node.js, Express, MongoDB (Mongoose), RESTful modular API architecture',
        'Cloud Media: Cloudinary integration with automatic image optimization & size limiting',
        'Security Hardened: Anti-brute-force rate limiting, nosniff, X-Frame-Options, XSS protection',
        'Resilient Error Handling: Global Mongoose CastError and schema validation sanitizers',
        'Dockerized Environment: Pre-configured Docker Compose with instant DB seeding',
        '100% White-Label: Seamlessly change school logos, names, branding colors, and contact info',
        'Zero Vendor Lock-in: You own the complete source code without recurring SaaS platform fees',
      ],
    },
  ];

  const packages = [
    {
      name: 'Single Institution License',
      tagline: 'Ideal for an independent school, academy, or preschool',
      badge: 'Most Popular',
      featured: true,
      points: [
        'Full Frontend & Backend source code',
        'Deployment on your custom domain & server',
        'Custom branding (School name, crest, colors)',
        'Database setup & automated seeding scripts',
        'Cloudinary cloud storage integration',
        'Admin dashboard & Staff portal access',
        '30 days of free deployment & setup support',
      ],
    },
    {
      name: 'Educational Group / Multi-Campus',
      tagline: 'For educational trusts managing multiple school branches',
      badge: 'Multi-Branch',
      featured: false,
      points: [
        'Everything included in Single Institution',
        'Multi-campus deployment architecture',
        'Branch-wise filtering for admissions and events',
        'Customized admission application workflows',
        'Priority feature customization & API integrations',
        '60 days of extended developer technical support',
      ],
    },
    {
      name: 'Full Commercial & Reseller Rights',
      tagline: 'For software agencies, freelancers, and ed-tech consultants',
      badge: 'Agency / Reseller',
      featured: false,
      points: [
        '100% Unrestricted White-Label & Commercial Rights',
        'Re-brand and resell to unlimited school clients',
        'Docker containerization configs & CI/CD pipelines',
        'Complete architectural documentation & API schema',
        'Direct 1-on-1 code walkthrough with the author',
        'Lifetime usage of the codebase without royalties',
      ],
    },
  ];

  return (
    <div className="pt-1 bg-slate-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-[#1f1007] to-orange-950 text-white py-16 md:py-24 border-b-4 border-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-orange-600/30 text-orange-400 border border-orange-500/50 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <FiZap className="animate-pulse" /> Production-Ready Educational Software
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
              Modern School Web Portal & <span className="text-orange-500 underline decoration-orange-400/50">Admin ERP Platform</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              A comprehensive, modern full-stack web portal built for Senior Secondary schools, CBSE/ICSE institutions, and educational academies. Fully white-label, lightning-fast, and ready for deployment.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
            <a
              href="#inquiry"
              className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-extrabold rounded-xl shadow-lg shadow-orange-900/40 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
            >
              <span>Get In Touch / Buy Code</span>
              <FiArrowRight size={16} />
            </a>
            <Link
              to="/admin/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider backdrop-blur-xs"
            >
              <span>Explore Live Admin</span>
              <FiExternalLink size={15} />
            </Link>
          </div>

          {/* Quick Contact Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-slate-900/80 border border-slate-700/80 rounded-full px-5 py-2 text-xs text-slate-300">
            <span>Direct Developer Contact:</span>
            <a
              href={`mailto:${developerEmail}`}
              className="font-bold text-orange-400 hover:text-orange-300 underline"
            >
              {developerEmail}
            </a>
            <button
              onClick={handleCopyEmail}
              className="ml-1 p-1 hover:text-white transition flex items-center gap-1 text-[11px] bg-slate-800 rounded px-2"
              title="Copy email to clipboard"
            >
              {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="bg-slate-900 text-slate-300 py-6 border-b border-slate-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2">
              <span className="block text-2xl font-black text-white">100%</span>
              <span className="text-xs text-slate-400 font-medium">Source Code Ownership</span>
            </div>
            <div className="p-2">
              <span className="block text-2xl font-black text-white">0</span>
              <span className="text-xs text-slate-400 font-medium">Monthly SaaS Subscriptions</span>
            </div>
            <div className="p-2">
              <span className="block text-2xl font-black text-white">24 Hours</span>
              <span className="text-xs text-slate-400 font-medium">Ready-to-Deploy Setup</span>
            </div>
            <div className="p-2">
              <span className="block text-2xl font-black text-white">Custom</span>
              <span className="text-xs text-slate-400 font-medium">White-Label Branding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Feature Breakdown */}
      <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200 mb-2.5 inline-block">
            Everything You Need
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Comprehensive Platform Features
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-600 max-w-2xl mx-auto mt-3 text-sm sm:text-base leading-relaxed">
            Designed to solve the digital communication, enrollment, and operational hurdles faced by modern educational institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featurePillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100/70 px-2.5 py-1 rounded-full">
                    {pillar.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{pillar.category}</h3>
                <ul className="space-y-3">
                  {pillar.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <FiCheckCircle className="text-emerald-600 mt-1 shrink-0" size={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="bg-slate-900 text-white py-14 border-y border-slate-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Under The Hood</span>
            <h3 className="text-2xl font-black text-white mt-1">Built With Modern, High-Performance Tech</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
            {[
              { name: 'React 18', role: 'UI Framework' },
              { name: 'Vite 6', role: 'Lightning Bundler' },
              { name: 'Tailwind CSS', role: 'Modern Design' },
              { name: 'Node.js & Express', role: 'RESTful Backend' },
              { name: 'MongoDB & Mongoose', role: 'Scalable Database' },
              { name: 'Cloudinary & JWT', role: 'Media & Auth' },
            ].map((tech, i) => (
              <div key={i} className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60">
                <span className="block font-black text-sm text-white">{tech.name}</span>
                <span className="block text-[11px] text-slate-400 mt-0.5">{tech.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Acquisition Packages */}
      <section className="py-16 md:py-24 container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200 mb-2.5 inline-block">
            Acquisition Options
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Transparent Pricing & Licensing
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded-full"></div>
          <p className="text-slate-600 max-w-xl mx-auto mt-3 text-sm leading-relaxed">
            One-time licensing. No recurring per-student subscription fees. Full customization and deployment support included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                pkg.featured
                  ? 'bg-white border-2 border-orange-500 shadow-xl relative scale-102 lg:-translate-y-2'
                  : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {pkg.featured && (
                  <div className="mb-4">
                    <span className="bg-orange-600 text-white font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full">
                      {pkg.badge}
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">{pkg.tagline}</p>
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <span className="text-2xl font-black text-slate-900">Custom Quote</span>
                  <span className="block text-xs text-slate-500 mt-1">One-time payment • Lifetime usage</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.points.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <FiCheck className="text-orange-600 mt-0.5 shrink-0" size={16} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#inquiry"
                onClick={() => setInquiryData((prev) => ({ ...prev, licenseType: pkg.name }))}
                className={`w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition text-center ${
                  pkg.featured
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                Inquire For This Package
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inquiry & Purchase Form Section */}
      <section id="inquiry" className="py-16 bg-gradient-to-b from-orange-50/50 to-white border-t border-orange-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl border border-orange-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 p-8 text-white text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-200 bg-white/10 px-3 py-1 rounded-full mb-2 inline-block">
                Direct Developer Contact
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Acquire or Customize This Portal</h2>
              <p className="text-orange-100 text-sm mt-2 max-w-lg mx-auto">
                Have specific requirements, custom feature requests, or ready to deploy? Connect directly with the lead engineer.
              </p>
            </div>

            <div className="p-8 sm:p-10">
              <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center shrink-0">
                    <FiMail size={22} />
                  </div>
                  <div>
                    <span className="text-xs text-orange-950 font-bold block uppercase tracking-wider">Official Email</span>
                    <a
                      href={`mailto:${developerEmail}`}
                      className="text-base sm:text-lg font-black text-orange-700 hover:underline"
                    >
                      {developerEmail}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-4 py-2 bg-white border border-orange-300 rounded-lg text-xs font-bold text-orange-800 hover:bg-orange-100 transition shadow-xs flex items-center gap-1.5"
                >
                  {copied ? <FiCheck className="text-green-600" /> : <FiCopy />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
                </button>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold text-xs uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold text-xs uppercase tracking-wider mb-1">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      placeholder="e.g. ramesh@institution.edu"
                      className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold text-xs uppercase tracking-wider mb-1">
                      School / Organization Name
                    </label>
                    <input
                      type="text"
                      value={inquiryData.institutionName}
                      onChange={(e) => setInquiryData({ ...inquiryData, institutionName: e.target.value })}
                      placeholder="e.g. St. Xavier Public School"
                      className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold text-xs uppercase tracking-wider mb-1">
                      Package / License of Interest
                    </label>
                    <select
                      value={inquiryData.licenseType}
                      onChange={(e) => setInquiryData({ ...inquiryData, licenseType: e.target.value })}
                      className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                    >
                      <option value="Single School License">Single School License (1 Campus)</option>
                      <option value="Educational Group / Multi-Campus">Educational Group (Multi-Branch)</option>
                      <option value="Full Commercial & Reseller Rights">Full Commercial & Reseller License</option>
                      <option value="Custom Development & Consulting">Custom Feature Development / Consulting</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold text-xs uppercase tracking-wider mb-1">
                    Custom Requirements / Questions
                  </label>
                  <textarea
                    rows="4"
                    value={inquiryData.notes}
                    onChange={(e) => setInquiryData({ ...inquiryData, notes: e.target.value })}
                    placeholder="Mention any custom integrations required (payment gateways, SMS API, custom fee systems), timeline, or hosting preferences..."
                    className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold py-3.5 px-6 rounded-xl transition duration-200 text-sm uppercase tracking-wider shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-2"
                >
                  <FiMail size={16} />
                  <span>Send Direct Inquiry to {developerEmail}</span>
                </button>
              </form>

              <div className="mt-8 text-center text-xs text-slate-500">
                <span>Direct inquiries are monitored 7 days a week. Guaranteed response within 4 hours.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductShowcase;
