export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 20
export const MAX_LIMIT = 100

export function parsePagination(query = {}) {
  const rawPage = query.page ?? DEFAULT_PAGE
  const rawLimit = query.limit ?? DEFAULT_LIMIT
  const page = Number(rawPage)
  const limit = Number(rawLimit)

  if (!Number.isInteger(page) || page < 1) {
    return { error: 'page must be a positive integer' }
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT) {
    return { error: `limit must be an integer between 1 and ${MAX_LIMIT}` }
  }

  return { page, limit, skip: (page - 1) * limit }
}

export function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function buildTextSearchFilter(query, fields) {
  const expression = new RegExp(escapeRegex(query.trim()), 'i')
  return { $or: fields.map((field) => ({ [field]: expression })) }
}

export function buildPagination(page, limit, total) {
  return {
    page,
    limit,
    total,
    pages: total === 0 ? 0 : Math.ceil(total / limit),
  }
}
