// ProtectedRoute.js
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("verdure_token");
            const user = localStorage.getItem("user");
            
            if (token && user) {
                // Verify token is not expired (basic check)
                try {
                    const tokenData = JSON.parse(atob(token.split('.')[1]));
                    const currentTime = Date.now() / 1000;
                    
                    if (tokenData.exp > currentTime) {
                        setIsAuthenticated(true);
                    } else {
                        // Token expired, clear storage
                        localStorage.removeItem("verdure_token");
                        localStorage.removeItem("user");
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    // Invalid token, clear storage
                    localStorage.removeItem("verdure_token");
                    localStorage.removeItem("user");
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
            
            setIsLoading(false);
        };

        checkAuth();
    }, [location]);

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '18px',
                color: '#045d1f'
            }}>
                Verifying authentication...
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
