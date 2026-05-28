import { useCallback, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function useAuth(){
    const [user, setUser] = useState(()=>{
        const isLoginSuccess = new URLSearchParams(window.location.search).get("login") === "success";
        if(isLoginSuccess){
            return null;
        }
        const cachedUser = localStorage.getItem("user_profile");
        if(cachedUser){
            try{
                return JSON.parse(cachedUser);
            }catch(error){
                console.error("캐싱된 사용자 프로필 파싱 실패:", error);
            }
        }
        return null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState(()=>{
        const isLoginSuccess = new URLSearchParams(window.location.search).get("login") === "success";
        const hasLocalFlag = localStorage.getItem("isLoggedIn") === "true";
        return isLoginSuccess || hasLocalFlag;
    });
    const [isAuthLoading, setIsAuthLoading] = useState(()=>{
        const isLoginSuccess = new URLSearchParams(window.location.search).get("login") === "success";
        if(isLoginSuccess){
            return true;
        }
        return isLoggedIn && !localStorage.getItem("user_profile");
    });
    
    const navigate = useNavigate();

    // 로그아웃 처리 함수
    const handleLogout = useCallback(async () => {
        try{
            await api.post("/api/v1/auth/logout"); // 서버에 로그아웃 요청
        }catch(error){
            console.error("로그아웃 실패:", error);
        }finally{
            // 서버 요청이 실패하더라도 클라이언트 상태는 초기화하여 로그아웃 처리
            setUser(null);
            setIsLoggedIn(false);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user_profile");
            navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
        }        
    }, [navigate]);

    // 사용자 프로필 정보 조회
    const getUser = useCallback(async() => {
        try{
            const response = await api.get("/api/v1/users/me", {
                withCredentials: true // 세션 쿠키 포함
            });
            setUser(response.data);
            localStorage.setItem("user_profile", JSON.stringify(response.data));
        }catch(error){
            console.error("사용자 프로필 정보 조회 실패", error);
            if(error.status === 401 || error.status === 403){
                setUser(null);
                setIsLoggedIn(false);
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("user_profile");
            }
        }finally{
            setIsAuthLoading(false);
        }
    }, []);
  return { user, setUser, getUser, isLoggedIn, setIsLoggedIn, isAuthLoading, setIsAuthLoading, handleLogout };
}