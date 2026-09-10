import { Router } from 'express'
import { findProductById, isValidProductId, listProducts } from '../models/productModel.js'
import { findVendorById } from '../models/userModel.js'
import { buildPagination, parsePagination } from '../utils/catalogUtils.js'

const router = Router()

async function serializeCatalogProduct(product) {
  if (!product) return null
  const vendor = product.vendorId ? await findVendorById(product.vendorId) : null
  return {
    ...product,
    _id: product._id.toString(),
    vendorId: product.vendorId?.toString() || null,
    ...(vendor ? { vendor: { businessName: vendor.vendorOnboarding?.businessName || vendor.name || 'Kwick vendor' } } : {}),
  }
}

async function listHandler(req, res, category) {
  const pagination = parsePagination(req.query)
  if (pagination.error) return res.status(400).json({ success: false, message: pagination.error })

  const search = typeof req.query.q === 'string' ? req.query.q.trim() : ''
  if (req.path === '/search' && !search) {
    return res.status(400).json({ success: false, message: 'q is required for product search' })
  }

  try {
    const result = await listProducts({ ...pagination, category, search })
    return res.json({
      success: true,
      data: await Promise.all(result.data.map(serializeCatalogProduct)),
      pagination: buildPagination(pagination.page, pagination.limit, result.total),
    })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load products' })
  }
}

router.get('/', (req, res) => listHandler(req, res))
router.get('/category/:category', (req, res) => listHandler(req, res, req.params.category))
router.get('/search', (req, res) => listHandler(req, res))

router.get('/:id', async (req, res) => {
  if (!isValidProductId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' })
  }

  try {
    const product = await findProductById(req.params.id)
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' })
    return res.json({ success: true, data: await serializeCatalogProduct(product) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load product' })
  }
})

export default router
