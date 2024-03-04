// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const login = (user) => {
        setUserData(user);
    };

    const logout = () => {
        setUserData(null);
    };

    const setUser = (user) => {
        setUserData(user);
    };
    console.log("userData", userData);

    return (
        <AuthContext.Provider value={{ user: userData, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;