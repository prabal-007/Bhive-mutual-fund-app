import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Signin";
import Signup from "./pages/Signup";
import { AuthProvider, AuthContext } from "./servises/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={
            <AuthContext.Consumer>
              {({ isLoggedIn }) => isLoggedIn ? <Navigate to="/dashboard" /> : <Login /> }
            </AuthContext.Consumer>} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
          <Route path="/" element={ <AuthContext.Consumer>
                {({ isLoggedIn }) => isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
              </AuthContext.Consumer> }/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;