import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const StatsCard = ({ title, count, icon, linkTo, color }) => {
  return (
    <Link
      to={linkTo}
      className="group block p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-xs ${color} text-white`}>
          <span>{icon}</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-400 flex items-center justify-center transition-colors">
          <FiArrowRight size={13} />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5 tracking-tight">{count}</p>
      </div>
    </Link>
  );
};

export default StatsCard;
