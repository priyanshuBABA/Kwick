import { Router } from 'express'
import { findServiceById, isValidServiceId, listServices } from '../models/serviceModel.js'
import { buildPagination, parsePagination } from '../utils/catalogUtils.js'

const router = Router()

async function listHandler(req, res, category) {
  const pagination = parsePagination(req.query)
  if (pagination.error) return res.status(400).json({ success: false, message: pagination.error })

  const search = typeof req.query.q === 'string' ? req.query.q.trim() : ''
  if (req.path === '/search' && !search) {
    return res.status(400).json({ success: false, message: 'q is required for service search' })
  }

  try {
    const result = await listServices({ ...pagination, category, search })
    return res.json({
      success: true,
      data: result.data,
      pagination: buildPagination(pagination.page, pagination.limit, result.total),
    })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load services' })
  }
}

router.get('/', (req, res) => listHandler(req, res))
router.get('/category/:category', (req, res) => listHandler(req, res, req.params.category))
router.get('/search', (req, res) => listHandler(req, res))

router.get('/:id', async (req, res) => {
  if (!isValidServiceId(req.params.id)) {
    return res.status(400).json({ success: false, message: 'Invalid service ID' })
  }

  try {
    const service = await findServiceById(req.params.id)
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' })
    return res.json({ success: true, data: service })
  } catch {
    return res.status(500).json({ success: false, message: 'Unable to load service' })
  }
})

export default router
