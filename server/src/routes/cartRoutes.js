import { Router } from 'express'
import { requireAuth } from '../middleware/authMiddleware.js'
import { findProductById, isValidProductId } from '../models/productModel.js'
import {
  clearCartForUser,
  createCartForUser,
  findCartByUserId,
  saveCartItems,
  serializeCart,
} from '../models/cartModel.js'

const router = Router()
router.use(requireAuth)

function getUserId(req) {
  return req.user._id
}

function parseQuantity(value) {
  return Number.isInteger(value) && value > 0 ? value : null
}

function productToCartItem(product, quantity, existingItem = null) {
  return {
    productId: product._id,
    quantity,
    price: Number(product.price || 0),
    name: product.name || '',
    image: product.image || null,
    emoji: product.emoji || product.e || '📦',
    unit: product.unit || product.weight || '',
    category: product.category || '',
    addedAt: existingItem?.addedAt || new Date(),
    updatedAt: new Date(),
  }
}

function hasStock(product, quantity) {
  return !Number.isInteger(product.stock) || quantity <= product.stock
}

async function getCartResponse(userId) {
  return serializeCart(await findCartByUserId(userId))
}

router.get('/', async (req, res) => {
  try {
    return res.json({ success: true, data: await getCartResponse(getUserId(req)) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load cart' })
  }
})

router.get('/count', async (req, res) => {
  try {
    const cart = await findCartByUserId(getUserId(req))
    const count = (cart?.items || []).reduce((total, item) => total + item.quantity, 0)
    return res.json({ success: true, data: { count } })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load cart count' })
  }
})

router.post('/items', async (req, res) => {
  const { productId, quantity } = req.body || {}
  const parsedQuantity = parseQuantity(quantity)
  if (!productId || !parsedQuantity) {
    return res.status(400).json({ success: false, message: 'productId and a positive integer quantity are required' })
  }
  if (!isValidProductId(productId)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' })
  }

  try {
    const product = await findProductById(productId)
    if (!product) return res.status(404).json({ success: false, message: 'Product not found or unavailable' })

    const userId = getUserId(req)
    const cart = await createCartForUser(userId)
    const existingItem = cart.items.find((item) => item.productId.toString() === product._id.toString())
    const nextQuantity = (existingItem?.quantity || 0) + parsedQuantity
    if (!hasStock(product, nextQuantity)) return res.status(400).json({ success: false, message: `Only ${product.stock} item${product.stock === 1 ? '' : 's'} available` })
    const items = existingItem
      ? cart.items.map((item) => item.productId.toString() === product._id.toString()
        ? productToCartItem(product, nextQuantity, item)
        : item)
      : [...cart.items, productToCartItem(product, parsedQuantity)]

    const updatedCart = await saveCartItems(userId, items)
    return res.status(200).json({ success: true, data: serializeCart(updatedCart) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to add item to cart' })
  }
})

router.patch('/items/:productId', async (req, res) => {
  const { quantity } = req.body || {}
  const parsedQuantity = parseQuantity(quantity)
  if (!parsedQuantity) {
    return res.status(400).json({ success: false, message: 'quantity must be a positive integer' })
  }
  if (!isValidProductId(req.params.productId)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' })
  }

  try {
    const product = await findProductById(req.params.productId)
    if (!product) return res.status(404).json({ success: false, message: 'Product not found or unavailable' })
    if (!hasStock(product, parsedQuantity)) return res.status(400).json({ success: false, message: `Only ${product.stock} item${product.stock === 1 ? '' : 's'} available` })

    const userId = getUserId(req)
    const cart = await findCartByUserId(userId)
    const existingItem = cart?.items.find((item) => item.productId.toString() === product._id.toString())
    if (!existingItem) return res.status(404).json({ success: false, message: 'Cart item not found' })

    const items = cart.items.map((item) => item.productId.toString() === product._id.toString()
      ? productToCartItem(product, parsedQuantity, item)
      : item)
    const updatedCart = await saveCartItems(userId, items)
    return res.json({ success: true, data: serializeCart(updatedCart) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to update cart item' })
  }
})

router.delete('/items/:productId', async (req, res) => {
  if (!isValidProductId(req.params.productId)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' })
  }

  try {
    const userId = getUserId(req)
    const cart = await findCartByUserId(userId)
    const items = (cart?.items || []).filter((item) => item.productId.toString() !== req.params.productId)
    const updatedCart = cart ? await saveCartItems(userId, items) : null
    return res.json({ success: true, data: serializeCart(updatedCart) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to remove cart item' })
  }
})

router.delete('/', async (req, res) => {
  try {
    await clearCartForUser(getUserId(req))
    return res.json({ success: true, data: serializeCart(null) })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to clear cart' })
  }
})

export default router
