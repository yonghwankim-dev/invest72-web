


export default function LoginButtons() {
    function handleLogin(provider){
        // 환경 변수에서 베이스 URL을 가져옵니다.
        const baseUrl = process.env.REACT_APP_API_BASE_URL;

        // 백엔드 서버의 OAuth2 엔드포인트로 이동
        window.location.href = `${baseUrl}/oauth2/authorization/${provider}`;
    }
    return (
        <div className="actions">
            <button className="buttonPrimary" onClick={()=>handleLogin("google")}>
                구글로 시작하기
            </button>
        </div>
    )
}