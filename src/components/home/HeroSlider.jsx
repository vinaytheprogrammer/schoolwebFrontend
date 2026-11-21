import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider data
  const slides = [
    {
      id: 1,
      title: 'Excellence in Education',
      subtitle: 'Shaping Minds, Building Futures',
      description:
        'Join CIAT Convent Sr. Sec. School for an enriching educational experience rooted in moral values, competitive academics, and holistic leadership.',
      image: 'https://res.cloudinary.com/dbh02ryca/image/upload/v1741523149/prayer1_o7ncps.jpg',
      cta: {
        text: 'Admissions 2026-27',
        link: '/admissions'
      }
    },
    {
      id: 2,
      title: 'Innovative Learning',
      subtitle: 'Beyond Textbooks into Life',
      description:
        'Smart interactive classrooms, modern science & robotics labs, and experiential teaching methods create an engaging environment for every child.',
      image: 'https://res.cloudinary.com/dbh02ryca/image/upload/v1741523150/view_g5yk4q.jpg',
      cta: {
        text: 'Explore Campus',
        link: '/about'
      }
    },
    {
      id: 3,
      title: 'Vibrant Campus Life',
      subtitle: 'Growing Together in Harmony',
      description:
        'An inclusive school community offering Olympic-standard sports, creative arts, and leadership activities for complete personal development.',
      image: 'https://res.cloudinary.com/dbh02ryca/image/upload/v1741523150/lab2_papwdu.jpg',
      cta: {
        text: 'View Photo Gallery',
        link: '/gallery'
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
    <section className="relative h-[480px] sm:h-[540px] md:h-[600px] overflow-hidden z-0">
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
                {/* Background image with warm photographic overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="max-w-2xl text-white"
                    >
                      <span className="text-xs sm:text-sm uppercase tracking-wider font-bold text-orange-300 bg-orange-950/70 border border-orange-400/40 px-3 py-1 rounded-full mb-3 inline-block">
                        {slide.subtitle}
                      </span>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight text-white drop-shadow-md">
                        {slide.title}
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg mb-6 text-slate-100 max-w-xl leading-relaxed drop-shadow-xs">
                        {slide.description}
                      </p>
                      <Link
                        to={slide.cta.link}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all uppercase tracking-wider text-xs sm:text-sm"
                      >
                        <span>{slide.cta.text}</span>
                        <FiArrowRight size={15} />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-orange-600 text-white flex items-center justify-center transition-colors z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FiChevronLeft size={22} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-orange-600 text-white flex items-center justify-center transition-colors z-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2.5 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-orange-500 w-8' : 'bg-white/60 hover:bg-white w-2.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
