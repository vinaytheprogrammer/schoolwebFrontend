import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const response = await api.post('/api/contact', formData);
      setSubmitMessage({
        type: 'success',
        text: response.data.message || 'Your message has been sent successfully. We will contact you shortly.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'There was a problem sending your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white py-16 text-center border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-400/30 mb-3">
            Administrative Desk
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-white">Contact & Campus Visit</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            We would love to hear from you. Get in touch with our admissions and administrative office.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">School Information</h2>
            <p className="text-gray-600 mb-6">
              Feel free to reach out via email, phone, or visit our administrative reception during working hours.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-gray-700">
                <FiMapPin className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                <p>
                  <span className="font-semibold block text-gray-900">Address:</span>
                  CIAT Convent Sr. Sec. School, Kanjhawala, North West Delhi, 110081
                </p>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <FiPhone className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                <p>
                  <span className="font-semibold block text-gray-900">Phone:</span>
                  +91 85957 92883 / +91 11 2595 1000
                </p>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <FiMail className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                <p>
                  <span className="font-semibold block text-gray-900">Email:</span>
                  Ciatschool1998@gmail.com
                </p>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <FiClock className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                <p>
                  <span className="font-semibold block text-gray-900">Visiting Hours:</span>
                  Mon - Fri: 8:00 AM - 4:00 PM | Sat: 8:00 AM - 1:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            {submitMessage.text && (
              <div
                className={`p-4 rounded-lg mb-6 text-sm ${
                  submitMessage.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {submitMessage.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Inquiry Subject *"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message / Query *"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition duration-200 disabled:opacity-50 shadow-md shadow-amber-500/20"
              >
                <FiSend />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
