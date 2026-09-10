import 'dotenv/config'
import { ObjectId } from 'mongodb'
import { closeDB, connectDB, getDB } from '../config/db.js'

function getRequiredVendorId() {
  const value = process.env.SEED_VENDOR_ID
  if (!value || !ObjectId.isValid(value)) {
    throw new Error('SEED_VENDOR_ID must be a valid existing vendor user ID')
  }
  return new ObjectId(value)
}

function getCatalogKeys(name, fallback) {
  return (process.env[name] || fallback).split(',').map((key) => key.trim()).filter(Boolean)
}

async function seedVendorOwnership() {
  await connectDB()
  const db = getDB()
  const vendorId = getRequiredVendorId()
  const vendor = await db.collection('users').findOne({ _id: vendorId, roles: 'vendor' }, { projection: { _id: 1 } })
  if (!vendor) throw new Error('SEED_VENDOR_ID does not belong to an existing vendor user')

  const productKeys = getCatalogKeys('SEED_VENDOR_PRODUCT_KEYS', 'product-fresh-tomatoes,product-ball-pen,product-maggi-bundle')
  const productResult = await db.collection('products').updateMany(
    { catalogKey: { $in: productKeys } },
    { $set: { vendorId, updatedAt: new Date() } },
  )
  if (productResult.matchedCount !== productKeys.length) {
    throw new Error(`Expected ${productKeys.length} products but found ${productResult.matchedCount}`)
  }

  const serviceKeys = getCatalogKeys('SEED_VENDOR_SERVICE_KEYS', '')
  let serviceResult = { matchedCount: 0, modifiedCount: 0 }
  if (serviceKeys.length) {
    serviceResult = await db.collection('services').updateMany(
      { catalogKey: { $in: serviceKeys } },
      { $set: { vendorId, updatedAt: new Date() } },
    )
    if (serviceResult.matchedCount !== serviceKeys.length) {
      throw new Error(`Expected ${serviceKeys.length} services but found ${serviceResult.matchedCount}`)
    }
  }

  console.log(JSON.stringify({
    vendorId: vendorId.toString(),
    productKeys,
    productsMatched: productResult.matchedCount,
    productsModified: productResult.modifiedCount,
    serviceKeys,
    servicesMatched: serviceResult.matchedCount,
    servicesModified: serviceResult.modifiedCount,
  }))
}

try {
  await seedVendorOwnership()
} catch (error) {
  console.error(`Vendor ownership seed failed: ${error.message}`)
  process.exitCode = 1
} finally {
  await closeDB()
}
