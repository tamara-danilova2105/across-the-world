import Cookies from "js-cookie";
import { ReactNode, useState, createContext, useEffect } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextProps {
    isAuth: boolean;
    logout: () => void;
    login: (token: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuth: false,
    logout: () => { },
    login: () => { }
});

export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;

    const [isAuth, setIsAuth] = useState<boolean>(!!Cookies.get('authToken'));

    useEffect(() => {
        const handleCookieChange = () => {
            const token = Cookies.get('authToken');
            setIsAuth(!!token);
        };

        window.addEventListener('storage', handleCookieChange);

        handleCookieChange();

        return () => {
            window.removeEventListener('storage', handleCookieChange);
        };
    }, []);

    const login = (token: string) => {
        Cookies.set('authToken', token, { expires: 1 });
        setIsAuth(true);
    };

    const logout = () => {
        Cookies.remove('authToken');
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
}