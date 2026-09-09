import { useState } from 'react'
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const rolePath = (role) => role === 'customer' ? '/customer/home' : role === 'vendor' ? '/service-provider' : `/${role}`

export default function AuthLogin() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const authData = await login(identifier.trim(), password)
      navigate(authData.roles.length > 1 ? '/select-role' : rolePath(authData.roles[0]))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-900 sm:px-6">
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] bg-white shadow-2xl">
      <div className="hidden w-1/2 self-stretch bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-200 p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="text-2xl font-black tracking-tight">Kwick-Kwick</div>
        <div><p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-950/60">One account. Every service.</p><h1 className="max-w-sm text-5xl font-black leading-[0.95] text-slate-950">Move through your day, your way.</h1></div>
        <p className="text-sm font-semibold text-orange-950/70">Customer · Rider · Service Provider · Admin</p>
      </div>
      <form onSubmit={submit} className="w-full max-w-md p-7 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">Welcome back</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight">Sign in to Kwick-Kwick</h2>
        <p className="mt-3 text-sm text-slate-500">Use the same account across every role.</p>
        {error && <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
        <label className="mt-8 block text-sm font-bold">Email or mobile number<div className="relative mt-2"><UserRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required value={identifier} onChange={(event) => setIdentifier(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-orange-500" autoComplete="username" /></div></label>
        <label className="mt-5 block text-sm font-bold">Password<div className="relative mt-2"><LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input required minLength={8} type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 outline-none focus:border-orange-500" autoComplete="current-password" /><button type="button" aria-label="Show or hide password" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
        <div className="mt-4 flex justify-end text-sm"><button type="button" className="font-bold text-orange-600" onClick={() => setError('Password reset is not configured yet.')}>Forgot password?</button></div>
        <button disabled={loading} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60">{loading && <LoaderCircle className="animate-spin" size={18} />}Log in</button>
        <p className="mt-6 text-center text-sm text-slate-500">New to Kwick-Kwick? <Link className="font-bold text-orange-600" to="/register">Create an account</Link></p>
      </form>
    </section>
  </main>
}
