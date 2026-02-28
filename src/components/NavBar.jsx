import { Link } from "react-router-dom";

export default function NavBar({user, isLoggedIn, handleLogout}){
    return (
    <nav className="navBar">
      <div className="logo">
        <Link to="/" className="navLink">Invest72</Link>
      </div>
      <ul className="navLinks">
        <li><Link to="/" className="navLink">홈</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/products" className="navLink">상품</Link></li>
                        <li><strong className="userName">{user?.nickname}</strong></li>
                        <li><button className="buttonDanger" onClick={handleLogout}>로그아웃</button></li>
                    </>
                ) : (
          <li><Link to="/login" className="navLink">로그인</Link></li>
                )}
            </ul>
        </nav>
    );
}