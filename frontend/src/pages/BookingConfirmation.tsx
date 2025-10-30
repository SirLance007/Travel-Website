import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';

interface ConfirmationData {
  bookingId: string;
  experienceTitle: string;
  date: string;
  time: string;
  total: number;
}

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const confirmationData = location.state as ConfirmationData;

  const handleBackToHome = () => {
    navigate('/');
  };

  // Generate a random booking reference ID if not provided
  const bookingRef = confirmationData?.bookingId || `HUF${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Confirmation Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Booking Confirmed
        </h1>

        {/* Reference ID */}
        <p className="text-gray-600 text-lg mb-8 text-center">
          Ref ID: {bookingRef}
        </p>

        {/* Back to Home Button */}
        <button
          onClick={handleBackToHome}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;