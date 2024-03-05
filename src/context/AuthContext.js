// AuthContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';

// Create a context
const AuthContext = createContext();

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

    const login = (user) => {
        setUserData(user);
    };

    const logout = () => {
        setUserData(null);
    };

    const seetUser = (user) => {
        setUserData(user);
    };
    useEffect(() => {
        // Your authentication logic here...
        setLoading(false); // Set loading to false after authentication check
    }, []);
    console.log("userData", userData);

    return (
        <AuthContext.Provider value={{ seetUser, login, logout,userData,loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;