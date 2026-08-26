import {
  CheckCircle2,
  Copy,
  ExternalLink,
  MapPin,
  MoreHorizontal,
  Share2,
} from "lucide-react";

const IdentityHeader = ({ username }: { username: string }) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Header background */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-br from-primary/15 via-indigo-500/8 to-transparent" />

      <div className="relative p-6 sm:p-8 lg:p-10">
        {/* Top row */}
        <div className="flex justify-between">
          <div className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
            Professional Identity
          </div>

          <button className="rounded-xl border border-border bg-background/70 p-2 backdrop-blur transition hover:bg-muted">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-background bg-linear-to-br from-primary to-indigo-500 text-3xl font-bold text-white shadow-xl shadow-primary/20">
                RG
              </div>

              <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-emerald-500 text-white">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ritik Gupta
                </h1>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>

              <p className="mt-2 text-lg font-medium text-foreground/80">
                Full Stack Developer
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  India
                </span>

                <span>6 months professional experience</span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <code className="rounded-lg bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                  credora.dev/@{username}
                </code>

                <button className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground">
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90">
              View record
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 max-w-3xl">
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            Full Stack Developer focused on building modern web applications and
            AI-powered products. Experienced across frontend architecture,
            backend APIs, databases, authentication, and production deployments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IdentityHeader;
