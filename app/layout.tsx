import './globals.css'
import React from 'react'

export const metadata = {
  title: 'MovieHub',
  description: 'Browse Netflix titles via Apify scraper'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
      </body>
    </html>
  )
}
