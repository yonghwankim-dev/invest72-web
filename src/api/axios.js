import axios from "axios";
import Cookies from "js-cookie";

const HOST = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const api = axios.create({
        baseURL: HOST,
        withCredentials: true, // 모든 세션 요청에 쿠키 포함
        xsrfCookieName: "XSRF-TOKEN", // CSRF 토큰 쿠키 이름
        xsrfHeaderName: "X-XSRF-TOKEN" // CSRF 토큰 헤더 이름
});
api.interceptors.request.use(config => {
    // 1. 쿠키에서 직접 XSRF-TOKEN 읽기
    const csrfToken = Cookies.get("XSRF-TOKEN");
    console.log("요청 인터셉터 - CSRF 토큰:", csrfToken);

    // 2. 토큰이 존재하고, 요청 메서드가 보호 대상(POST, PUT, DELETE 등)일 때 헤더 추가
    if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    
    return config;
}
, error => {
    return Promise.reject(error);
});
export default api;
