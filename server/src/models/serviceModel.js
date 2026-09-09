import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'
import { buildTextSearchFilter, escapeRegex } from '../utils/catalogUtils.js'

export const SERVICE_COLLECTION = 'services'
const SEARCH_FIELDS = ['name', 'description', 'category', 'subcategory', 'tags', 'provider.name']

export function isValidServiceId(id) {
  return ObjectId.isValid(id)
}

function getCollection() {
  return getDB().collection(SERVICE_COLLECTION)
}

function buildFilter({ category, search } = {}) {
  const filter = { available: true }
  if (category) filter.category = { $regex: `^${escapeRegex(category.trim())}$`, $options: 'i' }
  if (search?.trim()) Object.assign(filter, buildTextSearchFilter(search, SEARCH_FIELDS))
  return filter
}

export async function listServices({ page, limit, category, search }) {
  const filter = buildFilter({ category, search })
  const collection = getCollection()
  const [total, data] = await Promise.all([
    collection.countDocuments(filter),
    collection.find(filter).sort({ createdAt: -1, name: 1 }).skip((page - 1) * limit).limit(limit).toArray(),
  ])
  return { data, total }
}

export async function findServiceById(id) {
  if (!isValidServiceId(id)) return null
  return getCollection().findOne({ _id: new ObjectId(id), available: true })
}

export async function ensureServiceIndexes() {
  const collection = getCollection()
  await collection.createIndex({ catalogKey: 1 }, { unique: true, sparse: true })
  await collection.createIndex({ category: 1, available: 1 })
  await collection.createIndex({ vendorId: 1, available: 1 })
  await collection.createIndex({ name: 1 })
  await collection.createIndex({ name: 'text', description: 'text', category: 'text', subcategory: 'text', tags: 'text', 'provider.name': 'text' })
}

export async function upsertServices(services) {
  const collection = getCollection()
  if (!services.length) return
  await collection.bulkWrite(services.map((service) => ({
    updateOne: {
      filter: { catalogKey: service.catalogKey },
      update: {
        $set: { ...service, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      upsert: true,
    },
  })))
}
