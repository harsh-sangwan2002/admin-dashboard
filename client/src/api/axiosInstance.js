import axios from "axios";
import store from "../redux/store";

const axiosInstance = axios.create({
    baseURL: "https://admin-dashboard-9u1r.onrender.com/api",
});

axiosInstance.interceptors.request.use((config) => {
    const token = store.getState().auth.token;

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default axiosInstance;
