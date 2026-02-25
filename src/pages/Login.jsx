import LoginButtons from "../components/LoginButtons";

export default function Login(){
    return (
        <div className="pageContainer">
            <div className="card cardSm">
            <h1 className="pageTitle">로그인 페이지</h1>
            <LoginButtons/>
            </div>
        </div>
    );
}