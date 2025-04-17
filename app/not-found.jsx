// app/not-found.js
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
}
