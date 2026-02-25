


export default function LoginButtons() {
    function handleLogin(provider){
        // 백엔드 서버의 OAuth2 엔드포인트로 이동
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    }
    return (
        <div className="actions">
            <button className="buttonPrimary" onClick={()=>handleLogin("google")}>
                구글로 시작하기
            </button>
        </div>
    )
}