import axios from "axios";
import Cookies from "js-cookie";

const HOST = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const api = axios.create({
        baseURL: HOST,
        withCredentials: true // 모든 세션 요청에 쿠키 포함
    });
api.interceptors.request.use(
    (config) => {
        // 브라우저 쿠키 저장소에서 직접 XSRF-TOKEN을 읽어옵니다.
        const csrfToken = Cookies.get("XSRF-TOKEN");
        
        if (csrfToken) {
            // 헤더에 수동으로 주입
            config.headers["X-XSRF-TOKEN"] = csrfToken;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
