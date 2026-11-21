import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const VisionMission = () => {
  window.scrollTo(0, 0);
  return (
    <div className="pt-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 text-white py-14 text-center border-b-4 border-orange-400">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-200 bg-white/10 px-3 py-1 rounded-full mb-2.5 inline-block">
            Core Philosophy
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2.5 text-white">Vision & Mission</h1>
          <div className="w-16 h-1 bg-white/80 mx-auto mb-3 rounded-full"></div>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto leading-relaxed">
            Our guiding principles, pedagogical ethos, and aspirations for educational excellence.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Our <span className="text-orange-600">Vision</span>
              </h2>
              <div className="w-16 h-1 bg-orange-500 mb-5 rounded-full"></div>
              <p className="text-slate-700 mb-4 leading-relaxed text-sm sm:text-base">
                To be a nationally recognized center of educational excellence, nurturing future leaders who are intellectually curious, morally steadfast, and equipped to address the challenges of an ever-changing world.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                We envision a learning ecosystem where critical thinking is fostered, ethical empathy is prioritized, and each child discovers their unique talents. Our alumni thrive as compassionate lifelong learners who lead with honor and integrity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-soft"
            >
              <img
                src="https://res.cloudinary.com/dbh02ryca/image/upload/v1741523147/student10_vcyull.jpg"
                alt="Our Vision"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-soft order-2 lg:order-1"
            >
              <img
                src="https://res.cloudinary.com/dbh02ryca/image/upload/v1741523149/student2_pbgogd.jpg"
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Our <span className="text-orange-600">Mission</span>
              </h2>
              <div className="w-16 h-1 bg-orange-500 mb-5 rounded-full"></div>
              <p className="text-slate-700 mb-4 leading-relaxed text-sm sm:text-base">
                To provide a holistic CBSE education that balances competitive academic rigor with character building, instilling the skills, values, and perseverance necessary for purposeful global impact.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed text-sm font-medium">
                We fulfill this commitment by:
              </p>
              <ul className="text-slate-700 mb-6 space-y-2.5 text-sm">
                <li className="flex items-start">
                  <span className="text-orange-600 font-bold mr-2">✓</span>
                  <span>Delivering experiential, technology-enabled pedagogy and state-of-the-art laboratory training</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 font-bold mr-2">✓</span>
                  <span>Employing experienced, compassionate educators who mentor every student individually</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 font-bold mr-2">✓</span>
                  <span>Maintaining a safe, inclusive campus promoting emotional well-being and active sports</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 font-bold mr-2">✓</span>
                  <span>Cultivating civic responsibility, environmental awareness, and moral integrity</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="py-14 bg-orange-50/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200 mb-2.5 inline-block">
              Institutional Goals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Our Core Objectives
            </h2>
            <div className="w-16 h-1 bg-orange-500 mx-auto mb-3 rounded-full"></div>
            <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
              Strategic pillars that guide our teaching and character-building framework
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Academic Excellence',
                description: 'Delivering robust CBSE curricula, smart laboratory practice, and analytical problem-solving to excel in higher education.',
                icon: '📚',
              },
              {
                title: 'Character Formation',
                description: 'Nurturing integrity, respect, empathy, and social ethics so students become conscientious leaders.',
                icon: '🌱',
              },
              {
                title: 'Global Awareness',
                description: 'Fostering cultural openness, environmental conservation, and awareness of civic affairs.',
                icon: '🌍',
              },
              {
                title: 'Innovation & Curiosity',
                description: 'Encouraging hands-on scientific projects, computational thinking, and artistic exploration.',
                icon: '💡',
              },
              {
                title: 'Athletic & Physical Vigor',
                description: 'Promoting teamwork, sportsmanship, and mental resilience through dedicated sports infrastructure.',
                icon: '🏃',
              },
              {
                title: 'Community Partnership',
                description: 'Building close collaboration between parents, faculty, and the wider neighborhood.',
                icon: '🤝',
              },
            ].map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-xs border border-orange-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{objective.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{objective.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{objective.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 text-white border-t-4 border-orange-400">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-200 bg-white/10 px-3 py-1 rounded-full mb-3 inline-block">
            Join Our Campus
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3">
            Ready to Be Part of Our Journey?
          </h2>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto mb-6 leading-relaxed">
            Partner with us in building a purposeful foundation for your child. Explore admissions or connect with our leadership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-2.5 sm:space-y-0 sm:space-x-4">
            <Link
              to="/admissions"
              className="px-7 py-3 bg-white text-orange-800 font-bold rounded-lg hover:bg-orange-50 transition shadow-sm text-xs sm:text-sm uppercase tracking-wider"
            >
              Apply Online Now
            </Link>
            <Link
              to="/principal-message"
              className="px-7 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-xs sm:text-sm uppercase tracking-wider"
            >
              Principal's Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMission;