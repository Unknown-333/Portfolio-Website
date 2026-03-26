export default function InteractiveBackground() {
  return (
    <>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" style={{ background: 'var(--gradient-hero)' }}>
        {/* Simple static background fallback for mobile */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#e0f2fe_0%,transparent_60%)] md:hidden opacity-40" />

        {/* Soft noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-multiply hidden md:block"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Soft organic shapes — bright equivalents of ink-wash blobs */}
        <div className="absolute -bottom-[20%] -left-[10%] w-[80vw] h-[60vh] bg-[#f0eef8] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[80px] opacity-60 hidden md:block animate-[spin_30s_linear_infinite]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[50vh] bg-[#e0f2fe] rounded-[50%_50%_30%_70%/50%_40%_60%_50%] blur-[100px] opacity-50 hidden md:block animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[30vh] bg-[#fef3c7] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-[80px] opacity-25 hidden md:block animate-[spin_25s_linear_infinite]" />

        {/* Soft Ambient Violet/Coral Gradient */}
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] max-w-[900px] aspect-square bg-[#7c3aed] rounded-full hidden md:block mix-blend-soft-light opacity-[0.06] blur-[150px]" />

        {/* Subtle warm vignette */}
        <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(250,250,247,0.6) 100%)', opacity: 0.5 }} />
      </div>
    </>
  );
}
