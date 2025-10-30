import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import api from '../api/api';

interface BookingData {
  experienceId: string;
  experienceTitle: string;
  date: string;
  time: string;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state as BookingData;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    promoCode: ''
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(bookingData?.total || 0);

  useEffect(() => {
    if (!bookingData) {
      navigate('/');
    }
  }, [bookingData, navigate]);

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (value.trim().length < 2) {
          error = 'Full name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'Full name can only contain letters and spaces';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Please enter a valid email address';
        }
        break;
    }

    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    if (name === 'fullName' || name === 'email') {
      const error = validateField(name, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = () => {
    const nameError = validateField('fullName', formData.fullName);
    const emailError = validateField('email', formData.email);

    setFormErrors({
      fullName: nameError,
      email: emailError
    });

    return !nameError && !emailError && agreedToTerms;
  };

  const handleApplyPromo = async () => {
    if (!formData.promoCode) return;

    try {
      const response = await api.post('/bookings/promo/validate', {
        code: formData.promoCode
      });

      if (response.data.valid) {
        const discount = response.data.discount;
        let discountValue = 0;

        if (discount < 1) {
          // Percentage discount
          discountValue = bookingData.total * discount;
        } else {
          // Flat discount
          discountValue = Math.min(discount, bookingData.total);
        }

        setDiscountAmount(discountValue);
        setFinalTotal(bookingData.total - discountValue);
        setPromoApplied(true);
      } else {
        alert('Invalid promo code');
      }
    } catch (error) {
      console.error('Error validating promo:', error);
      alert('Error validating promo code');
    }
  };

  const handleRemovePromo = () => {
    setFormData(prev => ({
      ...prev,
      promoCode: ''
    }));
    setPromoApplied(false);
    setDiscountAmount(0);
    setFinalTotal(bookingData.total);
  };

  const handlePayAndConfirm = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const bookingPayload = {
        experienceId: bookingData.experienceId,
        userName: formData.fullName,
        userEmail: formData.email,
        date: bookingData.date,
        time: bookingData.time,
        promo: promoApplied ? formData.promoCode : ''
      };

      const response = await api.post('/bookings', bookingPayload);

      if (response.data.successs) {
        // Navigate to confirmation page with booking details
        const confirmationData = {
          bookingId: response.data.booking._id,
          experienceTitle: bookingData.experienceTitle,
          date: bookingData.date,
          time: bookingData.time,
          total: finalTotal
        };

        navigate('/booking-confirmed', { state: confirmationData });
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="bg-gray-100 p-4">
        <NavBar />
      </div>

      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Checkout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-colors ${formErrors.fullName
                    ? 'focus:ring-red-400 bg-red-50'
                    : 'focus:ring-yellow-400'
                    }`}
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-colors ${formErrors.email
                    ? 'focus:ring-red-400 bg-red-50'
                    : 'focus:ring-yellow-400'
                    }`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Promo Code */}
              <div>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      name="promoCode"
                      value={formData.promoCode}
                      onChange={handleInputChange}
                      placeholder="Promo code"
                      disabled={promoApplied}
                      className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50 pr-12"
                    />
                    {promoApplied && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        {/* Green tick icon */}
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {/* Cross button to remove promo */}
                        <button
                          onClick={handleRemovePromo}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                          type="button"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !formData.promoCode}
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-600 text-sm">
                      Promo code applied! Discount: ₹{discountAmount}
                    </p>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-yellow-400 border-gray-300 rounded focus:ring-yellow-400"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the terms and safety policy *
                  </label>
                </div>
                {!agreedToTerms && (formErrors.fullName || formErrors.email) && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    You must agree to the terms and conditions
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <div className="bg-gray-200 rounded-3xl p-8 shadow-sm w-full max-w-md">
                {/* Booking Details */}
                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">Experience</span>
                    <span className="text-gray-800 text-lg font-normal">{bookingData.experienceTitle}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">Date</span>
                    <span className="text-gray-800 text-lg font-normal">{bookingData.date}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">Time</span>
                    <span className="text-gray-800 text-lg font-normal">{bookingData.time}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">Qty</span>
                    <span className="text-gray-800 text-lg font-normal">{bookingData.quantity}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">Subtotal</span>
                    <span className="text-gray-800 text-lg font-normal">₹{bookingData.subtotal}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-lg">Taxes</span>
                    <span className="text-gray-800 text-lg font-normal">₹{bookingData.taxes}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 text-lg">Discount</span>
                      <span className="text-green-600 text-lg font-normal">-₹{discountAmount}</span>
                    </div>
                  )}

                  <hr className="border-gray-400 my-6" />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 text-2xl font-medium">Total</span>
                    <span className="text-gray-800 text-2xl font-medium">₹{finalTotal}</span>
                  </div>
                </div>

                {/* Pay and Confirm Button */}
                <button
                  onClick={handlePayAndConfirm}
                  disabled={!formData.fullName || !formData.email || !agreedToTerms || !!formErrors.fullName || !!formErrors.email}
                  className={`w-full py-4 rounded-2xl text-xl font-medium transition-colors ${formData.fullName && formData.email && agreedToTerms && !formErrors.fullName && !formErrors.email
                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  Pay and Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;