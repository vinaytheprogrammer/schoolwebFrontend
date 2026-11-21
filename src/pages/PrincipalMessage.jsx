import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPhone, FiMail } from 'react-icons/fi';

const PrincipalMessage = () => {
  window.scrollTo(0, 0);
  return (
    <div className="pt-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 text-white py-14 text-center border-b-4 border-orange-400">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-200 bg-white/10 px-3 py-1 rounded-full mb-2.5 inline-block">
            Leadership Address
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2.5 text-white">Principal's Desk</h1>
          <div className="w-16 h-1 bg-white/80 mx-auto mb-3 rounded-full"></div>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto leading-relaxed">
            A welcome address from our Principal, Mrs. Anita Kumari, on nurturing responsible, compassionate, and inspired scholars.
          </p>
        </div>
      </section>

      {/* Principal Message Section */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Principal Image and Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-orange-100 p-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center text-3xl font-black text-orange-700 shadow-inner">
                  AK
                </div>
                <h3 className="text-xl font-black text-slate-900 text-center mb-1">
                  Mrs. Anita Kumari
                </h3>
                <p className="text-orange-600 font-bold text-xs uppercase tracking-wider text-center mb-4">Principal</p>
                <div className="text-xs text-slate-600 space-y-1.5 border-t border-b border-orange-50 py-3 mb-4 text-center">
                  <p className="font-semibold text-slate-800">Ph.D. in Educational Leadership</p>
                  <p>M.Ed. in Curriculum Development</p>
                  <p>B.Sc. in Mathematics</p>
                </div>
                <div className="flex items-center justify-center text-xs text-slate-600 mb-2">
                  <FiPhone className="mr-2 text-orange-600" />
                  <a href="tel:+918595792883" className="hover:text-orange-600 font-medium transition-colors">
                    +91 85957 92883
                  </a>
                </div>
                <div className="flex items-center justify-center text-xs text-slate-600 mb-4">
                  <FiMail className="mr-2 text-orange-600" />
                  <a href="mailto:Ciatschool1998@gmail.com" className="hover:text-orange-600 font-medium transition-colors">
                    Ciatschool1998@gmail.com
                  </a>
                </div>
                <div className="pt-3 border-t border-orange-100 text-center">
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    "Education is not merely academic excellence; it is shaping resilient character to meet life's opportunities."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Message Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Welcome Message From Our <span className="text-orange-600">Principal</span>
              </h2>
              <div className="w-16 h-1 bg-orange-500 mb-5 rounded-full"></div>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p className="font-semibold text-slate-800">
                  Dear Parents, Students, and Esteemed Visitors,
                </p>
                <p>
                  It is an honor to welcome you to the CIAT Convent Sr. Sec. School portal. For more than 25 years, our institution has stood at the intersection of rigorous academic learning, ethical character development, and future-ready innovation in Delhi.
                </p>
                <p>
                  At CIAT Convent, we believe education is a lifelong catalyst for personal transformation. Beyond scoring high marks in CBSE examinations, our duty is to nurture confident, kind, and capable young people who will make meaningful contributions to our nation and the world.
                </p>
                <p>
                  Our smart interactive classrooms, upgraded robotics and science laboratories, sports fields, and dedicated faculty ensure that learning is experiential rather than rote. We teach our students to question fearlessly, think analytically, and embrace collaborative problem solving.
                </p>
                <p>
                  Whether you are a prospective parent seeking admission for session 2026-27 or an alumnus staying connected, I invite you to visit our campus and experience the warmth and passion that defines CIAT Convent.
                </p>
                <div className="pt-4 border-t border-orange-100">
                  <p className="font-bold text-slate-900">Warm regards,</p>
                  <p className="text-orange-700 font-bold">Mrs. Anita Kumari</p>
                  <p className="text-xs text-slate-500">Principal, CIAT CONVENT SR. SEC. SCHOOL</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-orange-600 text-white rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-orange-700 transition-colors shadow-sm"
                >
                  <span>About Our School</span>
                  <FiArrowRight size={13} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-5 py-2.5 border-2 border-orange-500 text-orange-700 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-orange-50 transition-colors"
                >
                  Contact Desk
                </Link>
              </div>
            </motion.div>
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
            Experience CIAT Convent School
          </h2>
          <p className="text-sm sm:text-base text-orange-100 max-w-xl mx-auto mb-6 leading-relaxed">
            We invite you to visit our campus, observe our interactive classes, and discover the caring environment we provide for your child.
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
              Schedule Campus Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrincipalMessage;