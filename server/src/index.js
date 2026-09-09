import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { checkDBConnection, closeDB, connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
import osrmRoutes from './routes/osrmRoutes.js'
import productRoutes from './routes/productRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import riderOrderRoutes from './routes/riderOrderRoutes.js'
import vendorOrderRoutes from './routes/vendorOrderRoutes.js'
import vendorProfileRoutes from './routes/vendorProfileRoutes.js'

const app = express()
const port = Number(process.env.PORT) || 5000
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: corsOrigins }))
app.use(express.json())

app.get('/health', async (_req, res) => {
  try {
    await checkDBConnection()
    return res.json({ success: true, message: 'Kwick server is running', database: 'connected' })
  } catch {
    return res.status(503).json({ success: false, message: 'Kwick server is running but the database is unavailable', database: 'disconnected' })
  }
})

app.post('/test', (req, res) => {
  res.json({ success: true, method: 'POST', body: req.body || null })
})

app.use('/api/auth', authRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/osrm', osrmRoutes)
app.use('/api/products', productRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/rider/orders', riderOrderRoutes)
app.use('/api/vendor/orders', vendorOrderRoutes)
app.use('/api/vendor/profile', vendorProfileRoutes)

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

async function startServer() {
  await connectDB()

  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })

  async function stopServer() {
    server.close(async () => {
      await closeDB()
      process.exit(0)
    })
  }

  process.once('SIGINT', stopServer)
  process.once('SIGTERM', stopServer)
}

startServer().catch((error) => {
  console.error('Unable to start server:', error.message)
  process.exit(1)
})
