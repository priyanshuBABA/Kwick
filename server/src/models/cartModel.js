import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'

export const CART_COLLECTION = 'carts'

function getCollection() {
  return getDB().collection(CART_COLLECTION)
}

export function toUserId(userId) {
  return userId instanceof ObjectId ? userId : new ObjectId(userId)
}

export function serializeCart(cart) {
  const items = (cart?.items || []).map((item) => ({
    id: item.productId.toString(),
    productId: item.productId.toString(),
    name: item.name,
    price: Number(item.price),
    quantity: item.quantity,
    image: item.image || null,
    emoji: item.emoji || '📦',
    unit: item.unit || '',
    category: item.category || '',
  }))

  return {
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0),
  }
}

export async function findCartByUserId(userId) {
  return getCollection().findOne({ userId: toUserId(userId) })
}

export async function createCartForUser(userId) {
  const now = new Date()
  await getCollection().updateOne(
    { userId: toUserId(userId) },
    { $setOnInsert: { userId: toUserId(userId), items: [], createdAt: now, updatedAt: now } },
    { upsert: true },
  )
  return findCartByUserId(userId)
}

export async function saveCartItems(userId, items) {
  await getCollection().updateOne(
    { userId: toUserId(userId) },
    { $set: { items, updatedAt: new Date() } },
  )
  return findCartByUserId(userId)
}

export async function clearCartForUser(userId) {
  await getCollection().deleteOne({ userId: toUserId(userId) })
  return null
}

export async function ensureCartIndexes() {
  await getCollection().createIndex({ userId: 1 }, { unique: true })
}
