export default function Slide1Title() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg font-display flex flex-col">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full opacity-10"
        style={{ background: "var(--slide-primary)", filter: "blur(8vw)", transform: "translate(20%, -20%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full opacity-8"
        style={{ background: "var(--slide-accent)", filter: "blur(6vw)", transform: "translate(-20%, 20%)" }}
      />

      <div className="absolute top-[7vh] left-[7vw] flex items-center gap-[1vw]">
        <div
          className="w-[3vw] h-[3vw] rounded-[0.6vw] flex items-center justify-center"
          style={{ background: "var(--slide-primary)" }}
        >
          <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h10M4 18h7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-[1.6vw] font-bold text-text tracking-tight">UtilityHub</span>
      </div>

      <div className="relative z-10 flex flex-col justify-center flex-1 px-[8vw] pt-[4vh]">
        <div
          className="w-[5vw] h-[0.3vh] mb-[3vh] rounded-full"
          style={{ background: "var(--slide-primary)" }}
        />
        <h1
          className="text-[7vw] font-bold text-text leading-none tracking-tight"
          style={{ textWrap: "balance" }}
        >
          One toolkit.
        </h1>
        <h1
          className="text-[7vw] font-bold leading-none tracking-tight"
          style={{ color: "var(--slide-accent)", textWrap: "balance" }}
        >
          Every calculation.
        </h1>
        <p
          className="mt-[3.5vh] text-[2.2vw] font-body"
          style={{ color: "var(--slide-muted)", textWrap: "pretty" }}
        >
          50+ tools across 8 categories — finance, health, developer, PDF,
          image, converters, and more.
        </p>
        <p
          className="mt-[2vh] text-[2vw] font-body"
          style={{ color: "var(--slide-muted)", opacity: 0.7 }}
        >
          All in-browser. No account required. No data leaves your device.
        </p>
      </div>

      <div
        className="absolute bottom-[5vh] right-[7vw] text-[1.5vw] font-body"
        style={{ color: "var(--slide-muted)", opacity: 0.5 }}
      >
        utilityhub.app
      </div>
    </div>
  );
}
