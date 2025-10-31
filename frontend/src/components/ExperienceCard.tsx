import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Experience {
  _id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  description: string;
}

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/experience/${experience._id}`);
  };

  return (
    <div className="bg-[#F0F0F0] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer w-full max-w-sm h-full flex flex-col">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className='flex justify-between items-start gap-2 mb-2'>
          <h3 className="text-sm sm:text-md font-medium text-gray-800 flex-1 min-w-0 leading-tight">
            {experience.title}
          </h3>
          <div className='py-1 px-2 rounded-md bg-[#D6D6D6] text-xs font-medium whitespace-nowrap flex-shrink-0'>
            {experience.location}
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed overflow-hidden flex-1" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {experience.description}
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-500">From</span>
            <span className="text-lg sm:text-xl font-medium text-gray-800">₹{experience.price}</span>
          </div>
          <button
            onClick={handleViewDetails}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;