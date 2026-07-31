
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Kwick auth server is running' });
});

// Quick POST test endpoint
app.post('/test', (req, res) => {
  res.json({ success: true, method: 'POST', body: req.body || null });
});

// Direct mock route for testing role-based login flows (always available)
app.post('/api/auth/mock-login', (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });
  let roles = ['customer'];
  if (email.includes('vendor')) roles = ['vendor'];
  if (email.includes('rider')) roles = ['rider'];
  if (email.includes('multi')) roles = ['customer', 'vendor', 'rider'];
  return res.json({ success: true, token: 'mock-jwt-token', user: { _id: 'mock', name: 'Mock', email }, roles });
});

app.use('/api/auth', authRoutes);

// Debug: list registered routes
try {
  const routes = [];
  app._router.stack.forEach((m) => {
    if (m.route && m.route.path) {
      const methods = Object.keys(m.route.methods).join(',').toUpperCase();
      routes.push({ path: m.route.path, methods });
    } else if (m.name === 'router' && m.handle && m.handle.stack) {
      m.handle.stack.forEach((r) => {
        if (r.route && r.route.path) routes.push({ path: r.route.path, methods: Object.keys(r.route.methods).join(',').toUpperCase() });
      });
    }
  });
  console.log('Registered routes:', JSON.stringify(routes, null, 2));
} catch (e) {
  console.log('Could not enumerate routes', e.message);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
