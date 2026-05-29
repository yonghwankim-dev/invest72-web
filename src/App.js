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

// async function initializeAuth(getUser){
//   if(checkLoginSuccess()){
//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.removeItem("user_profile");
//     deleteLoginParams();
//   }

//   if(hasLoggedInFlag()){
//     await getUser();
//   }
// }

// function deleteLoginParams(){
//   const params = new URLSearchParams(window.location.search);
//   params.delete("login");
//   const newSearch = params.toString();
//   const newPath = window.location.pathname + (newSearch ? `${newSearch}` : "");
//   window.history.replaceState({}, document.title, newPath);
// }

// function checkLoginSuccess(){
//   return parseLoginParam() === "success";
// }

// function hasLoggedInFlag(){
//   return localStorage.getItem("isLoggedIn") === "true"
// }

// function parseLoginParam(){
//   const searchParams = new URLSearchParams(window.location.search);
//   return searchParams.get("login");
// }

export default App;
