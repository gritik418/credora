"use client";

import Logo from "@/components/logo/Logo";
import { ICurrentUser } from "@/features/auth/auth.interface";
import { selectCurrentUser } from "@/features/auth/auth.selectors";
import { useAppSelector } from "@/store/hooks";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const user: ICurrentUser | null = useAppSelector(selectCurrentUser);

  const navItems: NavItem[] = [
    { label: "Features", href: "/features" },
    { label: "For Organizations", href: "/organizations" },
    { label: "For Developers", href: "/developers" },
  ];

  return (
    <nav className="relative z-50 border-b border-white/5 bg-transparent px-6 py-0 backdrop-blur-md sm:px-8">
      <div className="mx-auto flex max-w-360 items-center justify-between">
        <Logo size="base" />

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium  transition-colors hover:text-white ${pathname === item.href ? "text-white" : "text-zinc-400"}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:block"
            >
              Sign In
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-all hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white lg:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mx-auto mt-6 max-w-7xl border-t border-white/5 pt-5 lg:hidden">
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
