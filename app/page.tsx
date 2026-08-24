import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative selection:bg-blue-500/30">
      {/* Background glows */}
      <div className="absolute top-[-20vw] left-[-20vw] w-[60vw] h-[60vw] rounded-full bg-violet-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10vw] right-[-10vw] w-[60vw] h-[60vw] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 sm:px-16 py-6 backdrop-blur-md border-b border-white/5">
        <div className="text-2xl font-bold tracking-tight bg-linear-to-br from-white to-zinc-400 bg-clip-text text-transparent flex items-center gap-3">
          <div className="w-7 h-7 bg-linear-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg shadow-blue-500/20" />
          Credora
        </div>
        <div className="hidden sm:flex gap-8">
          <Link
            href="#features"
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            Features
          </Link>
          <Link
            href="#organizations"
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            For Organizations
          </Link>
          <Link
            href="#developers"
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            For Developers
          </Link>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center text-center px-4 pt-24 pb-20 sm:pt-32 sm:pb-24 max-w-4xl mx-auto">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <div className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest uppercase shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            Next-Gen Professional Identity
          </div>
        </div>

        <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both text-5xl sm:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-white">
          Your true work history, <br />
          <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            verified & proved.
          </span>
        </h1>

        <p className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both text-lg sm:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          Move beyond self-reported titles. Build a verifiable record of the
          projects you've actually shipped, the contributions you've made, and
          the impact you've had.
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both flex flex-col sm:flex-row gap-5">
          <button className="bg-white text-black px-8 py-4 rounded-full font-semibold shadow-[0_4px_14px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transition-all text-base">
            Claim Your Profile
          </button>
          <button className="bg-transparent text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/5 hover:border-white/40 transition-all text-base">
            Explore Network
          </button>
        </div>
      </main>

      {/* Demo Section - Comparing Old vs New */}
      <section className="relative z-10 max-w-300 mx-auto mb-32 px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* The Old Way */}
        <div className="group bg-[#141414]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-1 opacity-70 grayscale-30 hover:grayscale-0 scale-[0.97] hover:scale-[0.98]">
          <div className="text-sm uppercase tracking-widest text-zinc-500 mb-8 font-bold flex items-center gap-2">
            The Old Way (Self-Reported)
          </div>

          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-zinc-700 to-zinc-800" />
            <div>
              <h3 className="text-2xl font-semibold mb-1 text-zinc-200">
                Alex Developer
              </h3>
              <p className="text-zinc-500">Software Engineer</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 mt-6">
            <div className="text-xl font-semibold mb-1 text-zinc-300">
              Full Stack Developer
            </div>
            <div className="text-zinc-500 text-sm mb-4">
              Company A • Jan 2023 - Present
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Worked as a full stack developer responsible for maintaining and
              building web applications using React and Node.js. Collaborated
              with cross-functional teams to deliver features.
            </p>
          </div>
        </div>

        {/* The Credora Way */}
        <div className="group bg-[#141414]/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.1)] transition-all duration-500 hover:-translate-y-1">
          {/* Subtle inner glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="text-sm uppercase tracking-widest text-blue-400 mb-8 font-bold flex items-center gap-2">
            The Credora Way (Verified)
          </div>

          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-400 to-violet-500 relative shadow-lg shadow-blue-500/20">
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#141414] shadow-sm">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-1 text-white">
                Alex Developer
              </h3>
              <p className="text-blue-200/70">Verified Professional</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 mt-6">
            <div className="text-xl font-semibold mb-2 text-white">
              Full Stack Developer
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-zinc-300 text-sm font-medium">
                Company A
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Verified by Organization
              </span>
            </div>

            <div className="text-zinc-500 text-sm mb-6 flex items-center gap-2">
              Jan 2023 - Present{" "}
              <span className="w-1 h-1 rounded-full bg-zinc-700"></span> 4
              Verified Projects
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all">
                <div className="font-semibold text-base mb-3 text-white flex items-center gap-2">
                  Payment System Overhaul
                </div>
                <ul className="space-y-2 mb-4 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    Built REST APIs for transaction processing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    Integrated Stripe payment gateway
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    Optimized database queries, reducing latency by 40%
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-black/40 border border-white/5 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium">
                    Node.js
                  </span>
                  <span className="bg-black/40 border border-white/5 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium">
                    PostgreSQL
                  </span>
                  <span className="bg-black/40 border border-white/5 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium">
                    Redis
                  </span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all">
                <div className="font-semibold text-base mb-3 text-white flex items-center gap-2">
                  Internal Analytics Dashboard
                </div>
                <ul className="space-y-2 mb-4 text-sm text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    Developed complex data visualization components
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    Implemented real-time WebSocket updates
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-black/40 border border-white/5 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium">
                    React
                  </span>
                  <span className="bg-black/40 border border-white/5 text-zinc-300 px-3 py-1 rounded-full text-xs font-medium">
                    TypeScript
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
