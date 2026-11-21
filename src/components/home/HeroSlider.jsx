import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiAward } from 'react-icons/fi';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider data
  const slides = [
    {
      id: 1,
      badge: 'Excellence in Education',
      title: 'Shaping Inquiring Minds, Building Noble Futures',
      description:
        'Join CIAT Convent Sr. Sec. School for an enriching educational journey rooted in values, academic rigor, and holistic leadership.',
      image: 'https://res.cloudinary.com/dbh02ryca/image/upload/v1741523149/prayer1_o7ncps.jpg',
      primaryCta: {
        text: 'Admissions 2026-27',
        link: '/admissions'
      },
      secondaryCta: {
        text: 'Explore Campus',
        link: '/about'
      }
    },
    {
      id: 2,
      badge: 'Innovative Pedagogy',
      title: 'Beyond Textbooks into Experiential Discovery',
      description:
        'Modern smart classrooms, robotics innovation labs, and personalized mentorship designed to bring out the unique genius in every child.',
      image: 'https://res.cloudinary.com/dbh02ryca/image/upload/v1741523150/view_g5yk4q.jpg',
      primaryCta: {
        text: 'Our Vision & Mission',
        link: '/vision-mission'
      },
      secondaryCta: {
        text: 'Principal\'s Address',
        link: '/principal-message'
      }
    },
    {
      id: 3,
      badge: 'Holistic Campus Life',
      title: 'Athletics, Creative Arts & Character Formation',
      description:
        'A vibrant, inclusive community with Olympic-standard sports, cultural clubs, and community engagement for complete personal development.',
      image: 'https://res.cloudinary.com/dbh02ryca/image/upload/v1741523150/lab2_papwdu.jpg',
      primaryCta: {
        text: 'View Photo Gallery',
        link: '/gallery'
      },
      secondaryCta: {
        text: 'Contact Admissions',
        link: '/contact'
      }
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden z-0">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            currentSlide === index && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                {/* Background image with cinematic gradient overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000"
                  style={{
                    backgroundImage: `url(${slide.image})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-950/60"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      className="max-w-3xl text-white"
                    >
                      {/* Pill Badge */}
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-xs">
                        <FiAward className="text-amber-400" />
                        <span>{slide.badge}</span>
                      </div>

                      {/* Main Title */}
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-tight drop-shadow-md">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className="text-base sm:text-lg md:text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed drop-shadow-xs font-normal">
                        {slide.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3.5">
                        <Link
                          to={slide.primaryCta.link}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 hover:-translate-y-0.5"
                        >
                          <span>{slide.primaryCta.text}</span>
                          <FiArrowRight size={16} />
                        </Link>

                        <Link
                          to={slide.secondaryCta.link}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/70 hover:bg-slate-900/90 text-white font-semibold text-sm border border-slate-700 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5"
                        >
                          <span>{slide.secondaryCta.text}</span>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-slate-700/60 flex items-center justify-center backdrop-blur-md transition-all z-10 hover:scale-105"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FiChevronLeft size={22} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-slate-700/60 flex items-center justify-center backdrop-blur-md transition-all z-10 hover:scale-105"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-amber-400 w-8 shadow-sm shadow-amber-400/50' : 'bg-white/40 hover:bg-white/70 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
