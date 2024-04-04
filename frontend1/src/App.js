import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import ForgotPassword from './components/ForgotPassword'; 
import ResetPassword from './components/ResetPassword';

import styled from 'styled-components';

// Styled Components
const NavBar = styled.nav`
  background-color: #334155;
  padding: 1rem;
`;

const NavBarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLinkStyled = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #93c5fd;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
`;

// Layout Component
const Layout = ({ isAuthenticated, children, handleLogout }) => {
  return (
    <>
      <NavBar>
        <NavBarContainer>
          <h1 style={{ color: 'white', fontWeight: 'bold' }}>Welcome To Our DashBoard</h1>
          <NavLinks>
            <NavLinkStyled to="/home">Home</NavLinkStyled>
            <NavLinkStyled to="/contact">Contact</NavLinkStyled>
            {isAuthenticated ? (
              <NavLinkStyled onClick={handleLogout} to="/login">
                Logout
              </NavLinkStyled>
            ) : (
              <NavLinkStyled to="/login"></NavLinkStyled>
            )}
          </NavLinks>
        </NavBarContainer>
      </NavBar>
      <ContentContainer>
        {children}
      </ContentContainer>
    </>
  );
};

// App Component
function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route path="/home" element={<Layout isAuthenticated={isAuthenticated} handleLogout={handleLogout}><Home /></Layout>} />
        <Route path="/contact" element={<Layout isAuthenticated={isAuthenticated} handleLogout={handleLogout}><Contact /></Layout>} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password/:token" // Define route parameter for token
          element={<ResetPassword />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
      </Routes>
    </Router>
  );
}

export default App;
