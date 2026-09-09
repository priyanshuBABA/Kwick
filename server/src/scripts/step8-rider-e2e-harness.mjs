import 'dotenv/config'

const API_BASE = 'http://localhost:5000'
const CUSTOMER_EMAIL = process.env.E2E_CUSTOMER_EMAIL
const CUSTOMER_PASSWORD = process.env.E2E_CUSTOMER_PASSWORD
const VENDOR_EMAIL = process.env.E2E_VENDOR_EMAIL
const VENDOR_PASSWORD = process.env.E2E_VENDOR_PASSWORD
const RIDER_EMAIL = process.env.E2E_RIDER_EMAIL
const RIDER_PASSWORD = process.env.E2E_RIDER_PASSWORD

const mask = (value) => {
  if (!value) return 'MISSING'
  if (value.length <= 4) return '***'
  return `${value.slice(0, 2)}***${value.slice(-2)}`
}

async function api(path, options = {}) {
  const method = options.method || 'GET'
  const headers = { Accept: 'application/json', ...(options.headers || {}) }
  if (options.body !== undefined) headers['Content-Type'] = 'application/json'
  if (options.token) headers.Authorization = `Bearer ${options.token}`

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
  })

  const text = await response.text()
  let body = null
  try {
    body = text ? JSON.parse(text) : null
  } catch {
    body = text
  }

  return { ok: response.ok, status: response.status, body, text }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

const state = {
  customerToken: null,
  customerUser: null,
  vendorToken: null,
  vendorUser: null,
  riderToken: null,
  riderUser: null,
  tempRiderToken: null,
  tempRiderUser: null,
  orderId: null,
  order: null,
  product: null,
}

const results = []

function record(name, result, details = '') {
  results.push({ name, result, details })
  console.log(`${name}: ${result}${details ? ` | ${details}` : ''}`)
}

