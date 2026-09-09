import assert from 'node:assert/strict'
import { normalizeAddress } from '../utils/addressValidation.js'

const gpsAddress = { formattedAddress: 'Test GPS address', latitude: 23.2599, longitude: 77.4126 }
const legacyAddress = {
  name: 'Test Customer',
  phone: '9999999999',
  addressLine1: '1 Test Street',
  city: 'Bhopal',
  state: 'Madhya Pradesh',
  postalCode: '462001',
}

const expectRejected = (value, message) => assert.throws(() => normalizeAddress(value), message)

assert.deepEqual(normalizeAddress(gpsAddress), gpsAddress)
assert.deepEqual(normalizeAddress(legacyAddress), legacyAddress)
assert.equal(normalizeAddress({ formattedAddress: 'South Pole', latitude: -90, longitude: 0 }).latitude, -90)
assert.equal(normalizeAddress({ formattedAddress: 'North Pole', latitude: 90, longitude: 0 }).latitude, 90)
assert.equal(normalizeAddress({ formattedAddress: 'West', latitude: 0, longitude: -180 }).longitude, -180)
assert.equal(normalizeAddress({ formattedAddress: 'East', latitude: 0, longitude: 180 }).longitude, 180)

expectRejected(undefined, /Complete shipping address is required/)
expectRejected(null, /Complete shipping address is required/)
expectRejected({}, /Complete shipping address is required/)
expectRejected({ formattedAddress: 'Missing latitude', longitude: 77 }, /latitude and longitude must be provided together/)
expectRejected({ formattedAddress: 'Missing longitude', latitude: 23 }, /latitude and longitude must be provided together/)
expectRejected({ latitude: '23.2599', longitude: 77.4126 }, /latitude must be a valid coordinate/)
expectRejected({ latitude: 23.2599, longitude: '77.4126' }, /longitude must be a valid coordinate/)
expectRejected({ latitude: true, longitude: 77.4126 }, /latitude must be a valid coordinate/)
expectRejected({ latitude: 23.2599, longitude: true }, /longitude must be a valid coordinate/)
expectRejected({ latitude: [], longitude: 77.4126 }, /latitude must be a valid coordinate/)
expectRejected({ latitude: 23.2599, longitude: [] }, /longitude must be a valid coordinate/)
expectRejected({ latitude: {}, longitude: 77.4126 }, /latitude must be a valid coordinate/)
expectRejected({ latitude: 23.2599, longitude: {} }, /longitude must be a valid coordinate/)
expectRejected({ latitude: Number.NaN, longitude: 77.4126 }, /latitude must be a valid coordinate/)
expectRejected({ latitude: 23.2599, longitude: Number.NaN }, /longitude must be a valid coordinate/)
expectRejected({ latitude: Number.POSITIVE_INFINITY, longitude: 77.4126 }, /latitude must be a valid coordinate/)
expectRejected({ latitude: 23.2599, longitude: Number.NEGATIVE_INFINITY }, /longitude must be a valid coordinate/)
expectRejected({ latitude: -90.0001, longitude: 0 }, /latitude must be a valid coordinate/)
expectRejected({ latitude: 90.0001, longitude: 0 }, /latitude must be a valid coordinate/)
expectRejected({ latitude: 0, longitude: -180.0001 }, /longitude must be a valid coordinate/)
expectRejected({ latitude: 0, longitude: 180.0001 }, /longitude must be a valid coordinate/)
expectRejected({ name: 'Incomplete', phone: '9999999999' }, /Complete shipping address is required/)

console.log('Address validation checks passed')