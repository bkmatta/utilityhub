export default function Slide9Testimonials() {
  const quotes = [
    {
      text: "Replaced a dozen bookmarked sites with one tab. The EMI and tax calculators alone save me hours every month.",
      name: "Priya N.",
      role: "Freelance Accountant",
    },
    {
      text: "Finally a dev toolkit where my JSON and JWTs never touch a server. I use the formatter every single day.",
      name: "Marcus T.",
      role: "Backend Engineer",
    },
    {
      text: "Merging and signing PDFs offline on my phone is a game changer. Fast, private, and it just works.",
      name: "Lena K.",
      role: "Small Business Owner",
    },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg font-display flex flex-col justify-center">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 35%, rgba(124,58,237,0.10) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-[8vw]">
        <p
          className="text-[1.8vw] font-body font-medium uppercase tracking-widest mb-[2vh] text-center"
          style={{ color: "var(--slide-muted)" }}
        >
          Traction
        </p>
        <h2
          className="text-[5vw] font-bold text-text tracking-tight text-center"
          style={{ textWrap: "balance" }}
        >
          Loved by people who do the work
        </h2>

        <div className="mt-[3vh] flex gap-[3vw] mb-[5vh]">
          <div className="flex flex-col items-center gap-[0.6vh]">
            <div className="text-[3.5vw] font-bold" style={{ color: "var(--slide-accent)" }}>
              120K+
            </div>
            <div className="text-[1.5vw] font-body" style={{ color: "var(--slide-muted)" }}>
              monthly users
            </div>
          </div>
          <div className="flex flex-col items-center gap-[0.6vh]">
            <div className="text-[3.5vw] font-bold" style={{ color: "var(--slide-accent)" }}>
              4.9
            </div>
            <div className="text-[1.5vw] font-body" style={{ color: "var(--slide-muted)" }}>
              average rating
            </div>
          </div>
          <div className="flex flex-col items-center gap-[0.6vh]">
            <div className="text-[3.5vw] font-bold" style={{ color: "var(--slide-accent)" }}>
              2M+
            </div>
            <div className="text-[1.5vw] font-body" style={{ color: "var(--slide-muted)" }}>
              calculations run
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[2vw] max-w-[80vw]">
          {quotes.map((q) => (
            <div
              key={q.name}
              className="flex flex-col rounded-[1.2vw] px-[2.2vw] py-[3vh]"
              style={{ background: "var(--slide-card)" }}
            >
              <div
                className="text-[3.5vw] font-bold leading-none mb-[1vh]"
                style={{ color: "var(--slide-primary)" }}
              >
                &ldquo;
              </div>
              <p
                className="text-[1.5vw] font-body leading-relaxed flex-1"
                style={{ color: "var(--slide-muted)", textWrap: "pretty" }}
              >
                {q.text}
              </p>
              <div className="mt-[2vh]">
                <div className="text-[1.6vw] font-semibold text-text">{q.name}</div>
                <div className="text-[1.3vw] font-body" style={{ color: "var(--slide-muted)" }}>
                  {q.role}
                </div>
              </div>
            </div>
          ))}
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
