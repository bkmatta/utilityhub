export default function Slide9Privacy() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg font-display flex flex-col justify-center">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(124,58,237,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-[10vw]">
        <div
          className="w-[8vw] h-[8vw] rounded-full flex items-center justify-center mb-[3vh]"
          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}
        >
          <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(124,58,237,0.4)" stroke="#a78bfa" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M9 12l2 2 4-4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div
          className="w-[4vw] h-[0.3vh] mb-[2.5vh] rounded-full mx-auto"
          style={{ background: "var(--slide-primary)" }}
        />

        <h2
          className="text-[5vw] font-bold text-text tracking-tight"
          style={{ textWrap: "balance" }}
        >
          Privacy by Design
        </h2>
        <p
          className="mt-[2.5vh] text-[2.2vw] font-body max-w-[65vw] leading-relaxed"
          style={{ color: "var(--slide-muted)", textWrap: "pretty" }}
        >
          Every calculation runs inside your browser using WebAssembly and
          client-side JavaScript. No server receives your data. No account
          needed. No tracking.
        </p>

        <div className="mt-[4.5vh] flex gap-[3vw]">
          <div
            className="flex flex-col items-center gap-[1.2vh] rounded-[1.2vw] px-[3vw] py-[3vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="text-[3.5vw] font-bold"
              style={{ color: "var(--slide-accent)" }}
            >
              0
            </div>
            <div className="text-[1.8vw] font-body" style={{ color: "var(--slide-muted)" }}>
              bytes uploaded
            </div>
          </div>
          <div
            className="flex flex-col items-center gap-[1.2vh] rounded-[1.2vw] px-[3vw] py-[3vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="text-[3.5vw] font-bold"
              style={{ color: "var(--slide-accent)" }}
            >
              0
            </div>
            <div className="text-[1.8vw] font-body" style={{ color: "var(--slide-muted)" }}>
              accounts required
            </div>
          </div>
          <div
            className="flex flex-col items-center gap-[1.2vh] rounded-[1.2vw] px-[3vw] py-[3vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="text-[3.5vw] font-bold"
              style={{ color: "var(--slide-accent)" }}
            >
              100%
            </div>
            <div className="text-[1.8vw] font-body" style={{ color: "var(--slide-muted)" }}>
              in-browser processing
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-[5vh] right-[7vw] text-[1.5vw] font-body"
        style={{ color: "var(--slide-muted)", opacity: 0.4 }}
      >
        UtilityHub
      </div>
    </div>
  );
}
