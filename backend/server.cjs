const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/Nebulixus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define user schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Generate a secure JWT secret key
const generateJWTSecretKey = () => {
  return crypto.randomBytes(32).toString('hex'); // Generate a random string of 32 bytes
};

// JWT secret key
const JWT_SECRET_KEY = generateJWTSecretKey();

console.log('JWT Secret Key:', JWT_SECRET_KEY);

// Function to generate OTP
const generateOTP = () => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Encrypt the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    // Login successful
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Route to handle password reset requests
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate OTP and create JWT token
    const otp = generateOTP();
    const token = jwt.sign({ email, otp }, JWT_SECRET_KEY, { expiresIn: '365d' });

    // Send OTP to user's email make sure to use service mail credentials here
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'use your mail',
        pass: 'use you password',
      },
    });

    const mailOptions = {
      from: 'your service mail',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'OTP sent to email for password reset', token });
  } catch (err) {
    console.error('Error in password reset:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Route to handle password reset
app.post('/reset-password', async (req, res) => {
  const { email, otp, password, token} = req.body;

  try {
    // Verify OTP
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    if (decoded.email !== email || decoded.otp !== otp) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Encrypt the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset is successful login to Continue' });
  } catch (err) {
    console.error('Error in password reset:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
