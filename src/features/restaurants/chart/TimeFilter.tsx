import React from 'react';
import { ChevronDown } from 'lucide-react';

export type TimeFilterOption = 'weekly' | 'monthly' | 'sixMonths';

interface TimeFilterProps {
  selectedFilter: TimeFilterOption;
  onFilterChange: (filter: TimeFilterOption) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ selectedFilter, onFilterChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const filterOptions = [
    { value: 'weekly' as TimeFilterOption, label: 'Last 7 Days' },
    { value: 'monthly' as TimeFilterOption, label: 'Last 30 Days' },
    { value: 'sixMonths' as TimeFilterOption, label: 'Last 6 Months' }
  ];

  

  const selectedOption = filterOptions.find(option => option.value === selectedFilter);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-150"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedOption?.label}
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onFilterChange(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedFilter === option.value
                    ? 'bg-orange-100 text-orange-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                } transition-colors duration-150`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeFilter;