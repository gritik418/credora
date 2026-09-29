"use client";
import { ArrowRight, Lock, Mail } from "lucide-react";

import Logo from "@/components/logo/Logo";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Left Section: Immersive Brand Hero (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-[#0A192F] text-white relative overflow-hidden flex-col justify-between p-16 border-r border-border/20">
        {/* Abstract Tech Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Glowing Orbs */}
          <div className="absolute top-0 right-0 w-200 h-200 bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-60 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-150 h-150 bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen opacity-50 -translate-x-1/3 translate-y-1/3"></div>

          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50"></div>
        </div>

        <div className="relative z-10">
          <Logo className="text-white [&>div]:bg-primary [&>div]:text-white" />
        </div>

        <div className="relative mt-5 z-10 my-auto max-w-xl">
          <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight text-white lg:text-6xl">
            Your work deserves to be
            <span className="text-primary"> recognized.</span>
          </h1>

          <p className="mb-12 text-xl font-medium leading-relaxed text-slate-300">
            Sign in to manage your verified professional history, showcase your
            contributions, and build a career profile backed by real experience.
          </p>

          {/* Career journey */}
          <div className="space-y-6">
            {[
              {
                title: "Your experience",
                description:
                  "Document the work, projects, and impact that define your career.",
              },
              {
                title: "Verified credentials",
                description:
                  "Build trust with professional information connected to real organizations.",
              },
              {
                title: "Your professional story",
                description:
                  "Create a career history that goes beyond job titles and resumes.",
              },
            ].map((item, index) => (
              <div key={item.title} className="flex gap-5">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-sm font-bold text-primary">
                    0{index + 1}
                  </div>

                  {index !== 2 && (
                    <div className="mt-2 h-10 w-px bg-linear-to-b from-primary/30 to-transparent" />
                  )}
                </div>

                <div className="pt-1">
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: The Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 relative bg-card">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-12 flex justify-center">
            <Logo />
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-5xl font-extrabold text-foreground mb-3 tracking-tight">
              Welcome back!
            </h2>
            <p className="text-muted-foreground font-medium">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-bold hover:underline"
              >
                Create one here
              </Link>
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="group flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border border-border/60 bg-card text-sm font-bold text-foreground hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:-translate-y-0.5 hover:border-border hover:shadow-md transition-all duration-300">
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button className="group flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border border-border/60 bg-card text-sm font-bold text-[#0A66C2] dark:text-primary hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:-translate-y-0.5 hover:border-border hover:shadow-md transition-all duration-300">
              <FaLinkedinIn className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>LinkedIn</span>
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider font-semibold">
              <span className="px-4 bg-card text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="identifier"
                  className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1"
                >
                  Email or Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/60 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="identifier"
                    type="text"
                    placeholder="Email or username"
                    className="block w-full pl-11 pr-4 py-3.5 border border-border/60 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/60 transition-all duration-300 shadow-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between pl-1 pr-1">
                  <label
                    htmlFor="password"
                    className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] font-bold text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/60 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="block w-full pl-11 pr-4 py-3.5 border border-border/60 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/60 transition-all duration-300 shadow-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full group flex items-center justify-center gap-2 py-4 px-4 rounded-xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_10px_40px_rgb(79,70,229,0.5)] text-base font-bold text-white bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 mt-8 active:scale-[0.98] hover:-translate-y-0.5"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
