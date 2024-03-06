import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const PrivateRoute = ({ roles, children }) => {
  let { userData } = useAuth();

  if (!userData && localStorage.getItem("userData")) {
    userData = JSON.parse(localStorage.getItem("userData"))
  }
  else {
    const data = localStorage.setItem("userData", JSON.stringify(userData))
    // userData = data
     userData = JSON.parse(localStorage.getItem("userData"))

  }

  console.log(" user khan ", userData)
  console.log(" roles khan ", roles)
  // console.log(" props khan ", props )
  console.log(" children  khan ", children.props)

  // Check if user is authenticated and has required role
  const isAuthenticated = userData !== null;
  console.log("isAuthenticatedisAuthenticatedisAuthenticatedisAuthenticated",isAuthenticated)
  console.log("userDatauserDatauserDatauserData",userData)
  const hasRequiredRole = roles ? roles.includes(userData?.role) : true;
//  const hasRequiredRole = true
  console.log("hasRequiredRole",hasRequiredRole)

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