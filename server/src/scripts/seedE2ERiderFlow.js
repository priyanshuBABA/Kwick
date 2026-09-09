import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import { closeDB, connectDB, getDB } from '../config/db.js'

const FIXTURE_MARKER = 'step8-rider-e2e'
const REQUIRED_VARIABLES = ['E2E_RIDER_EMAIL', 'E2E_RIDER_PASSWORD']

function getCredentials() {
  const missing = REQUIRED_VARIABLES.filter((name) => !process.env[name])
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }

  const riderEmail = process.env.E2E_RIDER_EMAIL.trim().toLowerCase()
  if (!riderEmail) {
    throw new Error('E2E rider email must be present')
  }

  return {
    riderEmail,
    riderPassword: process.env.E2E_RIDER_PASSWORD,
  }
}

async function upsertFixtureUser({ email, password, role, name }) {
  const collection = getDB().collection('users')
  const existing = await collection.findOne({ email }, { projection: { _id: 1, e2eFixture: 1 } })
  if (existing && existing.e2eFixture !== FIXTURE_MARKER) {
    throw new Error('A non-E2E user already uses the supplied fixture email')
  }

  const userId = existing?._id || new ObjectId()
  const document = {
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12),
    roles: [role],
    status: 'active',
    e2eFixture: FIXTURE_MARKER,
    riderOnboarding: {
      vehicleType: 'bike',
      city: 'Munger',
      verifiedAt: new Date(),
    },
    updatedAt: new Date(),
  }

  await collection.updateOne(
    { _id: userId },
    { $set: document, $setOnInsert: { createdAt: new Date() } },
    { upsert: true },
  )

  return userId
}

async function seedE2ERiderFlow() {
  const credentials = getCredentials()
  await connectDB()

  const riderId = await upsertFixtureUser({
    email: credentials.riderEmail,
    password: credentials.riderPassword,
    role: 'rider',
    name: 'Step 8 E2E Rider',
  })

  console.log(JSON.stringify({
    fixture: FIXTURE_MARKER,
    riderId: riderId.toString(),
  }))
}

try {
  await seedE2ERiderFlow()
} catch (error) {
  console.error(`E2E rider fixture setup failed: ${error.message}`)
  process.exitCode = 1
} finally {
  await closeDB()
}
