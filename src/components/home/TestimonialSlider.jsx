import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const TestimonialSlider = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Vinay Gupta',
      role: 'Developer',
      image: 'https://source.unsplash.com/random/100x100/?woman',
      quote: `The teachers at Education Institute have had a profound impact on my child's academic performance and personal growth. The school's approach to education is balanced and holistic.`,
    },
    {
      id: 2,
      name: 'Rishabh Verma',
      role: 'Alumni (Batch of 2020)',
      image: 'https://source.unsplash.com/random/100x100/?man',
      quote: 'My years at Education Institute prepared me well for university life. The critical thinking skills and discipline I developed have been invaluable in my higher education journey.',
    },
    {
      id: 3,
      name: 'Dr. Adarsh Kumar Pandey',
      role: 'Local University Professor',
      image: 'https://source.unsplash.com/random/100x100/?professor',
      quote: 'Students from Education Institute consistently demonstrate exceptional academic foundations and a genuine passion for learning. The institution clearly excels in preparing students for future academic challenges.',
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-amber-50/50 border-t border-amber-200/60">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Voices of Our School
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#052e7e] mt-2 mb-3">
            What Parents & Alumni Say
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full mb-4"></div>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Real stories of values, guidance, and academic transformation from the CIAT Convent family.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              currentTestimonial === index && (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-8 md:p-10 rounded-lg shadow-soft"
                >
                  <div className="flex flex-col items-center text-center">
                    
                    <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mb-2">
                      <h4 className="text-lg font-bold text-[#052e7e]">{testimonial.name}</h4>
                      <p className="text-amber-700 font-semibold text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          {/* Navigation arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 lg:-translate-x-10 w-10 h-10 rounded-full bg-white shadow-md border border-amber-200 text-[#052e7e] flex items-center justify-center hover:bg-amber-50 transition-colors z-10"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 lg:translate-x-10 w-10 h-10 rounded-full bg-white shadow-md border border-amber-200 text-[#052e7e] flex items-center justify-center hover:bg-amber-50 transition-colors z-10"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <FiChevronRight size={20} />
          </button>
          
          {/* Dot indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentTestimonial === index ? 'bg-amber-500 w-7' : 'bg-slate-300 w-2.5'
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