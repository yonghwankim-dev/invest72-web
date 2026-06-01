import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import FinancialProduct from './pages/FianancialProduct';
import Spinner from './components/Spinner';
import useAuth from './hooks/useAuth';
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
          <Route path="/products" element={isLoggedIn ? <FinancialProduct /> : <Login/>}/>
          <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;
