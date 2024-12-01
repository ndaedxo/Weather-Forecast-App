import React from 'react';

const WeatherCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 animate-pulse">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mb-2"></div>
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(7)].map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div>
              <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;