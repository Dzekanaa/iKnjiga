// src/services/authService.js
import axios from "axios";

axios.defaults.withCredentials =true;

export const AddBook = async (id: number | null, knjigaID: number) => {
    try {
        const res = await axios.post("http://localhost:8801/addbook", { korisnikID: id, knjigaID });
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};


export const getUser = async (id: number | null) => {
    try {
        const res = await axios.post("http://localhost:8801/user", { id });
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const getMyBooks = async () => {
    try {
        const res = await axios.get("http://localhost:8801/mybooks");
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const getBooks = async () => {
    try {
        const res = await axios.get("http://localhost:8801/books");
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};


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


