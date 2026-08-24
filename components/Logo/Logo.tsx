import { Globe2 } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string;
}

export function Logo({ className = "", href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 text-2xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity ${className}`}
    >
      <div className="p-2 bg-primary rounded-xl shadow-sm text-primary-foreground">
        <Globe2 className="w-5 h-5" />
      </div>
      Credora
    </Link>
  );
}
