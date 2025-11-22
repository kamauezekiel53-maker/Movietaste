import React from 'react'

export default function MovieCard({ title, poster, year, big }: any) {
  return (
    <div className={`rounded overflow-hidden bg-gray-800 ${big ? 'w-96' : ''}`}>
      <div className="h-56 bg-gray-700 flex items-center justify-center">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt={title} className="h-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/placeholder-poster.png" alt="placeholder" className="h-full" />
        )}
      </div>
      <div className="p-2">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-gray-400">{year}</p>
      </div>
    </div>
  )
}
