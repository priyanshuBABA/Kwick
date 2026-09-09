import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const roles = [['customer', 'Customer'], ['rider', 'Rider'], ['vendor', 'Service Provider']]
const rolePath = (role) => role === 'customer' ? '/customer/home' : role === 'vendor' ? '/service-provider' : `/${role}`

export default function AuthRegister() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '', role: 'customer' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))
  const submit = async (event) => {
    event.preventDefault(); setError(''); setLoading(true)
    try {
      const payload = { ...form, name: form.name.trim(), email: form.email.trim(), mobile: form.mobile.trim() }
      const authData = await register(payload)
      navigate(authData.roles.length > 1 ? '/select-role' : rolePath(authData.roles[0]))
    } catch (requestError) { setError(requestError.message) } finally { setLoading(false) }
  }
  return <main className="min-h-screen bg-slate-950 px-4 py-10"><form onSubmit={submit} className="mx-auto max-w-lg rounded-[2rem] bg-white p-7 shadow-2xl sm:p-10"><p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">Join Kwick-Kwick</p><h1 className="mt-2 text-3xl font-black">Create your account</h1>{error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<input required placeholder="Full name" value={form.name} onChange={update('name')} className="mt-7 w-full rounded-xl border border-slate-200 p-3" /><input type="email" placeholder="Email" value={form.email} onChange={update('email')} className="mt-3 w-full rounded-xl border border-slate-200 p-3" /><input type="tel" placeholder="Mobile number (optional)" value={form.mobile} onChange={update('mobile')} className="mt-3 w-full rounded-xl border border-slate-200 p-3" /><input required minLength={8} type="password" placeholder="Password (8+ characters)" value={form.password} onChange={update('password')} className="mt-3 w-full rounded-xl border border-slate-200 p-3" /><label className="mt-5 block text-sm font-bold">I want to join as<select value={form.role} onChange={update('role')} className="mt-2 w-full rounded-xl border border-slate-200 p-3">{roles.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><button disabled={loading} className="mt-7 w-full rounded-xl bg-slate-950 py-3 font-bold text-white disabled:opacity-60">{loading ? 'Creating account...' : 'Create account'}</button><p className="mt-6 text-center text-sm text-slate-500">Already registered? <Link className="font-bold text-orange-600" to="/login">Log in</Link></p></form></main>
}
