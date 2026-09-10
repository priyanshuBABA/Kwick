import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'
import { buildTextSearchFilter, escapeRegex } from '../utils/catalogUtils.js'

export const PRODUCT_COLLECTION = 'products'
const SEARCH_FIELDS = ['name', 'description', 'category', 'subcategory', 'brand', 'tags']

export function isValidProductId(id) {
  return ObjectId.isValid(id)
}

function getCollection() {
  return getDB().collection(PRODUCT_COLLECTION)
}

function buildFilter({ category, search } = {}) {
  const filter = { vendorId: { $type: 'objectId' }, available: { $ne: false }, isAvailable: { $ne: false } }
  if (category) filter.category = { $regex: `^${escapeRegex(category.trim())}$`, $options: 'i' }
  if (search?.trim()) Object.assign(filter, buildTextSearchFilter(search, SEARCH_FIELDS))
  return filter
}

export async function listProducts({ page, limit, category, search }) {
  const filter = buildFilter({ category, search })
  const collection = getCollection()
  const [total, data] = await Promise.all([
    collection.countDocuments(filter),
    collection.find(filter).sort({ createdAt: -1, name: 1 }).skip((page - 1) * limit).limit(limit).toArray(),
  ])
  return { data, total }
}

export async function findProductById(id) {
  if (!isValidProductId(id)) return null
  return getCollection().findOne({ _id: new ObjectId(id), vendorId: { $type: 'objectId' }, available: { $ne: false }, isAvailable: { $ne: false } })
}

export async function findProductByIdForVendor(id, vendorId) {
  if (!isValidProductId(id) || !ObjectId.isValid(vendorId)) return null
  return getCollection().findOne({ _id: new ObjectId(id), vendorId: new ObjectId(vendorId) })
}

export async function listProductsByVendor(vendorId) {
  return getCollection().find({ vendorId: new ObjectId(vendorId) }).sort({ createdAt: -1, name: 1 }).toArray()
}

export async function createProduct(product) {
  const now = new Date()
  const document = { ...product, createdAt: now, updatedAt: now }
  const result = await getCollection().insertOne(document)
  return { ...document, _id: result.insertedId }
}

export async function updateProductForVendor(id, vendorId, updates) {
  if (!isValidProductId(id) || !ObjectId.isValid(vendorId)) return null
  const result = await getCollection().findOneAndUpdate(
    { _id: new ObjectId(id), vendorId: new ObjectId(vendorId) },
    { $set: { ...updates, updatedAt: new Date() } },
    { returnDocument: 'after' },
  )
  return result?.value || result || null
}

export async function deleteProductForVendor(id, vendorId) {
  if (!isValidProductId(id) || !ObjectId.isValid(vendorId)) return null
  return getCollection().findOneAndUpdate(
    { _id: new ObjectId(id), vendorId: new ObjectId(vendorId) },
    { $set: { available: false, isAvailable: false, updatedAt: new Date() } },
    { returnDocument: 'after' },
  ).then((result) => result?.value || result || null)
}

export async function ensureProductIndexes() {
  const collection = getCollection()
  await collection.createIndex({ catalogKey: 1 }, { unique: true, sparse: true })
  await collection.createIndex({ category: 1, available: 1 })
  await collection.createIndex({ vendorId: 1, available: 1 })
  await collection.createIndex({ name: 1 })
  await collection.createIndex({ name: 'text', description: 'text', category: 'text', subcategory: 'text', brand: 'text', tags: 'text' })
}

export async function upsertProducts(products) {
  const collection = getCollection()
  if (!products.length) return
  await collection.bulkWrite(products.map((product) => ({
    updateOne: {
      filter: { catalogKey: product.catalogKey },
      update: {
        $set: { ...product, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      upsert: true,
    },
  })))
}

export async function reserveProductStock(items) {
  const reserved = []
  try {
    for (const item of items) {
      if (!Number.isInteger(item.quantity)) continue
      const result = await getCollection().updateOne(
        { _id: new ObjectId(item.productId), available: { $ne: false }, isAvailable: { $ne: false }, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity }, $set: { updatedAt: new Date() } },
      )
      if (result.modifiedCount !== 1) throw new Error(`${item.name || 'A product'} is no longer available in the requested quantity.`)
      await getCollection().updateOne({ _id: new ObjectId(item.productId), stock: { $lte: 0 } }, { $set: { available: false, isAvailable: false, updatedAt: new Date() } })
      reserved.push(item)
    }
    return reserved
  } catch (error) {
    await restoreProductStock(reserved)
    throw error
  }
}

export async function restoreProductStock(items) {
  await Promise.all(items.map((item) => getCollection().updateOne(
    { _id: new ObjectId(item.productId) },
    { $inc: { stock: item.quantity }, $set: { available: true, isAvailable: true, updatedAt: new Date() } },
  )))
}
