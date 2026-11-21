import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatCounter = ({ stats }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const [counts, setCounts] = useState(stats.map(() => 0));
  
  useEffect(() => {
    if (!isInView) return;
    
    const intervals = stats.map((stat, index) => {
      const duration = 2000; // 2 seconds to count up
      const steps = 50; // number of steps
      const increment = stat.value / steps;
      let count = 0;
      
      return setInterval(() => {
        count += increment;
        if (count >= stat.value) {
          count = stat.value;
          clearInterval(intervals[index]);
        }
        
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(count);
          return newCounts;
        });
      }, duration / steps);
    });
    
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [isInView, stats]);

  return (
    <section ref={sectionRef} className="py-14 bg-[#052e7e] text-white border-y-4 border-amber-500">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center p-3"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-300 mb-1.5 font-mono">
                {counts[index].toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatCounter;