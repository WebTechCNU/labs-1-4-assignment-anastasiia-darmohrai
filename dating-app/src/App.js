import { useState, useEffect } from "react";
import AuthPage from "./components/AuthPage";
import UserManagement from "./components/UserManager";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    const handleAuthSuccess = () => {
        setAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuthenticated(false);
    };

    return (
        <div>
            {authenticated ? (
                <>
                    <div className="d-flex justify-content-end p-2">
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                    <UserManagement />
                </>
            ) : (
                <AuthPage onAuthSuccess={handleAuthSuccess} />
            )}
        </div>
    );
}
