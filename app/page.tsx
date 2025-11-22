import React from 'react'
import Link from 'next/link'
import MovieCard from '../../components/MovieCard'

export default async function HomePage() {
  // Server component — fetch a default set; we will call our server API for a sample query 'popular'
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/apify/search?q=popular`, { cache: 'no-store' })
  const json = res.ok ? await res.json() : { results: [] }
  const results = json.results || []

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">MovieHub</h1>
        <p className="text-sm text-gray-300">Search Netflix titles via Apify scraper</p>
        <div className="mt-4">
          <form action="/search" method="get" className="flex gap-2">
            <input name="q" placeholder="Search title, actor, genre" className="flex-1 p-2 rounded bg-gray-800" />
            <button type="submit" className="px-4 py-2 rounded bg-indigo-600">Search</button>
          </form>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-3">Popular (sample)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((r: any) => (
            <Link key={r.id} href={`/movie/${encodeURIComponent(r.id)}`}>
              <a>
                <MovieCard title={r.title} poster={r.poster} year={r.year} />
              </a>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
      }
