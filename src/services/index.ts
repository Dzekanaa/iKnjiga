// src/services/authService.js
import axios from "axios";

axios.defaults.withCredentials =true;

export const handleRegistration = async (username:string, email:string, password:string) => {
    try {
        const res = await axios.post("http://localhost:8801/register", { username, email, password });
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const handleLogin = async (email:string, password:string) => {
    try {
        const res = await axios.post("http://localhost:8801/login", { email, password });
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const handleAuth = async () => {
    try {
        const res = await axios.get("http://localhost:8801");
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const handleLogout = async () => {
    try {
        const res = await axios.get("http://localhost:8801/logout");
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
}


