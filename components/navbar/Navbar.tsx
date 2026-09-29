"use client";

import Logo from "@/components/logo/Logo";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 border-b border-white/5 bg-transparent px-6 py-0 backdrop-blur-md sm:px-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo size="base" />

        <div className="hidden items-center gap-8 sm:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Features
          </Link>

          <Link
            href="#organizations"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            For Organizations
          </Link>

          <Link
            href="#developers"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            For Developers
          </Link>
        </div>

        <Link
          href="/login"
          className="hidden rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:block"
        >
          Sign In
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white sm:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="mx-auto mt-6 max-w-7xl border-t border-white/5 pt-5 sm:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="#features"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-blue-500/5 hover:text-blue-400"
            >
              Features
            </Link>

            <Link
              href="#organizations"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-blue-500/5 hover:text-blue-400"
            >
              For Organizations
            </Link>

            <Link
              href="#developers"
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-violet-500/5 hover:text-violet-400"
            >
              For Developers
            </Link>

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
