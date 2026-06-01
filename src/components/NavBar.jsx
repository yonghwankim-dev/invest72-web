import { Link } from "react-router-dom";
import "../NavBar.css";

function UserNavigation({user, handleLogout}){
  return (
    <>
        <div className="navLinksContainer">
          <ul className="navLinks">
            <li><Link to="/products" className="navLink">상품</Link></li>
          </ul>
        </div>

        <ul className="navLinks">
          <li><strong className="userName">{user?.nickname}</strong></li>
          <li><button className="buttonDanger" onClick={handleLogout}>로그아웃</button></li>
        </ul>
    </>
  );
}

function GuestNavigation(){
  return (
    <ul className="navLinks">
      <li><Link to="/login" className="navLink">로그인</Link></li>
    </ul>
  );
}

export default function NavBar({ user, isLoggedIn, isAuthLoading, handleLogout }){
    const content = isLoggedIn ? <UserNavigation user={user} handleLogout={handleLogout}/> : <GuestNavigation/>

    return (
      <nav className="navBar">
        {/* 공통 영역 */}
        <div className="logo">
          <Link to="/" className="navLink">Invest72</Link>
        </div>

        {/* 인증 및 미인증 영역 */}
        {content}
      </nav>
  );
}