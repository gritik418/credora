import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] font-sans text-white selection:bg-blue-500/30">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-20vw] top-[-20vw] h-full w-full rounded-full bg-violet-900/20 blur-[120px]" />

        <div className="absolute bottom-[-10vw] right-[-10vw] h-full w-full rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default PageWrapper;
