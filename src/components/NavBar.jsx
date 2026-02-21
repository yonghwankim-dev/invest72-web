import { Link } from "react-router-dom";

export default function NavBar({user, isLoggedIn, handleLogout}){
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>Invest72</Link>
            </div>
            <ul style={styles.navLinks}>
                <li><Link to="/" style={styles.link}>홈</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><strong>{user?.nickname}</strong></li>
                        <li><button onClick={handleLogout} style={styles.logoutBtn}>로그아웃</button></li>
                    </>
                ) : (
                    <li><Link to="/login" style={styles.link}>로그인</Link></li>
                )}
            </ul>
        </nav>
    );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: { fontSize: '1.5rem', fontWeight: 'bold' },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    alignItems: 'center',
    gap: '20px',
  },
  link: { color: '#fff', textDecoration: 'none' },
  userInfo: { fontSize: '0.9rem', color: '#ccc' },
  logoutBtn: {
    backgroundColor: '#ff4b2b',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};