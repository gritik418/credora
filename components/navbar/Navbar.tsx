"use client";

import Logo from "@/components/logo/Logo";
import { ICurrentUser } from "@/features/auth/auth.interface";
import { selectCurrentUser } from "@/features/auth/auth.selectors";
import { useAppSelector } from "@/store/hooks";
import {
  Home,
  ImagesIcon,
  Menu,
  Sparkles,
  Stars,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BsChatText } from "react-icons/bs";
import ProfileMenu from "./ProfileMenu";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactElement;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const user: ICurrentUser | null = useAppSelector(selectCurrentUser);

  const navItems: NavItem[] = useMemo(() => {
    const isPostsPage = pathname.startsWith("/posts");

    return [
      {
        label: "Home",
        href: "/",
        icon: <Home size={15} />,
      },
      {
        label: "Posts",
        href: "/posts/feed",
        icon: <ImagesIcon size={15} />,
      },
      {
        label: "Discover",
        href: "/discover",
        icon: <Stars size={15} />,
      },
      {
        label: "Network",
        href: "/connections",
        icon: <Users size={15} />,
      },
      {
        label: "Messaging",
        href: "/messaging",
        icon: <BsChatText size={15} />,
      },
    ];
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/posts") return pathname === "/posts";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="relative z-50 w-full border-b border-white/6 px-5 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex h-18 max-w-360 items-center justify-between">
        <Logo size="base" />

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group text-xs flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium transition-all ${
                  active
                    ? "border border-indigo-400/15 bg-indigo-500/10 text-white"
                    : "border border-transparent text-zinc-400 hover:bg-white/4 hover:text-zinc-100"
                }`}
              >
                <span
                  className={`transition-colors ${
                    active
                      ? "text-indigo-300"
                      : "text-zinc-500 group-hover:text-indigo-300"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <Link
              href="/login"
              className="hidden rounded-xl border border-white/10 bg-white/4 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-indigo-400/30 hover:bg-indigo-500/10 sm:block"
            >
              Sign in
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/4 text-zinc-300 transition-all hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white lg:hidden"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mx-auto max-w-360 border-t border-white/6 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    active
                      ? "bg-indigo-500/10 text-white"
                      : "text-zinc-400 hover:bg-white/4 hover:text-white"
                  }`}
                >
                  <span
                    className={active ? "text-indigo-300" : "text-zinc-500"}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}

            {!user && (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center gap-3 rounded-xl border border-white/6 px-4 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-white/4 hover:text-white"
              >
                <Sparkles size={15} className="text-indigo-300" />
                Sign in to Credora
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
