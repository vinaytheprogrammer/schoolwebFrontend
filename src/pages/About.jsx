import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const About = () => {
  window.scrollTo(0, 0);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 text-white py-14 text-center border-b-4 border-orange-400">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-200 bg-white/10 px-3 py-1 rounded-full mb-2.5 inline-block">
            Since 1998
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2.5 text-white">About CIAT Convent</h1>
          <div className="w-16 h-1 bg-white/80 mx-auto mb-3 rounded-full"></div>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto leading-relaxed">
            Discover our journey, foundational values, and commitment to educational excellence.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-soft"
            >
              <img
                src="https://res.cloudinary.com/dbh02ryca/image/upload/v1741523148/student7_zfcc1b.jpg"
                alt="School history"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Our <span className="text-orange-600">History & Heritage</span>
              </h2>
              <div className="w-16 h-1 bg-orange-500 mb-5 rounded-full"></div>
              <p className="text-slate-600 text-sm sm:text-base mb-4 leading-relaxed">
                Founded in 1998, CIAT Convent Sr. Sec. School began with a steadfast vision to elevate school education and create a nurturing environment where students could excel academically, ethically, and personally. What started as an earnest initiative has grown into a renowned CBSE institution with over 1,200 scholars and 45+ distinguished educators.
              </p>
              <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
                Throughout our journey of 25+ years, we have continuously modernized our pedagogical methodologies, smart labs, and athletic facilities. Our commitment to excellence has helped us cultivate successful alumni who are making significant contributions in medicine, engineering, civil services, and arts across the globe.
              </p>
              <Link
                to="/vision-mission"
                className="inline-flex items-center px-6 py-2.5 bg-orange-600 text-white rounded-lg font-bold text-sm hover:bg-orange-700 transition-colors shadow-sm"
              >
                <span>Our Vision & Mission</span>
                <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14 bg-orange-50/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200 mb-2.5 inline-block">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Our Core Institutional Values
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-3 rounded-full"></div>
            <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
              These enduring principles guide every curriculum decision and student initiative at CIAT Convent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Academic Excellence',
                description: 'Striving for the highest intellectual standards in competitive academics and lifelong inquiry',
                icon: '🏆',
              },
              {
                title: 'Moral Integrity',
                description: 'Fostering honesty, ethical conduct, and compassionate character in every student',
                icon: '⚖️',
              },
              {
                title: 'Innovative Thinking',
                description: 'Embracing experiential learning, robotics, and creative problem-solving techniques',
                icon: '💡',
              },
              {
                title: 'Inclusive Harmony',
                description: 'Nurturing a diverse, welcoming community where every learner is respected and empowered',
                icon: '🤝',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-xs border border-orange-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{value.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 text-white border-t-4 border-orange-400">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-200 bg-white/10 px-3 py-1 rounded-full mb-3 inline-block">
            Admissions Open 2026-27
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3">
            Join the CIAT Convent Community
          </h2>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto mb-6 leading-relaxed">
            Begin an inspiring educational journey. Schedule a campus visit or apply online today.
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
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;