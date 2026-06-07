export default function Slide10CTA() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative font-display flex flex-col"
      style={{ background: "var(--slide-primary)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 80%, rgba(0,0,0,0.4) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(167,139,250,0.35) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-center flex-1 px-[8vw]">
        <p
          className="text-[1.8vw] font-body font-medium uppercase tracking-widest mb-[2vh]"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Try it today
        </p>
        <h2
          className="text-[6.5vw] font-bold text-white leading-none tracking-tight"
          style={{ textWrap: "balance" }}
        >
          UtilityHub
        </h2>
        <p
          className="mt-[1.5vh] text-[2.8vw] font-body"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          One toolkit. Every calculation.
        </p>

        <div className="mt-[5vh] flex flex-col gap-[1.5vh]">
          <div className="flex items-center gap-[1.5vw]">
            <div
              className="w-[0.5vw] h-[0.5vw] rounded-full"
              style={{ background: "rgba(255,255,255,0.6)" }}
            />
            <p className="text-[2.1vw] font-body" style={{ color: "rgba(255,255,255,0.7)" }}>
              50+ tools across 8 categories
            </p>
          </div>
          <div className="flex items-center gap-[1.5vw]">
            <div
              className="w-[0.5vw] h-[0.5vw] rounded-full"
              style={{ background: "rgba(255,255,255,0.6)" }}
            />
            <p className="text-[2.1vw] font-body" style={{ color: "rgba(255,255,255,0.7)" }}>
              Web &amp; mobile, no account required
            </p>
          </div>
          <div className="flex items-center gap-[1.5vw]">
            <div
              className="w-[0.5vw] h-[0.5vw] rounded-full"
              style={{ background: "rgba(255,255,255,0.6)" }}
            />
            <p className="text-[2.1vw] font-body" style={{ color: "rgba(255,255,255,0.7)" }}>
              All processing stays on your device
            </p>
          </div>
        </div>

        <div className="mt-[5vh]">
          <div
            className="inline-block px-[3vw] py-[1.8vh] rounded-full text-[2vw] font-bold font-display"
            style={{ background: "white", color: "var(--slide-primary)" }}
          >
            utilityhub.app
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-[5vh] right-[7vw] text-[1.5vw] font-body"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        UtilityHub
      </div>
    </div>
  );
}
