import axios from "axios";

const baseURL = 'http://localhost:4000';

// const accessToken = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null;

const axiosPrivate = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default axiosPrivate;