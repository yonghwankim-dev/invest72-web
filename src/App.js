import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import useAuth from './hooks/useAuth';
import Home from './pages/Home';
import FinancialProduct from './pages/FianancialProduct';
import CalculationPage from './pages/CalculationPage';
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent(){
  const { user, isLoggedIn, handleLogout } = useAuth();
  return (
    <>
      <NavBar user={user} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/products" element={isLoggedIn ? <FinancialProduct /> : <Login />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/calculation" element={<CalculationPage />}/>
      </Routes>
    </>
  );
}

export default App;
