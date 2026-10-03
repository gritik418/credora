"use client";

import { CheckCircle2, Loader2, Mail, ShieldCheck } from "lucide-react";
import Logo from "@/components/logo/Logo";
import InvalidVerificationToken from "@/components/verify-email/InvalidVerificationToken";
import { toast } from "react-toastify";
import { useVerifyEmailMutation } from "@/features/auth/auth.api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [verify] = useVerifyEmailMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);

  const handleVerifyEmail = async () => {
    try {
      if (!token || !uid) {
        setIsInvalid(true);
        return;
      }

      setIsVerifying(true);

      const result = await verify({
        token,
        uid,
      }).unwrap();

      if (!result.success) {
        toast.error(
          result.message || "Something went wrong. Please try again later.",
        );
      } else {
        toast.success(result.message || "Email verified successfully.");

        router.push("/");
      }
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error("Network Error. Please check your connection.");
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (!searchParams) return;

    const token = searchParams.get("token");
    const uid = searchParams.get("uid");

    if (!token || !uid) {
      setIsInvalid(true);
      return;
    }

    setToken(token);
    setUid(uid);
  }, [searchParams]);

  if (isInvalid) return <InvalidVerificationToken />;

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
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>

          <h1 className="text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Secure your professional identity.
          </h1>

          <p className="text-xl text-slate-300 leading-relaxed font-medium">
            Verify your email address to activate your Credora account and
            continue building your professional identity.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-slate-300 font-medium">
                Secure your account
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-slate-300 font-medium">
                Protect your professional identity
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-slate-300 font-medium">
                Continue to your Credora profile
              </span>
            </div>
          </div>
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
            <div className="mx-auto w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(79,70,229,0.15)]">
              <Mail className="w-10 h-10 text-primary" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              Account verification
            </p>

            <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Verify your email
            </h2>

            <p className="text-muted-foreground leading-relaxed font-medium">
              Confirm your email address to activate your account.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-border/60 bg-slate-50/60 dark:bg-slate-900/50 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-1">
                  Ready to verify?
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Click the button below to verify your email address and
                  activate your Credora account.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleVerifyEmail}
            disabled={isVerifying}
            className="w-full mt-6 cursor-pointer group flex items-center justify-center gap-2 py-4 px-4 rounded-xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_10px_40px_rgb(79,70,229,0.5)] text-base font-bold text-white bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] hover:-translate-y-0.5"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify Email
                <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </>
            )}
          </button>

          <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
            By verifying your email, you confirm that you have access to this
            email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
