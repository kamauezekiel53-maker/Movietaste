import type { NextApiRequest, NextApiResponse } from 'next'

const APIFY_BASE = process.env.APIFY_BASE_URL || 'https://api.apify.com/v2/acts/easyapi~netflix-search-scraper/runs'
const APIFY_TOKEN = process.env.APIFY_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { q, id } = req.query
    const params = new URLSearchParams()
    if (q) params.set('q', String(q))
    if (id) params.set('id', String(id))
    if (!APIFY_TOKEN) return res.status(500).json({ error: 'Missing APIFY_TOKEN on server' })
    params.set('token', APIFY_TOKEN)

    const url = `${APIFY_BASE}?${params.toString()}`
    const r = await fetch(url)
    if (!r.ok) {
      const t = await r.text()
      return res.status(502).json({ error: 'Upstream error', detail: t })
    }
    const json = await r.json()

    // The Apify run object may wrap results — normalize to { results: [...] }
    // Implementation depends on the scraper's actual output. We'll attempt common shapes.
    let results = []
    if (Array.isArray(json)) results = json
    else if (json.body && json.body.length) results = json.body
    else if (json.default && Array.isArray(json.default)) results = json.default
    else if (json.results) results = json.results
    else if (json.data) results = json.data
    else results = json

    // Ensure consistent fields for our UI: id, title, poster, year, description, trailerUrl, netflixUrl
    const normalized = Array.isArray(results) ? results.map((item: any) => ({
      id: item.id || item.title || item.url || item.netflix_id || item.imdb_id || JSON.stringify(item),
      title: item.title || item.name || item.show_title || '',
      poster: item.poster || item.image || item.thumbnail || null,
      year: item.year || item.releaseYear || item._year || null,
      description: item.description || item.synopsis || item.plot || null,
      trailerUrl: item.trailer || item.trailerUrl || null,
      netflixUrl: item.netflix_link || item.link || item.url || null,
      raw: item
    })) : []

    return res.status(200).json({ results: normalized })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: 'Server error', detail: String(err) })
  }
                                      }
