import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'
import {
  createProduct,
  deleteProductForVendor,
  findProductByIdForVendor,
  listProductsByVendor,
  updateProductForVendor,
} from '../models/productModel.js'

const router = Router()
router.use(requireAuth, requireRole('vendor'))

function normalizeProductInput(body = {}) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const description = typeof body.description === 'string' ? body.description.trim() : ''
  const category = typeof body.category === 'string' ? body.category.trim() : ''
  const price = Number(body.price)
  const stock = Number(body.stock)
  const image = typeof body.image === 'string' ? body.image.trim() : ''
  const isAvailable = body.isAvailable !== false

  if (!name) throw new Error('Product name is required')
  if (!category) throw new Error('Product category is required')
  if (!Number.isFinite(price) || price <= 0) throw new Error('Price must be a positive number')
  if (!Number.isInteger(stock) || stock < 0) throw new Error('Stock must be a non-negative integer')

  return { name, description, category, price, stock, image: image || null, isAvailable, available: isAvailable && stock > 0 }
}

router.get('/', async (req, res) => {
  try {
    return res.json({ success: true, data: await listProductsByVendor(req.user._id) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load vendor products' })
  }
})

router.post('/', async (req, res) => {
  try {
    const input = normalizeProductInput(req.body)
    const product = await createProduct({ ...input, vendorId: req.user._id })
    return res.status(201).json({ success: true, data: product })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message || 'Unable to create product' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const current = await findProductByIdForVendor(req.params.id, req.user._id)
    if (!current) return res.status(404).json({ success: false, message: 'Product not found' })
    const input = normalizeProductInput({ ...current, ...req.body })
    const product = await updateProductForVendor(req.params.id, req.user._id, input)
    return res.json({ success: true, data: product })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message || 'Unable to update product' })
  }
})

router.delete('/:id', async (req, res) => {
  const product = await deleteProductForVendor(req.params.id, req.user._id)
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
  return res.json({ success: true, data: product })
})

export default router