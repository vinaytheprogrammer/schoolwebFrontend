import React from 'react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-gray-600 font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
