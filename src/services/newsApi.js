import axios from "axios";

const API_URL = "http://127.0.0.1:300/news";

export const getNews = async() => {
    try {
        const res = await axios.get(API_URL);
        return res.data; // <-- IMPORTANT
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const addNews = async(news) => {
    const res = await axios.post(API_URL, news);
    return res.data;
};

export const updateNews = async(id, news) => {
    const res = await axios.put(`${API_URL}/${id}`, news);
    return res.data;
};

export const deleteNews = async(id) => {
    await axios.delete(`${API_URL}/${id}`);
};