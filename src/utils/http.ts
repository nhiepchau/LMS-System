import axios from "axios";

const username = sessionStorage.getItem('username') ?? '';
const password = sessionStorage.getItem('password') ?? '';
const token = sessionStorage.getItem('token') ?? '';

const http = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        "Authorization": token ? `Bearer ${token}` : '',
        "Content-Type": "application/json"
    }
});

export default http;