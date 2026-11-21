import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiArrowRight, FiAward } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3c1809] text-white border-t-4 border-orange-500">
      <div className="container mx-auto px-4 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/logo.png"
                alt="CIAT Convent Logo"
                className="w-13 h-13 rounded-lg bg-white p-1 shadow-md object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-wide">
                  CIAT CONVENT
                </span>
                <span className="text-xs text-orange-300 font-bold tracking-wider uppercase">
                  Sr. Sec. School • CBSE
                </span>
              </div>
            </Link>

            <p className="text-orange-100/90 text-sm leading-relaxed">
              Committed to academic distinction, character development, and shaping future-ready leaders with moral integrity since 1998.
            </p>

            <div className="pt-2 flex items-center space-x-2.5">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 hover:text-white text-orange-200 flex items-center justify-center transition-all duration-200"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 hover:text-white text-orange-200 flex items-center justify-center transition-all duration-200"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 hover:text-white text-orange-200 flex items-center justify-center transition-all duration-200"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 hover:text-white text-orange-200 flex items-center justify-center transition-all duration-200"
              >
                <FiYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-base font-bold text-orange-300 uppercase tracking-wider mb-4 pb-2 border-b border-orange-800/80">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-orange-100/90">
              <li><Link to="/about" className="hover:text-white transition flex items-center gap-1.5"><span>›</span> About Our School</Link></li>
              <li><Link to="/vision-mission" className="hover:text-white transition flex items-center gap-1.5"><span>›</span> Vision & Mission</Link></li>
              <li><Link to="/principal-message" className="hover:text-white transition flex items-center gap-1.5"><span>›</span> Principal's Message</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition flex items-center gap-1.5"><span>›</span> Admissions 2026-27</Link></li>
              <li><Link to="/news" className="hover:text-white transition flex items-center gap-1.5"><span>›</span> Notice Board & Circulars</Link></li>
              <li><Link to="/events" className="hover:text-white transition flex items-center gap-1.5"><span>›</span> School Calendar & Events</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition flex items-center gap-1.5"><span>›</span> Campus Photo Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-white transition flex items-center gap-1.5"><span>›</span> Contact Administration</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Visiting Details */}
          <div>
            <h3 className="text-base font-bold text-orange-300 uppercase tracking-wider mb-4 pb-2 border-b border-orange-800/80">
              Campus Contact
            </h3>
            <ul className="space-y-3.5 text-sm text-orange-100/90">
              <li className="flex items-start space-x-3">
                <FiMapPin className="mt-1 text-orange-400 shrink-0" size={17} />
                <span>Kanjhawala, North West Delhi, 110081</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="text-orange-400 shrink-0" size={16} />
                <a href="tel:+918595792883" className="hover:text-white transition">
                  +91 85957 92883 / +91 11 2595 1000
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="text-orange-400 shrink-0" size={16} />
                <a href="mailto:Ciatschool1998@gmail.com" className="hover:text-white transition truncate">
                  Ciatschool1998@gmail.com
                </a>
              </li>
              <li className="pt-2 text-xs text-orange-200/80 leading-relaxed border-t border-orange-800/80">
                Visiting Hours: Mon – Fri: 8:00 AM – 3:30 PM <br />
                Saturday: 8:30 AM – 1:00 PM
              </li>
            </ul>
          </div>

          {/* Column 4: Admissions & Affiliation */}
          <div>
            <h3 className="text-base font-bold text-orange-300 uppercase tracking-wider mb-4 pb-2 border-b border-orange-800/80">
              Admissions Open
            </h3>
            <p className="text-sm text-orange-100/90 mb-4 leading-relaxed">
              Registrations for the academic session 2026-27 are currently open for Nursery to Class XI.
            </p>
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition"
            >
              <span>Apply Online Now</span>
              <FiArrowRight size={14} />
            </Link>
            <div className="mt-4 p-3 bg-white/10 rounded-lg text-xs text-orange-100 space-y-1">
              <div className="flex items-center gap-1.5 text-orange-300 font-bold">
                <FiAward />
                <span>CBSE Affiliation #2730488</span>
              </div>
              <p className="text-[11px] text-orange-200/80">Recognized by Directorate of Education, GNCT Delhi.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-orange-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-orange-200/80 gap-3">
          <p>© {currentYear} CIAT Convent Sr. Sec. School. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-white transition">About</Link>
            <span>•</span>
            <Link to="/admissions" className="hover:text-white transition">Admissions</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
            <span>•</span>
            <Link to="/login" className="text-orange-300 hover:text-white font-bold transition">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
