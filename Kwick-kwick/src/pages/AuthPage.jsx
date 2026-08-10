import { useEffect, useState } from 'react';
import { Eye, EyeOff, LoaderCircle, Mail, Lock, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const roleOptions = ['customer', 'vendor', 'rider'];

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', roles: ['customer'] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const selectedRole = localStorage.getItem('selected-role');
      if (selectedRole) {
        navigate(`/${selectedRole}/dashboard`, { replace: true });
      } else if (user.roles?.length === 1) {
        navigate(`/${user.roles[0]}/dashboard`, { replace: true });
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = isLogin
        ? await authService.login({ email: formData.email, password: formData.password })
        : await authService.register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            roles: formData.roles,
          });

      if (!result.success) {
        setError(result.message || 'Authentication failed');
        setLoading(false);
        return;
      }

      login(result);
      const roles = result.roles || [];
      const selectedRole = localStorage.getItem('selected-role');
      if (selectedRole && roles.includes(selectedRole)) {
        navigate(`/${selectedRole}/dashboard`, { replace: true });
      } else if (roles.length === 1) {
        navigate(`/${roles[0]}/dashboard`, { replace: true });
      } else {
        navigate('/role-selection', { replace: true });
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff8c3,_#f8fafc_50%,_#eef2ff)] px-4 py-8 flex items-center justify-center">
      <motion.div whileHover={{ scale: 1.01 }} className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_25px_60px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="grid md:grid-cols-2">
          <div className="hidden md:flex flex-col justify-between bg-slate-900 p-10 text-white">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold">
                <ShieldCheck size={16} /> Secure access for every role
              </div>
              <h1 className="mt-8 text-4xl font-black leading-tight">Welcome back to Kwick</h1>
              <p className="mt-4 max-w-md text-sm text-slate-300">Sign in or create an account to unlock customer, vendor, and rider experiences in one place.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 text-sm text-slate-200">
              <p className="font-semibold">Why Kwick auth works well</p>
              <ul className="mt-3 space-y-2 text-slate-300">
                <li>• JWT-based sessions with secure storage</li>
                <li>• Role-aware redirects after login</li>
                <li>• Clean, responsive UI for all screen sizes</li>
              </ul>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-500">Kwick auth</p>
                <h2 className="text-3xl font-black text-slate-900">{isLogin ? 'Sign in' : 'Create account'}</h2>
              </div>
              <button type="button" onClick={() => setIsLogin((prev) => !prev)} className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline">
                {isLogin ? 'Need an account?' : 'Already have one?'}
              </button>
            </div>

            {error ? <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin ? (
                <div className="space-y-4">
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none ring-0" required />
                  </div>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none ring-0" />
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Select role</p>
                    <div className="flex flex-wrap gap-2">
                      {roleOptions.map((role) => (
                        <button key={role} type="button" onClick={() => setFormData((prev) => ({ ...prev, roles: [role] }))} className={`rounded-full px-3 py-2 text-sm font-semibold capitalize ${formData.roles[0] === role ? 'bg-slate-900 text-white' : 'bg-white text-slate-600'}`}>
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm outline-none ring-0" required />
              </div>

              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-12 text-sm outline-none ring-0" required />
                <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-slate-300" />
                  Remember me
                </label>
                <button type="button" className="font-semibold text-amber-600 hover:underline">Forgot password?</button>
              </div>

              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70">
                {loading ? <LoaderCircle className="animate-spin" size={18} /> : <ArrowRight size={18} />}
                {loading ? 'Please wait...' : isLogin ? 'Sign in' : 'Create account'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;
