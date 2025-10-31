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
      <div className="relative h-48 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-xl text-xs font-normal">
          {experience.location}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className='flex justify-between items-start gap-2 mb-2'>
          <h3 className="text-md font-medium text-gray-800 flex-1 min-w-0">
            {experience.title}
          </h3>
          <div className='py-1 px-2 rounded-md bg-[#D6D6D6] text-xs font-medium whitespace-nowrap flex-shrink-0'>
            {experience.location}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 leading-relaxed overflow-hidden flex-1" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {experience.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-500">From</span>
            <span className="text-xl font-medium text-gray-800">₹{experience.price}</span>
          </div>
          <button
            onClick={handleViewDetails}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;