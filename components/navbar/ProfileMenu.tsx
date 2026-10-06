"use client";

import { ICurrentUser } from "@/features/auth/auth.interface";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
  user: ICurrentUser;
}

const ProfileMenu = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initials =
    user.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/8 bg-white/[0.035] p-1.5 pr-2.5 transition hover:border-white/15 hover:bg-white/6"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500/30 to-blue-500/20 text-xs font-semibold text-white">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt="Avatar"
              height={80}
              width={80}
              className="h-full rounded-sm w-full"
            />
          ) : (
            initials
          )}
        </div>

        <div className="hidden text-left sm:block">
          <p className="max-w-28 truncate text-xs font-medium text-white/80">
            {user.name}
          </p>
          <p className="max-w-28 truncate text-[10px] text-white/60 font-medium">
            @{user.username}
          </p>
        </div>

        <ChevronDown
          size={14}
          className={`text-white/30 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/8 bg-[#0b0b0e]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="border-b border-white/6 px-3 py-3">
            <p className="truncate text-sm font-medium text-white">
              {user.name}
            </p>

            <p className="mt-0.5 truncate text-xs text-white/30">
              @{user.username}
            </p>
          </div>

          <div className="py-1.5">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              <UserRound size={16} />
              Profile
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              <Settings size={16} />
              Settings
            </Link>
          </div>

          <div className="border-t border-white/6 pt-1.5">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400/70 transition hover:bg-red-500/6 hover:text-red-400"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
