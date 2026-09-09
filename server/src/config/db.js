import { MongoClient } from 'mongodb'
import { ensureProductIndexes } from '../models/productModel.js'
import { ensureServiceIndexes } from '../models/serviceModel.js'
import { ensureCartIndexes } from '../models/cartModel.js'
import { ensureOrderIndexes } from '../models/orderModel.js'

let mongoClient
let database

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error('MONGO_URI is required')
  }

  mongoClient = new MongoClient(mongoUri)
  await mongoClient.connect()
  database = mongoClient.db(process.env.MONGO_DB_NAME || 'kwick')
  await database.command({ ping: 1 })
  await database.collection('users').createIndex({ email: 1 }, { unique: true, sparse: true })
  await database.collection('users').createIndex({ mobile: 1 }, { unique: true, sparse: true })
  await ensureProductIndexes()
  await ensureServiceIndexes()
  await ensureCartIndexes()
  await ensureOrderIndexes()

  console.log('MongoDB connection established')
  return database
}

export function getDB() {
  if (!database) {
    throw new Error('MongoDB is not connected')
  }

  return database
}

export async function checkDBConnection() {
  await getDB().command({ ping: 1 })
  return true
}

export async function closeDB() {
  await mongoClient?.close()
  mongoClient = undefined
  database = undefined
}
