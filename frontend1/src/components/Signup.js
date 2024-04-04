import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, FormContainer, FormGroup, Label, Input, Button } from './StyledComponents';

const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear errors when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: 'Enter a valid email address.' }));
      valid = false;
    }

    if (!formData.password || !isPasswordValid(formData.password)) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.' }));
      valid = false;
    }

    if (!valid) return;

    try {
      await axios.post('http://localhost:3000/signup', formData);
      console.log('Signup successful');
      // Navigate to the login page after successful signup
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err.response.data.message);
      if (err.response.data.message === 'User already exists') {
        setErrors((prev) => ({ ...prev, email: 'User already exists, please sign in to continue.' }));
      }
    }
  };

  const isPasswordValid = (password) => {
    // Password validation rules
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    return passwordRegex.test(password);
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
          {errors.email && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.email}</p>}
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
          {errors.password && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '5px' }}>{errors.password}</p>}
        </FormGroup>
        <FormGroup>
          <Button type="submit" style={{ marginBottom: '10px' }}>Sign Up</Button>
          <div style={{ marginTop: '10px' }}>
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </FormGroup>
      </FormContainer>
    </Container>
  );
};

export default Signup;
