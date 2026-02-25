import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import useAuth from './hooks/useAuth';
import CreateFinancialProduct from './pages/CreateFinancialProduct';
import DetailedFinancialProduct from './pages/DetailedFinancialProduct';

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
          <Route path="/login" element={<Login/>}/>
          <Route path="/products/create" element={<CreateFinancialProduct/>}/>
          <Route path="/products/detailed" element={<DetailedFinancialProduct/>}/>
          <Route path="/products/edit" element={<CreateFinancialProduct isEdit={true}/>}/> 
      </Routes>
    </>
  );
}

export default App;
