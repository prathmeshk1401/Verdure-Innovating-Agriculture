// Central API base URL for verdure-frontend
// Configure via REACT_APP_API_BASE, default to localhost:5000 for local dev
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

console.log("API_BASE configured as:", API_BASE);

export default API_BASE;


