import axios from "axios";

const HOST = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const api = axios.create({
        baseURL: HOST,
        withCredentials: true // 모든 세션 요청에 쿠키 포함
    });

export default api;
