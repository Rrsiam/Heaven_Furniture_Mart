import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const WHATSAPP = "https://wa.me/8801960481983?text=Hello%20Heaven%20Furniture%20Mart,%20I%20would%20like%20a%20custom%20furniture%20quote.";

const images = {
  heroLiving: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85",
  heroCraft: "https://images.pexels.com/photos/11127339/pexels-photo-11127339.jpeg?auto=compress&cs=tinysrgb&w=1600",
  heroPeople: "https://images.openai.com/static-rsc-4/yADlwgca5jR26icmgSU1Y7VJCIx3ZRx72LtDXf07lJK8Xvhaq4sLmYyFpk_af4ZIbJ8d8emTxU3jPAa0-TbySYqi4ha1PuTDsXNjQ0y2p4BQyAVDbmJrsqABi5gvDFLNoYMZzAQESjV0A9QQy1PZZs1yYd_Uab_YrcF0MXoxeks-_Mdvh0TxHaFj2AYP7FnM?purpose=fullsize",
  heroOutlet: "https://heaven.helloimabid.com/cdn-cgi/image/width=1920,quality=75,format=auto/images/showroom-landscape.png",
  living: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85",
  bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=85",
  dining: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1000&q=85",
  bespoke: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  office: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85",
  kitchen: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1000&q=85",
  kids: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1000&q=85",
  upholstery: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85",
  // Managing Director portrait photo (focused on the person).
  director: "https://heaven.helloimabid.com/cdn-cgi/image/width=1080,quality=75,format=auto/images/managing-director.png",
};

// Product imagery for the best-sellers showcase.
// NOTE: swap these for the furniture mart's own social-media photos when available.
const productImages = {
  sofa: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=600&q=80",
  sofaLarge: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1600&q=85",
  armchair: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80",
  coffeeTable: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=600&q=80",
  bed: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
  wardrobe: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
  nightstand: "https://images.unsplash.com/photo-1611967164521-abae8fba4668?auto=format&fit=crop&w=600&q=80",
  diningSet: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80",
  chairs: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80",
  buffet: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=600&q=80",
  desk: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
  bookshelf: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
  console: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
  hug: "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=600&q=80",
  shelf: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=600&q=80",
};

const bestSellers = {
  living: [
    { img: productImages.sofa, name: "Marino Velvet Sofa", price: "৳ 95,000", off: "−15%", rating: 4.9 },
    { img: productImages.armchair, name: "Oslo Lounge Chair", price: "৳ 42,000", off: "−10%", rating: 4.8 },
    { img: productImages.coffeeTable, name: "Nova Coffee Table", price: "৳ 28,500", off: "−20%", rating: 4.7 },
    { img: productImages.console, name: "Aria Console Table", price: "৳ 34,000", off: "−12%", rating: 4.8 },
  ],
  bedroom: [
    { img: productImages.bed, name: "Luna King Bed", price: "৳ 120,000", off: "−18%", rating: 4.9 },
    { img: productImages.wardrobe, name: "Verona Wardrobe", price: "৳ 88,000", off: "−10%", rating: 4.7 },
    { img: productImages.nightstand, name: "Cielo Nightstand", price: "৳ 18,500", off: "−15%", rating: 4.6 },
    { img: productImages.buffet, name: "Enzo Bedside Cabinet", price: "৳ 26,000", off: "−12%", rating: 4.5 },
  ],
  dining: [
    { img: productImages.diningSet, name: "Eden Dining Set", price: "৳ 150,000", off: "−25%", rating: 4.9 },
    { img: productImages.chairs, name: "Craft Dining Chairs (x2)", price: "৳ 36,000", off: "−10%", rating: 4.7 },
    { img: productImages.buffet, name: "Siena Buffet Cabinet", price: "৳ 72,000", off: "−12%", rating: 4.8 },
    { img: productImages.console, name: "Roma Sideboard", price: "৳ 64,000", off: "−15%", rating: 4.7 },
  ],
  workspace: [
    { img: productImages.desk, name: "Atlas Writing Desk", price: "৳ 52,000", off: "−20%", rating: 4.8 },
    { img: productImages.bookshelf, name: "Harbor Bookshelf", price: "৳ 44,000", off: "−15%", rating: 4.7 },
    { img: productImages.armchair, name: "Vela Desk Chair", price: "৳ 38,000", off: "−10%", rating: 4.6 },
    { img: productImages.coffeeTable, name: "Lido Study Table", price: "৳ 32,000", off: "−12%", rating: 4.6 },
  ],
};

const arrivals = [
  { img: productImages.armchair, name: "Vela Swivel Armchair", price: "৳ 46,000", off: "New", rating: 4.9 },
  { img: productImages.desk, name: "Meridian Standing Desk", price: "৳ 58,000", off: "New", rating: 4.8 },
  { img: productImages.hug, name: "Coco Corner Sofa", price: "৳ 1,35,000", off: "New", rating: 4.9 },
  { img: productImages.shelf, name: "Lido Open Shelf", price: "৳ 22,000", off: "New", rating: 4.7 },
];

const topSelling = [
  { img: productImages.diningSet, name: "Eden Dining Set", price: "৳ 150,000", off: "−25%", rating: 4.9 },
  { img: productImages.sofa, name: "Marino Velvet Sofa", price: "৳ 95,000", off: "−15%", rating: 4.9 },
  { img: productImages.bed, name: "Luna King Bed", price: "৳ 120,000", off: "−18%", rating: 4.9 },
  { img: productImages.coffeeTable, name: "Nova Coffee Table", price: "৳ 28,500", off: "−20%", rating: 4.7 },
];

// Reliable fallback so a broken/slow remote image never leaves a blank area.
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="50%" font-family="sans-serif" font-size="24" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">Heaven Furniture</text></svg>'
  );

