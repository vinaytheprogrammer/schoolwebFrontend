import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';
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
    { label: 'Qualified Faculty', value: 45 },
    { label: 'Students Enrolled', value: 1200 },
    { label: 'Modern Labs & Smart Classes', value: 18 },
  ];

  return (
    <div className="pt-1">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Welcome Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 mb-3 inline-block">
                Recognized CBSE Institution
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#052e7e] mb-3">
                Welcome to CIAT CONVENT School
              </h2>
              <div className="w-20 h-1 bg-amber-500 mb-6 rounded-full"></div>
              <p className="text-slate-700 mb-4 leading-relaxed">
                For over 25 years, CIAT Convent Sr. Sec. School has stood as a beacon of academic distinction, holistic character formation, and innovative education in Delhi.
              </p>
              <p className="text-slate-700 mb-8 leading-relaxed">
                We empower students to explore their passions, think critically, and foster compassion. Our modern smart classrooms, robotics labs, Olympic-standard athletic fields, and dedicated educators guarantee an environment where every child thrives.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 bg-[#052e7e] hover:bg-[#031e54] text-white font-bold rounded-lg transition-colors shadow-sm"
                >
                  Discover Our Heritage
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  to="/admissions"
                  className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition-colors shadow-sm"
                >
                  Admissions 2026-27
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-md"
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black text-[#052e7e]">Notice Board & Circulars</h2>
                <div className="w-20 h-1 bg-amber-500 mt-3 rounded-full"></div>
              </div>
              <Link
                to="/news"
                className="mt-4 md:mt-0 text-amber-700 hover:text-amber-800 font-bold flex items-center text-sm"
              >
                View All Notices <FiArrowRight className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((article) => (
                <div
                  key={article._id}
                  className="bg-white rounded-xl p-6 border-t-4 border-amber-500 border-x border-b border-amber-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center text-xs text-amber-700 mb-2 font-semibold">
                      <FiCalendar className="mr-1" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <h3 className="font-bold text-[#052e7e] text-lg mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                      {article.summary}
                    </p>
                  </div>
                  <Link
                    to={`/news/${article._id}`}
                    className="text-xs font-bold text-[#052e7e] hover:text-amber-700 flex items-center"
                  >
                    Read Full Circular <FiArrowRight className="ml-1" />
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
      <section className="py-16 bg-[#052e7e] text-white border-t-4 border-amber-500">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full mb-3 inline-block">
            Limited Seats Available
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Admissions Open for Session 2026-27
          </h2>
          <p className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Empower your child with strong values, modern learning, and holistic leadership. Applications open from Nursery to Grade 11.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              to="/admissions"
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition shadow-md uppercase tracking-wider text-xs sm:text-sm"
            >
              Apply Online Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition uppercase tracking-wider text-xs sm:text-sm"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
