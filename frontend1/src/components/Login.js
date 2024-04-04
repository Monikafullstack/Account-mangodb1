import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, FormContainer, FormGroup, Label, Input, Button, Link } from './StyledComponents';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Invalid email format');
      return;
    }

    try {
      // Check if the email is signed up
      const res = await axios.post('http://localhost:3000/login', formData);
      console.log('Login successful:', res.data);
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMessage('Incorrect password. Please try again.');
      } else if (err.response && err.response.status === 404) {
        setErrorMessage('User not found. Please sign up.');
      } else {
        console.error('Login failed:', err.message);
      }
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
          {errorMessage && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errorMessage}</p>}
        </FormGroup>
        <FormGroup>
          <Button type="submit">Sign In</Button>
          <span style={{ marginLeft: '10px' }}></span> {/* Spacing */}
          <Button type="button" onClick={handleSignupClick}>Sign Up</Button>
          <Link to="/forgot-password" style={{ marginLeft: '10px' }} onClick={handleForgotPasswordClick}>Forgot Password?</Link>
        </FormGroup>
      </FormContainer>
    </Container>
  );
};

export default Login;
