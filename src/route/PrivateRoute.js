import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ roles, ...props }) => {
  const { user } = useAuth();


  // Check if user is authenticated and has required role
  const isAuthenticated = user !== null;
  const hasRequiredRole = roles ? roles.includes(user?.role) : true;

// const mockUser = {
//     id: "1",
//     username: 'exampleUser',
//     role: 'admin' // Assign a static role for testing
//   };
//   console.log("role",roles)
//   console.log("props",props)

  // Check if user is authenticated and has required role


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!hasRequiredRole) {
    return <Navigate to="/" />;
  }



  return <Route {...props} />;
};

export default PrivateRoute;