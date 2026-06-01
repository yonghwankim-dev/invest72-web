import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function useAuth(){
    const navigate = useNavigate();
    const isLoginSuccess = new URLSearchParams(window.location.search).get("login") === "success";

    const [isLoggedIn, setIsLoggedIn] = useState(()=>{ 
        const hasLocalFlag = localStorage.getItem("isLoggedIn") === "true";
        return isLoginSuccess || hasLocalFlag;
    });

    const [user, setUser] = useState(()=>{
        if(isLoginSuccess){
            return null;
        }
        const userJson = localStorage.getItem("user_profile");
        try{
            return userJson ? JSON.parse(userJson) : null;
        }catch(error){
            console.error("캐싱된 사용자 프로필 파싱 실패:", error);
        }
    });

    const [isAuthLoading, setIsAuthLoading] = useState(()=>{
        if(isLoginSuccess){
            return true;
        }
        return isLoggedIn && !localStorage.getItem("user_profile");
    });
    
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

    useEffect(()=>{
        if(isLoginSuccess){
            localStorage.setItem("isLoggedIn", "true");
            localStorage.removeItem("user_profile");
        }
        const hasLocalFlag = localStorage.getItem("isLoggedIn") === "true";

        if(isLoginSuccess || (hasLocalFlag && !user)){
            getUser();
        }
        deleteLoginParams();
    }, [getUser, user, isLoginSuccess]);
  return { user, isLoggedIn, isAuthLoading, handleLogout };
}

function deleteLoginParams(){
  const params = new URLSearchParams(window.location.search);
  params.delete("login");
  const newSearch = params.toString();
  const newPath = window.location.pathname + (newSearch ? `${newSearch}` : "");
  window.history.replaceState({}, document.title, newPath);
}