"use client";
import { useEffect, useRef, useState } from "react";

// ─── Easy-to-change config ─────────────────────────────────────────────────
const VERSION = "2.0.7";
const USER_COUNT = 1100; // weekly downloads / user count shown across the page
// ───────────────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("opacity-100", "translate-y-0");
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0 }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`opacity-0 translate-y-7 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

function CountUp({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  { num: "01", title: "Raw SMTP",         desc: "Speaks directly to SMTP servers via TLS sockets. No middleware, no wrappers, no surprises.",                               tag: "Protocol-level" },
  { num: "02", title: "Minimal Deps",     desc: "Tiny footprint, minimal dependencies. No supply chain risk, no audit nightmares.",                                         tag: "Lightweight"    },
  { num: "03", title: "HTML Emails",      desc: "Full MIME support. Send rich HTML with inline styles, custom layouts — anything a modern client renders.",                  tag: "MIME-compliant" },
  { num: "04", title: "Promise-based API",desc: "Fully async/await compatible. Drop it into any modern Node.js workflow without friction.",                                  tag: "Modern"         },
  { num: "05", title: "Flexible Deploy",  desc: "VPS, cloud functions, Cloudflare tunnels. If it can open a socket, EzyMail runs.",                                         tag: "Cloud ready"    },
  { num: "06", title: "Plain + HTML Text",desc: "Send both plain text and rich HTML. Full control over every byte that leaves your server.",                                 tag: "DX-first"       },
  { num: "07", title: "Bulk Sending",     desc: "sendseqmail() batches thousands of mails with configurable concurrency and a hard cap. No queue servers needed.",           tag: "New ✦"          },
];

const marqueeItems = [
  `${USER_COUNT}+ Weekly Downloads`, `v${VERSION} Stable`, "SMTP Protocol", "TLS Encryption",
  "2 Dependencies", "ISC License", "15 Versions", "Bulk Sending",
  `${USER_COUNT}+ Weekly Downloads`, `v${VERSION} Stable`, "SMTP Protocol", "TLS Encryption",
  "2 Dependencies", "ISC License", "15 Versions", "Bulk Sending",
];

const compareLeft = [
  [false, "Heavy deps & abstractions"],
  [false, "Opaque protocol internals"],
  [false, "~500KB installed size"],
  [false, "Hides SMTP from you"],
  [false, "No built-in bulk batching"],
  [true,  "Battle-tested in production"],
  [true,  "Rich plugin ecosystem"],
];

const compareRight = [
  "Minimal dependencies",
  "Direct socket communication",
  "Tiny, auditable footprint",
  "Full protocol visibility",
  { text: "Built-in bulk batching", isNew: true },
  "Perfect for learning SMTP",
  "Clean, readable source",
];

// ─── Hero Email Card ──────────────────────────────────────────────────────────
function HeroCard() {
  return (
    <div className="flex-1 max-w-[520px] bg-[#111] border border-white/[0.07] relative overflow-hidden animate-[drift_6s_ease-in-out_infinite]">
      <div className="flex items-center gap-2 px-5 py-[14px] border-b border-white/[0.07]">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="text-[11px] text-[#444] tracking-[0.05em] ml-2">send-email.js</span>
        <span className="ml-auto text-[10px] text-[#444] border border-white/[0.07] px-2 py-[2px]">
          v{VERSION}
        </span>
      </div>
      <pre className="p-7 text-[13px] leading-[2] text-[#aaa] overflow-x-auto font-['DM_Mono',monospace]">
        <span className="text-[#444]">{"// npm i ezymail\n"}</span>
        <span className="text-[#e8ff6b]">const </span>
        <span>{"ezymail = "}</span>
        <span className="text-[#79c0ff]">require</span>
        <span className="text-[#a5d6ff]">{"('ezymail')\n\n"}</span>

        <span className="text-[#444]">{"// ── single mail ──────────────────\n"}</span>
        <span className="text-[#e8ff6b]">await </span>
        <span>{"ezymail."}</span>
        <span className="text-[#79c0ff]">send</span>
        <span>{"({\n"}</span>
        <span>{"  from:    "}</span><span className="text-[#a5d6ff]">{"'you@gmail.com'"}</span><span>{",\n"}</span>
        <span>{"  to:      "}</span><span className="text-[#a5d6ff]">{"'them@gmail.com'"}</span><span>{",\n"}</span>
        <span>{"  subject: "}</span><span className="text-[#a5d6ff]">{"'Hello'"}</span><span>{",\n"}</span>
        <span>{"  html:    "}</span><span className="text-[#a5d6ff]">{"` <h1>It works.</h1> `"}</span><span>{"\n})\n\n"}</span>

        <span className="text-[#444]">{"// ── bulk mail (new!) ───────────────\n"}</span>
        <span className="text-[#e8ff6b]">await </span>
        <span>{"ezymail."}</span>
        <span className="text-[#79c0ff]">sendseqmail</span>
        <span>{"(users, data, "}</span>
        <span className="text-[#e8ff6b]">{"100"}</span>
        <span>{")\n"}</span>
        <span className="text-[#444]">{"// n = max sends · batches of 20 · 5 concurrent"}</span>
        <span className="inline-block w-[2px] h-[14px] bg-[#e8ff6b] animate-[blink_1s_step-end_infinite] align-[-2px] ml-[2px]" />
      </pre>
      <div
        className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[200px] h-[80px] rounded-full pointer-events-none"
        style={{ background: "rgba(232,255,107,0.06)", filter: "blur(30px)" }}
      />
    </div>
  );
}

// ─── Bulk Mail Section ────────────────────────────────────────────────────────
function BulkMailSection() {
  const bulkSteps = [
    { icon: "⚡", title: "Pass your users array",      desc: "Supply a list of recipient emails — ezymail handles the rest, one isolated task per user." },
    { icon: "📦", title: "Batches of 20, auto-split",  desc: "Users are split into batches of 20. Batches run sequentially to avoid overwhelming your SMTP server." },
    { icon: "🔀", title: "5 concurrent per batch",     desc: "Within each batch, 5 mails fire simultaneously. Each task owns its own frozen payload — no cross-contamination." },
    { icon: "🔒", title: "n caps the total sends",     desc: "Pass n as the third argument to hard-limit how many users from the array get a mail. It sets totalMails — not concurrency." },
  ];

  return (
    <section id="bulk" className="max-w-[1200px] mx-auto px-10 pb-[120px]">
      <RevealDiv>
        <div className="border border-[#e8ff6b]/25 bg-[#e8ff6b]/[0.02] p-16">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#e8ff6b] mb-3">New Feature</p>
              <h2 className="font-['Syne',sans-serif] font-black text-[36px] tracking-[-0.02em]">
                Bulk Mail. Zero Overhead.{" "}
                <span className="bg-[#e8ff6b] text-[#080808] text-[10px] font-medium tracking-[0.1em] uppercase px-[10px] py-[5px] align-middle">
                  New
                </span>
              </h2>
            </div>
            <div className="text-[12px] text-[#666] text-right leading-[1.8]">
              <span className="text-[#e8ff6b]">sendseqmail()</span> — batch + concurrent
              <br />
              One call. Thousands of mails.
            </div>
          </div>

          {/* Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: steps */}
            <div>
              <p className="text-[13px] text-[#666] leading-[1.8] font-light mb-8">
                Send emails to thousands of users in controlled batches — with configurable concurrency
                and a hard cap on total sends. No queue servers. No Redis. Just JavaScript.
              </p>
              <div className="flex flex-col">
                {bulkSteps.map((s, i) => (
                  <div
                    key={i}
                    className="flex gap-5 py-5 border-b border-white/[0.07] first:border-t first:border-white/[0.07]"
                  >
                    <div className="w-9 h-9 border border-[#e8ff6b]/30 flex items-center justify-center text-sm flex-shrink-0 text-[#e8ff6b]">
                      {s.icon}
                    </div>
                    <div>
                      <strong className="block text-[13px] text-[#f0ede8] font-medium mb-1">{s.title}</strong>
                      <span className="text-[12px] text-[#666] font-light leading-[1.6]">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap mt-8">
                {["Batched · 20/batch", "5 concurrent", "No queue server", "Isolated payloads"].map((b) => (
                  <span
                    key={b}
                    className="text-[10px] tracking-[0.12em] uppercase border border-[#e8ff6b]/20 text-[#e8ff6b] px-[14px] py-[6px] bg-[#e8ff6b]/[0.04]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: code + flow */}
            <div>
              <div className="bg-[#0d0d0d] border border-white/[0.07] overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-[12px] border-b border-white/[0.07] bg-[#111]">
                  <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                  <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                  <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                  <span className="text-[11px] text-[#444] ml-2">bulk-send.js</span>
                </div>
                <pre className="p-6 text-[12px] leading-[1.9] text-[#aaa] overflow-x-auto font-['DM_Mono',monospace]">
                  <span className="text-[#e8ff6b]">const </span>
                  <span>{"ezymail = "}</span>
                  <span className="text-[#79c0ff]">require</span>
                  <span className="text-[#a5d6ff]">{"('ezymail')\n\n"}</span>

                  <span className="text-[#444]">{"// Your recipient list\n"}</span>
                  <span className="text-[#e8ff6b]">const </span>
                  <span>{"users = [\n"}</span>
                  <span>{"  "}</span><span className="text-[#a5d6ff]">{"'alice@example.com'"}</span><span>{",\n"}</span>
                  <span>{"  "}</span><span className="text-[#a5d6ff]">{"'bob@example.com'"}</span><span>{",\n"}</span>
                  <span className="text-[#444]">{"  // ...thousands more\n"}</span>
                  <span>{"]\n\n"}</span>

                  <span className="text-[#444]">{"// Shared mail data\n"}</span>
                  <span className="text-[#e8ff6b]">const </span>
                  <span>{"data = {\n"}</span>
                  <span>{"  from:    "}</span><span className="text-[#a5d6ff]">{"'you@gmail.com'"}</span><span>{",\n"}</span>
                  <span>{"  subject: "}</span><span className="text-[#a5d6ff]">{"'Newsletter'"}</span><span>{",\n"}</span>
                  <span>{"  html:    "}</span><span className="text-[#a5d6ff]">{"'<h1>Hello!</h1>'"}</span><span>{",\n"}</span>
                  <span>{"  user:    "}</span><span className="text-[#a5d6ff]">{"'you@gmail.com'"}</span><span>{",\n"}</span>
                  <span>{"  pass:    "}</span><span className="text-[#a5d6ff]">{"'app_password'"}</span><span>{"\n}\n\n"}</span>

                  <span className="text-[#444]">{"// n = max emails to send from users array\n"}</span>
                  <span className="text-[#444]">{"// batchSize=20, concurrency=5 are fixed\n"}</span>
                  <span className="text-[#e8ff6b]">await </span>
                  <span>{"ezymail."}</span>
                  <span className="text-[#79c0ff]">sendseqmail</span>
                  <span>{"(users, data, "}</span>
                  <span className="text-[#e8ff6b]">100</span>
                  <span>{")\n\n"}</span>

                  <span className="text-[#444]">{"// only first 100 users are processed\n"}</span>
                  <span className="text-[#444]">{"// ✓ Batch 1 completed  (users 1–20)\n"}</span>
                  <span className="text-[#444]">{"// ✓ Batch 2 completed  (users 21–40)\n"}</span>
                  <span className="text-[#444]">{"// ✓ Batch 3 completed  (users 41–60)\n"}</span>
                  <span className="text-[#444]">{"// ✓ ..."}</span>
                  <span className="inline-block w-[2px] h-[14px] bg-[#e8ff6b] animate-[blink_1s_step-end_infinite] align-[-2px] ml-[2px]" />
                </pre>
              </div>

              {/* Execution flow */}
              <div className="mt-4 border border-white/[0.07] p-5 font-['DM_Mono',monospace] text-[11px] leading-[2] text-[#666] tracking-[0.05em]">
                <div className="text-[#e8ff6b] mb-2 tracking-[0.15em] uppercase text-[10px]">Execution Flow</div>
                <div>
                  <span className="text-[#f0ede8]">sendseqmail(users, data, </span>
                  <span className="text-[#e8ff6b]">n</span>
                  <span className="text-[#f0ede8]">)</span>
                  <span className="text-[#333]">  ← n caps total sends</span>
                </div>
                <div className="pl-4 text-[#444]">
                  └── MailQueue({"{ totalMails: "}
                  <span className="text-[#e8ff6b]">n</span>
                  {", batchSize: 20, concurrency: 5 }"}
                  <span className="text-[#333]">  ← not concurrency</span>
                  )
                </div>
                <div className="pl-8 text-[#444]">└── tasks = users.slice(0, <span className="text-[#e8ff6b]">n</span>).map(buildTask) <span className="text-[#333]">← frozen</span></div>
                <div className="pl-8 text-[#444]">└── process(tasks) → split into batches of 20</div>
                <div className="pl-12 text-[#444]">├── Batch 1 → 5 workers fire fetch() ✓</div>
                <div className="pl-12 text-[#444]">├── Batch 2 → 5 workers fire fetch() ✓</div>
                <div className="pl-12 text-[#444]">└── ...</div>
              </div>
            </div>
          </div>
        </div>
      </RevealDiv>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EzyMailLanding() {
  return (
    <div className="bg-[#080808] text-[#f0ede8] font-['DM_Mono',monospace] overflow-x-hidden min-h-screen">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-[60px] border-b border-white/[0.07] bg-[#080808]/90 backdrop-blur-xl text-[11px] tracking-[0.1em] uppercase">
        <span className="font-['Syne',sans-serif] font-black text-[18px] tracking-[-0.02em] normal-case">
          Ezy<span className="text-[#e8ff6b]">Mail</span>
        </span>
        <div className="hidden md:flex gap-8">
          {[
            ["Features", "#features"],
            ["Bulk Mail", "#bulk"],
            ["Usage",    "#usage"],
            ["Compare",  "#compare"],
            ["GitHub",   "https://github.com/PRERAN001/ezymail"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[#666] hover:text-[#f0ede8] transition-colors duration-200 no-underline"
            >
              {label}
            </a>
          ))}
        </div>
        <button
          onClick={() => window.open("https://www.npmjs.com/package/ezymail")}
          className="bg-[#e8ff6b] text-[#080808] border-none px-[18px] py-2 font-['DM_Mono',monospace] text-[11px] font-medium tracking-[0.08em] uppercase cursor-pointer hover:bg-white transition-colors duration-200"
        >
          npm install
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen relative overflow-hidden pt-[60px]">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-[120px] pointer-events-none animate-[scan_5s_linear_infinite]"
          style={{ background: "linear-gradient(transparent, rgba(232,255,107,0.03), transparent)" }}
        />

        {/* Top status bar */}
        <div className="absolute top-[80px] left-0 right-0 px-10 flex justify-between items-start z-10">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#e8ff6b] border border-[#e8ff6b]/25 px-[14px] py-[6px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#e8ff6b] animate-[pulse-dot_2s_ease_infinite]" />
            v{VERSION} — Live on npm
          </div>
          <div />
          <div className="hidden md:flex gap-8 text-right text-[11px] text-[#666] tracking-[0.08em]">
            {[
              ["1,100+", "Weekly Downloads"],
              [VERSION,  "Latest Version"],
              ["ISC",    "License"],
            ].map(([val, label]) => (
              <div key={label}>
                <strong className="block text-[20px] font-['Syne',sans-serif] font-bold text-[#f0ede8] mb-[2px] tracking-[-0.02em]">
                  {val}
                </strong>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Hero body */}
        <div
          className="flex items-center justify-between gap-16 px-10 min-h-screen"
          style={{ animation: "fadeUp 0.9s 0.2s ease both" }}
        >
          {/* Left: headline + description + buttons */}
          <div className="relative z-10 max-w-[520px] shrink-0">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#666] mb-6">
              Node.js email library · Built from scratch
            </p>
            <h1
              className="font-['Syne',sans-serif] font-black leading-[0.95] tracking-[-0.03em] mb-8"
              style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
            >
              Email.<br />
              <em className="not-italic text-[#e8ff6b]">Stripped</em><br />
              <s className="line-through text-[#444] decoration-[#ff6b6b]">Down</s>.
            </h1>
            <p className="text-[15px] text-[#666] leading-[1.7] mb-10 font-light">
              Direct SMTP over raw TLS sockets. No Nodemailer. No abstraction layers. No bloat.
              Just the protocol — and{" "}
              <span className="text-[#e8ff6b]">{USER_COUNT}+ developers</span> who already get it.
            </p>
            <div className="flex items-center gap-5 flex-wrap">
              <button
                onClick={() => window.open("https://www.npmjs.com/package/ezymail")}
                className="bg-[#e8ff6b] text-[#080808] border-none px-7 py-[14px] font-['DM_Mono',monospace] text-[12px] font-medium tracking-[0.1em] uppercase cursor-pointer hover:bg-white hover:-translate-y-px transition-all duration-200 inline-flex items-center gap-[10px]"
              >
                npm install ezymail <span className="text-[16px]">→</span>
              </button>
              <button
                onClick={() => window.open("https://github.com/PRERAN001/ezymail")}
                className="bg-transparent text-[#666] border border-white/15 px-7 py-[14px] font-['DM_Mono',monospace] text-[12px] tracking-[0.1em] uppercase cursor-pointer hover:text-[#f0ede8] hover:border-[#444] transition-all duration-200"
              >
                View on GitHub
              </button>
            </div>
            <div className="flex gap-[10px] mt-8 flex-wrap">
              {[`v${VERSION} stable`, "ISC license", "Promise-based", "TLS encrypted", "Bulk sending", "HTML + plain text"].map((p) => (
                <span key={p} className="text-[10px] tracking-[0.12em] uppercase text-[#444] border border-white/[0.07] px-3 py-[5px]">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Right: hero email card */}
          <HeroCard />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-t border-b border-white/[0.07] overflow-hidden py-[14px] bg-[#111]">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {marqueeItems.map((item, i) => (
            <div
              key={i}
              className="text-[11px] tracking-[0.2em] uppercase text-[#444] px-8 border-r border-white/[0.07] shrink-0"
            >
              <span className="text-[#e8ff6b] mr-3">◆</span>{item}
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="max-w-[1200px] mx-auto px-10 py-[100px]">
        <RevealDiv className="text-center mb-16">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#e8ff6b] mb-3">By the numbers</p>
          <h2 className="font-['Syne',sans-serif] font-black text-[36px] tracking-[-0.02em]">
            Real traction. Real developers.
          </h2>
        </RevealDiv>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.07] border border-white/[0.07]">
          {[
            { value: USER_COUNT, suffix: "+", label: "Weekly Downloads",  sub: "and climbing"           },
            { value: 15,         suffix: "",  label: "Published Versions", sub: "actively maintained"   },
            { value: 2,          suffix: "",  label: "Dependencies",       sub: "that's it. seriously." },
            { value: 0,          suffix: "",  label: "SMTP Wrappers",      sub: "protocol-direct only"  },
          ].map(({ value, suffix, label, sub }, i) => (
            <RevealDiv
              key={label}
              delay={i * 80}
              className="bg-[#080808] p-10 text-center group hover:bg-[#111] transition-colors duration-300 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(232,255,107,0.04), transparent 70%)" }}
              />
              <div
                className="font-['Syne',sans-serif] font-black tracking-[-0.04em] text-[#e8ff6b] leading-none mb-3"
                style={{ fontSize: "clamp(40px,5vw,64px)" }}
              >
                <CountUp target={value} suffix={suffix} />
              </div>
              <div className="text-[13px] font-medium text-[#f0ede8] mb-1">{label}</div>
              <div className="text-[11px] text-[#444] tracking-[0.05em]">{sub}</div>
            </RevealDiv>
          ))}
        </div>
        <RevealDiv
          delay={200}
          className="mt-6 border border-[#e8ff6b]/20 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#e8ff6b]/[0.02]"
        >
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-[#e8ff6b] animate-[pulse-dot_2s_ease_infinite] shrink-0" />
            <div>
              <p className="text-[13px] text-[#f0ede8] font-medium mb-1">Weekly downloads trending up</p>
              <p className="text-[12px] text-[#666] font-light">
                15 versions published · Last release: 12 hours ago · ISC license
              </p>
            </div>
          </div>
          <div className="flex items-end gap-[3px] h-8 shrink-0">
            {[20, 35, 25, 50, 40, 65, 55, 80, 70, 90, 85, 100].map((h, i) => (
              <div
                key={i}
                className="w-[6px] rounded-sm bg-[#e8ff6b] transition-all duration-300"
                style={{ height: `${h * 0.28}px`, opacity: 0.25 + (i / 12) * 0.75 }}
              />
            ))}
            <span className="text-[#e8ff6b] font-['Syne',sans-serif] font-bold text-[18px] ml-1">↑</span>
          </div>
        </RevealDiv>
      </section>

      {/* ── BULK MAIL (NEW FEATURE) ── */}
      <BulkMailSection />

      {/* ── USAGE ── */}
      <section id="usage" className="max-w-[1200px] mx-auto px-10 pb-[120px] grid lg:grid-cols-2 gap-20 items-center">
        <RevealDiv>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#e8ff6b] mb-4">Usage</p>
          <h2 className="font-['Syne',sans-serif] font-black text-[40px] tracking-[-0.02em] leading-[1.05] mb-6">
            Three lines to your inbox.
          </h2>
          <p className="text-[14px] text-[#666] leading-[1.8] font-light">
            EzyMail exposes only what you need. If you know JavaScript, you already know the API.
          </p>
          <div className="mt-8 flex flex-col">
            {[
              ["01", "Install the package",       "npm i ezymail — minimal deps, nothing extra"],
              ["02", "Set your credentials",      "Gmail address + app password from Google"],
              ["03", "Call ezymail.send()",        "Async, awaitable, delivered"],
              ["04", "Scale with sendseqmail()",  "Bulk sending — batched, concurrent, capped"],
            ].map(([num, title, sub]) => (
              <div
                key={num}
                className="flex items-start gap-4 py-4 border-b border-white/[0.07] first:border-t first:border-white/[0.07]"
              >
                <span className="text-[11px] text-[#444] tracking-[0.1em] min-w-[24px] pt-[2px]">{num}</span>
                <div>
                  <strong className="block text-[13px] text-[#f0ede8] mb-[2px] font-medium">{title}</strong>
                  <span className="text-[12px] text-[#666] font-light">{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </RevealDiv>
        <RevealDiv
          delay={150}
          className="bg-[#111] border border-white/[0.07] overflow-hidden relative animate-[drift_6s_ease-in-out_infinite]"
        >
          <div className="flex items-center gap-2 px-5 py-[14px] border-b border-white/[0.07]">
            <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
            <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
            <span className="w-2 h-2 rounded-full bg-[#28c840]" />
            <span className="text-[11px] text-[#444] tracking-[0.05em] ml-2">send-email.js</span>
            <span className="ml-auto text-[10px] text-[#444] border border-white/[0.07] px-2 py-[2px]">
              v{VERSION}
            </span>
          </div>
          <pre className="p-7 text-[13px] leading-[2] text-[#aaa] overflow-x-auto font-['DM_Mono',monospace]">
            <span className="text-[#444]">{"// npm i ezymail\n"}</span>
            <span className="text-[#e8ff6b]">const </span>
            <span>{"ezymail = "}</span>
            <span className="text-[#79c0ff]">require</span>
            <span className="text-[#a5d6ff]">{"('ezymail')\n\n"}</span>
            <span className="text-[#e8ff6b]">await </span>
            <span>{"ezymail."}</span>
            <span className="text-[#79c0ff]">send</span>
            <span>{"({\n"}</span>
            <span>{"  from:    "}</span><span className="text-[#a5d6ff]">{"'you@gmail.com'"}</span><span>{",\n"}</span>
            <span>{"  to:      "}</span><span className="text-[#a5d6ff]">{"'them@gmail.com'"}</span><span>{",\n"}</span>
            <span>{"  subject: "}</span><span className="text-[#a5d6ff]">{"'Hello'"}</span><span>{",\n\n"}</span>
            <span>{"  html: "}</span>
            <span className="text-[#a5d6ff]">{"` <h1>It works.</h1> `"}</span>
            <span>{"\n})\n\n"}</span>
            <span className="text-[#444]">{"// ✓ " + USER_COUNT + "+ devs can't be wrong"}</span>
            <span className="inline-block w-[2px] h-[14px] bg-[#e8ff6b] animate-[blink_1s_step-end_infinite] align-[-2px] ml-[2px]" />
          </pre>
          <div
            className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[200px] h-[80px] rounded-full pointer-events-none"
            style={{ background: "rgba(232,255,107,0.06)", filter: "blur(30px)" }}
          />
        </RevealDiv>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="max-w-[1200px] mx-auto px-10 pb-[120px]">
        <RevealDiv className="flex items-end justify-between mb-12">
          <h2 className="font-['Syne',sans-serif] font-black text-[36px] tracking-[-0.02em]">What's inside.</h2>
          <span className="text-[11px] text-[#444] tracking-[0.15em] uppercase">07 features</span>
        </RevealDiv>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07]">
          {features.map((f, i) => (
            <RevealDiv
              key={f.num}
              delay={i * 60}
              className="bg-[#080808] p-9 relative overflow-hidden group hover:bg-[#111] transition-colors duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#e8ff6b] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
              <p className="text-[11px] text-[#444] tracking-[0.15em] mb-8">{f.num}</p>
              <h3 className="font-['Syne',sans-serif] font-bold text-[20px] tracking-[-0.01em] mb-3">{f.title}</h3>
              <p className="text-[13px] text-[#666] leading-[1.75] font-light">{f.desc}</p>
              <span className="inline-block mt-6 text-[10px] tracking-[0.12em] uppercase text-[#444] border border-white/[0.07] px-[10px] py-1">
                {f.tag}
              </span>
            </RevealDiv>
          ))}
        </div>
      </section>

      {/* ── COMPARE ── */}
      <section id="compare" className="max-w-[1200px] mx-auto px-10 pb-[120px]">
        <RevealDiv>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#e8ff6b] mb-4">vs Nodemailer</p>
          <h2 className="font-['Syne',sans-serif] font-black text-[36px] tracking-[-0.02em] mb-12">
            Why not just use Nodemailer?
          </h2>
        </RevealDiv>
        <RevealDiv delay={100} className="grid md:grid-cols-2 gap-6">
          {/* Nodemailer col */}
          <div className="p-8 border border-white/[0.07]">
            <h3 className="font-['Syne',sans-serif] font-bold text-[18px] mb-6">Nodemailer</h3>
            {compareLeft.map(([ok, text], i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-[10px] border-b border-white/[0.07] last:border-b-0 text-[13px] text-[#666] font-light"
              >
                <span className={ok ? "text-[#e8ff6b] font-medium" : "text-[#ff6b6b]"}>{ok ? "✓" : "✗"}</span>
                {text}
              </div>
            ))}
          </div>
          {/* EzyMail col */}
          <div className="p-8 border border-[#e8ff6b] relative">
            <span className="absolute -top-px right-6 bg-[#e8ff6b] text-[#080808] text-[10px] font-medium tracking-[0.1em] uppercase px-3 py-1">
              {USER_COUNT}+ devs choose this
            </span>
            <h3 className="font-['Syne',sans-serif] font-bold text-[18px] mb-6 text-[#e8ff6b]">
              EzyMail v{VERSION}
            </h3>
            {compareRight.map((item, i) => {
              const isObj = typeof item === "object";
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 py-[10px] border-b border-white/[0.07] last:border-b-0 text-[13px] text-[#666] font-light"
                >
                  <span className="text-[#e8ff6b] font-medium">✓</span>
                  {isObj ? (
                    <>
                      {item.text}
                      <span className="bg-[#e8ff6b] text-[#080808] text-[9px] font-medium tracking-[0.1em] uppercase px-[6px] py-[2px] ml-1">
                        New
                      </span>
                    </>
                  ) : (
                    item
                  )}
                </div>
              );
            })}
          </div>
        </RevealDiv>
      </section>

      {/* ── CTA ── */}
      <section className="px-10 pb-[120px]">
        <RevealDiv className="max-w-[1120px] mx-auto border border-white/15 p-20 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(232,255,107,0.05), transparent)" }}
          />
          <span
            className="absolute right-[-20px] bottom-[-40px] font-['Syne',sans-serif] font-black leading-none pointer-events-none select-none"
            style={{ fontSize: 180, color: "rgba(255,255,255,0.025)", letterSpacing: "-0.06em" }}
          >
            {USER_COUNT}
          </span>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#444] mb-6 relative z-10">
            Open source · ISC license · v{VERSION}
          </p>
          <h2
            className="font-['Syne',sans-serif] font-black tracking-[-0.03em] leading-[1.05] max-w-[700px] mx-auto mb-6 relative z-10"
            style={{ fontSize: "clamp(32px,5vw,56px)" }}
          >
            Join{" "}
            <em className="not-italic text-[#e8ff6b]">{USER_COUNT}+ developers</em>{" "}
            sending email the right way.
          </h2>
          <p className="text-[15px] text-[#666] max-w-[440px] mx-auto mb-12 leading-[1.7] font-light relative z-10">
            One install. One function call. Bulk sending included. 15 versions of polish and counting.
          </p>
          <div className="flex justify-center gap-4 flex-wrap relative z-10">
            <button
              onClick={() => window.open("https://www.npmjs.com/package/ezymail")}
              className="bg-[#e8ff6b] text-[#080808] border-none px-7 py-[14px] font-['DM_Mono',monospace] text-[12px] font-medium tracking-[0.1em] uppercase cursor-pointer hover:bg-white hover:-translate-y-px transition-all duration-200 inline-flex items-center gap-[10px]"
            >
              npm install ezymail <span className="text-[16px]">→</span>
            </button>
            <button
              onClick={() => window.open("https://github.com/PRERAN001/ezymail")}
              className="bg-transparent text-[#666] border border-white/15 px-7 py-[14px] font-['DM_Mono',monospace] text-[12px] tracking-[0.1em] uppercase cursor-pointer hover:text-[#f0ede8] hover:border-[#444] transition-all duration-200"
            >
              View GitHub
            </button>
          </div>
        </RevealDiv>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.07] px-10 py-8 flex items-center justify-between text-[11px] text-[#444] tracking-[0.08em] uppercase flex-wrap gap-4">
        <span className="font-['Syne',sans-serif] font-black text-[16px] text-[#f0ede8] normal-case tracking-[-0.02em]">
          Ezy<span className="text-[#e8ff6b]">Mail</span>
        </span>
        <span>v{VERSION} · SMTP · TLS · ISC · Bulk Sending</span>
        <span>Built by PRERAN001</span>
      </footer>
    </div>
  );
}