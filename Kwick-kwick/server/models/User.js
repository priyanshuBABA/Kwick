import mongoose from 'mongoose';
import { normalizeRoles } from '../utils/roleUtils.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    isVerified: { type: Boolean, default: false },
    roles: {
      type: [String],
      default: ['customer'],
      set: normalizeRoles,
      get: normalizeRoles,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
