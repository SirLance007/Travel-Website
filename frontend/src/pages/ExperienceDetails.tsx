import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import api from '../api/api';

interface Experience {
  _id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  description: string;
  slots: Array<{
    date: string;
    times: Array<{
      time: string;
      available: boolean;
    }>;
  }>;
}

interface TimeSlot {
  time: string;
  label: string;
  available: boolean;
}

interface DateSlot {
  date: string;
  label: string;
  times: TimeSlot[];
}

const ExperienceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [availableSlots, setAvailableSlots] = useState<DateSlot[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [experienceResponse, slotsResponse] = await Promise.all([
          api.get(`/experiences/${id}`),
          api.get(`/experiences/${id}/slots`)
        ]);
        
        setExperience(experienceResponse.data);
        setAvailableSlots(slotsResponse.data.slots);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };



  const handleConfirm = () => {
    const bookingData = {
      experienceId: id!,
      experienceTitle: experience!.title,
      date: selectedDate,
      time: selectedTime,
      quantity,
      subtotal,
      taxes,
      total
    };

    navigate('/checkout', { state: bookingData });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <NavBar />
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-xl text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gray-900">
        <NavBar />
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-xl text-red-400">Experience not found</div>
        </div>
      </div>
    );
  }

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + taxes;

  // Get available dates and times from API
  const dates = availableSlots.map(slot => ({
    label: slot.label,
    value: slot.date
  }));

  // Get times for selected date
  const selectedDateSlot = availableSlots.find(slot => slot.date === selectedDate);
  const times = selectedDateSlot ? selectedDateSlot.times : [];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-100 p-4">
        <NavBar />
      </div>
      
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Details
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Experience Details */}
            <div className="lg:col-span-2">
              {/* Experience Image */}
              <div className=" mb-6">
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>

              {/* Experience Title */}
              <h1 className="text-3xl font-medium text-gray-800 mb-4">{experience.title}</h1>
              <p className="text-gray-600 font-normal mb-6">{experience.description}</p>

              {/* Choose Date */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#838383] mb-3">Choose date</h3>
                <div className="flex gap-3">
                  {dates.map((date) => (
                    <button
                      key={date.value}
                      onClick={() => setSelectedDate(date.value)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedDate === date.value
                          ? 'bg-yellow-400 text-black'
                          : 'border border-[#BDBDBD]-800 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {date.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Choose Time */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose time</h3>
                <div className="flex gap-3">
                  {times.map((time: TimeSlot) => (
                    <button
                      key={time.time}
                      onClick={() => time.available && setSelectedTime(time.time)}
                      disabled={!time.available}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === time.time
                          ? 'bg-yellow-400 text-black'
                          : time.available
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {time.label}
                      {!time.available && <span className="ml-1 text-xs">Sold out</span>}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">All times are in IST (GMT +5:30)</p>
              </div>

              {/* About */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">About</h3>
                <div className="bg-gray-200 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">
                    Scenic routes, trained guides, and safety briefing. Minimum age 16.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                {/* Price Summary */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Starts at</span>
                    <span className="font-medium">₹{experience.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quantity</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium">₹{taxes}</span>
                  </div>
                  
                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-lg font-medium">₹{total}</span>
                  </div>
                </div>

                {/* Confirm Button */}
                <button 
                  onClick={handleConfirm}
                  disabled={!selectedDate || !selectedTime}
                  className={`w-full py-3 rounded-xl font-medium transition-colors ${
                    selectedDate && selectedTime
                      ? 'bg-yellow-400 text-black hover:bg-gray-700 hover:text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;