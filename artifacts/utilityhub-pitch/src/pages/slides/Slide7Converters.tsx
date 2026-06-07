export default function Slide7Converters() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg font-display flex flex-col">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,58,237,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-center h-full px-[8vw]">
        <div
          className="w-[3vw] h-[0.3vh] mb-[2.5vh] rounded-full"
          style={{ background: "var(--slide-primary)" }}
        />
        <h2
          className="text-[4vw] font-bold text-text tracking-tight leading-tight"
          style={{ textWrap: "balance" }}
        >
          Converters &amp; Business
        </h2>
        <p
          className="mt-[2vh] text-[2vw] font-body max-w-[55vw] leading-relaxed"
          style={{ color: "var(--slide-muted)", textWrap: "pretty" }}
        >
          Unit conversions for every discipline. Business document generators
          ready to export.
        </p>

        <div className="mt-[4vh] grid grid-cols-2 gap-[2.5vw] max-w-[80vw]">
          <div>
            <div
              className="text-[1.6vw] font-body font-medium uppercase tracking-widest mb-[2vh]"
              style={{ color: "var(--slide-primary)" }}
            >
              Converters
            </div>
            <div className="flex flex-col gap-[1.2vh]">
              <div
                className="flex items-center justify-between rounded-[0.8vw] px-[2vw] py-[1.4vh]"
                style={{ background: "var(--slide-card)" }}
              >
                <span className="text-[1.9vw] font-body text-text">Currency</span>
                <span className="text-[1.7vw] font-body" style={{ color: "var(--slide-muted)" }}>USD → EUR</span>
              </div>
              <div
                className="flex items-center justify-between rounded-[0.8vw] px-[2vw] py-[1.4vh]"
                style={{ background: "var(--slide-card)" }}
              >
                <span className="text-[1.9vw] font-body text-text">Length</span>
                <span className="text-[1.7vw] font-body" style={{ color: "var(--slide-muted)" }}>km → miles</span>
              </div>
              <div
                className="flex items-center justify-between rounded-[0.8vw] px-[2vw] py-[1.4vh]"
                style={{ background: "var(--slide-card)" }}
              >
                <span className="text-[1.9vw] font-body text-text">Temperature</span>
                <span className="text-[1.7vw] font-body" style={{ color: "var(--slide-muted)" }}>°C → °F</span>
              </div>
              <div
                className="flex items-center justify-between rounded-[0.8vw] px-[2vw] py-[1.4vh]"
                style={{ background: "var(--slide-card)" }}
              >
                <span className="text-[1.9vw] font-body text-text">Weight · Area · Volume · Speed</span>
                <span className="text-[1.7vw] font-body" style={{ color: "var(--slide-muted)" }}>+4 more</span>
              </div>
            </div>
          </div>

          <div>
            <div
              className="text-[1.6vw] font-body font-medium uppercase tracking-widest mb-[2vh]"
              style={{ color: "var(--slide-primary)" }}
            >
              Business
            </div>
            <div className="flex flex-col gap-[1.2vh]">
              <div
                className="flex items-center justify-between rounded-[0.8vw] px-[2vw] py-[1.4vh]"
                style={{ background: "var(--slide-card)" }}
              >
                <span className="text-[1.9vw] font-body text-text">Invoice Generator</span>
                <span className="text-[1.7vw] font-body" style={{ color: "var(--slide-muted)" }}>PDF export</span>
              </div>
              <div
                className="flex items-center justify-between rounded-[0.8vw] px-[2vw] py-[1.4vh]"
                style={{ background: "var(--slide-card)" }}
              >
                <span className="text-[1.9vw] font-body text-text">Quotation Generator</span>
                <span className="text-[1.7vw] font-body" style={{ color: "var(--slide-muted)" }}>PDF export</span>
              </div>
              <div
                className="flex items-center justify-between rounded-[0.8vw] px-[2vw] py-[1.4vh]"
                style={{ background: "var(--slide-card)" }}
              >
                <span className="text-[1.9vw] font-body text-text">Salary Calculator</span>
                <span className="text-[1.7vw] font-body" style={{ color: "var(--slide-muted)" }}>net pay</span>
              </div>
              <div
                className="flex items-center justify-between rounded-[0.8vw] px-[2vw] py-[1.4vh]"
                style={{ background: "var(--slide-card)" }}
              >
                <span className="text-[1.9vw] font-body text-text">Profit Margin</span>
                <span className="text-[1.7vw] font-body" style={{ color: "var(--slide-muted)" }}>markup %</span>
              </div>
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
