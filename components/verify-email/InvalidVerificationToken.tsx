"use client";

import { AlertTriangle, ArrowLeft, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo/Logo";

interface InvalidVerificationTokenProps {
  onRequestNewLink?: () => void;
  isRequesting?: boolean;
}

const InvalidVerificationToken = ({
  onRequestNewLink,
  isRequesting = false,
}: InvalidVerificationTokenProps) => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      <div className="hidden lg:flex w-1/2 bg-[#0A192F] text-white relative overflow-hidden flex-col justify-between p-16 border-r border-border/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-200 h-200 bg-primary/20 rounded-full blur-[120px] opacity-60 translate-x-1/3 -translate-y-1/3" />

          <div className="absolute bottom-0 left-0 w-150 h-150 bg-blue-500/10 rounded-full blur-[100px] opacity-50 -translate-x-1/3 translate-y-1/3" />

          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-50" />
        </div>

        <div className="relative z-10">
          <Logo
            size="base"
            className="text-white [&>div]:bg-primary [&>div]:text-white"
          />
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8">
            <Mail className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Let’s get your account verified.
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed font-medium">
            Verification links expire for your security. Request a new one and
            continue setting up your professional identity.
          </p>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          Your professional identity, built around you.
        </div>
      </div>

      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-card">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-12 flex justify-center">
            <Logo size="base" />
          </div>

          <div className="text-center">
            <div className="mx-auto w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-3">
              Verification failed
            </p>

            <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Invalid verification link
            </h2>

            <p className="text-muted-foreground leading-relaxed font-medium">
              This verification link is invalid or has expired.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-border/60 bg-slate-50/60 dark:bg-slate-900/50 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-primary" />
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-1">
                  Need a new link?
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Request a new verification link to continue activating your
                  account.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onRequestNewLink}
            disabled={isRequesting}
            className="w-full mt-6 cursor-pointer group flex items-center justify-center gap-2 py-4 px-4 rounded-xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_10px_40px_rgb(79,70,229,0.5)] text-base font-bold text-white bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] hover:-translate-y-0.5"
          >
            <RefreshCw
              className={`w-5 h-5 ${
                isRequesting ? "animate-spin" : "group-hover:rotate-180"
              } transition-transform duration-500`}
            />

            {isRequesting ? "Sending..." : "Request New Link"}
          </button>

          <Link
            href="/register"
            className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Register
          </Link>

          <p className="mt-8 text-center text-xs text-muted-foreground leading-relaxed">
            Verification links can only be used once and may expire for security
            reasons.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvalidVerificationToken;
