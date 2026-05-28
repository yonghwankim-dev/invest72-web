import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import FinancialProduct from './pages/FianancialProduct';
import { useEffect } from 'react';
import Spinner from './components/Spinner';
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent(){
  const { user, getUser, isLoggedIn, isAuthLoading, handleLogout } = useAuth();

  useEffect(()=>{
    // 로그인 성공후 인증 성공 작업 처리
    initializeAuth(getUser);
  }, [getUser]);

  // 인증정보가 확인되기 전에는 아무런 UI도 노출하지 않고 전역 로딩만 보여줌
  if(isAuthLoading){
    return <Spinner/>
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

async function initializeAuth(getUser){
  if(checkLoginSuccess()){
    localStorage.setItem("isLoggedIn", "true");
    localStorage.removeItem("user_profile");
    // 주소창에서 login 쿼리 파라미터를 제거
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // 로컬 스트로지에 로그인 플래그가 있거나 로그인 리다이렉트한 유저만 사용자 프로필 정보를 조회함
  if(hasLoggedInFlag()){
    await getUser();
  }
}

function checkLoginSuccess(){
  return parseLoginParam() === "success";
}

function hasLoggedInFlag(){
  return localStorage.getItem("isLoggedIn") === "true"
}

function parseLoginParam(){
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("login");
}

export default App;
