import axios from "axios"

const api = axios.create({
    baseURL: "https://travel-website-7vcf.onrender.com",
});

export default api;

