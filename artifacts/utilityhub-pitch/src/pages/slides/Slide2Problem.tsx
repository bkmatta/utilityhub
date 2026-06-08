export default function Slide2Problem() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg font-display flex flex-col">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(124,58,237,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex flex-col justify-center h-full px-[8vw]">
        <div
          className="w-[3vw] h-[0.3vh] mb-[2.5vh] rounded-full"
          style={{ background: "var(--slide-primary)" }}
        />
        <h2
          className="text-[4.5vw] font-bold text-text tracking-tight leading-tight"
          style={{ textWrap: "balance" }}
        >
          Scattered tools.<br />Scattered answers.
        </h2>
        <p
          className="mt-[2.5vh] text-[2.2vw] font-body max-w-[55vw]"
          style={{ color: "var(--slide-muted)", textWrap: "pretty" }}
        >
          Every time you need a quick calculation, you open a new tab, get lost
          in ads, enter data into an unfamiliar form, and start over on the next
          tool.
        </p>

        <div className="mt-[4vh] flex flex-col gap-[1.8vh] max-w-[60vw]">
          <div className="flex items-start gap-[2vw]">
            <div
              className="mt-[0.4vh] w-[0.5vw] h-[0.5vw] rounded-full shrink-0"
              style={{ background: "var(--slide-accent)" }}
            />
            <p className="text-[2.1vw] font-body" style={{ color: "var(--slide-muted)" }}>
              Dozens of one-purpose websites, each with a different UI
            </p>
          </div>
          <div className="flex items-start gap-[2vw]">
            <div
              className="mt-[0.4vh] w-[0.5vw] h-[0.5vw] rounded-full shrink-0"
              style={{ background: "var(--slide-accent)" }}
            />
            <p className="text-[2.1vw] font-body" style={{ color: "var(--slide-muted)" }}>
              Results you can't trust because the formula is hidden
            </p>
          </div>
          <div className="flex items-start gap-[2vw]">
            <div
              className="mt-[0.4vh] w-[0.5vw] h-[0.5vw] rounded-full shrink-0"
              style={{ background: "var(--slide-accent)" }}
            />
            <p className="text-[2.1vw] font-body" style={{ color: "var(--slide-muted)" }}>
              Data uploaded to unknown servers with no privacy guarantee
            </p>
          </div>
        </div>
      </div>

      <div
        className="absolute right-[6vw] top-[50%]"
        style={{ transform: "translateY(-50%)" }}
      >
        <div
          className="flex flex-col gap-[1.5vh]"
        >
          <div
            className="px-[2vw] py-[1.2vh] rounded-[0.8vw] text-[1.8vw] font-body"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", color: "var(--slide-muted)" }}
          >
            bmi-calculator.net
          </div>
          <div
            className="px-[2vw] py-[1.2vh] rounded-[0.8vw] text-[1.8vw] font-body"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", color: "var(--slide-muted)" }}
          >
            freecalc.io
          </div>
          <div
            className="px-[2vw] py-[1.2vh] rounded-[0.8vw] text-[1.8vw] font-body"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", color: "var(--slide-muted)" }}
          >
            pdfmerger247.com
          </div>
          <div
            className="px-[2vw] py-[1.2vh] rounded-[0.8vw] text-[1.8vw] font-body"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", color: "var(--slide-muted)" }}
          >
            unitconverter.pro
          </div>
          <div
            className="px-[2vw] py-[1.2vh] rounded-[0.8vw] text-[1.8vw] font-body"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", color: "var(--slide-muted)" }}
          >
            loancalculator.net
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
