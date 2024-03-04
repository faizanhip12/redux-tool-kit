import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ roles, props,children }) => {
  const { user } = useAuth();

  console.log(" user khan ", user )
  console.log(" roles khan ", roles )
  console.log(" props khan ", props )
  console.log(" children  khan ", children  )

  // Check if user is authenticated and has required role
  const isAuthenticated = user !== null;
  const hasRequiredRole = roles ? roles.includes(user?.role) : true;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!hasRequiredRole) {
    return <Navigate to="/" />;
  }

  // Render the Route component with the given props
  // return <Route {...props} />;
  return children;
};

export default PrivateRoute;