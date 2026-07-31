import mongoose from 'mongoose';

const authSessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    role: { type: String, default: 'customer' },
    action: { type: String, enum: ['login', 'logout'], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const AuthSession = mongoose.model('AuthSession', authSessionSchema);

export default AuthSession;
