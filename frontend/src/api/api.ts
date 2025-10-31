import axios from "axios"

// Force production URL for deployed version
const baseURL = process.env.NODE_ENV === 'production' 
  ? "https://travel-website-7vcf.onrender.com/api"
  : process.env.REACT_APP_API_URL || "https://travel-website-7vcf.onrender.com/api";

console.log("Environment:", process.env.NODE_ENV);
console.log("API Base URL:", baseURL);

const api = axios.create({
    baseURL: baseURL,
});

export default api;

