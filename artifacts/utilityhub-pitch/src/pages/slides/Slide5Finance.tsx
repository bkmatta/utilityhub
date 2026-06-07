export default function Slide5Finance() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg font-display flex">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 0% 50%, rgba(124,58,237,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex w-full">
        <div className="flex flex-col justify-center px-[8vw] w-[52%]">
          <div
            className="w-[3vw] h-[0.3vh] mb-[2.5vh] rounded-full"
            style={{ background: "var(--slide-primary)" }}
          />
          <h2
            className="text-[4vw] font-bold text-text tracking-tight leading-tight"
            style={{ textWrap: "balance" }}
          >
            Finance &amp; Health
          </h2>
          <p
            className="mt-[2vh] text-[2vw] font-body leading-relaxed"
            style={{ color: "var(--slide-muted)", textWrap: "pretty" }}
          >
            Calculators built for real decisions — not just quick conversions.
          </p>

          <div className="mt-[3.5vh] flex flex-col gap-[2vh]">
            <div>
              <div className="text-[2vw] font-bold text-text mb-[0.8vh]">Finance</div>
              <div className="text-[1.8vw] font-body leading-relaxed" style={{ color: "var(--slide-muted)" }}>
                EMI · Mortgage · SIP · Compound Interest
              </div>
              <div className="text-[1.8vw] font-body leading-relaxed" style={{ color: "var(--slide-muted)" }}>
                Retirement Planner · GST · Income Tax
              </div>
            </div>
            <div
              className="h-[0.15vh] rounded-full"
              style={{ background: "rgba(124,58,237,0.3)" }}
            />
            <div>
              <div className="text-[2vw] font-bold text-text mb-[0.8vh]">Health</div>
              <div className="text-[1.8vw] font-body leading-relaxed" style={{ color: "var(--slide-muted)" }}>
                BMI · BMR · Calorie &amp; Water Intake
              </div>
              <div className="text-[1.8vw] font-body leading-relaxed" style={{ color: "var(--slide-muted)" }}>
                Body Fat · Heart Rate Zones · Pregnancy
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-1 pr-[6vw] pl-[2vw] gap-[2vh]">
          <div
            className="rounded-[1.2vw] px-[2.5vw] py-[3vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div className="text-[1.6vw] font-body mb-[1.5vh]" style={{ color: "var(--slide-muted)" }}>
              EMI Calculator
            </div>
            <div className="flex gap-[2vw] items-end">
              <div>
                <div className="text-[1.4vw] font-body mb-[0.5vh]" style={{ color: "var(--slide-muted)", opacity: 0.6 }}>
                  Loan amount
                </div>
                <div
                  className="text-[2.4vw] font-bold"
                  style={{ color: "var(--slide-accent)" }}
                >
                  $50,000
                </div>
              </div>
              <div>
                <div className="text-[1.4vw] font-body mb-[0.5vh]" style={{ color: "var(--slide-muted)", opacity: 0.6 }}>
                  Rate
                </div>
                <div
                  className="text-[2.4vw] font-bold"
                  style={{ color: "var(--slide-accent)" }}
                >
                  8.5%
                </div>
              </div>
            </div>
            <div
              className="mt-[1.5vh] pt-[1.5vh]"
              style={{ borderTop: "1px solid rgba(124,58,237,0.2)" }}
            >
              <div className="text-[1.4vw] font-body" style={{ color: "var(--slide-muted)", opacity: 0.6 }}>
                Monthly EMI
              </div>
              <div className="text-[3.2vw] font-bold text-text mt-[0.3vh]">$1,022</div>
            </div>
          </div>

          <div
            className="rounded-[1.2vw] px-[2.5vw] py-[3vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div className="text-[1.6vw] font-body mb-[1.5vh]" style={{ color: "var(--slide-muted)" }}>
              BMI Calculator
            </div>
            <div className="flex gap-[3vw] items-end">
              <div>
                <div className="text-[1.4vw] font-body mb-[0.5vh]" style={{ color: "var(--slide-muted)", opacity: 0.6 }}>Result</div>
                <div className="text-[3.2vw] font-bold text-text">22.4</div>
              </div>
              <div
                className="px-[1.2vw] py-[0.6vh] rounded-full text-[1.6vw] font-body mb-[0.5vh]"
                style={{ background: "rgba(124,58,237,0.2)", color: "var(--slide-accent)" }}
              >
                Normal weight
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
