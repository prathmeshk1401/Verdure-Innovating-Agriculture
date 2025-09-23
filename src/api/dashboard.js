import axios from "axios";

const BASE_URL = "http://localhost:5000/api/dashboard";

// Fetch dashboard data
export const getDashboard = async (token) => {
    const res = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

// Update dashboard data
export const updateDashboard = async (token, data) => {
    const res = await axios.post(BASE_URL + "/update", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
