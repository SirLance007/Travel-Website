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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="flex flex-col space-y-4 md:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/hd-booking.png"
                alt="HD Booking"
                className="h-10 w-auto"
                onLoad={() => console.log('Logo loaded successfully')}
                onError={(e) => {
                  console.log('Logo failed to load, falling back to text');
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="bg-black text-white rounded-full w-8 h-8 flex flex-col justify-center items-center text-xs font-bold hidden">
                <span className="leading-none text-[0.4rem]">highway</span>
                <span className="leading-none text-[0.3rem]">delite</span>
              </div>
            </div>

          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search experiences"
              value={currentQuery}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-3 py-2 border-2 border-yellow-400 rounded focus:border-yellow-500 focus:outline-none text-sm"
            />
            <button
              onClick={handleSearch}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium transition-colors text-sm"
            >
              Search
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="/hd-booking.png"
              alt="HD Booking"
              className="h-10 w-auto"
              onLoad={() => console.log('Desktop logo loaded successfully')}
              onError={(e) => {
                console.log('Desktop logo failed to load, falling back to text');
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
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
      </div>
    </nav>
  );
};

export default NavBar;