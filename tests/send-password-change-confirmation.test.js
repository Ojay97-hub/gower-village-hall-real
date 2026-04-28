import { describe, it, expect, beforeEach } from 'vitest'

import handler from '../api/send-password-change-confirmation.js'

function makeRes() {
  const res = { statusCode: 200, _body: null }
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (data) => { res._body = data; return res }
  res.setHeader = () => {}
  res.end = (data) => { if (data) res._body = JSON.parse(data) }
  Object.defineProperty(res, 'headersSent', { get: () => false })
  return res
}

describe('POST /api/send-password-change-confirmation — validation', () => {
  beforeEach(() => {
    process.env.BREVO_FROM_EMAIL = 'noreply@test.com'
  })

  it('returns 405 for non-POST requests', async () => {
    const res = makeRes()
    await handler({ method: 'GET', body: {} }, res)
    expect(res.statusCode).toBe(405)
    expect(res._body).toMatchObject({ error: 'Method not allowed' })
  })

  it('returns 400 when email is missing', async () => {
    const res = makeRes()
    await handler({ method: 'POST', body: { name: 'Alice' } }, res)
    expect(res.statusCode).toBe(400)
    expect(res._body).toMatchObject({ error: 'Email is required' })
  })
})
