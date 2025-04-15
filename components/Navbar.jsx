"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or title */}
        <div className="text-2xl font-semibold">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            My App
          </Link>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          <Link
            href="/"
            className="hover:text-gray-300 transition-colors text-lg"
          >
            Home
          </Link>
          <Link
            href="/login"
            className="hover:text-gray-300 transition-colors text-lg"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="hover:text-gray-300 transition-colors text-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
