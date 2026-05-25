import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import FinancialProduct from './pages/FianancialProduct';
import { useEffect, useState } from 'react';
import api from './api/axios';
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent(){
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { handleLogout } = useAuth();
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(()=>{
    const initializeAuth = async ()=>{
      try{
        // 사용자 프로필 정보 요청
        const response = await api.get("/api/v1/users/me");
        setUser(response.data);
        setIsLoggedIn(true);
      }catch(error){
        console.error("인증 실패 또는 비로그인 상태", error);
        setIsLoggedIn(false);
        setUser(null);
      }finally{
        // 성공하든 실패하든, 백엔드 서버 응답이 완료되면 로딩을 해제
        setIsAuthLoading(false);
      }
    };
    initializeAuth();
  }, []);

  // 인증정보가 확인되기 전에는 아무런 UI도 노출하지 않고 전역 로딩만 보여줌
  if(isAuthLoading){
    return (
      <div className="globalSplashScreen">
        <div className="spinner"></div>
        <p>Invest72 서비스를 준비 중입니다...</p>
      </div>
    );
  }

  return (
    <>
      <NavBar user={user} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={isLoggedIn ? <FinancialProduct /> : <Login />}/>
          <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
