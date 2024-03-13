import axios from "axios";

const username = localStorage.getItem("username") ?? "";
const password = localStorage.getItem("password") ?? "";

const http = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        Authorization: `Basic ${btoa(username + ':' + password)}`,
        "Content-Type": "text/plain"
    }
});

export default http;