import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Spinner from './components/Spinner';
import useAuth from './hooks/useAuth';
import FinancialProductListPage from './pages/FinancialProductListPage';
import FinancialProductCreatePage from './pages/FinancialProductCreatePage';
import FinancialProductDetailedPage from './pages/FinancialProductDetailedPage';
import FinancialProductEditPage from './pages/FinancialProductEditPage';
function App() {
  
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent(){
  const { user, isLoggedIn, isAuthLoading, handleLogout } = useAuth();

  if(isAuthLoading){
    return <Spinner/>
  }

  return (
    <>
      <NavBar user={user} isLoggedIn={isLoggedIn} isAuthLoading={isAuthLoading} handleLogout={handleLogout}/>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login/>}/>

          {/* 🚨 금융 상품 관련 페이지 단위 라우팅 구성 */}
          <Route path="/products" element={isLoggedIn ? <FinancialProductListPage /> : <Login/>}/>
          <Route path="/products/new" element={isLoggedIn ? <FinancialProductCreatePage/> : <Login/>}/>
          <Route path="/products/:id" element={isLoggedIn ? <FinancialProductDetailedPage/> : <Login/>}/>
          <Route path="/products/:id/edit" element={isLoggedIn ? <FinancialProductEditPage/> : <Login/>}/>
      </Routes>
    </>
  );
}

export default App;
