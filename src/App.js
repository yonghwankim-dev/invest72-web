import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import FinancialProduct from './pages/FianancialProduct';
import { useEffect, useState } from 'react';
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent(){
  const { user, getUser, isLoggedIn, setIsLoggedIn, handleLogout } = useAuth();
  const [isAuthLoading, setIsAuthLoading] = useState(()=>{
      const searchParams = new URLSearchParams(window.location.search);
      const isLoginSuccess = searchParams.get("login") === "success";
      const hasLocalFlag = localStorage.getItem("isLoggedIn") === "true";

      // 로그인 직후 리다이렉트 되었거나 이미 로그인했던 기록이 있다면
      // 서버에서 user 데이터를 완전히 가져올때까지 true로 유지합니다.
      if(isLoginSuccess || hasLocalFlag){
        return true;
      }
      // 처음 들어온 비로그인 유저라면 스피너를 출력하지 않습니다.
      return false;
  });

  useEffect(()=>{
    const initializeAuth = async ()=>{
      // 로그인 성공후 인증 성공 작업 처리
      const searchParams = new URLSearchParams(window.location.search);
      const isLoginSuccess = searchParams.get("login") === "success";

      if(isLoginSuccess){
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        // 주소창에서 login 쿼리 파라미터를 제거
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // 로컬 스트로지에 로그인 플래그가 있거나 로그인 리다이렉트한 유저만 사용자 프로필 정보를 조회함
      if(isLoginSuccess || localStorage.getItem("isLoggedIn") === "true"){
        try{
          await getUser();
        }catch(error){
          console.error("사용자 프로필 정보 조회 실패", error);
          localStorage.removeItem("isLoggedIn");
        }finally{
          // 성공하든 실패하든, 백엔드 서버 응답이 완료되면 로딩을 해제
          setIsAuthLoading(false);
        }
      }else{
        // 비로그인 사용자는 기다릴 유저 데이터가 없기 때문에 즉시 렌더링
        setIsAuthLoading(false);
      }
    };
    initializeAuth();
  }, [getUser, setIsLoggedIn]);

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
