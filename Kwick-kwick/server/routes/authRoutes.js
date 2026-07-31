import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

console.log('Loading authRoutes...');
const router = express.Router();

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginUser
);

router.post('/logout', logoutUser);

// Mock login endpoint to test role-based flows when DB is unavailable
router.post('/mock-login', (req, res) => {
    const { email } = req.body || {};
    // Simple rules to emulate different role sets
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    let roles = ['customer'];
    if (email.includes('vendor')) roles = ['vendor'];
    if (email.includes('rider')) roles = ['rider'];
    if (email.includes('multi')) roles = ['customer', 'vendor', 'rider'];

    const user = {
      _id: 'mock-id-' + Math.random().toString(36).slice(2, 9),
      name: 'Mock User',
      email,
    };

    return res.json({
      success: true,
      token: 'mock-jwt-token',
      user,
      roles,
    });
  });

export default router;
