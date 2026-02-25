import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import useAuth from './hooks/useAuth';

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
      </Routes>
    </>
  );
}

export default App;
