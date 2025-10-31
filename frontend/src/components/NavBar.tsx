import React, { useState } from 'react';

interface NavBarProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  onSearch,
  searchQuery = '',
  onSearchChange
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const currentQuery = searchQuery || localSearchQuery;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setLocalSearchQuery(value);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(currentQuery);
    } else {
      console.log('Searching for:', currentQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-8">
        <div className="flex items-center">
          <img
            src="/highway-delite-logo.png"
            alt="Highway Delite"
            className="h-10 w-auto"
            onError={(e) => {
              // Fallback to text logo if image fails to load
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.classList.remove('hidden');
            }}
          />
          <div className="bg-black text-white rounded-full w-10 h-10 flex flex-col justify-center items-center text-xs font-bold hidden">
            <span className="leading-none">highway</span>
            <span className="leading-none text-[0.5rem]">delite</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search experiences"
            value={currentQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="px-4 py-2 border-2 border-yellow-400 rounded focus:border-yellow-500 focus:outline-none text-base w-80"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;