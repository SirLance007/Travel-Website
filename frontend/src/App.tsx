import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import ExperienceDetails from "./pages/ExperienceDetails"
import Checkout from "./pages/Checkout"
import BookingConfirmation from "./pages/BookingConfirmation"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience/:id" element={<ExperienceDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/booking-confirmed" element={<BookingConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