try {
  console.log('START E2E HARNESS')
  console.log(JSON.stringify({
    customerEmail: mask(CUSTOMER_EMAIL),
    vendorEmail: mask(VENDOR_EMAIL),
    riderEmail: mask(RIDER_EMAIL),
  }))

  const health = await api('/health')
  record('HEALTH', health.ok && health.status === 200 ? 'PASS' : 'FAIL', `status=${health.status}`)
  assert(health.ok && health.status === 200, 'Health endpoint did not return 200')

  const customerLogin = await api('/api/auth/login', {
    method: 'POST',
    body: { identifier: CUSTOMER_EMAIL, password: CUSTOMER_PASSWORD },
  })
  record('CUSTOMER_LOGIN', customerLogin.ok ? 'PASS' : 'FAIL', `status=${customerLogin.status}`)
  assert(customerLogin.ok, 'Customer login failed')
  state.customerToken = customerLogin.body.token
  state.customerUser = customerLogin.body.user
  assert(state.customerUser?.roles?.includes('customer'), 'Customer role not found')

  const productList = await api('/api/products')
  record('PRODUCTS_LIST', productList.ok ? 'PASS' : 'FAIL', `status=${productList.status}`)
  assert(productList.ok, 'Product list unavailable')
  const vendorProduct = (productList.body?.data || []).find((item) => item.vendorId && Number(item.price) > 0)
  assert(vendorProduct, 'No vendor-owned product found')
  state.product = vendorProduct

  const cartAdd = await api('/api/cart/items', {
    method: 'POST',
    token: state.customerToken,
    body: { productId: state.product._id, quantity: 1 },
  })
  record('CART_ADD', cartAdd.ok ? 'PASS' : 'FAIL', `status=${cartAdd.status}`)
  assert(cartAdd.ok, 'Unable to add product to cart')

  const cartVerify = await api('/api/cart', { token: state.customerToken })
  record('CART_VERIFY', cartVerify.ok && (cartVerify.body?.data?.items || []).some((item) => item.productId === state.product._id) ? 'PASS' : 'FAIL', `status=${cartVerify.status}`)
  assert(cartVerify.ok, 'Cart fetch failed')
  assert((cartVerify.body?.data?.items || []).some((item) => item.productId === state.product._id), 'Product not present in cart')

  const orderCreate = await api('/api/orders', {
    method: 'POST',
    token: state.customerToken,
    body: {
      paymentMethod: 'cod',
      shippingAddress: {
        name: 'Step 8 E2E Customer',
        phone: '9876543210',
        addressLine1: 'Test Street 1',
        city: 'Munger',
        state: 'Bihar',
        postalCode: '813101',
        landmark: 'Near Market',
      },
    },
  })
  record('ORDER_CREATE', orderCreate.ok ? 'PASS' : 'FAIL', `status=${orderCreate.status}`)
  assert(orderCreate.ok, 'Order creation failed')
  state.order = orderCreate.body?.data
  state.orderId = state.order?._id
  assert(state.order && state.order.userId === state.customerUser._id, 'Customer ownership mismatch on order')
  const orderedItem = state.order.items.find((item) => item.productId === state.product._id)
  assert(orderedItem, 'Created order missing the product from the cart')
  assert(Number(orderedItem.price) === Number(state.product.price), 'Order price mismatch against product price')
  assert(orderedItem.vendorId === state.product.vendorId, 'Order vendorId mismatch')
  assert(state.order.status === 'placed', 'Initial order status is not placed')

  const cartEmpty = await api('/api/cart', { token: state.customerToken })
  record('CART_EMPTY_AFTER_ORDER', cartEmpty.ok && (cartEmpty.body?.data?.items || []).length === 0 ? 'PASS' : 'FAIL', `status=${cartEmpty.status}`)
  assert(cartEmpty.ok, 'Cart check failed after order creation')
  assert((cartEmpty.body?.data?.items || []).length === 0, 'Cart not empty after order creation')

  const vendorLogin = await api('/api/auth/login', {
    method: 'POST',
    body: { identifier: VENDOR_EMAIL, password: VENDOR_PASSWORD },
  })
  record('VENDOR_LOGIN', vendorLogin.ok ? 'PASS' : 'FAIL', `status=${vendorLogin.status}`)
  assert(vendorLogin.ok, 'Vendor login failed')
  state.vendorToken = vendorLogin.body.token
  state.vendorUser = vendorLogin.body.user
  assert(state.vendorUser?.roles?.includes('vendor'), 'Vendor role not found')

  const vendorOrders = await api('/api/vendor/orders', { token: state.vendorToken })
  record('VENDOR_ORDERS_FETCH', vendorOrders.ok && Array.isArray(vendorOrders.body?.data) ? 'PASS' : 'FAIL', `status=${vendorOrders.status}`)
  assert(vendorOrders.ok, 'Vendor orders list failed')
  const vendorVisibleOrder = (vendorOrders.body?.data || []).find((order) => order._id === state.orderId)
  assert(vendorVisibleOrder, 'Created order is not visible to vendor')

  for (const nextStatus of ['confirmed', 'preparing', 'ready']) {
    const vendorPatch = await api(`/api/vendor/orders/${state.orderId}/status`, {
      method: 'PATCH',
      token: state.vendorToken,
      body: { status: nextStatus },
    })
    record(`VENDOR_STATUS_${nextStatus.toUpperCase()}`, vendorPatch.ok ? 'PASS' : 'FAIL', `status=${vendorPatch.status}`)
    assert(vendorPatch.ok, `Vendor status ${nextStatus} failed`)

    const vendorRefresh = await api(`/api/vendor/orders/${state.orderId}`, { token: state.vendorToken })
    record(`VENDOR_STATUS_PERSIST_${nextStatus.toUpperCase()}`, vendorRefresh.ok && vendorRefresh.body?.data?.status === nextStatus ? 'PASS' : 'FAIL', `status=${vendorRefresh.status}`)
    assert(vendorRefresh.ok, `Vendor refresh failed after ${nextStatus}`)
    assert(vendorRefresh.body?.data?.status === nextStatus, `Status did not persist to ${nextStatus}`)
  }

  const riderLogin = await api('/api/auth/login', {
    method: 'POST',
    body: { identifier: RIDER_EMAIL, password: RIDER_PASSWORD },
  })
  record('RIDER_LOGIN', riderLogin.ok ? 'PASS' : 'FAIL', `status=${riderLogin.status}`)
  assert(riderLogin.ok, 'Rider login failed')
  state.riderToken = riderLogin.body.token
  state.riderUser = riderLogin.body.user
  assert(state.riderUser?.roles?.includes('rider'), 'Rider role not found')

  const availableOrders = await api('/api/rider/orders/available', { token: state.riderToken })
  record('RIDER_AVAILABLE_ORDERS', availableOrders.ok && Array.isArray(availableOrders.body?.data) ? 'PASS' : 'FAIL', `status=${availableOrders.status}`)
  assert(availableOrders.ok, 'Rider available orders failed')
  const readyOrderVisible = (availableOrders.body?.data || []).find((order) => order._id === state.orderId)
  assert(readyOrderVisible, 'Ready order not visible to rider')

  const acceptOrder = await api(`/api/rider/orders/${state.orderId}/accept`, {
    method: 'POST',
    token: state.riderToken,
    body: { assignedRiderId: '507f1f77bcf86cd799439011' },
  })
  record('RIDER_ACCEPT_ORDER', acceptOrder.ok ? 'PASS' : 'FAIL', `status=${acceptOrder.status}`)
  assert(acceptOrder.ok, 'Rider accept order failed')
  assert(acceptOrder.body?.data?.assignedRiderId === state.riderUser._id, 'Client-supplied rider id was accepted')

  const riderOrder = await api(`/api/rider/orders/${state.orderId}`, { token: state.riderToken })
  record('RIDER_ORDER_OWNERSHIP', riderOrder.ok && riderOrder.body?.data?.assignedRiderId === state.riderUser._id ? 'PASS' : 'FAIL', `status=${riderOrder.status}`)
  assert(riderOrder.ok, 'Rider order fetch failed')
  assert(riderOrder.body?.data?.assignedRiderId === state.riderUser._id, 'Assigned rider id mismatch')

  const tempRegister = await api('/api/auth/register', {
    method: 'POST',
    body: {
      name: 'Temp Rider',
      email: `temp.rider.${Date.now()}@example.com`,
      mobile: `999${Date.now().toString().slice(-7)}`,
      password: 'TempRiderPass123!',
      role: 'rider',
    },
  })
  record('TEMP_RIDER_REGISTER', tempRegister.ok ? 'PASS' : 'FAIL', `status=${tempRegister.status}`)
  assert(tempRegister.ok, 'Could not create temp rider')
  state.tempRiderToken = tempRegister.body.token
  state.tempRiderUser = tempRegister.body.user

  const tempClaim = await api(`/api/rider/orders/${state.orderId}/accept`, {
    method: 'POST',
    token: state.tempRiderToken,
  })
  record('OTHER_RIDER_CLAIM_REJECTED', [409, 403, 404].includes(tempClaim.status) ? 'PASS' : 'FAIL', `status=${tempClaim.status}`)
  assert([409, 403, 404].includes(tempClaim.status), 'Another rider could claim the accepted order')

  const tempOrderAccess = await api(`/api/rider/orders/${state.orderId}`, { token: state.tempRiderToken })
  record('OTHER_RIDER_ACCESS_REJECTED', [403, 404].includes(tempOrderAccess.status) ? 'PASS' : 'FAIL', `status=${tempOrderAccess.status}`)
  assert([403, 404].includes(tempOrderAccess.status), 'Another rider could access the assigned order')

  const tempStatusPatch = await api(`/api/rider/orders/${state.orderId}/status`, {
    method: 'PATCH',
    token: state.tempRiderToken,
    body: { status: 'picked_up' },
  })
  record('OTHER_RIDER_STATUS_REJECTED', [403, 404].includes(tempStatusPatch.status) ? 'PASS' : 'FAIL', `status=${tempStatusPatch.status}`)
  assert([403, 404].includes(tempStatusPatch.status), 'Another rider modified the assigned order')

  const invalidStatus = await api(`/api/rider/orders/${state.orderId}/status`, {
    method: 'PATCH',
    token: state.riderToken,
    body: { status: 'delivered' },
  })
  record('INVALID_TRANSITION_REJECTED', invalidStatus.status === 400 ? 'PASS' : 'FAIL', `status=${invalidStatus.status}`)
  assert(invalidStatus.status === 400, 'Invalid transition was accepted')

  const backwardStatus = await api(`/api/rider/orders/${state.orderId}/status`, {
    method: 'PATCH',
    token: state.riderToken,
    body: { status: 'ready' },
  })
  record('BACKWARD_TRANSITION_REJECTED', backwardStatus.status === 400 ? 'PASS' : 'FAIL', `status=${backwardStatus.status}`)
  assert(backwardStatus.status === 400, 'Backward transition was accepted')

  const riderStatusFlow = ['picked_up', 'out_for_delivery', 'delivered']
  for (const nextStatus of riderStatusFlow) {
    const patch = await api(`/api/rider/orders/${state.orderId}/status`, {
      method: 'PATCH',
      token: state.riderToken,
      body: { status: nextStatus },
    })
    record(`RIDER_TRANSITION_${nextStatus.toUpperCase()}`, patch.ok ? 'PASS' : 'FAIL', `status=${patch.status}`)
    assert(patch.ok, `Transition ${nextStatus} failed`)

    const riderRefresh = await api(`/api/rider/orders/${state.orderId}`, { token: state.riderToken })
    record(`RIDER_TRANSITION_PERSIST_${nextStatus.toUpperCase()}`, riderRefresh.ok && riderRefresh.body?.data?.status === nextStatus && riderRefresh.body.data.assignedRiderId === state.riderUser._id ? 'PASS' : 'FAIL', `status=${riderRefresh.status}`)
    assert(riderRefresh.ok, `Refresh after ${nextStatus} failed`)
    assert(riderRefresh.body?.data?.status === nextStatus, `Status did not persist to ${nextStatus}`)
    assert(riderRefresh.body?.data?.assignedRiderId === state.riderUser._id, 'assignedRiderId changed after transition')

    const customerVisible = await api(`/api/orders/${state.orderId}`, { token: state.customerToken })
    record(`CUSTOMER_SEES_${nextStatus.toUpperCase()}`, customerVisible.ok && customerVisible.body?.data?.status === nextStatus ? 'PASS' : 'FAIL', `status=${customerVisible.status}`)
    assert(customerVisible.ok, `Customer fetch failed while status=${nextStatus}`)
    assert(customerVisible.body?.data?.status === nextStatus, `Customer saw old status while rider moved to ${nextStatus}`)
    assert(customerVisible.body?.data?.items?.some((item) => item.productId === state.product._id), 'Customer order missing product after rider progression')

    const vendorVisible = await api(`/api/vendor/orders/${state.orderId}`, { token: state.vendorToken })
    record(`VENDOR_SEES_${nextStatus.toUpperCase()}`, vendorVisible.ok && vendorVisible.body?.data?.status === nextStatus ? 'PASS' : 'FAIL', `status=${vendorVisible.status}`)
    assert(vendorVisible.ok, `Vendor fetch failed while status=${nextStatus}`)
    assert(vendorVisible.body?.data?.status === nextStatus, `Vendor saw old status while rider moved to ${nextStatus}`)
  }

  const unauthRider = await api('/api/rider/orders/available')
  record('UNAUTH_RIDER_ENDPOINT', unauthRider.status === 401 ? 'PASS' : 'FAIL', `status=${unauthRider.status}`)
  assert(unauthRider.status === 401, 'Unauthenticated rider access not rejected')

  const customerRider = await api('/api/rider/orders/available', { token: state.customerToken })
  record('CUSTOMER_RIDER_FORBIDDEN', customerRider.status === 403 ? 'PASS' : 'FAIL', `status=${customerRider.status}`)
  assert(customerRider.status === 403, 'Customer access to rider endpoint was not forbidden')

  const vendorRider = await api('/api/rider/orders/available', { token: state.vendorToken })
  record('VENDOR_RIDER_FORBIDDEN', vendorRider.status === 403 ? 'PASS' : 'FAIL', `status=${vendorRider.status}`)
  assert(vendorRider.status === 403, 'Vendor access to rider endpoint was not forbidden')

  const existingCustomerOrders = await api('/api/orders', { token: state.customerToken })
  record('CUSTOMER_ORDER_API_STILL_WORKS', existingCustomerOrders.ok ? 'PASS' : 'FAIL', `status=${existingCustomerOrders.status}`)
  assert(existingCustomerOrders.ok, 'Customer order API failed')

  const existingVendorOrders = await api('/api/vendor/orders', { token: state.vendorToken })
  record('VENDOR_ORDER_API_STILL_WORKS', existingVendorOrders.ok ? 'PASS' : 'FAIL', `status=${existingVendorOrders.status}`)
  assert(existingVendorOrders.ok, 'Vendor order API failed')

  const existingProducts = await api('/api/products')
  record('PRODUCT_API_STILL_WORKS', existingProducts.ok ? 'PASS' : 'FAIL', `status=${existingProducts.status}`)
  assert(existingProducts.ok, 'Product API failed')

  record('OVERALL', 'PASS', 'Authenticated rider flow executed against the live backend')
} catch (error) {
  console.error('HARNESS_FAILURE:', error.message)
  record('OVERALL', 'FAIL', error.message)
  process.exitCode = 1
} finally {
  try {
    const { connectDB, getDB, closeDB } = await import('../config/db.js')
    await connectDB()
    if (state.orderId) {
      await getDB().collection('orders').deleteOne({ _id: state.orderId })
    }
    if (state.customerUser?._id) {
      await getDB().collection('carts').deleteOne({ userId: state.customerUser._id })
    }
    if (state.tempRiderUser?._id) {
      await getDB().collection('users').deleteOne({ _id: state.tempRiderUser._id })
    }
    await closeDB()
  } catch (error) {
    console.error('CLEANUP_FAILURE:', error.message)
  }
}
