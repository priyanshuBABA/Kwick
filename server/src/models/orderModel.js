import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'
import { findUserById } from './userModel.js'

export const ORDER_COLLECTION = 'orders'

function getCollection() {
  return getDB().collection(ORDER_COLLECTION)
}

function toObjectId(id) {
  return id instanceof ObjectId ? id : new ObjectId(id)
}

function serializePickupLocation(location) {
  if (!location) return null
  return {
    ...location,
    ...(location.vendorId ? { vendorId: location.vendorId.toString() } : {}),
    latitude: Number(location.latitude),
    longitude: Number(location.longitude),
  }
}

export function serializeOrder(order) {
  if (!order) return null

  return {
    ...order,
    _id: order._id.toString(),
    userId: order.userId.toString(),
    ...(order.assignedRiderId ? { assignedRiderId: order.assignedRiderId.toString() } : {}),
    ...(order.pickupLocation ? { pickupLocation: serializePickupLocation(order.pickupLocation) } : { pickupLocation: null }),
    pickupLocations: (order.pickupLocations || []).map(serializePickupLocation),
    vendorStatus: order.vendorStatus || (['placed', 'confirmed', 'preparing', 'ready'].includes(order.status) ? order.status : 'placed'),
    riderStatus: order.riderStatus || (['rider_assigned', 'picked_up', 'out_for_delivery', 'delivered'].includes(order.status) ? order.status : 'unassigned'),
    items: (order.items || []).map((item) => ({
      ...item,
      productId: item.productId.toString(),
      ...(item.vendorId ? { vendorId: item.vendorId.toString() } : {}),
      price: Number(item.price),
      lineTotal: Number(item.lineTotal),
      quantity: Number(item.quantity),
    })),
    subtotal: Number(order.subtotal),
    deliveryFee: Number(order.deliveryFee),
    tax: Number(order.tax),
    discount: Number(order.discount),
    total: Number(order.total),
  }
}

export async function createOrder(order) {
  const now = new Date()
  const document = {
    ...order,
    vendorStatus: order.vendorStatus || 'placed',
    riderStatus: order.riderStatus || 'unassigned',
    assignedRiderId: order.assignedRiderId || null,
    riderAssignedAt: order.riderAssignedAt || null,
    pickupLocation: order.pickupLocation || null,
    pickupLocations: order.pickupLocations || [],
    riderDeclinedEvents: order.riderDeclinedEvents || [],
    statusHistory: order.statusHistory || [{ status: order.status || 'placed', changedBy: 'system', changedAt: now }],
    userId: toObjectId(order.userId),
    createdAt: now,
    updatedAt: now,
  }
  const result = await getCollection().insertOne(document)
  return { ...document, _id: result.insertedId }
}

export async function findOrderById(id, userId = null) {
  if (!ObjectId.isValid(id)) return null
  const filter = { _id: new ObjectId(id) }
  if (userId) filter.userId = toObjectId(userId)
  return getCollection().findOne(filter)
}

export async function findOrdersByUser(userId) {
  return getCollection().find({ userId: toObjectId(userId) }).sort({ createdAt: -1 }).toArray()
}

function getVendorItems(order, vendorId) {
  const normalizedVendorId = toObjectId(vendorId)
  return (order.items || []).filter((item) => item.vendorId?.toString() === normalizedVendorId.toString())
}

export function serializeVendorOrder(order, vendorId) {
  const items = getVendorItems(order, vendorId)
  const subtotal = items.reduce((sum, item) => sum + Number(item.lineTotal || 0), 0)
  return {
    _id: order._id.toString(),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    status: order.vendorStatus || (['placed', 'confirmed', 'preparing', 'ready'].includes(order.status) ? order.status : 'placed'),
    paymentStatus: order.paymentStatus,
    paymentMethod: order.paymentMethod,
    shippingAddress: order.shippingAddress || {},
    items: items.map((item) => ({
      ...item,
      productId: item.productId.toString(),
      vendorId: item.vendorId.toString(),
      price: Number(item.price),
      lineTotal: Number(item.lineTotal),
      quantity: Number(item.quantity),
    })),
    vendorSubtotal: subtotal,
  }
}

