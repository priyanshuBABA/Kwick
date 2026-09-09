import { useState } from 'react'
import { ArrowLeft, Bike, LoaderCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function BecomeRider() {
  const navigate = useNavigate()
  const { addRole, roles, switchRole } = useAuth()
  const [vehicleType, setVehicleType] = useState('bike')
  const [city, setCity] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (roles.includes('rider')) {
        switchRole('rider')
      } else {
        await addRole('rider', { vehicleType, city, acceptedTerms })
        switchRole('rider')
      }
      navigate('/rider', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-900 sm:px-6">
    <form onSubmit={submit} className="mx-auto max-w-lg rounded-[2rem] bg-white p-7 shadow-2xl sm:p-10">
      <button type="button" onClick={() => navigate('/customer/profile')} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900">
        <ArrowLeft size={16} /> Back to profile
      </button>
      <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600"><Bike size={28} /></div>
      <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">Rider onboarding</p>
      <h1 className="mt-2 text-3xl font-black">Become a Kwick Rider</h1>
      <p className="mt-3 text-sm leading-6 text-slate-500">Use your existing Kwick account to deliver orders. Your customer role will remain available.</p>
      {error && <p role="alert" className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
      <label className="mt-8 block text-sm font-bold">Vehicle type<select value={vehicleType} onChange={(event) => setVehicleType(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3"><option value="bike">Bike</option><option value="scooter">Scooter</option><option value="car">Car</option></select></label>
      <label className="mt-5 block text-sm font-bold">Operating city<input required value={city} onChange={(event) => setCity(event.target.value)} placeholder="e.g. Munger" className="mt-2 w-full rounded-xl border border-slate-200 p-3" /></label>
      <label className="mt-5 flex items-start gap-3 text-sm text-slate-600"><input required type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-1" />I confirm that my rider details are accurate and I agree to the rider onboarding terms.</label>
      <button disabled={loading} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60">{loading && <LoaderCircle className="animate-spin" size={18} />}Continue as rider</button>
    </form>
  </main>
}
