import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import FinancialProduct from './pages/FianancialProduct';
function App() {
  return <AppContent />
}

function AppContent(){
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/products" element={<FinancialProduct />}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
