import React,{useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthProvider } from './context/AuthContext'
import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import Test from './components/Test';
import Post from "./components/Post";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from './route/PrivateRoute'
import { useAuth } from './context/AuthContext'

function App() {
  const { user } = useAuth() ?? {};
  // const history = useHistory();

  useEffect(() => {
    // Redirect to login page if user is not logged in
    // if (!user) {
    //   // history.push("/login");
    // }
  }, [user]);


  return (
    <AuthProvider>
      {console.log("AuthProvider", AuthProvider)}
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            react js
          </a>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li> */}

            {/* {user && (
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li>
            )} */}

            {/* <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/test"} className="nav-link">
              test
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/posts"} className="nav-link">
              posts
            </Link>
          </li> */}
            {user && (
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                signup
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                login
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">

          <Routes>
            {/* <Route path="/" element={<Signup/>} />
          <Route path="/login" element={<Login/>} /> */}
            {/* <Route path="/" element={<TutorialsList/>} />
          <Route path="/tutorials" element={<TutorialsList/>} />
          <Route path="/add" element={<AddTutorial/>} />
          <Route path="/tutorials/:id" element={<Tutorial/>} />
          <Route path="/test" element={<Test/>} />
          <Route path="/posts" element={<Post/>} /> */}
            {/* <PrivateRoute path="/tutorials" element={<TutorialsList/>} roles={['admin']} /> */}
            {/* <PrivateRoute path="/user" element={<UserDashboard />} roles={['user', 'admin']} />
          <PrivateRoute path="/admin" element={<AdminDashboard />} roles={['admin']} />
          <PrivateRoute path="/user" element={<UserDashboard />} roles={['user', 'admin']} /> */}
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* <Route exact path='/' element={<PrivateRoute path="/tutorials" element={<TutorialsList />} roles={['admin']} /> }/> */}
            {/* <PrivateRoute path="/tutorials" element={<TutorialsList />} roles={['admin']} /> */}
            {/* <Route
              path="/tutorials"
              element={
                <PrivateRoute
                  element={<TutorialsList />}
                  roles={['admin']}
                />
              }
            /> */}
            {/* <PrivateRoute path="/tutorials" element={<TutorialsList />} roles={['admin']} /> */}
            <Route
              path="/tutorials"
              element={
                <PrivateRoute roles={['admin']}>
                  <TutorialsList />
                </PrivateRoute>
              }
            />


          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;