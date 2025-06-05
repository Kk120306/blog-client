import { createContext, useState, useEffect } from 'react';
import api from '../utils/axios';
import { toast } from "sonner";


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async () => {
        try {
            const response = await api.get("user/data");
            setUser(response.data.authorizedData);
            setIsAuthenticated(true);
        } catch (error) {
            if (error.response?.status !== 403) {
                console.error(error.response?.data?.error || error.message);
            }
        }
    }

    const logout = async () => {
        try {
            await api.post("user/signout");
        } catch (error) {
            console.error(error.response?.data?.error || error.message);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            toast.success('Logged out successfully');
        }
    }

    useEffect(() => {
        login();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}