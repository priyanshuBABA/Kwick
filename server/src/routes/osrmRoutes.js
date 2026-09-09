import { Router } from 'express'

const router = Router()

router.get('/status', (_req, res) => {
  res.json({ success: true, service: 'osrm', message: 'OSRM route service is ready' })
})

export default router
