import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResetPassword from './ResetPassword';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    console.log('Received token:', token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/forgot-password', { email });
      setMessage('OTP sent to your email for password reset');
      setOtpSent(true);
      setToken(response.data.token);
    } catch (err) {
      console.error('Error:', err.response.data.message);
      setMessage('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {!otpSent ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <ResetPassword email={email} token={token} />
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
