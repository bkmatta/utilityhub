export default function Slide3Solution() {
  return (
    <div className="w-screen h-screen overflow-hidden relative font-display flex flex-col"
      style={{ background: "var(--slide-primary)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(167,139,250,0.3) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(0,0,0,0.3) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-center h-full px-[8vw]">
        <p
          className="text-[1.8vw] font-body font-medium uppercase tracking-widest mb-[2vh]"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          The Solution
        </p>
        <h2
          className="text-[5.5vw] font-bold text-white leading-none tracking-tight"
          style={{ textWrap: "balance" }}
        >
          Everything in one place.
        </h2>
        <h2
          className="text-[5.5vw] font-bold leading-none tracking-tight mt-[1vh]"
          style={{ color: "rgba(255,255,255,0.75)", textWrap: "balance" }}
        >
          Nothing leaves your browser.
        </h2>

        <div className="mt-[5vh] grid grid-cols-3 gap-[2vw] max-w-[75vw]">
          <div
            className="rounded-[1vw] px-[2vw] py-[2.5vh]"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <div className="text-[3vw] font-bold text-white mb-[0.8vh]">50+</div>
            <div className="text-[1.8vw] font-body" style={{ color: "rgba(255,255,255,0.75)" }}>
              tools in one app
            </div>
          </div>
          <div
            className="rounded-[1vw] px-[2vw] py-[2.5vh]"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <div className="text-[3vw] font-bold text-white mb-[0.8vh]">8</div>
            <div className="text-[1.8vw] font-body" style={{ color: "rgba(255,255,255,0.75)" }}>
              categories covered
            </div>
          </div>
          <div
            className="rounded-[1vw] px-[2vw] py-[2.5vh]"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <div className="text-[3vw] font-bold text-white mb-[0.8vh]">0</div>
            <div className="text-[1.8vw] font-body" style={{ color: "rgba(255,255,255,0.75)" }}>
              data sent to servers
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-[5vh] right-[7vw] text-[1.5vw] font-body"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        UtilityHub
      </div>
    </div>
  );
}
