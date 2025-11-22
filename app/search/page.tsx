import React from 'react'
import MovieCard from '../../components/MovieCard'

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q || ''
  if (!q) {
    return (
      <main>
        <h1 className="text-2xl">Search</h1>
        <p className="text-gray-400">Please enter a query.</p>
      </main>
    )
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/apify/search?q=${encodeURIComponent(q)}`, { cache: 'no-store' })
  const json = res.ok ? await res.json() : { results: [] }
  const results = json.results || []

  return (
    <main>
      <h1 className="text-2xl mb-4">Search results for "{q}"</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {results.map((r: any) => (
          <a key={r.id} href={`/movie/${encodeURIComponent(r.id)}`}>
            <MovieCard title={r.title} poster={r.poster} year={r.year} />
          </a>
        ))}
      </div>
    </main>
  )
}
