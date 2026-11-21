import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
    <section className="py-16 bg-orange-50/50 border-t border-orange-200/60">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-300">
            Voices of Our Community
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 mb-2">
            What Parents & Alumni Say
          </h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mb-3"></div>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed">
            Real stories of values, guidance, and academic transformation from the CIAT Convent family.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              currentTestimonial === index && (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-orange-100"
                >
                  <div className="flex flex-col items-center text-center">
                    <blockquote className="text-base sm:text-lg text-slate-700 italic mb-5 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="pt-3 border-t border-slate-100 w-full">
                      <h4 className="text-base font-bold text-slate-900">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-orange-600 font-semibold mt-0.5">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Navigation arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-9 h-9 rounded-full bg-white shadow-md border border-orange-200 text-orange-700 flex items-center justify-center hover:bg-orange-50 transition-colors z-10"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-9 h-9 rounded-full bg-white shadow-md border border-orange-200 text-orange-700 flex items-center justify-center hover:bg-orange-50 transition-colors z-10"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <FiChevronRight size={18} />
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  currentTestimonial === index ? 'bg-orange-600 w-6' : 'bg-slate-300 w-2'
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
