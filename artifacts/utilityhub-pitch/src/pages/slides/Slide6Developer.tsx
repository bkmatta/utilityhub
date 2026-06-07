export default function Slide6Developer() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg font-display flex flex-col">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 100% 50%, rgba(124,58,237,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex h-full">
        <div className="flex flex-col justify-center flex-1 pl-[6vw] pr-[2vw] gap-[2vh]">
          <div
            className="rounded-[1.2vw] p-[2.5vw]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="text-[1.6vw] font-body mb-[1.5vh]"
              style={{ color: "var(--slide-muted)" }}
            >
              JSON Formatter
            </div>
            <div
              className="rounded-[0.6vw] px-[1.5vw] py-[1.5vh] font-mono"
              style={{ background: "rgba(0,0,0,0.4)", fontSize: "1.5vw", color: "var(--slide-accent)" }}
            >
              <div style={{ color: "var(--slide-muted)" }}>{"{"}</div>
              <div className="ml-[1.5vw]">
                <span style={{ color: "#a78bfa" }}>"name"</span>
                <span style={{ color: "var(--slide-muted)" }}>: </span>
                <span style={{ color: "#86efac" }}>"John"</span>
                <span style={{ color: "var(--slide-muted)" }}>,</span>
              </div>
              <div className="ml-[1.5vw]">
                <span style={{ color: "#a78bfa" }}>"age"</span>
                <span style={{ color: "var(--slide-muted)" }}>: </span>
                <span style={{ color: "#fbbf24" }}>30</span>
              </div>
              <div style={{ color: "var(--slide-muted)" }}>{"}"}</div>
            </div>
          </div>

          <div
            className="rounded-[1.2vw] p-[2.5vw]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="text-[1.6vw] font-body mb-[1.5vh]"
              style={{ color: "var(--slide-muted)" }}
            >
              UUID v4 Generator
            </div>
            <div
              className="font-mono text-[1.7vw] tracking-wider"
              style={{ color: "var(--slide-accent)" }}
            >
              f47ac10b-58cc-4372-a567-0e02b2c3d479
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center w-[52%] px-[6vw]">
          <div
            className="w-[3vw] h-[0.3vh] mb-[2.5vh] rounded-full"
            style={{ background: "var(--slide-primary)" }}
          />
          <h2
            className="text-[4vw] font-bold text-text tracking-tight leading-tight"
            style={{ textWrap: "balance" }}
          >
            Developer &amp; PDF
          </h2>
          <p
            className="mt-[2vh] text-[2vw] font-body leading-relaxed"
            style={{ color: "var(--slide-muted)", textWrap: "pretty" }}
          >
            Power tools for working faster — no installs, no plugins, just open
            and use.
          </p>

          <div className="mt-[3.5vh] flex flex-col gap-[2vh]">
            <div>
              <div className="text-[2vw] font-bold text-text mb-[0.8vh]">Developer</div>
              <div className="text-[1.8vw] font-body leading-relaxed" style={{ color: "var(--slide-muted)" }}>
                JSON &amp; XML Formatter · JWT Decoder
              </div>
              <div className="text-[1.8vw] font-body leading-relaxed" style={{ color: "var(--slide-muted)" }}>
                Base64 · UUID Generator · Regex Tester
              </div>
            </div>
            <div
              className="h-[0.15vh] rounded-full"
              style={{ background: "rgba(124,58,237,0.3)" }}
            />
            <div>
              <div className="text-[2vw] font-bold text-text mb-[0.8vh]">PDF</div>
              <div className="text-[1.8vw] font-body leading-relaxed" style={{ color: "var(--slide-muted)" }}>
                Merge · Split · Compress · Rotate
              </div>
              <div className="text-[1.8vw] font-body leading-relaxed" style={{ color: "var(--slide-muted)" }}>
                OCR · Sign · Watermark · Word export
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
