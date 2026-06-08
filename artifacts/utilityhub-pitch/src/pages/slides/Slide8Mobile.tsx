export default function Slide8Mobile() {
  return (
    <div
      className="w-screen h-screen overflow-hidden relative font-display flex"
      style={{ background: "#0d0d10" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(124,58,237,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-center px-[8vw] w-[55%]">
        <div
          className="w-[3vw] h-[0.3vh] mb-[2.5vh] rounded-full"
          style={{ background: "var(--slide-primary)" }}
        />
        <h2
          className="text-[4.2vw] font-bold text-text tracking-tight leading-tight"
          style={{ textWrap: "balance" }}
        >
          Mobile Companion
        </h2>
        <p
          className="mt-[2vh] text-[2vw] font-body leading-relaxed max-w-[42vw]"
          style={{ color: "var(--slide-muted)", textWrap: "pretty" }}
        >
          The full UtilityHub toolkit in your pocket. Built with Expo for iOS
          and Android — same tools, same speed, offline-ready.
        </p>

        <div className="mt-[4vh] flex flex-col gap-[2vh]">
          <div className="flex items-center gap-[2vw]">
            <div
              className="w-[3vw] h-[3vw] rounded-full flex items-center justify-center shrink-0"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#a78bfa"/>
              </svg>
            </div>
            <p className="text-[2vw] font-body" style={{ color: "var(--slide-muted)" }}>
              Native performance on iOS &amp; Android
            </p>
          </div>
          <div className="flex items-center gap-[2vw]">
            <div
              className="w-[3vw] h-[3vw] rounded-full flex items-center justify-center shrink-0"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none">
                <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[2vw] font-body" style={{ color: "var(--slide-muted)" }}>
              Offline-capable — works without a connection
            </p>
          </div>
          <div className="flex items-center gap-[2vw]">
            <div
              className="w-[3vw] h-[3vw] rounded-full flex items-center justify-center shrink-0"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#a78bfa"/>
              </svg>
            </div>
            <p className="text-[2vw] font-body" style={{ color: "var(--slide-muted)" }}>
              Same trusted calculations as the web app
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center flex-1 pr-[6vw]">
        <div
          className="w-[22vw] h-[40vh] rounded-[2.5vw] flex flex-col overflow-hidden"
          style={{ background: "var(--slide-card)", border: "1px solid rgba(124,58,237,0.3)" }}
        >
          <div
            className="px-[1.5vw] py-[2vh] flex items-center gap-[1vw]"
            style={{ borderBottom: "1px solid rgba(124,58,237,0.15)" }}
          >
            <div
              className="w-[2vw] h-[2vw] rounded-[0.4vw] flex items-center justify-center"
              style={{ background: "var(--slide-primary)" }}
            >
              <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h10M4 18h7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[1.4vw] font-bold text-text">UtilityHub</span>
          </div>
          <div className="flex-1 px-[1.5vw] py-[1.5vh] flex flex-col gap-[1.2vh]">
            <div
              className="rounded-[0.6vw] px-[1.2vw] py-[1vh]"
              style={{ background: "rgba(124,58,237,0.15)" }}
            >
              <div className="text-[1.3vw] font-body text-text">BMI Calculator</div>
              <div className="text-[1.2vw] font-body mt-[0.3vh]" style={{ color: "var(--slide-muted)" }}>Health</div>
            </div>
            <div
              className="rounded-[0.6vw] px-[1.2vw] py-[1vh]"
              style={{ background: "rgba(124,58,237,0.15)" }}
            >
              <div className="text-[1.3vw] font-body text-text">EMI Calculator</div>
              <div className="text-[1.2vw] font-body mt-[0.3vh]" style={{ color: "var(--slide-muted)" }}>Finance</div>
            </div>
            <div
              className="rounded-[0.6vw] px-[1.2vw] py-[1vh]"
              style={{ background: "rgba(124,58,237,0.15)" }}
            >
              <div className="text-[1.3vw] font-body text-text">PDF Merge</div>
              <div className="text-[1.2vw] font-body mt-[0.3vh]" style={{ color: "var(--slide-muted)" }}>PDF</div>
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
