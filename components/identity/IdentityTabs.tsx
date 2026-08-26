const IdentityTabs = () => {
  return (
    <nav className="mt-6 flex gap-1 overflow-x-auto border-b border-border">
      {["Overview", "Experience", "Projects", "Activity"].map((tab, index) => (
        <button
          key={tab}
          className={`relative whitespace-nowrap px-4 py-3 text-sm font-medium transition ${
            index === 0
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab}

          {index === 0 && (
            <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-primary" />
          )}
        </button>
      ))}
    </nav>
  );
};

export default IdentityTabs;
