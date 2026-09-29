import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size: "base" | "small" | "large";
  isIcon?: boolean;
  className?: string;
  href?: string;
}

const getSize = (size: "base" | "small" | "large") => {
  switch (size) {
    case "base":
      return "h-20 w-44";
    case "small":
      return "h-16 w-36";
    case "large":
      return "h-24 w-48";
  }
};

const Logo = ({
  size = "base",
  className = "",
  href = "/",
  isIcon = false,
}: LogoProps) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 text-2xl font-bold tracking-tight transition-opacity hover:opacity-85 ${className} ${getSize(size)}`}
    >
      <Image
        src={isIcon ? "/logo-icon.png" : "/logo.jpg"}
        alt="logo"
        height={400}
        width={900}
      />
    </Link>
  );
};

export default Logo;
