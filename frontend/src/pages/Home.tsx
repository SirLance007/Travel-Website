import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ExperienceCard from '../components/ExperienceCard';
import api from '../api/api';

interface Experience {
  _id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  description: string;
}

const Home: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await api.get('/experiences');
        setExperiences(response.data);
        setFilteredExperiences(response.data);
      } catch (err) {
        setError('Failed to load experiences');
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterExperiences(query);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Real-time search as user types
    filterExperiences(query);
  };

  const filterExperiences = (query: string) => {
    if (!query.trim()) {
      setFilteredExperiences(experiences);
      return;
    }

    const filtered = experiences.filter(experience => 
      experience.title.toLowerCase().includes(query.toLowerCase()) ||
      experience.location.toLowerCase().includes(query.toLowerCase()) ||
      experience.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredExperiences(filtered);
  };

  // Update filtered experiences when experiences change
  useEffect(() => {
    filterExperiences(searchQuery);
  }, [experiences, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar 
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-xl text-gray-600">Loading experiences...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar 
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-xl text-red-600 text-center">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <main className="max-w-6xl mx-auto px-8 py-8">
        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredExperiences.length > 0 
                ? `Found ${filteredExperiences.length} experience${filteredExperiences.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `No experiences found for "${searchQuery}"`
              }
            </p>
            {filteredExperiences.length === 0 && (
              <button 
                onClick={() => handleSearchChange('')}
                className="text-yellow-600 hover:text-yellow-700 underline mt-2"
              >
                Clear search to see all experiences
              </button>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 justify-items-center">
          {filteredExperiences.map((experience) => (
            <ExperienceCard key={experience._id} experience={experience} />
          ))}
        </div>
        
        {/* No results message */}
        {filteredExperiences.length === 0 && !searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No experiences available</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;