import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiSend } from 'react-icons/fi';
import api from '../services/api';

const Admissions = () => {
  const [activeTab, setActiveTab] = useState('process');
  const [formData, setFormData] = useState({
    studentName: '',
    grade: '1st Grade',
    parentName: '',
    contactEmail: '',
    contactPhone: '',
    currentSchool: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', text: '' });

    try {
      const res = await api.post('/api/admissions', formData);
      setSubmitStatus({
        type: 'success',
        text: res.data.message || 'Application submitted successfully! Our admissions coordinator will reach out to you.',
      });
      setFormData({
        studentName: '',
        grade: '1st Grade',
        parentName: '',
        contactEmail: '',
        contactPhone: '',
        currentSchool: '',
        notes: '',
      });
    } catch (err) {
      setSubmitStatus({
        type: 'error',
        text: err.response?.data?.message || 'Failed to submit application. Please check the fields and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const admissionSteps = [
    {
      icon: "📋",
      title: "Submit Online Application",
      description: "Complete and submit the official online application form with applicant details.",
      timeframe: "Start of academic intake"
    },
    {
      icon: "💳",
      title: "Document Verification",
      description: "Submit academic transcripts, birth certificate, and proof of residence.",
      timeframe: "Within 3 days of submission"
    },
    {
      icon: "📝",
      title: "Entrance Assessment",
      description: "Candidates appear for an interactive assessment evaluating aptitude and reasoning.",
      timeframe: "Scheduled following verification"
    },
    {
      icon: "👥",
      title: "Parent & Student Interaction",
      description: "An informal interaction with the principal and academic counseling team.",
      timeframe: "1 week after assessment"
    },
    {
      icon: "📬",
      title: "Admission Offer",
      description: "Official admission confirmation sent to the registered email address.",
      timeframe: "Within 5 working days"
    },
    {
      icon: "✅",
      title: "Fee Payment & Enrollment",
      description: "Complete formal enrollment and receive student ID and welcome kit.",
      timeframe: "Within 7 days of offer"
    }
  ];

  const faqs = [
    {
      question: "What are the eligibility age criteria for Kindergarten?",
      answer: "Children should be minimum 3 years old by March 31st of the academic admission year for Nursery/Pre-School."
    },
    {
      question: "What grades and streams are offered at Senior Secondary level?",
      answer: "We offer Grade 11 & 12 across Science (Medical & Non-Medical), Commerce with/without Mathematics, and Humanities."
    },
    {
      question: "Is school transport available?",
      answer: "Yes, our fleet of air-conditioned GPS-enabled buses covers extensive routes across North and North-West Delhi with speed governors and female attendants."
    },
    {
      question: "What is the teacher-student ratio?",
      answer: "We maintain an ideal 1:20 ratio ensuring individual attention and customized developmental mentoring for every child."
    }
  ];

  const importantDates = [
    { event: "Registration Portal Opens", date: "January 15, 2026", description: "Online registration begins for Academic Session 2026-27" },
    { event: "Open House & Campus Walk", date: "February 14, 2026", description: "Explore campus infrastructure, labs, and interact with educators" },
    { event: "First Round Assessments", date: "March 10-15, 2026", description: "Diagnostic assessments for Grade 1 through Grade 9" },
    { event: "Session Commencement", date: "April 6, 2026", description: "Welcome orientation and first academic day" }
  ];

  const requiredDocuments = [
    "Completed application form printout / digital receipt",
    "Municipal Birth Certificate (original for verification + photocopy)",
    "Previous academic year report card / passing marksheet",
    "Transfer Certificate (countersigned by education authority if inter-state)",
    "4 recent passport-sized photographs of candidate and 2 of parents",
    "Proof of residential address (Aadhaar / Voter ID / Utility bill)",
    "Medical fitness certificate signed by registered practitioner"
  ];

  return (
    <div className="pt-1">
      {/* Hero Section */}
      <section className="bg-[#052e7e] text-white py-16 text-center border-b-4 border-amber-500">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full mb-3 inline-block">
            Academic Session 2026-27
          </span>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-black mb-3 text-white"
          >
            Admissions Open
          </motion.h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Join our nurturing community of learners and embark on a journey of academic distinction, sports excellence, and character leadership.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="bg-white border-b-2 border-amber-200 sticky top-[110px] md:top-[120px] z-10 shadow-xs">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex overflow-x-auto py-2.5 gap-2 whitespace-nowrap scrollbar-none">
            {[
              { id: 'process', label: 'Admission Process' },
              { id: 'apply', label: 'Apply Online' },
              { id: 'fees', label: 'Fee Structure' },
              { id: 'dates', label: 'Important Dates' },
              { id: 'documents', label: 'Required Documents' },
              { id: 'faq', label: 'FAQs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-bold rounded-lg text-xs sm:text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-700 hover:text-[#052e7e] hover:bg-amber-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12 bg-gray-50 min-h-[500px]">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Apply Online */}
          {activeTab === 'apply' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Online Admission Application</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Please fill in the candidate details below. Our admissions desk will review and contact you with next steps.
                </p>

                {submitStatus.text && (
                  <div
                    className={`p-4 rounded-lg mb-6 text-sm ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {submitStatus.text}
                  </div>
                )}

                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium text-xs mb-1">Student Full Name *</label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="e.g. Aarav Sharma"
                        required
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium text-xs mb-1">Class / Grade Applying For *</label>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="Pre-School / Nursery">Pre-School / Nursery</option>
                        <option value="Kindergarten">Kindergarten</option>
                        <option value="1st Grade">1st Grade</option>
                        <option value="2nd Grade">2nd Grade</option>
                        <option value="3rd Grade">3rd Grade</option>
                        <option value="4th Grade">4th Grade</option>
                        <option value="5th Grade">5th Grade</option>
                        <option value="6th Grade">6th Grade</option>
                        <option value="7th Grade">7th Grade</option>
                        <option value="8th Grade">8th Grade</option>
                        <option value="9th Grade">9th Grade</option>
                        <option value="10th Grade">10th Grade</option>
                        <option value="11th Grade (Science)">11th Grade (Science)</option>
                        <option value="11th Grade (Commerce)">11th Grade (Commerce)</option>
                        <option value="11th Grade (Humanities)">11th Grade (Humanities)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium text-xs mb-1">Parent / Guardian Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        placeholder="e.g. Rajesh Sharma"
                        required
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium text-xs mb-1">Contact Phone Number *</label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium text-xs mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        placeholder="parent@example.com"
                        required
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium text-xs mb-1">Previous / Current School</label>
                      <input
                        type="text"
                        name="currentSchool"
                        value={formData.currentSchool}
                        onChange={handleInputChange}
                        placeholder="e.g. St. Xaviers School"
                        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium text-xs mb-1">Additional Notes / Special Interests</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Mention any sports accomplishments, special needs, or academic interests..."
                      rows="3"
                      className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-200 disabled:opacity-50 shadow-sm"
                  >
                    <FiSend />
                    <span>{isSubmitting ? 'Submitting Application...' : 'Submit Admission Application'}</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* Admission Process */}
          {activeTab === 'process' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Six Steps to Admission</h2>
                <p className="text-sm text-gray-600 mt-2">A transparent, student-friendly enrollment journey</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {admissionSteps.map((step, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-2xl mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 text-xs font-semibold text-amber-700">
                      {step.timeframe}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Fee Structure */}
          {activeTab === 'fees' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Fee Schedule (2026-27)</h2>
                <p className="text-sm text-gray-600 mt-2">Affordable, transparent fees with quarterly payment options</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Academic Tuition Fees</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Pre-School & Kindergarten</span>
                      <span className="font-semibold text-gray-900">₹3,500 / month</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Primary School (Grade 1 - 5)</span>
                      <span className="font-semibold text-gray-900">₹4,200 / month</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Middle School (Grade 6 - 8)</span>
                      <span className="font-semibold text-gray-900">₹4,800 / month</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Secondary School (Grade 9 - 10)</span>
                      <span className="font-semibold text-gray-900">₹5,400 / month</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Sr. Secondary (Grade 11 - 12)</span>
                      <span className="font-semibold text-gray-900">₹6,200 / month</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Other Charges & Transport</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>One-Time Admission Registration</span>
                      <span className="font-semibold text-gray-900">₹10,000 (once)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Annual Developmental & Lab Charges</span>
                      <span className="font-semibold text-gray-900">₹6,000 / year</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Bus Transport (within 5 km)</span>
                      <span className="font-semibold text-gray-900">₹1,500 / month</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Bus Transport (above 5 km)</span>
                      <span className="font-semibold text-gray-900">₹2,200 / month</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Important Dates */}
          {activeTab === 'dates' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Key Admission Dates</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {importantDates.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{item.date}</span>
                    <h3 className="text-base font-bold text-gray-900 mt-1">{item.event}</h3>
                    <p className="text-xs text-gray-600 mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Required Documents */}
          {activeTab === 'documents' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Required Documentation Checklist</h2>
                <div className="space-y-3">
                  {requiredDocuments.map((doc, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm text-gray-700">
                      <FiCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={18} />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* FAQs */}
          {activeTab === 'faq' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-base font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admissions;
