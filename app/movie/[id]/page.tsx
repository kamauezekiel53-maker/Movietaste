import React from 'react'
import MovieCard from '../../../components/MovieCard'

export default async function MoviePage({ params }: { params: { id: string } }) {
  const id = params.id
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/apify/search?id=${encodeURIComponent(id)}`, { cache: 'no-store' })
  const json = res.ok ? await res.json() : { results: [] }
  const movie = (json.results && json.results.length>0) ? json.results[0] : null

  if (!movie) {
    return (<main><h1>Not found</h1></main>)
  }

  return (
    <main>
      <div className="flex gap-6">
        <MovieCard title={movie.title} poster={movie.poster} year={movie.year} big />
        <div>
          <h1 className="text-2xl font-bold">{movie.title} ({movie.year})</h1>
          <p className="mt-2 text-gray-300">{movie.description || movie.synopsis}</p>
          <div className="mt-4">
            {movie.trailerUrl && (
              <a target="_blank" rel="noreferrer" href={movie.trailerUrl} className="px-4 py-2 bg-indigo-600 rounded">Watch Trailer</a>
            )}
            <a target="_blank" rel="noreferrer" href={movie.netflixUrl || '#'} className="ml-2 px-4 py-2 bg-green-600 rounded">Open in Netflix</a>
          </div>
        </div>
      </div>
    </main>
  )
}
