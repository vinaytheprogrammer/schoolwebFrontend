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
      <section className="bg-gradient-to-r from-orange-700 via-orange-600 to-orange-700 text-white py-14 text-center border-b-4 border-orange-400">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-200 bg-white/10 px-3 py-1 rounded-full mb-2.5 inline-block">
            Administrative Reception
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2.5 text-white">Contact & Campus Visit</h1>
          <div className="w-16 h-1 bg-white/80 mx-auto mb-3 rounded-full"></div>
          <p className="text-orange-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            We would love to hear from you. Get in touch with our administrative and admissions desk.
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
                <FiMapPin className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                <p>
                  <span className="font-semibold block text-gray-900">Address:</span>
                  Greenwood Convent Sr. Sec. School, Sector 14, Institutional Area, New Delhi - 110001
                </p>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <FiPhone className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                <p>
                  <span className="font-semibold block text-gray-900">Phone:</span>
                  +91 98765 43210 / +91 11 2345 6789
                </p>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <FiMail className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                <p>
                  <span className="font-semibold block text-gray-900">Email:</span>
                  contact@greenwoodschool.edu
                </p>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <FiClock className="text-orange-600 mt-1 flex-shrink-0" size={20} />
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-200 disabled:opacity-50 shadow-sm text-sm"
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
