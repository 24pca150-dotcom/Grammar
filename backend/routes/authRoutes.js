const express = require('express');
const router = express.Router();

// Mock Auth logic
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Credentials from the frontend's login-demo context
  if (email === 'admin@grammarhub.com' && password === 'admin123') {
    return res.json({
      access_token: 'mock_jwt_token_admin',
      user: { id: 1, name: 'John Admin', email: 'admin@grammarhub.com', role: 'admin' }
    });
  }
  
  if (email === 'student@example.com' && password === 'password') {
    return res.json({
      access_token: 'mock_jwt_token_student',
      user: { id: 2, name: 'Scholar Doe', email: 'student@example.com', role: 'student' }
    });
  }

  res.status(401).json({ message: 'Invalid credentials. Use provided demo logins.' });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'Registration mocked. Login to start.' });
});

module.exports = router;
