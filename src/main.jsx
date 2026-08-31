import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const WHATSAPP = "https://wa.me/8801960481983?text=Hello%20Heaven%20Furniture%20Mart,%20I%20would%20like%20a%20custom%20furniture%20quote.";

const images = {
  hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85",
  living: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
  bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=85",
  dining: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1000&q=85",
  bespoke: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const nav = [
    ["Collections", "#collections"],
    ["Bespoke", "#bespoke"],
    ["Our Story", "#story"],
    ["Contact", "#contact"]
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
          <a href="#" className="group flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center border border-brass/70 text-sm font-semibold tracking-[0.2em] text-white">
              HF
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.28em] text-white sm:block">
              Heaven Furniture Mart
            </span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {nav.map(([label, href]) => (
              <a key={label} href={href} className="text-xs uppercase tracking-[0.18em] text-white/80 transition hover:text-white">
                {label}
              </a>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="border border-brass bg-brass px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal transition hover:bg-white">
              WhatsApp Us
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            <span className="text-2xl">{menuOpen ? "×" : "☰"}</span>
          </button>
        </nav>

        {menuOpen && (
          <div className="mx-4 rounded-2xl border border-white/15 bg-charcoal/95 p-5 backdrop-blur md:hidden">
            {nav.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}
                className="block border-b border-white/10 py-4 text-sm uppercase tracking-[0.15em] text-white">
                {label}
              </a>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="mt-4 block bg-brass px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-charcoal">
              WhatsApp Us
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-[760px] overflow-hidden bg-charcoal text-white lg:min-h-[820px]">
        <img src={images.hero} alt="Luxury contemporary furniture interior"
          className="absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/65 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/30" />

        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-20 pt-36 lg:min-h-[820px] lg:px-8 lg:pb-28">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-brass">
              <span className="h-px w-10 bg-brass" />
              Chattogram · Since 2020
            </p>
            <h1 className="font-display text-5xl leading-[0.96] tracking-[-0.03em] sm:text-6xl lg:text-8xl">
              Furniture,<br />
              <span className="italic text-brass">crafted</span> around you.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Bespoke furniture and interior styling designed around your space,
              your taste, and the way you live.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setQuoteOpen(true)}
                className="bg-brass px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-charcoal transition hover:bg-white">
                Request a Quote
              </button>
              <a href="#collections"
                className="border border-white/30 px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10">
                Explore Collections
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section id="story" className="luxury-grid bg-ivory px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-brass">Designed. Crafted. Customized.</p>
            <h2 className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Your space deserves furniture with a point of view.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-charcoal/65">
              At Heaven Furniture Mart, we believe furniture is more than function;
              it is a reflection of lifestyle, taste, and comfort. Every piece is
              created to bring lasting elegance into the homes of our clients.
            </p>
            <div className="mt-8 h-px w-24 bg-brass" />
            <p className="mt-5 text-sm font-semibold">Abul Kalam Bhuiyan</p>
            <p className="text-xs uppercase tracking-[0.18em] text-charcoal/50">Managing Director</p>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="bg-white px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-brass">The Collection</p>
              <h2 className="font-display text-4xl sm:text-5xl">Made for the way you live.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-charcoal/55">
              A considered selection for living, sleeping, dining, working—and everything in between.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <CollectionCard image={images.living} title="Living Room" number="01" />
            <CollectionCard image={images.bedroom} title="Bedroom" number="02" />
            <CollectionCard image={images.dining} title="Dining" number="03" />
            <CollectionCard image={images.bespoke} title="Bespoke / Custom" number="04" featured />
          </div>
        </div>
      </section>

      {/* Bespoke */}
      <section id="bespoke" className="bg-charcoal text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative min-h-[500px] lg:min-h-[680px]">
            <img src={images.bespoke} alt="Bespoke interior furniture"
              className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
            <span className="absolute bottom-8 left-8 text-[10px] uppercase tracking-[0.25em] text-white/70">Crafted in Chattogram</span>
          </div>
          <div className="flex items-center px-6 py-20 sm:px-12 lg:px-20">
            <div>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-brass">The Heaven Difference</p>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                Nothing off the shelf. Everything made for you.
              </h2>
              <p className="mt-7 leading-8 text-white/60">
                Bring us your room, measurements, mood, or simply an idea.
                Our bespoke service turns your vision into a piece built for
                your exact space and taste.
              </p>
              <ul className="mt-9 space-y-4 border-t border-white/10 pt-7 text-sm">
                {[
                  "Free design consultation",
                  "Premium wood & materials",
                  "Skilled in-house craftsmanship",
                  "Delivery & installation included"
                ].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-brass">✦</span>{item}
                  </li>
                ))}
              </ul>
              <button onClick={() => setQuoteOpen(true)}
                className="mt-10 border border-brass px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-brass transition hover:bg-brass hover:text-charcoal">
                Start Your Design
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-ivory px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Bespoke", "Built around your space, size & taste."],
            ["02", "Craftsmanship", "Premium materials and skilled hands."],
            ["03", "Showroom", "Visit us on Agrabad Access Road."],
            ["04", "Peace of Mind", "Delivery, installation & easy payment."]
          ].map(([n, title, text]) => (
            <div key={n} className="border-t border-charcoal/15 pt-5">
              <span className="text-xs text-brass">{n}</span>
              <h3 className="mt-5 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-charcoal/55">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative overflow-hidden bg-[#182D2A] px-5 py-24 text-center text-white lg:px-8 lg:py-32">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-brass/20" />
        <div className="absolute -left-28 -bottom-32 h-96 w-96 rounded-full border border-brass/10" />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.3em] text-brass">Let's create something timeless</p>
          <h2 className="font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
            Tell us what you’re imagining.
          </h2>
          <p className="mx-auto mt-7 max-w-xl leading-7 text-white/60">
            Start with a conversation. Our team will help shape your idea into furniture made specifically for you.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={() => setQuoteOpen(true)}
              className="bg-brass px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-charcoal hover:bg-white">
              Request a Quote
            </button>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="border border-white/25 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] hover:border-white">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal px-5 py-12 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center border border-brass text-sm font-semibold tracking-[0.2em]">HF</span>
              <span className="font-display text-2xl">Heaven Furniture Mart</span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/45">
              Luxury bespoke furniture and interior styling. Designed. Crafted. Customized.
            </p>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-brass">Visit</p>
            <p className="text-sm leading-6 text-white/60">Agrabad Access Road<br />Chattogram, Bangladesh</p>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-brass">Contact</p>
            <a href="tel:+8801960481983" className="block text-sm text-white/60 hover:text-white">+880 1960-481983</a>
            <a href="mailto:heavenfurnituremart@gmail.com" className="mt-2 block break-all text-sm text-white/60 hover:text-white">heavenfurnituremart@gmail.com</a>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.2em] text-white/30">
          © {new Date().getFullYear()} Heaven Furniture Mart · Designed for real customers, not templates.
        </div>
      </footer>

      {/* Quote Modal */}
      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}
    </div>
  );
}

