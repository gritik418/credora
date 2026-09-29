import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full overflow-x-hidden bg-[#050505] font-sans text-white selection:bg-blue-500/30">
      <div className="pointer-events-none absolute left-[-20vw] top-[-20vw] z-0 h-full w-full rounded-full bg-violet-900/20 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[-10vw] right-[-10vw] z-0 h-full w-full rounded-full bg-blue-600/20 blur-[120px]" />

      {children}
    </div>
  );
};

export default PageWrapper;
