export async function fetchApify(q?: string, id?: string) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (id) params.set('id', id)
  const res = await fetch(`${process.env.APIFY_BASE_URL}?${params.toString()}&token=${process.env.APIFY_TOKEN}`)
  return res.json()
}
