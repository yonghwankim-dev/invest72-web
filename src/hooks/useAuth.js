import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function useAuth(){
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
        }        
    }, [navigate]);

    // 로그인 성공시 호출될 함수
    const checkAuthStatus = useCallback(async() => {
        try{
            const response = await api.get("/api/v1/users/me", {
                withCredentials: true // 세션 쿠키 포함
            });
            setUser(response.data);
            setIsLoggedIn(true);
        }catch(error){
            console.error(error);
            // 인증 실패 시 상태 초기화
            setUser(null);
            setIsLoggedIn(false);
        }
    }, []);

  // 앱 초기 로드시 세션이 살아있는지 확인
    useEffect(()=>{
        checkAuthStatus();
    }, [checkAuthStatus]);

  return { user, isLoggedIn, checkAuthStatus, handleLogout };
}