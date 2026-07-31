import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import AuthSession from '../models/AuthSession.js';
import generateToken from '../utils/generateToken.js';
import { normalizeRoles, mergeRoles } from '../utils/roleUtils.js';

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, password, phone, roles } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedRoles = normalizeRoles(roles);

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      const nextRoles = mergeRoles(existingUser.roles, normalizedRoles);
      existingUser.roles = nextRoles;
      if (name) existingUser.name = name;
      if (phone) existingUser.phone = phone;
      await existingUser.save();

      return res.status(200).json({
        success: true,
        message: 'Roles updated successfully',
        token: generateToken({ userId: existingUser._id, email: existingUser.email, roles: existingUser.roles }),
        user: {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          phone: existingUser.phone,
          roles: existingUser.roles,
        },
        roles: existingUser.roles,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const savePayload = {
      name: String(name || '').trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone ? String(phone).trim() : '',
      roles: normalizedRoles,
    };

    const user = await User.create(savePayload);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: generateToken({ userId: user._id, email: user.email, roles: user.roles }),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        roles: user.roles,
      },
      roles: user.roles,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: error?.message || 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    await AuthSession.create({
      userId: user._id,
      email: user.email,
      role: (user.roles && user.roles[0]) || 'customer',
      action: 'login',
    });

    res.json({
      success: true,
      token: generateToken({ userId: user._id, email: user.email, roles: user.roles }),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        roles: user.roles,
      },
      roles: user.roles,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error?.message || 'Server error' });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { email, role } = req.body || {};
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await AuthSession.create({
      userId: user._id,
      email: user.email,
      role: role || (user.roles && user.roles[0]) || 'customer',
      action: 'logout',
    });

    res.json({ success: true, message: 'Logout recorded' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: error?.message || 'Server error' });
  }
};
