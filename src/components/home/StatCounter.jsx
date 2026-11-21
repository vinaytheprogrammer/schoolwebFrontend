import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiUsers, FiBookOpen, FiActivity } from 'react-icons/fi';

const StatCounter = ({ stats }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const [counts, setCounts] = useState(stats.map(() => 0));

  const statIcons = [
    <FiAward key="award" className="text-amber-400" size={24} />,
    <FiUsers key="users" className="text-blue-400" size={24} />,
    <FiBookOpen key="book" className="text-emerald-400" size={24} />,
    <FiActivity key="activity" className="text-purple-400" size={24} />,
  ];

  useEffect(() => {
    if (!isInView) return;

    const intervals = stats.map((stat, index) => {
      const duration = 2000;
      const steps = 50;
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
    <section ref={sectionRef} className="py-14 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-800/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-3 shadow-inner">
                {statIcons[index % statIcons.length]}
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 mb-1.5 tracking-tight font-mono">
                {counts[index].toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-300 uppercase tracking-wider">
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
