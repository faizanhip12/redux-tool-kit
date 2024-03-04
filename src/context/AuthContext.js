import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children, value }) => {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;