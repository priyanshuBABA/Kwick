import React, { useEffect, useState } from 'react'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import MobileFrame from '../../components/MobileFrame'
import BottomNav from '../../components/BottomNav'
import { useCart } from '../../CartContext'
import { getProductById } from '../../services/catalogApi'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    getProductById(id).then((response) => setProduct(response.data)).catch((requestError) => setError(requestError.message || 'Unable to load product'))
  }, [id])

  const handleAdd = async () => {
    setAdding(true)
    try {
      await addToCart({ ...product, quantity: 1 })
      navigate('/customer/cart')
    } catch (requestError) {
      setError(requestError.message || 'Unable to add product to cart')
      setAdding(false)
    }
  }

  return <MobileFrame><main className="min-h-screen bg-slate-50 p-5 pb-28"><button type="button" onClick={() => navigate(-1)} className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-700"><ArrowLeft className="h-4 w-4" /> Back</button>{error && <p className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}{!product && !error && <p className="text-sm font-semibold text-slate-500">Loading product...</p>}{product && <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="flex h-64 items-center justify-center bg-slate-100">{product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <span className="text-7xl">{product.emoji}</span>}</div><div className="space-y-4 p-5"><div><p className="text-xs font-bold uppercase tracking-widest text-orange-500">{product.category}</p><h1 className="mt-1 text-2xl font-black text-slate-900">{product.name}</h1><p className="mt-2 text-sm text-slate-500">{product.vendor?.businessName || product.vendor?.name || 'Kwick vendor'}</p></div><p className="text-sm leading-6 text-slate-600">{product.description || 'Freshly listed by a Kwick vendor.'}</p><div className="flex items-center justify-between"><span className="text-2xl font-black text-orange-600">₹{product.price}</span><span className="text-sm font-semibold text-slate-500">{product.stock === undefined ? 'Available' : `${product.stock} in stock`}</span></div><button type="button" onClick={handleAdd} disabled={adding || product.stock === 0} className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 font-black text-white disabled:opacity-60"><ShoppingCart className="h-4 w-4" />{adding ? 'Adding...' : product.stock === 0 ? 'Out of stock' : 'Add to cart'}</button></div></div>}</main><BottomNav /></MobileFrame>
}