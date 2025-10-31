import axios from "axios"

const baseURL = process.env.REACT_APP_API_URL || "https://travel-website-7vcf.onrender.com/api";

console.log("API Base URL:", baseURL);

const api = axios.create({
    baseURL: baseURL,
});

export default api;

