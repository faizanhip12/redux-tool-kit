import React, { useEffect,useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthProvider, useAuth } from './context/AuthContext';
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import Test from './components/Test';
import Post from "./components/Post";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from './route/PrivateRoute'
import { useParams, useNavigate } from 'react-router-dom';

function App() {
  const { userData, loading } = useAuth() ?? {};


  // localStorage.setItem('user',userData)

  // useEffect(() => {
  //   // You can perform any logic here based on userData
  //   console.log("userData", userData);
  //   localStorage.setItem('user',userData)
  // }, [userData])

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/tutorials"
              element={
                <PrivateRoute roles={['admin']}>
                  <TutorialsList />
                </PrivateRoute>
              }
            />
            {/* Add more routes here */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Navigation component to handle rendering based on authentication status
function Navigation() {
  const { userData } = useAuth() ?? {};

  const [user, setUser] = useState();
  let navigate = useNavigate();


  console.log('typeof userData)typeof userData)typeof userData)', typeof userData);


  useEffect(() => {
    // localStorage.setItem("userData", JSON.stringify(userData));


    if (localStorage.getItem("userData")) {
      setUser(JSON.parse(localStorage.getItem("userData")))
      console.log("localStorage.getItem", userData)
    } else if (!localStorage.getItem("userData") && userData) {
      const data = localStorage.setItem("userData", JSON.stringify(userData))
      userData = JSON.parse(data)
      console.log("localStorage.getItem", userData)
    } else if (!userData && localStorage.getItem("userData")) {
      console.log("!userData && localStorage.getItem(", userData)
      setUser(JSON.parse(localStorage.getItem("userData")))
      console.log("localStorage.getItem", userData)
    }
   


  }, [])

  const logOut =()=>{
    localStorage.removeItem("userData")
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a href="/tutorials" className="navbar-brand">
        react js
      </a>
      <div className="navbar-nav mr-auto">
        {user ? (
          <>
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" onClick={logOut}>
                logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
          </>
        )}
      </div>
    </nav>
  );
}

export default App;


















