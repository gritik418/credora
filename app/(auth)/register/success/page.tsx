"use client";

import { CheckCircle2, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo/Logo";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterSuccessPage = () => {
  const router = useRouter();
  const [isResending, setIsResending] = useState<boolean>(false);

  const handleResend = () => {
    setIsResending(true);
    router.push("/register");
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <div className="hidden lg:flex w-1/2 bg-[#0A192F] text-white relative overflow-hidden flex-col justify-between p-16 border-r border-border/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-200 h-200 bg-primary/20 rounded-full blur-[120px] opacity-60 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-150 h-150 bg-blue-500/10 rounded-full blur-[100px] opacity-50 -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10">
          <Logo
            size="base"
            className="text-white [&>div]:bg-primary [&>div]:text-white"
          />
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Welcome to Credora.
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed font-medium">
            Your account is ready. Verify your email to activate your
            professional identity and get started.
          </p>
        </div>

        <div className="relative z-10 text-sm text-slate-500">
          Your professional identity, built around you.
        </div>
      </div>

      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-card">
        <div className="w-full max-w-md text-center">
          <div className="lg:hidden mb-12 flex justify-center">
            <Logo size="base" />
          </div>
          <div className="mx-auto w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(79,70,229,0.15)]">
            <Mail className="w-10 h-10 text-primary" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Account created
          </p>
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Check your email
          </h2>
          <p className="text-muted-foreground leading-relaxed font-medium">
            Your Credora account has been created successfully.
          </p>
          <div className="mt-6 rounded-2xl border border-border/60 bg-slate-50/60 dark:bg-slate-900/50 p-5 text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-1">
                  Verification email sent
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  We’ve sent a verification link to your email address. Open the
                  email and click the link to verify your account.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="w-full cursor-pointer flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-border/60 text-sm font-bold text-foreground disabled:opacity-60 disabled:cursor-not-allowed bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300"
            >
              <RefreshCw
                className={`w-4 h-4 ${isResending ? "animate-spin" : ""}`}
              />

              {isResending ? "Sending..." : "Resend verification email"}
            </button>

            <Link
              href="/register"
              className="w-full flex items-center justify-center py-4 px-4 rounded-xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_10px_40px_rgb(79,70,229,0.5)] text-base font-bold text-white hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-primary/30 transition-all duration-300 "
            >
              Back to Register
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
            Didn’t receive the email? Check your spam or promotions folder, or
            resend the verification link above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccessPage;
