import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import { closeDB, connectDB, getDB } from '../config/db.js'

const FIXTURE_MARKER = 'step7b-e2e'
const REQUIRED_VARIABLES = [
  'E2E_CUSTOMER_EMAIL',
  'E2E_CUSTOMER_PASSWORD',
  'E2E_VENDOR_EMAIL',
  'E2E_VENDOR_PASSWORD',
]

function getCredentials() {
  const missing = REQUIRED_VARIABLES.filter((name) => !process.env[name])
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(', ')}`)

  const customerEmail = process.env.E2E_CUSTOMER_EMAIL.trim().toLowerCase()
  const vendorEmail = process.env.E2E_VENDOR_EMAIL.trim().toLowerCase()
  if (!customerEmail || !vendorEmail || customerEmail === vendorEmail) {
    throw new Error('E2E customer and vendor emails must be present and different')
  }

  return {
    customerEmail,
    customerPassword: process.env.E2E_CUSTOMER_PASSWORD,
    vendorEmail,
    vendorPassword: process.env.E2E_VENDOR_PASSWORD,
  }
}

async function upsertFixtureUser({ email, password, role, name, vendorOnboarding }) {
  const collection = getDB().collection('users')
  const existing = await collection.findOne({ email }, { projection: { _id: 1, e2eFixture: 1 } })
  if (existing && existing.e2eFixture !== FIXTURE_MARKER) {
    throw new Error('A non-E2E user already uses one of the supplied fixture emails')
  }

  const userId = existing?._id || new ObjectId()
  const document = {
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12),
    roles: [role],
    status: 'active',
    e2eFixture: FIXTURE_MARKER,
    updatedAt: new Date(),
  }
  if (vendorOnboarding) document.vendorOnboarding = vendorOnboarding

  await collection.updateOne(
    { _id: userId },
    { $set: document, $setOnInsert: { createdAt: new Date() } },
    { upsert: true },
  )
  return userId
}

async function seedE2EVendorFlow() {
  const credentials = getCredentials()
  await connectDB()

  const customerId = await upsertFixtureUser({
    email: credentials.customerEmail,
    password: credentials.customerPassword,
    role: 'customer',
    name: 'Step 7B E2E Customer',
  })
  const vendorId = await upsertFixtureUser({
    email: credentials.vendorEmail,
    password: credentials.vendorPassword,
    role: 'vendor',
    name: 'Step 7B E2E Vendor',
    vendorOnboarding: {
      businessName: 'Step 7B E2E Vendor Store',
      businessCategory: 'Retail',
      city: 'Munger',
      verifiedAt: new Date(),
    },
  })

  const productKeys = (process.env.E2E_VENDOR_PRODUCT_KEYS || 'product-ball-pen,product-maggi-bundle')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean)
  const result = await getDB().collection('products').updateMany(
    { catalogKey: { $in: productKeys } },
    { $set: { vendorId, updatedAt: new Date() } },
  )
  if (result.matchedCount !== productKeys.length) {
    throw new Error(`Expected ${productKeys.length} E2E products but found ${result.matchedCount}`)
  }

  console.log(JSON.stringify({
    fixture: FIXTURE_MARKER,
    customerId: customerId.toString(),
    vendorId: vendorId.toString(),
    productsAssigned: result.matchedCount,
  }))
}

try {
  await seedE2EVendorFlow()
} catch (error) {
  console.error(`E2E fixture setup failed: ${error.message}`)
  process.exitCode = 1
} finally {
  await closeDB()
}
