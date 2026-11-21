import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialSlider = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sunita Sharma',
      role: 'Parent of Class X Student',
      quote: `The teachers at CIAT Convent have had a profound impact on my child's academic confidence and holistic development. The blend of CBSE curriculum rigor with ethical values and athletics is exceptional.`,
    },
    {
      id: 2,
      name: 'Rishabh Verma',
      role: 'Alumni (Batch of 2021) • Software Engineer',
      quote: 'My years at CIAT Convent instilled the analytical rigor, leadership discipline, and inquisitive spirit that continue to drive my career today. Grateful for the faculty\'s steadfast mentorship.',
    },
    {
      id: 3,
      name: 'Adarsh Kumar Pandey',
      role: 'Senior Academic Consultant & Educator',
      quote: 'Students from CIAT Convent consistently demonstrate outstanding foundations, critical curiosity, and compassion. The institution excels in nurturing future-ready global citizens.',
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Voices of Our Community
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 mb-3">
            What Parents & Alumni Say
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Inspiring stories of transformation, academic brilliance, and character built within our campus halls.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              currentTestimonial === index && (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 mb-6 shadow-xs">
                      <FaQuoteLeft size={20} />
                    </div>

                    <blockquote className="text-base sm:text-lg md:text-xl text-slate-700 italic mb-6 leading-relaxed font-serif">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="pt-4 border-t border-slate-100 w-full text-center">
                      <h4 className="text-base font-bold text-slate-900">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-amber-600 font-medium mt-0.5">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:text-amber-600 transition-all z-10"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:text-amber-600 transition-all z-10"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <FiChevronRight size={20} />
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? 'bg-amber-500 w-7' : 'bg-slate-300 hover:bg-slate-400 w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
