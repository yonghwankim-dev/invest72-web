import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import FinancialProduct from './pages/FianancialProduct';
import { useEffect } from 'react';
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent(){
  const { user, getUser, isLoggedIn, setIsLoggedIn, isAuthLoading, setIsAuthLoading, handleLogout } = useAuth();

  useEffect(()=>{
    // 로그인 성공후 인증 성공 작업 처리
    const initializeAuth = async ()=>{
      const isLoginSuccess = parseLoginParam() === "success";

      if(isLoginSuccess){
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        // 주소창에서 login 쿼리 파라미터를 제거
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // 사용자 프로필 정보가 캐싱되어 있다면 API를 호출하지 않음
      if(localStorage.getItem("user_profile")){
        setIsAuthLoading(false);
        return;
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
  }, [getUser, setIsLoggedIn, setIsAuthLoading]);

  // 인증정보가 확인되기 전에는 아무런 UI도 노출하지 않고 전역 로딩만 보여줌
  if(isAuthLoading){
    return renderSpinner();
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

function parseLoginParam(){
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("login");
}

function renderSpinner(){
  return (
      <div className="globalSplashScreen">
        <div className="spinner"></div>
        <p>Invest72 서비스를 준비 중입니다...</p>
      </div>
  );  
}

export default App;
