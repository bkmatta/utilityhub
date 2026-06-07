export default function Slide4Categories() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg font-display flex flex-col">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full px-[7vw] py-[6vh]">
        <div className="flex items-center gap-[1.5vw] mb-[3.5vh]">
          <div
            className="w-[3vw] h-[0.3vh] rounded-full"
            style={{ background: "var(--slide-primary)" }}
          />
          <h2
            className="text-[3.8vw] font-bold text-text tracking-tight"
          >
            8 Tool Categories
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-[1.8vw] flex-1">
          <div
            className="rounded-[1vw] p-[2vw] flex flex-col gap-[1.2vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="w-[3.5vw] h-[3.5vw] rounded-[0.7vw] flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#a78bfa"/>
              </svg>
            </div>
            <div className="text-[2vw] font-bold text-text">Finance</div>
            <div className="text-[1.6vw] font-body leading-snug" style={{ color: "var(--slide-muted)" }}>
              EMI, mortgage, SIP, tax, retirement
            </div>
          </div>

          <div
            className="rounded-[1vw] p-[2vw] flex flex-col gap-[1.2vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="w-[3.5vw] h-[3.5vw] rounded-[0.7vw] flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
                <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zm0 12c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" fill="#a78bfa"/>
              </svg>
            </div>
            <div className="text-[2vw] font-bold text-text">Health</div>
            <div className="text-[1.6vw] font-body leading-snug" style={{ color: "var(--slide-muted)" }}>
              BMI, BMR, calories, heart rate zones
            </div>
          </div>

          <div
            className="rounded-[1vw] p-[2vw] flex flex-col gap-[1.2vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="w-[3.5vw] h-[3.5vw] rounded-[0.7vw] flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="8" height="8" rx="1" fill="#a78bfa" opacity="0.6"/>
                <rect x="13" y="3" width="8" height="8" rx="1" fill="#a78bfa"/>
                <rect x="3" y="13" width="8" height="8" rx="1" fill="#a78bfa"/>
                <rect x="13" y="13" width="8" height="8" rx="1" fill="#a78bfa" opacity="0.6"/>
              </svg>
            </div>
            <div className="text-[2vw] font-bold text-text">General</div>
            <div className="text-[1.6vw] font-body leading-snug" style={{ color: "var(--slide-muted)" }}>
              Age, date, percentage, tip
            </div>
          </div>

          <div
            className="rounded-[1vw] p-[2vw] flex flex-col gap-[1.2vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="w-[3.5vw] h-[3.5vw] rounded-[0.7vw] flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
                <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-[2vw] font-bold text-text">Developer</div>
            <div className="text-[1.6vw] font-body leading-snug" style={{ color: "var(--slide-muted)" }}>
              JSON, JWT, Base64, UUID, Regex
            </div>
          </div>

          <div
            className="rounded-[1vw] p-[2vw] flex flex-col gap-[1.2vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="w-[3.5vw] h-[3.5vw] rounded-[0.7vw] flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" fill="#a78bfa" opacity="0.7"/>
                <path d="M14 2v6h6" stroke="#a78bfa" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="text-[2vw] font-bold text-text">PDF</div>
            <div className="text-[1.6vw] font-body leading-snug" style={{ color: "var(--slide-muted)" }}>
              Merge, split, compress, OCR, sign
            </div>
          </div>

          <div
            className="rounded-[1vw] p-[2vw] flex flex-col gap-[1.2vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="w-[3.5vw] h-[3.5vw] rounded-[0.7vw] flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" fill="#a78bfa" opacity="0.3"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="#a78bfa"/>
                <path d="M21 15l-5-5L5 21" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-[2vw] font-bold text-text">Image</div>
            <div className="text-[1.6vw] font-body leading-snug" style={{ color: "var(--slide-muted)" }}>
              Compress, resize, convert, background remove
            </div>
          </div>

          <div
            className="rounded-[1vw] p-[2vw] flex flex-col gap-[1.2vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="w-[3.5vw] h-[3.5vw] rounded-[0.7vw] flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
                <path d="M8 7h12M8 12h8M8 17h4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="4" cy="7" r="1" fill="#a78bfa"/>
                <circle cx="4" cy="12" r="1" fill="#a78bfa"/>
                <circle cx="4" cy="17" r="1" fill="#a78bfa"/>
              </svg>
            </div>
            <div className="text-[2vw] font-bold text-text">Converters</div>
            <div className="text-[1.6vw] font-body leading-snug" style={{ color: "var(--slide-muted)" }}>
              Currency, length, weight, temperature
            </div>
          </div>

          <div
            className="rounded-[1vw] p-[2vw] flex flex-col gap-[1.2vh]"
            style={{ background: "var(--slide-card)" }}
          >
            <div
              className="w-[3.5vw] h-[3.5vw] rounded-[0.7vw] flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.2)" }}
            >
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none">
                <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" fill="#a78bfa" opacity="0.4"/>
                <path d="M16 3v4M8 3v4M16 17v4M8 17v4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-[2vw] font-bold text-text">Business</div>
            <div className="text-[1.6vw] font-body leading-snug" style={{ color: "var(--slide-muted)" }}>
              Invoice, quotation, salary, margins
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-[2.5vh] right-[7vw] text-[1.5vw] font-body"
        style={{ color: "var(--slide-muted)", opacity: 0.4 }}
      >
        UtilityHub
      </div>
    </div>
  );
}
