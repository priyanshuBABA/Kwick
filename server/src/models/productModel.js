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
  const filter = { available: true }
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
  return getCollection().findOne({ _id: new ObjectId(id), available: true })
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
