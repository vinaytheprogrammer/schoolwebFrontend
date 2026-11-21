import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiCompass, FiShield, FiTrendingUp } from 'react-icons/fi';
import api from '../services/api';

// Import components
import HeroSlider from '../components/home/HeroSlider';
import StatCounter from '../components/home/StatCounter';
import TestimonialSlider from '../components/home/TestimonialSlider';

const Home = () => {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await api.get('/api/news');
        if (Array.isArray(res.data)) {
          setLatestNews(res.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching home news:', error);
      }
    };

    fetchLatestNews();
  }, []);

  // Stats for counter section
  const stats = [
    { label: 'Years of Excellence', value: 25 },
    { label: 'Qualified Educators', value: 45 },
    { label: 'Scholars Enrolled', value: 1200 },
    { label: 'Smart Labs & Studios', value: 18 },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase mb-4">
                <FiCompass />
                <span>Nurturing Excellence Since 1998</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">CIAT CONVENT</span> School
              </h2>

              <p className="text-slate-600 text-base sm:text-lg mb-5 leading-relaxed">
                For over 25 years, CIAT Convent Sr. Sec. School has stood as a prestigious beacon of academic distinction, holistic character formation, and innovative education in Delhi.
              </p>
              <p className="text-slate-600 text-sm sm:text-base mb-8 leading-relaxed">
                We empower students to explore their passions, think critically, and cultivate lifelong compassion. Our modern smart classrooms, robotics labs, athletic complexes, and dedicated educators guarantee an environment where every child thrives.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-2">
                    <FiShield size={16} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">CBSE Affiliated</h4>
                  <p className="text-xs text-slate-500 mt-1">Holistic curriculum from Pre-Primary to Grade XII</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-2">
                    <FiTrendingUp size={16} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Top Academic Track</h4>
                  <p className="text-xs text-slate-500 mt-1">Consistent 100% board passing & competitive success</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Discover Our Heritage</span>
                  <FiArrowRight size={16} />
                </Link>
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Admissions Info</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white shadow-slate-300/50">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                  alt="CIAT Convent School Campus Life"
                  className="w-full h-96 lg:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden sm:block">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Student Life</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">Fostering inquisitive minds with Olympic sports and cultural arts.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatCounter stats={stats} />

      {/* Latest News & Circulars */}
      {latestNews.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Updates & Circulars
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                  Notice Board & Announcements
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mt-3 rounded-full"></div>
              </div>
              <Link
                to="/news"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 transition"
              >
                <span>View All Notices</span>
                <FiArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <div
                  key={article._id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full mb-3 font-semibold">
                      <FiCalendar size={12} />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2.5 line-clamp-2 hover:text-blue-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-5 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      to={`/news/${article._id}`}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>Read Full Notice</span>
                      <FiArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3.5 py-1.5 rounded-full border border-amber-400/30 mb-4 inline-block">
            Limited Seats Available
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 tracking-tight text-white">
            Admissions Open for Academic Year 2026-27
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nurture your child’s limitless potential with values, modern pedagogy, and leadership. Apply online or schedule a campus orientation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/admissions"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Apply Online Now
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all duration-200 hover:-translate-y-0.5"
            >
              Schedule Campus Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
