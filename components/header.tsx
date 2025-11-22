import React from 'react'

export default function Header() {
  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">MovieHub</h1>
      </div>
      <nav>
        <a href="/" className="mr-4">Home</a>
        <a href="/search">Search</a>
      </nav>
    </header>
  )
}
