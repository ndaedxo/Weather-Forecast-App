import React from 'react';
import { X } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onRemove: (cityName: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onRemove }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {history.map((city, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 rounded-full px-4 py-2"
          >
            <span className="text-gray-700">{city}</span>
            <button
              onClick={() => onRemove(city)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;