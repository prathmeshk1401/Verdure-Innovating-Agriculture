import axios from "axios";
import API_BASE from "./apiBase"; // import the central base URL

const BASE_URL = `${API_BASE}/api/dashboard`; // dynamic, works locally and in Vercel

// Fetch dashboard data
export const getDashboard = async (token) => {
    const res = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// Update dashboard data
export const updateDashboard = async (token, data) => {
    const res = await axios.post(`${BASE_URL}/update`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
