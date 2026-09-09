import 'dotenv/config'
import { connectDB, getDB, closeDB } from '../config/db.js'

await connectDB()
const docs = await getDB().collection('users').find({
  $or: [
    { email: 'kwick.e2e.customer@example.com' },
    { email: 'kwick.e2e.vendor@example.com' },
    { email: 'rider.e2e@example.com' },
    { e2eFixture: 'step8-rider-e2e' },
  ],
}, {
  projection: { _id: 1, email: 1, roles: 1, status: 1, e2eFixture: 1, name: 1 },
}).toArray()

console.log(JSON.stringify(docs, null, 2))
await closeDB()
