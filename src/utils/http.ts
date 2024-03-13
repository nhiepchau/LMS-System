import axios from "axios";
import type { App } from "vue";

const username = localStorage.getItem("username") ?? "";
const password = localStorage.getItem("password") ?? "";

export default {
    install: (app: App) => {


        app.config.globalProperties.$axios = axios.create({
            baseURL: process.env.VITE_APP_API_URL,
            headers: {
                Authorization: `Basic ${btoa(username + ' ' + password)}`,
                "Content-Type": "application/json"
            }
        })
    }
} 