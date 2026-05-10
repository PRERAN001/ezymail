

export default function EzyMailLanding() {
  return (
    <div className={`$} min-h-screen bg-white text-black overflow-hidden font-[family-name:var(--font-inter)]`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight font-[family-name:var(--font-grotesk)]">
              EzyMail
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-600">
            <a href="#features" className="hover:text-black transition">
              Features
            </a>
            <a href="#usage" className="hover:text-black transition">
              Usage
            </a>
            <a href="#docs" className="hover:text-black transition">
              Docs
            </a>
            <a href="#github" className="hover:text-black transition">
              GitHub
            </a>
          </div>

          <button className="px-5 py-2.5 rounded-xl bg-black text-white hover:bg-zinc-800 transition text-sm font-semibold">
            npm install
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 py-28 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border border-black/10 rounded-full px-4 py-2 text-sm font-medium text-zinc-600 mb-8">
            SMTP • TLS • Node.js
          </div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[0.92] font-[family-name:var(--font-grotesk)]">
            Minimal SMTP.
            <span className="block text-zinc-400">
              Maximum Control.
            </span>
          </h1>

          <p className="mt-8 text-lg text-zinc-600 leading-relaxed max-w-xl">
            EzyMail is a lightweight email package built directly on raw TLS sockets.
            No heavy abstractions. No unnecessary dependencies. Just direct SMTP communication.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            

            <button className="px-7 py-4 rounded-2xl border border-black/10 hover:bg-zinc-100 transition font-medium text-lg" onClick={()=>{
                window.open("https://www.npmjs.com/package/ezymail")
            }}>
              View Documentation
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 text-sm text-zinc-500 font-medium">
            <div>Zero Dependencies</div>
            <div>HTML Emails</div>
            <div>Raw SMTP</div>
            <div>Cloud Ready</div>
          </div>
        </div>

        {/* Code Window */}
        <div className="relative">
          <div className="rounded-[2rem] border border-black/10 bg-black text-white overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-zinc-600" />
              <div className="w-3 h-3 rounded-full bg-zinc-500" />
              <div className="w-3 h-3 rounded-full bg-zinc-400" />
            </div>

            <pre className="p-8 overflow-x-auto text-sm md:text-base leading-8 text-zinc-300">
{`const ezymail = require("ezymail")

await ezymail.send({
  from: "your@gmail.com",
  to: "receiver@gmail.com",
  subject: "Hello",

  html: \
  \`<h1>Hello from EzyMail</h1>\`
})`}
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-black/10 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-8 py-28">
          <div className="max-w-3xl mb-20">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4">
              Features
            </p>

            <h2 className="text-5xl font-black tracking-tight leading-tight font-[family-name:var(--font-grotesk)]">
              Built for developers who want low-level control.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Raw SMTP",
                desc: "Communicate directly with SMTP servers using TLS sockets."
              },
              {
                title: "Lightweight",
                desc: "No large dependency tree or bloated abstractions."
              },
              {
                title: "HTML Emails",
                desc: "Send fully styled HTML emails with complete MIME control."
              },
              {
                title: "Educational",
                desc: "Learn how email protocols and infrastructure actually work."
              },
              {
                title: "Flexible",
                desc: "Works with custom APIs, VPS setups, and Cloudflare tunnels."
              },
              {
                title: "Minimal API",
                desc: "A tiny and straightforward developer experience."
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-3xl border border-black/10 bg-white p-8 hover:shadow-xl transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-bold mb-6">
                  0{i + 1}
                </div>

                <h3 className="text-2xl font-bold tracking-tight mb-4 font-[family-name:var(--font-grotesk)]">
                  {feature.title}
                </h3>

                <p className="text-zinc-600 leading-relaxed text-lg">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage */}
      <section id="usage" className="max-w-6xl mx-auto px-8 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-4">
              Usage
            </p>

            <h2 className="text-5xl font-black tracking-tight leading-tight font-[family-name:var(--font-grotesk)]">
              Start sending emails in seconds.
            </h2>

            <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
              EzyMail exposes a clean API while still giving you complete visibility into how SMTP communication works internally.
            </p>
          </div>

          <div className="rounded-[2rem] overflow-hidden border border-black/10 bg-black text-white shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
            <pre className="p-8 overflow-x-auto text-sm md:text-base leading-8 text-zinc-300">
{`npm install ezymail

const ezymail = require("ezymail")

await ezymail.send({
  from: "your@gmail.com",
  to: "friend@gmail.com",
  subject: "Hello",

  html: \
  \`<h1>Hello World</h1>\`
})`}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-28">
        <div className="max-w-6xl mx-auto rounded-[2.5rem] bg-black text-white p-16 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-400 font-semibold mb-5">
            Open Source SMTP Infrastructure
          </p>

          <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto font-[family-name:var(--font-grotesk)]">
            Understand email systems by building them yourself.
          </h2>

          <p className="mt-8 text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Learn sockets, MIME, TLS, networking, and SMTP by working directly with the protocol layer.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            

            <button className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition text-lg font-medium"
            onClick={() => window.open("https://github.com/PRERAN001/ezymail")}>
              View GitHub
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