export async function findOrdersByVendor(vendorId) {
  return getCollection()
    .find({ 'items.vendorId': toObjectId(vendorId) })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function findOrderByIdForVendor(id, vendorId) {
  if (!ObjectId.isValid(id)) return null
  return getCollection().findOne({
    _id: new ObjectId(id),
    'items.vendorId': toObjectId(vendorId),
  })
}

export async function findAvailableOrdersForRider(riderId) {
  return getCollection()
    .find({
      status: 'placed',
      $or: [{ assignedRiderId: { $exists: false } }, { assignedRiderId: null }],
      riderDeclinedEvents: { $not: { $elemMatch: { riderId: toObjectId(riderId) } } },
    })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function findOrdersByRider(riderId) {
  return getCollection()
    .find({ assignedRiderId: toObjectId(riderId) })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function findOrderByIdForRider(id, riderId) {
  if (!ObjectId.isValid(id)) return null
  return getCollection().findOne({
    _id: new ObjectId(id),
    assignedRiderId: toObjectId(riderId),
  })
}

export function orderBelongsOnlyToVendor(order, vendorId) {
  const normalizedVendorId = toObjectId(vendorId).toString()
  return (order.items || []).every((item) => item.vendorId?.toString() === normalizedVendorId)
}

export async function claimOrderForRider(id, riderId) {
  if (!ObjectId.isValid(id)) return null
  const result = await getCollection().findOneAndUpdate(
    {
      _id: new ObjectId(id),
      status: 'placed',
      $or: [{ assignedRiderId: { $exists: false } }, { assignedRiderId: null }],
    },
    {
      $set: {
        assignedRiderId: toObjectId(riderId),
        riderAssignedAt: new Date(),
        riderStatus: 'assigned',
        status: 'rider_assigned',
        updatedAt: new Date(),
      },
      $push: { statusHistory: { status: 'rider_assigned', changedBy: toObjectId(riderId), changedAt: new Date() } },
    },
    { returnDocument: 'after' },
  )
  return result?.value || result
}

export async function declineOrderForRider(id, riderId, reason = null) {
  if (!ObjectId.isValid(id)) return null
  const result = await getCollection().findOneAndUpdate(
    {
      _id: new ObjectId(id),
      status: 'placed',
      $or: [{ assignedRiderId: { $exists: false } }, { assignedRiderId: null }],
    },
    {
      $push: {
        riderDeclinedEvents: {
          riderId: toObjectId(riderId),
          ...(reason ? { reason } : {}),
          declinedAt: new Date(),
        },
      },
    },
    { returnDocument: 'after' },
  )
  return result?.value || result
}

export async function updateRiderOrderStatus(id, riderId, expectedStatus, status) {
  if (!ObjectId.isValid(id)) return null
  const result = await getCollection().findOneAndUpdate(
    { _id: new ObjectId(id), assignedRiderId: toObjectId(riderId), status: expectedStatus },
    {
      $set: { riderStatus: status, status, updatedAt: new Date() },
      $push: { statusHistory: { status, changedBy: toObjectId(riderId), changedAt: new Date() } },
    },
    { returnDocument: 'after' },
  )
  return result?.value || result
}

export async function updateVendorOrderStatus(id, vendorId, expectedStatus, status) {
  if (!ObjectId.isValid(id)) return null
  const result = await getCollection().findOneAndUpdate(
    {
      _id: new ObjectId(id),
      'items.vendorId': toObjectId(vendorId),
      $or: [
        { vendorStatus: expectedStatus },
        { vendorStatus: { $exists: false }, status: expectedStatus },
      ],
    },
    [
      {
        $set: {
          vendorStatus: status,
          updatedAt: new Date(),
        },
      },
    ],
    { returnDocument: 'after' },
  )
  return result?.value || result
}

export async function ensureOrderIndexes() {
  const collection = getCollection()
  await collection.createIndex({ userId: 1, createdAt: -1 })
  await collection.createIndex({ status: 1, createdAt: -1 })
  await collection.createIndex({ 'items.vendorId': 1, createdAt: -1 })
  await collection.createIndex({ assignedRiderId: 1, createdAt: -1 })
  await collection.createIndex({ status: 1, assignedRiderId: 1, createdAt: -1 })
}

export async function serializeCustomerOrder(order) {
  const serialized = serializeOrder(order)
  if (!order?.assignedRiderId) return serialized
  const rider = await findUserById(order.assignedRiderId)
  if (rider?.riderLocation) serialized.riderLocation = rider.riderLocation
  return serialized
}