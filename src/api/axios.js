import axios from "axios";

const HOST = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
const api = axios.create({
        baseURL: HOST,
        withCredentials: true, // 모든 세션 요청에 쿠키 포함 
        xsrfCookieName: "XSRF-TOKEN", // 서버에서 발급하는 CSRF 토큰 쿠키 이름
        xsrfHeaderName: "X-XSRF-TOKEN", // 요청 헤더에 CSRF 토큰을 첨부할 때 사용할 헤더 이름
        withXSRFToken: true // CSRF 토큰 자동 첨부 활성화
    });
export default api;
