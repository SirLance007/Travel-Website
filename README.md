# 🌍 Travel Booking Website

A full-stack travel booking platform built with React, Node.js, Express, and MongoDB. Book amazing travel experiences across India with real-time availability, secure checkout, and promo code support.

## 🚀 Live Demo

- **Frontend**: [https://travel-website-front.onrender.com](https://travel-website-front.onrender.com)
- **Backend API**: [https://travel-website-7vcf.onrender.com](https://travel-website-7vcf.onrender.com)

## ✨ Features

### 🎯 Core Functionality
- **Browse Experiences**: Discover 16+ curated travel experiences across India
- **Real-time Search**: Search by title, location, or description
- **Live Availability**: Real-time slot booking with double-booking prevention
- **Secure Checkout**: Complete booking flow with form validation
- **Promo Codes**: Apply discount codes for savings
- **Mobile Responsive**: Optimized for all devices

### 🏞️ Experience Categories
- **Adventure Sports**: Bungee jumping, paragliding, rock climbing
- **Water Activities**: Kayaking, scuba diving, river rafting, boat cruises
- **Nature & Wildlife**: Wildlife safaris, mountain trekking, cave exploration
- **Cultural Experiences**: Desert safaris, spice plantation tours, coffee tours
- **Unique Stays**: Beach camping, houseboat experiences

### 📍 Locations Covered
- **Karnataka**: Udupi, Bangalore, Coorg, Hampi, Gokarna
- **Himachal Pradesh**: Manali, Dharamshala, Bir Billing
- **Kerala**: Alleppey, Munnar
- **Uttarakhand**: Jim Corbett, Rishikesh
- **Rajasthan**: Jaisalmer
- **West Bengal**: Sunderbans
- **Andaman Islands**: Scuba diving paradise
- **Meghalaya**: Cave exploration

## 💰 Promo Codes

Use these promo codes during checkout for instant savings:

| Code | Discount | Description |
|------|----------|-------------|
| `SAVE10` | 10% off | Get 10% discount on your total booking |
| `FLAT100` | ₹100 off | Flat ₹100 discount on any booking |

*Apply promo codes at checkout to see instant savings reflected in your total!*

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Responsive Design** for mobile/desktop

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** enabled for cross-origin requests
- **Environment-based configuration**
- **RESTful API design**

### Deployment
- **Frontend**: Deployed on Render
- **Backend**: Deployed on Render
- **Database**: MongoDB Atlas (Cloud)

## 📱 Screenshots

### Home Page
- Clean grid layout of experience cards
- Search functionality with real-time filtering
- Mobile-responsive design

### Experience Details
- Detailed experience information
- Real-time slot availability
- Date and time selection
- Interactive booking interface

### Checkout Process
- Secure form validation
- Promo code application
- Real-time price calculation
- Booking confirmation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-website
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `backend/.env`:
   ```env
   PORT=3000
   MONGODB_URL=your_mongodb_connection_string
   ```

   Create `frontend/.env`:
   ```env
   PORT=3001
   REACT_APP_API_URL=http://localhost:3000/api
   ```

5. **Seed the Database**
   ```bash
   cd backend
   npm run seed
   ```

6. **Start Development Servers**
   
   Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Frontend:
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## 📚 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get specific experience
- `GET /api/experiences/:id/slots` - Get available time slots

### Bookings
- `POST /api/bookings` - Create a new booking
- `POST /api/bookings/promo/validate` - Validate promo code

## 🎨 Design Features

### User Experience
- **Intuitive Navigation**: Clean, modern interface
- **Real-time Feedback**: Instant search and availability updates
- **Form Validation**: Comprehensive input validation with error messages
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error messages and fallbacks

### Mobile Responsiveness
- **Adaptive Layout**: Optimized for phones, tablets, and desktops
- **Touch-friendly**: Proper button sizes and spacing
- **Horizontal Scrolling**: For date/time selection on mobile
- **Responsive Typography**: Scales appropriately across devices

## 🔒 Security Features

- **Input Validation**: Server-side and client-side validation
- **CORS Protection**: Configured for secure cross-origin requests
- **Environment Variables**: Sensitive data stored securely
- **Error Handling**: Prevents information leakage

## 🚀 Deployment

### Frontend (Render)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variable: `REACT_APP_API_URL`

### Backend (Render)
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables: `PORT`, `MONGODB_URL`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for high-quality travel images
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB Atlas** for cloud database hosting
- **Render** for reliable deployment platform

## 📞 Support

For support, email [your-email@example.com] or create an issue in this repository.

---

**Built with ❤️ for travel enthusiasts across India**

*Experience the beauty of India with our curated travel experiences!*