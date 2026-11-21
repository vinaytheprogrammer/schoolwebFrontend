import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
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
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Welcome Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200 mb-3 inline-block">
                Recognized CBSE Institution
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
                Welcome to <span className="text-orange-600">CIAT CONVENT</span> School
              </h2>
              <div className="w-16 h-1 bg-orange-500 mb-5 rounded-full"></div>
              <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed">
                For over 25 years, CIAT Convent Sr. Sec. School has stood as a beacon of academic distinction, holistic character formation, and innovative education in Delhi.
              </p>
              <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
                We empower students to explore their passions, think critically, and cultivate compassion. Our smart interactive classrooms, robotics labs, athletic grounds, and dedicated faculty guarantee an environment where every child thrives.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-sm shadow-sm transition-colors"
                >
                  <span>Discover Our Heritage</span>
                  <FiArrowRight size={14} />
                </Link>
                <Link
                  to="/admissions"
                  className="inline-flex items-center px-6 py-2.5 bg-orange-100 hover:bg-orange-200 text-orange-800 font-bold rounded-lg text-sm transition-colors"
                >
                  Admissions 2026-27
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-md border border-orange-100"
            >
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
                alt="CIAT Convent School Campus Life"
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatCounter stats={stats} />

      {/* Latest News & Circulars */}
      {latestNews.length > 0 && (
        <section className="py-16 md:py-20 bg-orange-50/30 border-y border-orange-100">
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Notice Board & Circulars</h2>
                <div className="w-16 h-1 bg-orange-500 mt-2 rounded-full"></div>
              </div>
              <Link
                to="/news"
                className="mt-3 md:mt-0 text-orange-700 hover:text-orange-800 font-bold flex items-center text-sm"
              >
                <span>View All Notices</span>
                <FiArrowRight className="ml-1" size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <div
                  key={article._id}
                  className="bg-white rounded-xl p-5 border-t-4 border-orange-500 border-x border-b border-orange-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center text-xs text-orange-700 mb-2 font-semibold">
                      <FiCalendar className="mr-1.5" size={13} />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                  <Link
                    to={`/news/${article._id}`}
                    className="text-xs font-bold text-orange-600 hover:text-orange-800 flex items-center gap-1"
                  >
                    <span>Read Full Circular</span>
                    <FiArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* Call to Action Section */}
      <section className="py-14 bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 text-white border-t-4 border-orange-400">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-200 bg-white/10 px-3 py-1 rounded-full mb-3 inline-block">
            Limited Seats Available
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3">
            Admissions Open for Session 2026-27
          </h2>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto mb-6 leading-relaxed">
            Empower your child with strong values, modern learning, and holistic leadership. Applications open from Nursery to Grade 11.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2.5 sm:space-y-0 sm:space-x-4">
            <Link
              to="/admissions"
              className="px-7 py-3 bg-white text-orange-800 font-bold rounded-lg hover:bg-orange-50 transition shadow-sm text-xs sm:text-sm uppercase tracking-wider"
            >
              Apply Online Now
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-xs sm:text-sm uppercase tracking-wider"
            >
              Contact Admissions Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