function CollectionCard({ image, title, number, featured }) {
  return (
    <a href="#contact" className={`group relative block overflow-hidden ${featured ? "sm:col-span-2" : ""}`}>
      <div className={`${featured ? "h-[420px] sm:h-[500px]" : "h-[360px] sm:h-[430px]"}`}>
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-brass">Collection {number}</p>
          <h3 className="font-display text-3xl text-white sm:text-4xl">{title}</h3>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition group-hover:bg-brass group-hover:text-charcoal">↗</span>
      </div>
    </a>
  );
}

function QuoteModal({ onClose }) {
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg bg-ivory p-7 shadow-2xl sm:p-10" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brass">Bespoke enquiry</p>
            <h3 className="mt-2 font-display text-4xl">Request a quote</h3>
          </div>
          <button onClick={onClose} className="text-2xl text-charcoal/50 hover:text-charcoal">×</button>
        </div>

        {sent ? (
          <div className="py-12 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brass text-charcoal">✓</div>
            <h4 className="mt-5 font-display text-2xl">Thank you.</h4>
            <p className="mt-2 text-sm leading-6 text-charcoal/60">Your enquiry has been recorded. Please use WhatsApp for the fastest response.</p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="mt-7 inline-block bg-brass px-6 py-3 text-xs font-bold uppercase tracking-[0.15em]">
              Continue on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5">
            <input required placeholder="Your name" className="w-full border-b border-charcoal/20 bg-transparent px-0 py-3 outline-none placeholder:text-charcoal/35 focus:border-brass" />
            <input required type="tel" placeholder="Phone number" className="w-full border-b border-charcoal/20 bg-transparent px-0 py-3 outline-none placeholder:text-charcoal/35 focus:border-brass" />
            <select className="w-full border-b border-charcoal/20 bg-transparent px-0 py-3 outline-none focus:border-brass">
              <option>What are you looking for?</option>
              <option>Living room</option>
              <option>Bedroom</option>
              <option>Dining</option>
              <option>Office / Study</option>
              <option>Fully bespoke furniture</option>
            </select>
            <textarea rows="3" placeholder="Tell us about your space or idea..." className="w-full resize-none border-b border-charcoal/20 bg-transparent px-0 py-3 outline-none placeholder:text-charcoal/35 focus:border-brass" />
            <button className="w-full bg-charcoal px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:bg-brass hover:text-charcoal">
              Send Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
