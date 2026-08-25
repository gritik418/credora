"use client";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import { Logo } from "@/components/Logo/Logo";
import { UserRole } from "@/features/auth/auth.interface";
import RegisterDto from "@/features/auth/dto/register.dto";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaLinkedinIn } from "react-icons/fa";

import { useRegisterMutation } from "@/features/auth/auth.api";
import RegisterSchema from "@/features/auth/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { da } from "zod/locales";

export default function RegisterPage() {
  const [registerUser] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterDto>({
    defaultValues: {
      name: "",
      email: "",
      role: UserRole.EMPLOYEE,
      password: "",
      passwordConfirmation: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = async (values: RegisterDto) => {
    try {
      const { data, error } = await registerUser(values);

      // if(data){
      //   if(data.success){
      //     toast.success(data.message);
      //     reset();
      //     router.push("/");
      //     return;
      //   }
      // }

      console.log("data", data);
      console.log("error", error);
      // if(error) {
      //   toast.error(error.data.message)
      // }

      // if(data) {
      //   toast.success(data.message)
      // }

      // reset();
    } catch (error) {
      console.error(error);
    }
  };

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

        <div className="relative z-10 mt-5 my-auto max-w-xl">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
            Build a career history that speaks for itself.
          </h1>

          <p className="text-xl text-slate-300 mb-12 leading-relaxed font-medium">
            Join the most exclusive platform for professionals to connect,
            verify their experience, and collaborate with top organizations.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-5 group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(79,70,229,0.15)] group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>

              <div>
                <h3 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">
                  Build Your Professional Identity
                </h3>

                <p className="text-slate-400 leading-relaxed font-medium text-sm">
                  Create a profile that captures your experience, contributions,
                  skills, and professional journey.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(79,70,229,0.15)] group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>

              <div>
                <h3 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">
                  Make Your Experience Verifiable
                </h3>

                <p className="text-slate-400 leading-relaxed font-medium text-sm">
                  Build credibility with a professional history connected to the
                  organizations and work that shaped your career.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(79,70,229,0.15)] group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>

              <div>
                <h3 className="font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors">
                  Unlock Your Next Opportunity
                </h3>

                <p className="text-slate-400 leading-relaxed font-medium text-sm">
                  Turn your verified experience into a stronger professional
                  presence and discover new opportunities.
                </p>
              </div>
            </div>
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
            <h2 className="text-4xl font-extrabold text-foreground mb-3 tracking-tight">
              Create your account
            </h2>
            <p className="text-muted-foreground font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline"
              >
                Sign in here
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

          <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1"
                >
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/60 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    {...register("name")}
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="block w-full pl-11 pr-4 py-3.5 border border-border/60 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/60 transition-all duration-300 shadow-sm font-medium"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/60 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="block w-full pl-11 pr-4 py-3.5 border border-border/60 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/60 transition-all duration-300 shadow-sm font-medium"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1"
                >
                  Role
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/60 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>
                  <select
                    {...register("role")}
                    id="role"
                    className="block w-full capitalize pl-11 pr-4 py-3.5 border border-border/60 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/60 transition-all duration-300 shadow-sm font-medium"
                  >
                    {Object.values(UserRole)
                      .filter((role) => role !== UserRole.ADMIN)
                      .map((role) => (
                        <option key={role} value={role} className="capitalize">
                          {role.toLowerCase()}
                        </option>
                      ))}
                  </select>
                </div>
                {errors.role && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/60 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    {...register("password")}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="block w-full pl-11 pr-4 py-3.5 border border-border/60 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/60 transition-all duration-300 shadow-sm font-medium"
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80 pl-1"
                >
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/60 group-focus-within:text-primary group-focus-within:scale-110 transition-all duration-300">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    {...register("passwordConfirmation")}
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="block w-full pl-11 pr-4 py-3.5 border border-border/60 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/60 transition-all duration-300 shadow-sm font-medium"
                  />
                </div>
                {errors.passwordConfirmation && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.passwordConfirmation.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer group flex items-center justify-center gap-2 py-4 px-4 rounded-xl shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_10px_40px_rgb(79,70,229,0.5)] text-base font-bold text-white bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 mt-8 active:scale-[0.98] hover:-translate-y-0.5"
            >
              Agree & Join
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
            By clicking Agree & Join, you agree to the Credora{" "}
            <a href="#" className="font-bold text-primary hover:underline">
              User Agreement
            </a>
            {" and "}
            <a href="#" className="font-bold text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
