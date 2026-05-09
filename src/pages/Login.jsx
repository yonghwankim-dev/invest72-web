import { useSearchParams } from "react-router-dom";
import LoginButtons from "../components/LoginButtons";

export default function Login(){
    const [searchParams] = useSearchParams();
    const error = searchParams.get("error");

    return (
        <div className="pageContainer">
            <div className="card cardSm">
            <h1 className="pageTitle">로그인 페이지</h1>
            {error && (
                <div className="errorMessageBox">
                    <strong>로그인 실패:</strong> {error}
                </div>
            )}
            <LoginButtons/>
            </div>
        </div>
    );
}