function imgError(e) {
  if (e.target && e.target.src !== FALLBACK_IMG) e.target.src = FALLBACK_IMG;
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function useNavbarScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselHover, setCarouselHover] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [bestSellerCat, setBestSellerCat] = useState("living");
  const [heroIndex, setHeroIndex] = useState(0);
  const scrolled = useNavbarScroll();

  const heroSlides = [
    {
      number: "01",
      label: "LIVING ROOM",
      icon: "🛋️",
      img: images.heroLiving,
      title: "Beautiful finished furniture",
      tagline: "Transform Your Space Into Heaven",
    },
    {
      number: "02",
      label: "CRAFTSMANSHIP",
      icon: "🔨",
      img: images.heroCraft,
      title: "Furniture being crafted",
      tagline: "Crafted With Care. Made to Last.",
    },
    {
      number: "03",
      label: "PEOPLE",
      icon: "❤️",
      img: images.heroPeople,
      title: "A happy family in their living room",
      tagline: "Made for Homes. Loved by Families.",
    },
    {
      number: "04",
      label: "OUR OUTLET",
      icon: "🏬",
      img: images.heroOutlet,
      title: "Visit our showroom in Chattogram",
      tagline: "Step In. Feel It. Take It Home.",
    },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  useScrollReveal();

  useEffect(() => {
    const t = setTimeout(() => setOffersOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (carouselHover) return;
    const id = setInterval(
      () => setCarouselIndex((i) => (i + 1) % collectionSlides.length),
      3500
    );
    return () => clearInterval(id);
  }, [carouselHover]);

  const nav = [
    ["New Arrivals", "#new-arrivals"],
    ["Collections", "#collections"],
    ["Best Sellers", "#best-sellers"],
    ["Bespoke", "#bespoke"],
    ["Reviews", "#testimonials"],
    ["Contact", "#contact"],
  ];

  const collectionSlides = [
    [
      { image: images.living, title: "Living Room", number: "01" },
      { image: images.bedroom, title: "Bedroom", number: "02" },
    ],
    [
      { image: images.dining, title: "Dining", number: "03" },
      { image: images.bespoke, title: "Bespoke / Custom", number: "04" },
    ],
    [
      { image: images.office, title: "Office", number: "05" },
      { image: images.kitchen, title: "Kitchen", number: "06" },
    ],
    [
      { image: images.kids, title: "Kids", number: "07" },
      { image: images.upholstery, title: "Upholstery", number: "08" },
    ],
  ];
  const slides = collectionSlides.length;

  const collectionProducts = {
    "Living Room": [productImages.sofa, productImages.armchair, productImages.coffeeTable, productImages.console],
    "Bedroom": [productImages.bed, productImages.wardrobe, productImages.nightstand, productImages.buffet],
    "Dining": [productImages.diningSet, productImages.chairs, productImages.buffet, productImages.console],
    "Bespoke / Custom": [productImages.sofa, productImages.bed, productImages.diningSet, productImages.desk],
    "Office": [productImages.desk, productImages.bookshelf, productImages.armchair, productImages.shelf],
    "Kitchen": [productImages.console, productImages.chairs, productImages.shelf, productImages.coffeeTable],
    "Kids": [productImages.shelf, productImages.armchair, productImages.coffeeTable, productImages.bookshelf],
    "Upholstery": [productImages.sofa, productImages.armchair, productImages.hug, productImages.coffeeTable],
  };

  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardProductIdx, setCardProductIdx] = useState(0);

  useEffect(() => {
    if (hoveredCard === null) return;
    setCardProductIdx(0);
    const id = setInterval(() => {
      setCardProductIdx((i) => (i + 1) % (collectionProducts[hoveredCard]?.length || 1));
    }, 1200);
    return () => clearInterval(id);
  }, [hoveredCard]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-ivory">
      {/* Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-soft border-b border-slate-200/50 py-3"
            : "bg-white/70 backdrop-blur-md border-b border-white/40 py-5"
        }`}
      >
        <nav className="flex w-full items-center justify-between gap-6 px-5 lg:px-8">
          {/* Logo — left section */}
          <div className="flex flex-1 items-center">
            <a href="#" className="group flex items-center gap-3">
              <span
                className={`grid h-12 w-12 place-items-center border text-sm font-semibold tracking-[0.2em] transition-all duration-500 group-hover:scale-105 ${
                  scrolled
                    ? "border-brass/70 text-brass"
                    : "border-brass/70 text-brass"
                }`}
              >
                HF
              </span>
              <span className="flex flex-col leading-none">
                <span
                  className={`text-[12px] font-medium uppercase tracking-[0.22em] transition-all duration-500 ${
                    scrolled ? "text-charcoal" : "text-charcoal"
                  }`}
                >
                  Heaven Furniture
                </span>
                <span className={`mt-1 text-[10px] uppercase tracking-[0.32em] ${
                  scrolled ? "text-brass" : "text-brass"
                }`}>
                  Mart
                </span>
              </span>
            </a>
          </div>

          {/* Nav items — center */}
          <div className="hidden items-center justify-center gap-9 lg:flex">
            <span className={`h-6 w-px ${scrolled ? "bg-slate-200" : "bg-slate-300"}`} />
            {nav.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className={`text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105 relative group ${
                  scrolled
                    ? "text-slate-600 hover:text-brass"
                    : "text-charcoal/85 hover:text-charcoal"
                }`}
              >
                {label}
                <span className={`absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                  scrolled ? "bg-brass" : "bg-brass"
                }`} />
              </a>
            ))}
            <span className={`h-6 w-px ${scrolled ? "bg-slate-200" : "bg-slate-300"}`} />
          </div>

          {/* Actions — right section (icons only) */}
          <div className="flex flex-1 items-center justify-end gap-3">
            {/* Sign In icon */}
            <button
              onClick={() => setAuthOpen(true)}
              aria-label="Sign in or login"
              className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? "border-slate-300 text-slate-700 hover:border-brass hover:text-brass"
                  : "border-slate-300 text-charcoal hover:border-brass hover:text-brass"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </button>

            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? "border-slate-300 text-slate-700 hover:border-brass hover:text-brass"
                  : "border-slate-300 text-charcoal hover:border-brass hover:text-brass"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </button>

            {/* Wishlist icon */}
            <button
              onClick={() => setWishlistOpen(true)}
              aria-label="Open wishlist"
              className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? "border-slate-300 text-slate-700 hover:border-brass hover:text-brass"
                  : "border-slate-300 text-charcoal hover:border-brass hover:text-brass"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8z" /></svg>
            </button>

            {/* Cart icon */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 hover:scale-105 ${
                scrolled
                  ? "border-slate-300 text-slate-700 hover:border-brass hover:text-brass"
                  : "border-slate-300 text-charcoal hover:border-brass hover:text-brass"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            </button>

            {/* WhatsApp icon — real logo, green */}
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-[#25D366] text-white shadow-soft transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.099-.198.247-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`transition-colors duration-300 md:hidden ${
              scrolled ? "text-charcoal" : "text-charcoal"
            }`}
            aria-label="Toggle menu"
          >
            <span className="text-2xl">{menuOpen ? "×" : "☰"}</span>
          </button>
        </nav>

        {menuOpen && (
          <div className="mx-4 mt-3 rounded-2xl border border-slate-200/50 bg-white/95 p-5 shadow-elevated backdrop-blur-xl md:hidden animate-scale-in">
            <div className="mb-3 flex items-center gap-2">
              <button
                onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
                className="flex-1 border border-slate-200 px-4 py-3 text-left text-xs uppercase tracking-[0.15em] text-slate-500 transition-colors hover:border-brass"
              >
                Search products…
              </button>
              <button
                onClick={() => { setMenuOpen(false); setCartOpen(true); }}
                aria-label="Open cart"
                className="relative grid h-12 w-12 place-items-center border border-slate-200 text-slate-600 transition-colors hover:border-brass hover:text-brass"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-brass text-[10px] font-bold text-charcoal">{cartCount}</span>
              </button>
            </div>
            {nav.map(([label, href], i) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-slate-100 py-4 text-sm uppercase tracking-[0.15em] text-slate-700 transition-colors hover:text-brass"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setAuthOpen(true); }}
              className="mt-4 block w-full border border-charcoal px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-charcoal transition-all hover:bg-charcoal hover:text-white"
            >
              Sign In / Register
            </button>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block bg-brass px-5 py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-charcoal transition-all hover:bg-accent hover:shadow-glow"
            >
              WhatsApp Us
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-[760px] overflow-hidden bg-white text-charcoal lg:min-h-[820px]">
  {heroSlides.map((slide, idx) => (
    <img
      key={slide.number}
      src={slide.img}
      alt={slide.title}
      onError={imgError}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out gpu-accelerated ${
        idx === heroIndex ? "opacity-100" : "opacity-0"
      }`}
      style={{ filter: "saturate(1.5) brightness(1.08)" }}
    />
  ))}
  <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-transparent to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 via-transparent to-transparent" />

  {/* Decorative elements */}
  <div className="absolute right-10 top-32 h-40 w-40 rounded-full border border-brass/20 animate-float" />
  <div className="absolute bottom-20 right-40 h-24 w-24 rounded-full border border-brass/20 animate-float" style={{ animationDelay: "1s" }} />

  <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-24 pt-44 lg:min-h-[820px] lg:px-8 lg:pb-32 lg:pt-52">
      <div className="max-w-3xl">
      <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] text-brass animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <span className="h-px w-10 bg-brass" />
        {heroSlides[heroIndex].number} — {heroSlides[heroIndex].label}
      </p>
      <h1
        key={heroIndex}
        className={`font-display text-5xl leading-[0.96] tracking-[-0.03em] sm:text-6xl lg:text-8xl animate-fade-in ${
          heroIndex >= 2 ? "text-white" : "text-charcoal"
        }`}
        style={{
          animationDuration: "0.8s",
          textShadow:
            heroIndex >= 2
              ? "0 2px 12px rgba(0,0,0,0.6), 0 6px 28px rgba(0,0,0,0.5)"
              : "0 1px 2px rgba(255,255,255,0.95), 0 0 22px rgba(255,255,255,0.85)",
        }}
      >
        {heroSlides[heroIndex].icon}
        <br />
        <span className="inline-block">{heroSlides[heroIndex].title}</span>
      </h1>
      <p
        className={`mt-7 max-w-xl text-2xl font-semibold leading-9 animate-fade-up ${
          heroIndex >= 2 ? "text-white/90" : "text-charcoal"
        }`}
        style={{
          animationDelay: "0.3s",
          textShadow:
            heroIndex >= 2
              ? "0 2px 10px rgba(0,0,0,0.6)"
              : "0 1px 2px rgba(255,255,255,0.95), 0 0 16px rgba(255,255,255,0.8)",
        }}
      >
        “{heroSlides[heroIndex].tagline}”
      </p>
      <div
        className="mt-9 flex flex-col gap-3 sm:flex-row animate-fade-up"
        style={{ animationDelay: "0.5s" }}
      >
        <button
          onClick={() => setQuoteOpen(true)}
          className="group relative overflow-hidden bg-brass px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-charcoal transition-all duration-400 hover:shadow-glow hover:-translate-y-0.5"
        >
          <span className="relative z-10">Request a Quote</span>
          <span className="absolute inset-0 bg-white transition-transform duration-400 -translate-x-full group-hover:translate-x-0" />
        </button>
        <a
          href="#collections"
          className="border border-charcoal/20 px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.18em] text-charcoal transition-all duration-400 hover:border-brass hover:text-brass hover:-translate-y-0.5 hover:shadow-glow"
        >
          Explore Collections
        </a>
      </div>

      {/* Carousel indicators */}
      <div className="mt-14 flex items-center gap-4">
        {heroSlides.map((slide, idx) => (
          <button
            key={slide.number}
            onClick={() => setHeroIndex(idx)}
            aria-label={`Slide ${slide.number}: ${slide.label}`}
            className={`transition-all duration-500 rounded-full ${
              idx === heroIndex
                ? "w-10 h-2.5 bg-brass"
                : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
        <span className="ml-2 text-xs text-slate-400 font-medium tracking-widest">
          {heroSlides[heroIndex].number} / {String(heroSlides.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  </div>
</section>

      {/* Managing Director */}
      <section id="story" className="modern-grid relative bg-ivory px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="reveal-left order-2 lg:order-1">
            <p className="mb-5 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
              Designed. Crafted. Customized.
            </p>
            <h2 className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl">
              Your space deserves furniture with a point of view.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-500">
              At Heaven Furniture Mart, we believe furniture is more than function;
              it is a reflection of lifestyle, taste, and comfort. Every piece is
              created to bring lasting elegance into the homes of our clients.
            </p>
            <div className="mt-8 flex items-center gap-4 border-t border-slate-200 pt-7">
              <div>
                <p className="font-display text-lg font-semibold text-charcoal">
                  Abul Kalam Bhuiyan
                </p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  Managing Director
                </p>
              </div>
            </div>
            <button
              onClick={() => setQuoteOpen(true)}
              className="mt-8 bg-charcoal px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-400 hover:bg-brass hover:text-charcoal hover:shadow-glow hover:-translate-y-0.5"
            >
              Learn More
            </button>
          </div>
          <div className="reveal-right order-1 lg:order-2">
            <div className="relative mx-auto max-w-md group/director">
              <div className="absolute -inset-3 rounded-[2rem] border-2 border-brass/0 transition-all duration-700 group-hover/director:border-brass/40 group-hover/director:scale-[1.02]" />
              <div className="absolute -inset-1 rounded-[1.75rem] bg-brass/0 transition-all duration-700 group-hover/director:bg-brass/5" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elevated transition-all duration-700 group-hover/director:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] group-hover/director:-translate-y-2">
                <img
                  src={images.director}
                  alt="Abul Kalam Bhuiyan, Managing Director"
                  loading="lazy"
                  onError={imgError}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/director:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/director:opacity-100" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section id="new-arrivals" className="bg-ivory px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end reveal">
            <div>
              <p className="mb-4 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
                Fresh from the workshop
              </p>
              <h2 className="font-display text-4xl sm:text-5xl">New arrivals.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-400">
              The latest pieces to land in our showroom, fresh off the workbench.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            {arrivals.map((p) => (
              <ProductCard key={p.name} p={p} badge="New" badgeClass="bg-charcoal text-white" onOrder={() => setQuoteOpen(true)} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling */}
      <section id="top-selling" className="bg-white px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end reveal">
            <div>
              <p className="mb-4 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
                Top Selling
              </p>
              <h2 className="font-display text-4xl sm:text-5xl">Top selling.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-400">
              The pieces our customers come back for, again and again.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            {topSelling.map((p, i) => (
              <ProductCard key={p.name} p={p} badge={`#${i + 1}`} badgeClass="bg-brass text-charcoal" onOrder={() => setQuoteOpen(true)} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="bg-white px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end reveal mb-10">
            <div>
              <p className="mb-4 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
                The Collection
              </p>
              <h2 className="font-display text-4xl sm:text-5xl">Made for the way you live.</h2>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setCarouselHover(true)}
            onMouseLeave={() => setCarouselHover(false)}
          >
            <button
              onClick={() => setCarouselIndex((i) => (i - 1 + slides) % slides)}
              aria-label="Previous collection"
              className="absolute left-0 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1/2 hover:border-brass hover:bg-brass hover:text-charcoal"
            >
              ←
            </button>
            <button
              onClick={() => setCarouselIndex((i) => (i + 1) % slides)}
              aria-label="Next collection"
              className="absolute right-0 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1/2 hover:border-brass hover:bg-brass hover:text-charcoal"
            >
              →
            </button>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  width: `${slides * 100}%`,
                  transform: `translateX(-${(carouselIndex * 100) / slides}%)`,
                }}
              >
                {collectionSlides.map((slide, slideIdx) => (
                  <div
                    key={slideIdx}
                    className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2"
                    style={{ flex: `0 0 ${100 / slides}%` }}
                  >
                    {slide.map((item) => (
                      <CollectionCard
                        key={item.title}
                        image={item.image}
                        title={item.title}
                        number={item.number}
                        hoveredCard={hoveredCard}
                        setHoveredCard={setHoveredCard}
                        cardProductIdx={cardProductIdx}
                        products={collectionProducts[item.title]}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="mt-8 flex items-center justify-center gap-3">
              {collectionSlides.map((_, slide) => (
                <button
                  key={slide}
                  onClick={() => setCarouselIndex(slide)}
                  aria-label={`Go to slide ${slide + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-400 ${
                    slide === carouselIndex ? "w-8 bg-brass" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section id="best-sellers" className="modern-grid bg-slate-50 px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end reveal">
            <div>
              <p className="mb-4 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
                Best Sellers
              </p>
              <h2 className="font-display text-4xl sm:text-5xl">
                Loved most, bought most.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-400">
              The most-loved pieces from each collection, hand-picked and on offer.
            </p>
          </div>

          {/* Category tabs */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2 reveal">
            {[
              ["living", "Living Room"],
              ["bedroom", "Bedroom"],
              ["dining", "Dining"],
              ["workspace", "Workspace"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setBestSellerCat(key)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-400 ${
                  bestSellerCat === key
                    ? "bg-charcoal text-white shadow-soft"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-brass hover:text-brass"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Product cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            {bestSellers[bestSellerCat].map((p, i) => (
              <div
                key={p.name}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover hover:border-brass"
              >
                <span className="absolute left-4 top-4 z-10 rounded-full bg-brass px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-charcoal shadow-soft">
                  {p.off}
                </span>
                <span className="absolute right-4 top-4 z-10 rounded-full bg-charcoal/85 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                  #{i + 1} Best Seller
                </span>
                <div className="img-zoom relative aspect-[4/3]">
                  <img src={p.img} alt={p.name} loading="lazy" onError={imgError} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold text-brass">{p.rating} ★ · Rated {p.rating}</p>
                  <h3 className="mt-1.5 font-display text-lg">{p.name}</h3>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-lg font-bold text-charcoal">{p.price}</span>
                  </div>
                  <button
                    onClick={() => setQuoteOpen(true)}
                    className="mt-4 border border-charcoal px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-charcoal transition-all duration-300 group-hover:bg-charcoal group-hover:text-white hover:shadow-glow"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke */}
      <section id="bespoke" className="bg-charcoal text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative min-h-[500px] overflow-hidden lg:min-h-[680px] reveal-left">
            <img
              src={images.bespoke}
              alt="Bespoke interior furniture"
              onError={imgError}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-800 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
            <span className="absolute bottom-8 left-8 text-[10px] uppercase tracking-[0.25em] text-white/70">
              Crafted in Chattogram
            </span>
          </div>
          <div className="flex items-center px-6 py-20 sm:px-12 lg:px-20 reveal-right">
            <div>
              <p className="mb-5 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
                The Heaven Difference
              </p>
              <h2 className="font-display text-4xl leading-tight sm:text-5xl">
                Nothing off the shelf. Everything made for you.
              </h2>
              <p className="mt-7 leading-8 text-white/60">
                Bring us your room, measurements, mood, or simply an idea. Our
                bespoke service turns your vision into a piece built for your exact
                space and taste.
              </p>
              <ul className="mt-9 space-y-4 border-t border-white/10 pt-7 text-sm">
                {[
                  "Free design consultation",
                  "Premium wood & materials",
                  "Skilled in-house craftsmanship",
                  "Delivery & installation included",
                ].map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2 hover:text-brass"
                  >
                    <span className="text-brass">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setQuoteOpen(true)}
                className="mt-10 border border-brass px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-brass transition-all duration-400 hover:bg-brass hover:text-charcoal hover:shadow-glow hover:-translate-y-0.5"
              >
                Start Your Design
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center reveal">
            <p className="mb-4 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
              How It Works
            </p>
            <h2 className="font-display text-4xl sm:text-5xl">
              From first sketch to final install.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-slate-500">
              A clear, simple process from start to end — you'll know exactly where
              your furniture is at every step.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 stagger-children">
            {[
              ["01", "Book a Free Consultation", "Get in touch and meet our designers to discuss your space, needs and budget."],
              ["02", "Design & Quote", "We create a 3D design and a transparent quote for your approval."],
              ["03", "Crafting in Our Workshop", "Your piece is hand-built from premium wood by our in-house craftsmen."],
              ["04", "Quality Check", "Every piece is inspected, finished and polished before it leaves the workshop."],
              ["05", "Delivery & Installation", "We deliver, install and set everything up in your space — done and dusted."],
            ].map(([n, title, text], idx) => (
              <div key={n} className="group relative text-center">
                {idx < 4 && (
                  <span className="pointer-events-none absolute right-[-50%] top-7 hidden h-px w-full border-t-2 border-dashed border-slate-200 lg:block" />
                )}
                <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-brass bg-ivory font-display text-lg text-brass transition-all duration-400 group-hover:scale-110 group-hover:bg-brass group-hover:text-charcoal">
                  {n}
                </span>
                <h3 className="mt-5 font-display text-lg text-charcoal transition-colors duration-300 group-hover:text-brass">
                  {title}
                </h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-6 text-slate-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="bg-muted px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end reveal">
            <div>
              <p className="mb-4 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
                Why Choose Us
              </p>
              <h2 className="max-w-2xl font-display text-4xl sm:text-5xl">
                Made with care, built to last.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              What makes Heaven Furniture Mart different — from the first sketch to
              the final install.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            {[
              ["01", "Free Design Consultation", "Sit down with our designers and get a free consultation with a 3D sketch before you commit.", "✦"],
              ["02", "Fully Bespoke", "Every order is crafted to order — tailor-made to your style, taste and requirements.", "✦"],
              ["03", "Built to Your Space", "We measure your room and build each piece around your exact dimensions and layout.", "✦"],
              ["04", "Premium Wood & In-House Craftsmanship", "Locally sourced and imported premium wood, finished by skilled craftsmen in our own workshop.", "✦"],
              ["05", "Large Agrabad Showroom", "Visit our large showroom in Agrabad, Chattogram and see the quality up close before you order.", "✦"],
              ["06", "Delivery & Installation Included", "We deliver, install and set everything up for you — no hassle, no extra surprises.", "✦"],
              ["07", "Easy Payment", "Flexible and easy payment options to fit your budget.", "✦"],
              ["08", "Happy Customer", "Thousands of happy homes trust Heaven Furniture Mart for lasting quality.", "✦"],
            ].map(([n, title, text, mark]) => (
              <div
                key={n}
                className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-brass hover:shadow-card-hover"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-brass/15 text-lg text-brass transition-transform duration-400 group-hover:scale-110">
                  {mark}
                </span>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brass">{n}</p>
                <h3 className="mt-2 font-display text-xl text-charcoal transition-colors duration-300 group-hover:text-brass">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Feedback */}
      <section id="testimonials" className="bg-white px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center reveal">
            <p className="mb-4 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
              Customer Feedback
            </p>
            <h2 className="font-display text-4xl sm:text-5xl">
              Loved by homes across Chattogram.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 stagger-children">
            {[
              {
                name: "Tanvir Ahmed",
                role: "Apartment Owner · Agrabad",
                stars: 5,
                text: "The bespoke living set exceeded our expectations. Perfect fit, gorgeous finish, and delivered exactly on the promised date. Highly recommended!",
              },
              {
                name: "Nusrat Jahan",
                role: "Interior Stylist",
                stars: 5,
                text: "I've worked with many furniture makers, and Heaven stands out. Their craftsmanship and attention to detail are truly premium. My clients love it.",
              },
              {
                name: "Rafiul Islam",
                role: "New Homeowner · Nasirabad",
                stars: 4,
                text: "From the free design consult to the final installation, everything was smooth. The team helped us pick the perfect materials for our budget.",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="reveal-card group relative flex flex-col rounded-2xl border border-slate-200 bg-ivory p-8 shadow-card transition-all duration-500"
              >
                <div className="mb-4 flex text-brass" aria-label={`${review.stars} stars`}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg
                      key={s}
                      viewBox="0 0 20 20"
                      fill={s < review.stars ? "currentColor" : "none"}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M10 1l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 14.9 4.8 17.3l1-5.9L1.5 7.2l5.9-.9z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-7 text-slate-600">
                  "{review.text}"
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brass font-display text-sm font-semibold text-charcoal">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{review.name}</p>
                    <p className="text-xs text-slate-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Our Outlet */}
      <section id="outlet" className="bg-white px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="reveal-left">
            <p className="mb-5 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
              Visit Our Outlet
            </p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">
              Step into our showroom in Chattogram.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-500">
              Feel the texture of the wood, sit in the furniture, and talk to our
              designers in person. Your dream space starts with a visit.
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="https://maps.app.goo.gl/mGsD4meEMKH8k9gZA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-slate-600 transition-colors duration-300 hover:text-brass"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brass/15 font-bold text-brass">
                  ☰
                </span>
                <span>Agrabad Access Road, Chattogram</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brass/15 font-bold text-brass">
                  ◷
                </span>
                <span>Open Daily · 9:00 AM – 9:00 PM</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brass/15 font-bold text-brass">
                  ✆
                </span>
                <span>+880 1960-481983</span>
              </div>
            </div>
            <div className="mt-9 flex items-center gap-4">
              <button
                onClick={() => setQuoteOpen(true)}
                className="bg-charcoal px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-400 hover:bg-brass hover:text-charcoal hover:shadow-glow hover:-translate-y-0.5"
              >
                Plan Your Visit
              </button>
              <a
                href="https://maps.app.goo.gl/mGsD4meEMKH8k9gZA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-charcoal px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-charcoal transition-all duration-400 hover:bg-charcoal hover:text-white hover:shadow-glow hover:-translate-y-0.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                View on Map
              </a>
            </div>
          </div>
          <div className="reveal-right">
            <div className="img-zoom relative aspect-[16/10] overflow-hidden rounded-3xl shadow-elevated">
              <img
                src="https://heaven.helloimabid.com/cdn-cgi/image/width=1920,quality=75,format=auto/images/showroom-landscape.png"
                alt="Heaven Furniture Mart showroom"
                loading="lazy"
                onError={imgError}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center reveal">
            <p className="mb-4 text-xl font-extrabold uppercase tracking-[0.16em] text-brass">
              Questions & Answers
            </p>
            <h2 className="font-display text-4xl sm:text-5xl">
              Frequently asked questions.
            </h2>
          </div>

          <div className="space-y-4 stagger-children">
            {[
              {
                q: "How long does a bespoke furniture order take?",
                a: "Most custom pieces are ready within 2–4 weeks, depending on size, materials, and our production queue. We'll give you an exact timeline after your free design consultation.",
              },
              {
                q: "Do you offer delivery and installation?",
                a: "Yes. Delivery and installation are included with every bespoke order across Chattogram. For custom pieces we handle the full setup so you can enjoy your furniture right away.",
              },
              {
                q: "Can I get a 3D design sketch before ordering?",
                a: "Absolutely. Every bespoke enquiry includes a free design consultation and a digital sketch of your piece so you know exactly what you're getting before we start.",
              },
              {
                q: "What materials do you work with?",
                a: "We use premium locally sourced and international wood, along with high-grade hardware and finishes. In the consultation we'll help you pick materials that fit your budget and style.",
              },
              {
                q: "How do payments work?",
                a: "We offer flexible, easy payment options. A deposit secures your build, with the balance due on delivery — and we accept a range of payment methods.",
              },
              {
                q: "Is there a warranty on furniture?",
                a: "Yes, every piece comes with warranty coverage on materials and workmanship. Our goal is lasting peace of mind, so if anything isn't right, we make it right.",
              },
            ].map((item, i) => {
              return <FaqItem key={i} q={item.q} a={item.a} />;
            })}
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section
        id="contact"
        className="relative overflow-hidden bg-charcoal px-5 py-24 text-center text-white lg:px-8 lg:py-32"
      >
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-brass/15 animate-float" />
        <div
          className="absolute -left-28 -bottom-32 h-96 w-96 rounded-full border border-brass/10 animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-5 text-sm font-extrabold uppercase tracking-[0.18em] text-brass reveal">
            Let's create something timeless
          </p>
          <h2 className="font-display text-5xl leading-none sm:text-6xl lg:text-7xl reveal">
            Tell us what you're imagining.
          </h2>
          <p className="mx-auto mt-7 max-w-xl leading-7 text-white/60 reveal">
            Start with a conversation. Our team will help shape your idea into
            furniture made specifically for you.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row reveal">
            <button
              onClick={() => setQuoteOpen(true)}
              className="group relative overflow-hidden bg-brass px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-charcoal transition-all duration-400 hover:shadow-glow hover:-translate-y-0.5"
            >
              <span className="relative z-10">Request a Quote</span>
              <span className="absolute inset-0 bg-white transition-transform duration-400 -translate-x-full group-hover:translate-x-0" />
            </button>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="border border-white/25 px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-400 hover:border-brass hover:text-brass hover:-translate-y-0.5"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 px-5 py-14 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center border border-brass text-sm font-semibold tracking-[0.2em] text-brass">
                HF
              </span>
              <span className="font-display text-2xl">Heaven Furniture Mart</span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/40">
              Luxury bespoke furniture and interior styling. Designed. Crafted.
              Customized.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/heavenfurnituremart"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:bg-brass hover:text-charcoal hover:shadow-glow"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
              </a>
              <a
                href="https://www.instagram.com/heavenfurnituremart"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:bg-brass hover:text-charcoal hover:shadow-glow"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.72.7 1.34 1.39 2.13a5.9 5.9 0 0 0 2.13 1.39c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-11.85a1.44 1.44 0 1 1-1.44 1.44 1.44 1.44 0 0 1 1.44-1.44z" /></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/heavenfurnituremart"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:bg-brass hover:text-charcoal hover:shadow-glow"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
              </a>
              <a
                href="https://www.youtube.com/@heavenfurnituremart"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:bg-brass hover:text-charcoal hover:shadow-glow"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.55 12 3.55 12 3.55s-7.51 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.51 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" /></svg>
              </a>
              <a
                href="https://www.pinterest.com/heavenfurnituremart"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:bg-brass hover:text-charcoal hover:shadow-glow"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.438.218-.93 1.407-5.965 1.407-5.965s-.359-.718-.359-1.777c0-1.664.965-2.907 2.166-2.907 1.021 0 1.514.767 1.514 1.687 0 1.027-.653 2.562-.991 3.986-.283 1.19.597 2.162 1.77 2.162 2.127 0 3.761-2.242 3.761-5.479 0-2.865-2.059-4.868-4.998-4.868-3.404 0-5.402 2.554-5.402 5.194 0 1.029.395 2.132.89 2.731a.36.36 0 0 1 .083.345c-.091.378-.293 1.194-.333 1.361-.052.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.784 2.75-7.262 7.93-7.262 4.163 0 7.401 2.968 7.401 6.934 0 4.137-2.61 7.467-6.23 7.467-1.216 0-2.359-.633-2.75-1.381l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-brass">
              Outlets & Showroom
            </p>
            <p className="text-sm leading-6 text-white/50">
              Agrabad Access Road
              <br />
              Chattogram, Bangladesh
            </p>
            <p className="mt-4 text-sm leading-6 text-white/50">
              Open Daily
              <br />
              9:00 AM – 9:00 PM
            </p>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-brass">
              Delivery Areas
            </p>
            <ul className="space-y-2 text-sm text-white/50">
              {["Chattogram City", "Cox's Bazar", "Comilla", "Feni", "Narayanganj", "Dhaka"].map((area) => (
                <li key={area} className="flex items-center gap-2 transition-colors hover:text-brass">
                  <a href="#contact">{area}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-brass">
              Contact
            </p>
            <a
              href="tel:+8801960481983"
              className="block text-sm text-white/50 transition-colors duration-300 hover:text-brass"
            >
              +880 1960-481983
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-sm text-white/50 transition-colors duration-300 hover:text-brass"
            >
              WhatsApp us anytime
            </a>
            <a
              href="mailto:heavenfurnituremart@gmail.com"
              className="mt-2 block break-all text-sm text-white/50 transition-colors duration-300 hover:text-brass"
            >
              heavenfurnituremart@gmail.com
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-4 block w-fit bg-brass px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-charcoal transition-all duration-300 hover:shadow-glow"
            >
              Get a Quote
            </a>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.2em] text-white/25">
          © {new Date().getFullYear()} Heaven Furniture Mart · Designed for real
          customers, not templates.
        </div>
      </footer>

      {/* Quote Modal */}
      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}

      {/* Search Modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} products={Object.values(bestSellers).flat()} />}

      {/* Cart Modal */}
      {cartOpen && <CartModal onClose={() => setCartOpen(false)} />}

      {/* Auth Modal */}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      {/* Wishlist Modal */}
      {wishlistOpen && <WishlistModal onClose={() => setWishlistOpen(false)} />}

      {/* Deals Popup (shows once on load) */}
      {offersOpen && <DealsPopup onClose={() => setOffersOpen(false)} onRedeem={() => { setOffersOpen(false); setQuoteOpen(true); }} />}
    </div>
  );
}

function CollectionCard({ image, title, number, featured, hoveredCard, setHoveredCard, cardProductIdx, products }) {
  const [loaded, setLoaded] = useState(false);
  const isHovered = hoveredCard === title;
  const showProduct = isHovered && products && products.length > 0;

  return (
    <a
      href="#contact"
      className={`group relative block overflow-hidden card-hover ${
        featured ? "sm:col-span-2" : ""
      }`}
      onMouseEnter={() => setHoveredCard(title)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div
        className={`img-zoom ${
          featured ? "h-[420px] sm:h-[500px]" : "h-[360px] sm:h-[430px]"
        }`}
      >
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse" />
        )}
        <img
          src={image}
          alt={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            loaded && !showProduct ? "opacity-100" : "opacity-0"
          }`}
        />
        {showProduct && (
          <img
            src={products[cardProductIdx]}
            alt={`${title} product ${cardProductIdx + 1}`}
            className="absolute inset-0 h-full w-full object-cover animate-fade-in"
            style={{ animationDuration: "0.4s" }}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent transition-opacity duration-400 group-hover:from-charcoal/90" />
      {showProduct && (
        <div className="absolute left-0 top-0 z-10 m-4 rounded-full bg-brass/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-charcoal backdrop-blur-sm">
          Previewing Products
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-brass">
            Collection {number}
          </p>
          <h3 className="font-display text-3xl text-white transition-all duration-400 group-hover:translate-x-1 sm:text-4xl">
            {title}
          </h3>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-full border border-white/30 text-white transition-all duration-400 group-hover:bg-brass group-hover:text-charcoal group-hover:border-brass group-hover:scale-110 group-hover:rotate-12">
          ↗
        </span>
      </div>
    </a>
  );
}

function ProductCard({ p, badge, badgeClass, onOrder }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover hover:border-brass">
      <span className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] shadow-soft ${badgeClass}`}>
        {badge}
      </span>
      <div className="img-zoom relative aspect-[4/3]">
        <img src={p.img} alt={p.name} loading="lazy" onError={imgError} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-brass">{p.rating} ★ · {p.rating} rating</p>
        <h3 className="mt-1.5 font-display text-lg">{p.name}</h3>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-lg font-bold text-charcoal">{p.price}</span>
        </div>
        <button
          onClick={onOrder}
          className="mt-4 border border-charcoal px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-charcoal transition-all duration-300 group-hover:bg-charcoal group-hover:text-white hover:shadow-glow"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

function QuoteModal({ onClose }) {
  const [sent, setSent] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/60 p-4 backdrop-blur-md modal-backdrop"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white p-7 shadow-elevated sm:p-10 modal-content rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brass">
              Bespoke enquiry
            </p>
            <h3 className="mt-2 font-display text-4xl">Request a quote</h3>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full text-2xl text-slate-400 transition-all duration-300 hover:bg-slate-100 hover:text-charcoal hover:rotate-90"
          >
            ×
          </button>
        </div>

        {sent ? (
          <div className="py-12 text-center animate-scale-in">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brass text-charcoal text-xl">
              ✓
            </div>
            <h4 className="mt-5 font-display text-2xl">Thank you.</h4>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your enquiry has been recorded. Please use WhatsApp for the fastest
              response.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-block bg-brass px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-charcoal transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
            >
              Continue on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5">
            <input
              required
              placeholder="Your name"
              className="w-full border-b border-slate-200 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-slate-400 transition-colors duration-300 focus:border-brass"
            />
            <input
              required
              type="tel"
              placeholder="Phone number"
              className="w-full border-b border-slate-200 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-slate-400 transition-colors duration-300 focus:border-brass"
            />
            <select className="w-full border-b border-slate-200 bg-transparent px-0 py-3 text-sm outline-none transition-colors duration-300 focus:border-brass text-slate-600">
              <option>What are you looking for?</option>
              <option>Living room</option>
              <option>Bedroom</option>
              <option>Dining</option>
              <option>Office / Study</option>
              <option>Fully bespoke furniture</option>
            </select>
            <textarea
              rows="3"
              placeholder="Tell us about your space or idea..."
              className="w-full resize-none border-b border-slate-200 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-slate-400 transition-colors duration-300 focus:border-brass"
            />
            <button className="w-full bg-charcoal px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-400 hover:bg-brass hover:text-charcoal hover:shadow-glow hover:-translate-y-0.5 rounded-xl">
              Send Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-ivory transition-all duration-500 hover:border-brass">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-charcoal">{q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
            open
              ? "rotate-45 border-brass bg-brass text-charcoal"
              : "border-slate-300 text-slate-400"
          }`}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-all duration-500 ease-in-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-7 text-slate-500">{a}</p>
        </div>
      </div>
    </div>
  );
}

function SearchModal({ onClose, products }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  const results = query.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    : products.slice(0, 6);

  return (
    <div className="fixed inset-0 z-[120] bg-charcoal/70 p-4 backdrop-blur-md modal-backdrop" onClick={onClose}>
      <div className="mx-auto mt-16 w-full max-w-xl rounded-2xl bg-white p-6 shadow-elevated modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brass">Search our collections</p>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-2xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-charcoal">×</button>
        </div>
        <div className="mt-4 flex items-center gap-3 border-b border-slate-200 pb-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-slate-400"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sofas, beds, dining sets…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <div className="mt-4 max-h-[50vh] space-y-3 overflow-y-auto">
          {results.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">No products found for "{query}".</p>
          ) : (
            results.map((p) => (
              <button
                key={p.name}
                onClick={() => setQuery("")}
                className="flex w-full items-center gap-4 rounded-xl border border-slate-100 p-2.5 text-left transition-all hover:border-brass hover:bg-ivory"
              >
                <img src={p.img} alt={p.name} loading="lazy" onError={imgError} className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-charcoal">{p.name}</p>
                  <p className="text-xs text-slate-400">Rating {p.rating} ★</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-charcoal">{p.price}</p>
                  <p className="text-xs font-bold text-brass">{p.off}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CartModal({ onClose }) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  const items = [];

  return (
    <div className="fixed inset-0 z-[120] bg-charcoal/70 p-4 backdrop-blur-md modal-backdrop" onClick={onClose}>
      <div className="mx-auto mt-16 w-full max-w-lg rounded-2xl bg-white p-6 shadow-elevated modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brass">Your Cart ({items.length})</p>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-2xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-charcoal">×</button>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-3xl">🛒</span>
          <p className="mt-4 font-display text-2xl text-charcoal">Your cart is empty</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
            Nothing has been added to your cart yet. Browse our collection and find pieces you'll love.
          </p>
        </div>
      </div>
    </div>
  );
}

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <div className="fixed inset-0 z-[120] bg-charcoal/70 p-4 backdrop-blur-md modal-backdrop" onClick={onClose}>
      <div className="mx-auto mt-16 w-full max-w-md rounded-2xl bg-white p-7 shadow-elevated modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brass">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-2xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-charcoal">×</button>
        </div>
        <h3 className="mt-3 font-display text-3xl">{isLogin ? "Sign In" : "Sign Up"}</h3>

        <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1 text-center text-xs font-bold uppercase tracking-[0.1em]">
          <button onClick={() => setIsLogin(true)} className={`rounded-full py-2.5 transition-all ${isLogin ? "bg-white text-charcoal shadow-soft" : "text-slate-400"}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`rounded-full py-2.5 transition-all ${!isLogin ? "bg-white text-charcoal shadow-soft" : "text-slate-400"}`}>Sign Up</button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <input required placeholder="Full name" className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brass" />
          )}
          {!isLogin && (
            <input required type="tel" placeholder="Phone number" className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brass" />
          )}
          {!isLogin && (
            <input required placeholder="Location (e.g. Chattogram)" className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brass" />
          )}
          <input required type="email" placeholder="Email address" className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brass" />
          <input required type="password" placeholder="Password" className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brass" />
          {!isLogin && (
            <input required type="password" placeholder="Confirm password" className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brass" />
          )}
          <button className="w-full bg-charcoal px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-400 hover:bg-brass hover:text-charcoal rounded-xl">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-slate-400">
          {isLogin ? "New to Heaven Furniture Mart? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-brass hover:text-accent">
            {isLogin ? "Create an account" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}

function WishlistModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  const items = [];

  return (
    <div className="fixed inset-0 z-[120] bg-charcoal/70 p-4 backdrop-blur-md modal-backdrop" onClick={onClose}>
      <div className="mx-auto mt-16 w-full max-w-lg rounded-2xl bg-white p-6 shadow-elevated modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brass">Your Wishlist ({items.length})</p>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-2xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-charcoal">×</button>
        </div>
        <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-3xl">🤍</span>
          <p className="mt-4 font-display text-2xl text-charcoal">Your wishlist is empty</p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
            You haven't saved anything yet. Tap the heart on pieces you love to keep them here.
          </p>
        </div>
      </div>
    </div>
  );
}

function DealsPopup({ onClose, onRedeem }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <div className="fixed inset-0 z-[150] grid place-items-center bg-charcoal/70 p-4 backdrop-blur-md modal-backdrop" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl shadow-elevated modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={productImages.sofaLarge}
          alt="Bespoke sofa set"
          loading="lazy"
          onError={imgError}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "saturate(1.45) brightness(1.08)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent" />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white text-xl text-charcoal/70 shadow-soft transition-colors hover:bg-slate-100 hover:text-charcoal"
        >
          ×
        </button>

        <div className="relative flex flex-col items-center px-8 py-12 text-center text-charcoal md:px-14 md:py-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brass" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9)" }}>
            Limited Time · Exclusive
          </p>
          <h3 className="mt-3 font-display text-4xl leading-none md:text-6xl" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.7)" }}>
            Up to <span className="text-brass">20% OFF</span>
          </h3>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-charcoal/80" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9)" }}>
            Bespoke furniture sets
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-charcoal/85" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9)" }}>
            Plus a free design consultation on your first quote this month. Only a few slots left!
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/90" style={{ textShadow: "0 1px 2px rgba(255,255,255,0.9)" }}>
            <span className="h-px w-8 bg-charcoal/40" />
            Use code
            <span className="h-px w-8 bg-charcoal/40" />
          </div>
          <code className="mx-auto mt-3 block w-fit rounded-lg border border-dashed border-brass bg-white px-6 py-3 text-xl font-bold tracking-[0.25em] text-charcoal shadow-soft">
            BESPOKE20
          </code>

          <div className="mt-7 flex w-full max-w-xs flex-col gap-3">
            <button
              onClick={onRedeem}
              className="w-full bg-charcoal px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-400 hover:bg-brass hover:text-charcoal rounded-xl"
            >
              Claim This Offer
            </button>
<button onClick={onClose} className="w-full text-center text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:text-white/80" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}>
                No thanks, continue browsing
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
