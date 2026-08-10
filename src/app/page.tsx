"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ChevronRight } from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  imagePosition?: string;
  details: string[];
}

interface Review {
  name: string;
  location: string;
  text: string;
  rating: number;
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  {
    id: "sanding-refinishing",
    title: "Sanding & Refinishing",
    shortDesc: "Restore & Revive",
    fullDesc:
      "We bring worn, dull, or scratched hardwood back to life. Our work includes historic heartpine floors refinished to a mirror gloss, staircase treads stripped and restained, and everything in between. Dustless sanding technology protects your home while we apply custom stain colors and multiple coats of premium finish.",
    image: "/heartpine-refinishing.png",
    imagePosition: "72% 50%",
    details: [
      "Dustless sanding technology",
      "Custom stain color matching",
      "Oil-based & water-based finishes",
      "Historic heartpine & pine restoration",
      "Spot sanding for targeted repairs",
    ],
  },
  {
    id: "staircase-refinishing",
    title: "Staircase Refinishing",
    shortDesc: "Step Up",
    fullDesc:
      "Your staircase is the centerpiece of your home. We remove old carpet and tack strips, prep and sand each tread down to bare wood, then apply a rich custom stain and durable finish coat — transforming an eyesore into a showstopper.",
    image: "/stairs-after.png",
    imagePosition: "68% 52%",
    details: [
      "Full carpet & tack strip removal",
      "Individual tread sanding & prep",
      "Custom stain color selection",
      "Durable polyurethane top coat",
      "Risers painted or stained to match",
    ],
  },
  {
    id: "installation",
    title: "Floor Installation",
    shortDesc: "New Beginnings",
    fullDesc:
      "Transform any space with premium hardwood. We handle full subfloor teardown of damaged boards, moisture barrier installation, and precision fitting of new solid hardwood — leaving your floors as clean and smooth as the day the house was built.",
    image: "/hardwood-after.png",
    imagePosition: "72% 48%",
    details: [
      "Solid & engineered hardwood",
      "Full damaged-board teardown",
      "Subfloor leveling & preparation",
      "Custom border & inlay layouts",
      "Threshold & transition molding",
    ],
  },
  {
    id: "repair",
    title: "Repairs & Restoration",
    shortDesc: "Renewed Strength",
    fullDesc:
      "From burst pipes to pet damage and deep scratches — we seamlessly restore your floors. We source matching wood species and blend stains on-site to make the repair virtually invisible, even on 60+ year old floors.",
    image: "/hardwood-before.png",
    imagePosition: "60% 48%",
    details: [
      "Individual board replacement",
      "Water & moisture damage repair",
      "Squeak elimination & anchoring",
      "Invisible stain color matching",
      "Gap filling & crack repair",
    ],
  },
  {
    id: "commercial",
    title: "Commercial Flooring",
    shortDesc: "Professional Scale",
    fullDesc:
      "We bring the same craftsmanship to commercial spaces — factories, offices, retail storefronts, and more. Our work at local commercial facilities demonstrates the durability and shine we achieve even on high-traffic hardwood floors.",
    image: "/commercial-factory-1.png",
    imagePosition: "68% 42%",
    details: [
      "High-traffic hardwood solutions",
      "Commercial-grade finishes",
      "Minimal disruption scheduling",
      "Large-scale installation & refinishing",
      "Historic building restoration",
    ],
  },
];

const REVIEWS: Review[] = [
  {
    name: "Rebecca P.",
    location: "Easthampton, MA",
    rating: 5,
    text: "I cannot say enough wonderful things about this company. We had them come to sand and refinish our wood floors and stairs. Not only are the floors beautiful but when they showed up a pipe had burst and they immediately took care of doing everything possible to save our house. They went above and beyond more than any company has ever done.",
  },
  {
    name: "David M.",
    location: "Northampton, MA",
    rating: 5,
    text: "O'Brien replaced our outdated carpet with solid oak flooring throughout our first floor. The craftsmanship is flawless. Their dustless sanding system was clean and efficient — we were back in the space the same evening.",
  },
  {
    name: "Michael K.",
    location: "Amherst, MA",
    rating: 5,
    text: "We had severe water staining on 60-year-old maple floors. O'Brien repaired the damaged boards, sanded, and refinished them to look brand new. Professional, punctual, and honest pricing.",
  },
];

const FAQS = [
  {
    q: "How long does refinishing typically take?",
    a: "Most sanding and refinishing jobs take 1–3 days depending on square footage. We use fast-drying finishes where possible, and in many cases you can walk on the floors within 24 hours with light foot traffic.",
  },
  {
    q: "Is your sanding system truly dustless?",
    a: "Yes. We use a professional containment sanding system that captures 99% of dust at the source. This protects your home's air quality and keeps surrounding rooms clean.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Absolutely. We provide free in-home estimates with no obligation. We'll assess your floors, discuss options, and give you a transparent written quote.",
  },
  {
    q: "Can you match my existing floor stain color?",
    a: "Yes. We mix custom stain colors on-site to match your existing floors as closely as possible — especially important when doing partial repairs or room additions.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Easthampton, Northampton, Amherst, Holyoke, Springfield, Westfield, and the wider Pioneer Valley region of western Massachusetts.",
  },
  {
    q: "Do you handle commercial properties?",
    a: "Yes. We work with offices, retail stores, restaurants, and other commercial spaces. We can often schedule work outside of business hours to minimize disruption.",
  },
];

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Hardwood Sanding & Refinishing",
    details: "",
    sms: false,
  });
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeWorkTab, setActiveWorkTab] = useState('staircase');
  const [staircaseSlider, setStaircaseSlider] = useState(50);
  const [hardwoodSlider, setHardwoodSlider] = useState(50);
  const staircaseContainerRef = useRef<HTMLDivElement>(null);
  const hardwoodContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lock scroll when modals open
  useEffect(() => {
    document.body.style.overflow = menuOpen || activeService ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, activeService]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      ...formState,
      submittedAt: new Date().toISOString(),
    };
    const webhookUrl = "https://amplyfyconsulting.app.n8n.cloud/webhook/79403a23-57b2-496e-8cdf-d5128f74bfd0";

    try {
      // Attempt POST submission first
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Fallback to GET if n8n webhook node is configured for GET requests
      if (!res.ok && res.status === 404) {
        const text = await res.text();
        if (text.includes("GET request")) {
          const queryParams = new URLSearchParams({
            name: formState.name,
            phone: formState.phone,
            email: formState.email,
            service: formState.service,
            details: formState.details,
            sms: String(formState.sms),
            submittedAt: payload.submittedAt,
          }).toString();
          await fetch(`${webhookUrl}?${queryParams}`, { method: "GET" });
        }
      }
    } catch (err) {
      console.error("Error sending form data to webhook:", err);
    } finally {
      setIsSubmitting(false);
      setFormSent(true);
    }
  };

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Our Work", href: "#our-work" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* ──────────────── NAVBAR ──────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-100"
        style={{ zIndex: 100 }}
      >
        <nav
          className="flex items-center justify-between px-8 md:px-16 py-7"
          style={{ background: "transparent" }}
        >
          {/* Logo */}
          <a href="/" className="nav-logo flex items-center gap-3 z-10">
            <Image
              src="/obrien-logo.png"
              alt="O'Brien Flooring"
              width={64}
              height={64}
              className="rounded-full"
              priority
            />
            <div className="text-white hidden md:block">
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                O'Brien Flooring
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 400,
                  letterSpacing: "0.14em",
                  opacity: 0.75,
                  textTransform: "uppercase",
                  marginTop: "0.2rem",
                }}
              >
                Est. 2004 · Easthampton, MA
              </div>
            </div>
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`hamburger-btn z-10 flex flex-col gap-[8px] p-3 cursor-pointer ${menuOpen ? "hamburger-open" : ""}`}
            aria-label="Toggle navigation menu"
            style={{ background: "none", border: "none" }}
          >
            <span className={`hamburger-bar bar-top ${menuOpen ? "" : ""}`} style={{ width: "34px", height: "1.5px" }} />
            <span className={`hamburger-bar bar-mid`} style={{ width: "34px", height: "1.5px" }} />
            <span className={`hamburger-bar bar-bot`} style={{ width: "22px", height: "1.5px" }} />
          </button>
        </nav>
      </header>

      {/* ──────────────── MOBILE / FULL MENU OVERLAY ──────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 p-2"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <X size={24} color="#1a1a18" />
            </button>

            {/* Logo inside menu */}
            <div className="mb-12 flex items-center gap-3">
              <Image
                src="/obrien-logo.png"
                alt="O'Brien Flooring"
                width={44}
                height={44}
                className="rounded-full"
              />
              <div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#1a1a18",
                  }}
                >
                  O'Brien Flooring
                </div>
                <div
                  style={{
                    fontSize: "0.58rem",
                    color: "#7a7a76",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Est. 2004 · Easthampton, MA
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <nav>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: "#1a1a18",
                    textDecoration: "none",
                    lineHeight: 1.2,
                    marginBottom: "0.5rem",
                    borderBottom: "1px solid #e8e8e4",
                    paddingBottom: "0.75rem",
                  }}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  whileHover={{ x: 8, color: "#1a5c2e" }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Phone */}
            <motion.a
              href="tel:4135388830"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "inline-block",
                marginTop: "2rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#1a5c2e",
                textDecoration: "none",
              }}
            >
              (413) 538-8830
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ──────────────── HERO ──────────────── */}
        <section
          id="hero"
          style={{ position: "relative", height: "100svh", overflow: "hidden" }}
        >
          <video
            ref={videoRef}
            src="/obrien-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            className="hero-video-overlay"
            style={{ position: "absolute", inset: 0 }}
          />

          {/* Scroll cue */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{
                width: "1px",
                height: "3rem",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)",
              }}
            />
          </motion.div>
        </section>

        {/* ──────────────── SERVICES ──────────────── */}
        <section
          id="services"
          style={{
            background: "#ffffff",
            paddingTop: "6rem",
            paddingBottom: "6rem",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 1.5rem",
            }}
          >
            {/* Section header */}
            <div style={{ marginBottom: "3.5rem" }}>
              <span className="section-eyebrow">What We Do</span>
              <div className="divider" />
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "#1a1a18",
                  lineHeight: 1.2,
                  maxWidth: "28rem",
                }}
              >
                Hardwood flooring, crafted to last a lifetime.
              </h2>
            </div>

            {/* Services grid — portrait 9:16 cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1px",
                background: "#e8e8e4",
              }}
            >
              {SERVICES.map((service, i) => (
                <motion.div
                  key={service.id}
                  className="service-card"
                  onClick={() => setActiveService(service)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 20vw"
                    style={{ objectFit: "cover", objectPosition: service.imagePosition || "center" }}
                  />
                  {/* Top gradient to mask any baked-in watermarks */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 35%)" }} />
                  <div className="service-card-overlay" />
                  <div className="service-card-label">
                    <p
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.65)",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {service.shortDesc}
                    </p>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "#ffffff",
                        letterSpacing: "0.01em",
                        lineHeight: 1.25,
                      }}
                    >
                      {service.title}
                    </h3>
                    <div
                      style={{
                        marginTop: "0.6rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "0.3rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.58rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        Learn More
                      </span>
                      <ChevronRight
                        size={12}
                        color="rgba(255,255,255,0.7)"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── SERVICE MODAL ──────────────── */}
        <AnimatePresence>
          {activeService && (
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setActiveService(null);
              }}
            >
              <motion.div
                className="modal-content"
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.97 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Modal Image */}
                <div
                  style={{
                    position: "relative",
                    height: "260px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    sizes="640px"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                    }}
                  />
                  <button
                    onClick={() => setActiveService(null)}
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: "50%",
                      width: "2.25rem",
                      height: "2.25rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <X size={16} color="#ffffff" />
                  </button>
                </div>

                {/* Modal Body */}
                <div style={{ padding: "2rem 2rem 2.5rem" }}>
                  <span className="section-eyebrow">
                    {activeService.shortDesc}
                  </span>
                  <h2
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      color: "#1a1a18",
                      marginBottom: "0.75rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {activeService.title}
                  </h2>
                  <div className="divider" />
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#4a4a47",
                      lineHeight: 1.75,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {activeService.fullDesc}
                  </p>

                  {/* Feature list */}
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      marginBottom: "2rem",
                    }}
                  >
                    {activeService.details.map((detail, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          fontSize: "0.82rem",
                          color: "#4a4a47",
                          padding: "0.45rem 0",
                          borderBottom: "1px solid #f0f0ec",
                        }}
                      >
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: "#1a5c2e",
                            flexShrink: 0,
                          }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", gap: "1rem" }}>
                    <a href="#contact" className="btn-primary" onClick={() => setActiveService(null)}>
                      Request a Quote
                    </a>
                    <button
                      onClick={() => setActiveService(null)}
                      className="btn-outline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ──────────────── ABOUT ──────────────── */}
        <section
          id="about"
          style={{
            background: "#fafaf8",
            padding: "6rem 0",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 1.5rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
            }}
            className="about-grid"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-eyebrow">About Us</span>
              <div className="divider" />
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "#1a1a18",
                  lineHeight: 1.25,
                  marginBottom: "1.5rem",
                }}
              >
                Making floors shine since 2004.
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#4a4a47",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                O'Brien Flooring is a locally owned and operated hardwood flooring contractor serving Easthampton and the Pioneer Valley. With over 20 years of experience, we bring precision craftsmanship and a personal commitment to every project we take on.
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#4a4a47",
                  lineHeight: 1.8,
                  marginBottom: "2rem",
                }}
              >
                We offer sanding, refinishing, repairing, and installation of hardwood flooring — and we treat your property with the same care and respect we'd give our own home.
              </p>
              <div style={{ display: "flex", gap: "3rem", marginBottom: "2rem" }}>
                {[
                  { num: "20+", label: "Years Experience" },
                  { num: "100%", label: "Free Estimates" },
                  { num: "MA", label: "Locally Owned" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: 300,
                        color: "#1a5c2e",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                    >
                      {stat.num}
                    </div>
                    <div
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#9a9a96",
                        marginTop: "0.25rem",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <a href="tel:4135388830" className="btn-primary">
                Call (413) 538-8830
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                position: "relative",
                height: "520px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/heartpine-refinishing.png"
                alt="O'Brien Flooring craftsmanship — heartpine refinishing"
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          </div>
        </section>

        {/* ──────────────── STATEMENT FULL-BLEED ──────────────── */}
        <section className="statement-section">
          <Image
            src="/commercial-factory-2.png"
            alt="O'Brien Flooring commercial refinishing"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="statement-overlay" />
          <motion.div
            style={{
              position: "absolute",
              bottom: "3rem",
              right: "3rem",
              maxWidth: "420px",
              textAlign: "right",
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
                color: "#ffffff",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              Every grain tells a story. We make sure it's a beautiful one.
            </p>
            <div
              style={{
                width: "2rem",
                height: "1.5px",
                background: "#ffffff",
                marginLeft: "auto",
                marginTop: "1.25rem",
                opacity: 0.6,
              }}
            />
          </motion.div>
        </section>

        {/* ──────────────── OUR WORK ──────────────── */}
        <section
          id="our-work"
          style={{
            background: "#fafaf8",
            padding: "6rem 0",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>

            {/* Header */}
            <div style={{ marginBottom: "2.5rem" }}>
              <span className="section-eyebrow">Portfolio</span>
              <div className="divider" />
              <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1a1a18", lineHeight: 1.2, maxWidth: "30rem" }}>
                Real results from real projects.
              </h2>
            </div>

            {/* Tab navigation */}
            <div style={{ display: "flex", borderBottom: "1px solid #e8e8e4", marginBottom: "0", overflowX: "auto" }}>
              {[
                { id: "staircase", label: "Staircase" },
                { id: "hardwood", label: "Hardwood Floor" },
                { id: "heartpine", label: "Heartpine" },
                { id: "commercial", label: "Commercial" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveWorkTab(tab.id)}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: activeWorkTab === tab.id ? "2px solid #1a5c2e" : "2px solid transparent",
                    marginBottom: "-1px",
                    color: activeWorkTab === tab.id ? "#1a1a18" : "#9a9a96",
                    fontSize: "0.68rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    padding: "0.85rem 1.75rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    fontFamily: "inherit",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── STAIRCASE TAB ── */}
            {activeWorkTab === "staircase" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
                {/* Before/After comparison slider */}
                <div
                  ref={staircaseContainerRef}
                  style={{ position: "relative", height: "580px", overflow: "hidden", cursor: "col-resize", userSelect: "none", touchAction: "none" }}
                >
                  {/* BEFORE image — base layer */}
                  <div style={{ position: "absolute", inset: 0 }}>
                    <Image src="/stairs-before.png" alt="Staircase before" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 50%" }} />
                  </div>
                  {/* AFTER image — clipped to right of handle */}
                  <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${staircaseSlider}%)` }}>
                    <Image src="/stairs-after.png" alt="Staircase after" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 50%" }} />
                  </div>
                  {/* Divider line */}
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: `${staircaseSlider}%`, width: "2px", background: "#ffffff", transform: "translateX(-50%)", zIndex: 10, pointerEvents: "none" }} />
                  {/* Drag handle */}
                  <div
                    style={{ position: "absolute", top: "50%", left: `${staircaseSlider}%`, transform: "translate(-50%, -50%)", width: "46px", height: "46px", borderRadius: "50%", background: "#ffffff", boxShadow: "0 2px 20px rgba(0,0,0,0.4)", zIndex: 11, display: "flex", alignItems: "center", justifyContent: "center", cursor: "col-resize", touchAction: "none" }}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
                      (e.currentTarget as HTMLDivElement).onpointermove = (me) => {
                        if (!staircaseContainerRef.current) return;
                        const rect = staircaseContainerRef.current.getBoundingClientRect();
                        const x = Math.max(2, Math.min(me.clientX - rect.left, rect.width - 2));
                        setStaircaseSlider(Math.round((x / rect.width) * 100));
                      };
                      (e.currentTarget as HTMLDivElement).onpointerup = (ue) => {
                        (ue.currentTarget as HTMLDivElement).onpointermove = null;
                        (ue.currentTarget as HTMLDivElement).onpointerup = null;
                      };
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M8 4L3 11l5 7M14 4l5 7-5 7" stroke="#1a5c2e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* BEFORE label */}
                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.3rem 0.8rem", borderRadius: "2px", zIndex: 5, pointerEvents: "none" }}>Before</div>
                  {/* AFTER label */}
                  <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", background: "rgba(26,92,46,0.75)", backdropFilter: "blur(6px)", border: "1px solid rgba(26,92,46,0.4)", color: "#ffffff", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.3rem 0.8rem", borderRadius: "2px", zIndex: 5, pointerEvents: "none" }}>After</div>
                  {/* Drag hint */}
                  <div style={{ position: "absolute", top: "1.25rem", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", color: "rgba(255,255,255,0.9)", fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.3rem 0.9rem", borderRadius: "2px", zIndex: 5, whiteSpace: "nowrap", pointerEvents: "none" }}>← Drag to compare →</div>
                </div>
                <div style={{ padding: "2rem 0 0" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "#1a1a18", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>Staircase Refinishing</h3>
                  <p style={{ fontSize: "0.875rem", color: "#4a4a47", lineHeight: 1.8, maxWidth: "640px" }}>Full carpet removal, individual tread sanding, and a rich custom oak stain — transforming a dated staircase into the centerpiece of the home.</p>
                </div>
              </motion.div>
            )}

            {/* ── HARDWOOD FLOOR TAB ── */}
            {activeWorkTab === "hardwood" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
                <div
                  ref={hardwoodContainerRef}
                  style={{ position: "relative", height: "580px", overflow: "hidden", cursor: "col-resize", userSelect: "none", touchAction: "none" }}
                >
                  <div style={{ position: "absolute", inset: 0 }}>
                    <Image src="/hardwood-before.png" alt="Hardwood before" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 50%" }} />
                  </div>
                  <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${hardwoodSlider}%)` }}>
                    <Image src="/hardwood-after.png" alt="Hardwood after" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "50% 50%" }} />
                  </div>
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: `${hardwoodSlider}%`, width: "2px", background: "#ffffff", transform: "translateX(-50%)", zIndex: 10, pointerEvents: "none" }} />
                  <div
                    style={{ position: "absolute", top: "50%", left: `${hardwoodSlider}%`, transform: "translate(-50%, -50%)", width: "46px", height: "46px", borderRadius: "50%", background: "#ffffff", boxShadow: "0 2px 20px rgba(0,0,0,0.4)", zIndex: 11, display: "flex", alignItems: "center", justifyContent: "center", cursor: "col-resize", touchAction: "none" }}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
                      (e.currentTarget as HTMLDivElement).onpointermove = (me) => {
                        if (!hardwoodContainerRef.current) return;
                        const rect = hardwoodContainerRef.current.getBoundingClientRect();
                        const x = Math.max(2, Math.min(me.clientX - rect.left, rect.width - 2));
                        setHardwoodSlider(Math.round((x / rect.width) * 100));
                      };
                      (e.currentTarget as HTMLDivElement).onpointerup = (ue) => {
                        (ue.currentTarget as HTMLDivElement).onpointermove = null;
                        (ue.currentTarget as HTMLDivElement).onpointerup = null;
                      };
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M8 4L3 11l5 7M14 4l5 7-5 7" stroke="#1a5c2e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.3rem 0.8rem", borderRadius: "2px", zIndex: 5, pointerEvents: "none" }}>Before</div>
                  <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", background: "rgba(26,92,46,0.75)", backdropFilter: "blur(6px)", border: "1px solid rgba(26,92,46,0.4)", color: "#ffffff", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", padding: "0.3rem 0.8rem", borderRadius: "2px", zIndex: 5, pointerEvents: "none" }}>After</div>
                  <div style={{ position: "absolute", top: "1.25rem", left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", color: "rgba(255,255,255,0.9)", fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", padding: "0.3rem 0.9rem", borderRadius: "2px", zIndex: 5, whiteSpace: "nowrap", pointerEvents: "none" }}>← Drag to compare →</div>
                </div>
                <div style={{ padding: "2rem 0 0" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "#1a1a18", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>Hardwood Floor Installation</h3>
                  <p style={{ fontSize: "0.875rem", color: "#4a4a47", lineHeight: 1.8, maxWidth: "640px" }}>Water-damaged boards torn out, subfloor prepped, and fresh solid white oak laid throughout — clean, solid, and ready to be finished.</p>
                </div>
              </motion.div>
            )}

            {/* ── HEARTPINE TAB ── */}
            {activeWorkTab === "heartpine" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
                <div style={{ position: "relative", height: "580px", overflow: "hidden" }}>
                  <Image src="/heartpine-refinishing.png" alt="Heartpine flooring refinishing" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 50%" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.45) 100%)" }} />
                </div>
                <div style={{ padding: "2rem 0 0" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "#1a1a18", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>Heartpine Flooring Refinishing</h3>
                  <p style={{ fontSize: "0.875rem", color: "#4a4a47", lineHeight: 1.8, maxWidth: "640px" }}>Historic heartpine floors stripped and refinished to a mirror gloss — revealing the deep amber character of the original wood that had been hidden for decades.</p>
                </div>
              </motion.div>
            )}

            {/* ── COMMERCIAL TAB ── */}
            {activeWorkTab === "commercial" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#e8e8e4", height: "580px" }} className="our-work-row">
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <Image src="/commercial-factory-1.png" alt="Commercial factory floor 1" fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "center 42%" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.45) 100%)" }} />
                  </div>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <Image src="/commercial-factory-2.png" alt="Commercial factory floor 2" fill sizes="50vw" style={{ objectFit: "cover", objectPosition: "center 42%" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.45) 100%)" }} />
                  </div>
                </div>
                <div style={{ padding: "2rem 0 0" }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "#1a1a18", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>Local Commercial Factory</h3>
                  <p style={{ fontSize: "0.875rem", color: "#4a4a47", lineHeight: 1.8, maxWidth: "640px" }}>High-traffic hardwood floors in a local commercial factory — refinished to a brilliant gloss. Same craftsmanship, scaled for professional environments.</p>
                </div>
              </motion.div>
            )}

          </div>
        </section>

        {/* ──────────────── REVIEWS ──────────────── */}
        <section
          id="reviews"
          style={{
            background: "#ffffff",
            padding: "6rem 0",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 1.5rem",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "3.5rem",
                flexWrap: "wrap",
                gap: "1.5rem",
              }}
            >
              <div>
                <span className="section-eyebrow">Client Reviews</span>
                <div className="divider" />
                <h2
                  style={{
                    fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: "#1a1a18",
                    lineHeight: 1.2,
                  }}
                >
                  Trusted across Pioneer Valley.
                </h2>
              </div>
              <a
                href="https://www.google.com/maps/place/O'Brien+Flooring/@42.2681,-72.6689,17z/data=!4m8!3m7!1s0x0:0x0!8m2!3d42.2681!4d-72.6689!9m1!1b1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ flexShrink: 0 }}
              >
                See All Google Reviews
              </a>
            </div>

            {/* Reviews grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2px",
                background: "#e8e8e4",
              }}
            >
              {REVIEWS.map((review, i) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{
                    background: "#ffffff",
                    padding: "2.5rem",
                  }}
                >
                  {/* Stars */}
                  <div
                    style={{
                      display: "flex",
                      gap: "3px",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {Array.from({ length: review.rating }).map((_, s) => (
                      <svg
                        key={s}
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="#1a5c2e"
                      >
                        <polygon points="6.5,0 8.1,4.5 13,4.5 9.2,7.3 10.7,12 6.5,9.1 2.3,12 3.8,7.3 0,4.5 4.9,4.5" />
                      </svg>
                    ))}
                  </div>

                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "#4a4a47",
                      lineHeight: 1.8,
                      marginBottom: "1.5rem",
                      fontStyle: "italic",
                    }}
                  >
                    "{review.text}"
                  </p>

                  <div style={{ borderTop: "1px solid #f0f0ec", paddingTop: "1rem" }}>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "#1a1a18",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {review.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#9a9a96",
                        marginTop: "0.2rem",
                      }}
                    >
                      {review.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── CONTACT / QUOTE FORM ──────────────── */}
        <section
          id="contact"
          style={{
            background: "#fafaf8",
            padding: "6rem 0",
          }}
        >
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              padding: "0 1.5rem",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span className="section-eyebrow">Free Estimates</span>
              <div className="divider" style={{ margin: "1.25rem auto" }} />
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: "#1a1a18",
                  marginBottom: "0.75rem",
                }}
              >
                Request a Free Quote
              </h2>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#7a7a76",
                  maxWidth: "480px",
                  margin: "0 auto",
                  lineHeight: 1.75,
                }}
              >
                We respond within 24 business hours. All estimates are free and include a full in-home assessment.
              </p>
            </div>

            {formSent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  background: "#ffffff",
                  border: "1px solid #e8e8e4",
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    background: "#f0f7f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9l4.5 4.5L15 4.5" stroke="#1a5c2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 400, color: "#1a1a18", marginBottom: "0.5rem" }}>
                  Request Received
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#7a7a76" }}>
                  We'll be in touch at {formState.phone || formState.email} within one business day.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e8e8e4",
                  padding: "3rem",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0 2.5rem",
                  }}
                  className="form-grid"
                >
                  {/* Name */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <label
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#9a9a96",
                        display: "block",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Smith"
                      className="form-input"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <label
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#9a9a96",
                        display: "block",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(413) 555-0100"
                      className="form-input"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <label
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#9a9a96",
                        display: "block",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="form-input"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>

                  {/* Service */}
                  <div style={{ marginBottom: "1.75rem" }}>
                    <label
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#9a9a96",
                        display: "block",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Job Type *
                    </label>
                    <select
                      required
                      className="form-input"
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    >
                      <option>Hardwood Sanding &amp; Refinishing</option>
                      <option>Hardwood Floor Installation</option>
                      <option>Hardwood Floor Repair</option>
                      <option>Custom Inlays &amp; Borders</option>
                      <option>Staircase Refinishing</option>
                      <option>Commercial Flooring</option>
                      <option>Other / General Inquiry</option>
                    </select>
                  </div>

                  {/* Message — full width */}
                  <div style={{ gridColumn: "1 / -1", marginBottom: "1.75rem" }}>
                    <label
                      style={{
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#9a9a96",
                        display: "block",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Additional Information
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about the space, current condition, preferred stain color, square footage..."
                      className="form-input"
                      style={{ resize: "none" }}
                      value={formState.details}
                      onChange={(e) => setFormState({ ...formState, details: e.target.value })}
                    />
                  </div>

                  {/* SMS consent — full width */}
                  <div
                    style={{
                      gridColumn: "1 / -1",
                      marginBottom: "2rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="sms-consent"
                      required
                      checked={formState.sms}
                      onChange={(e) => setFormState({ ...formState, sms: e.target.checked })}
                      style={{
                        width: "14px",
                        height: "14px",
                        marginTop: "2px",
                        accentColor: "#1a5c2e",
                        flexShrink: 0,
                        cursor: "pointer",
                      }}
                    />
                    <label
                      htmlFor="sms-consent"
                      style={{
                        fontSize: "0.75rem",
                        color: "#7a7a76",
                        lineHeight: 1.7,
                        cursor: "pointer",
                      }}
                    >
                      I consent to receive SMS text messages from O'Brien Flooring regarding my estimate, scheduling, and project updates. Message &amp; data rates may apply. Reply STOP to cancel.
                    </label>
                  </div>

                  {/* Submit */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={isSubmitting}
                      style={{
                        opacity: isSubmitting ? 0.7 : 1,
                        cursor: isSubmitting ? "wait" : "pointer",
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Submit Request"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ──────────────── FAQ ──────────────── */}
        <section
          id="faq"
          style={{
            background: "#ffffff",
            padding: "6rem 0",
          }}
        >
          <div
            style={{
              maxWidth: "820px",
              margin: "0 auto",
              padding: "0 1.5rem",
            }}
          >
            <span className="section-eyebrow">FAQ</span>
            <div className="divider" />
            <h2
              style={{
                fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "#1a1a18",
                marginBottom: "3rem",
              }}
            >
              Frequently asked questions.
            </h2>

            <div>
              {FAQS.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    {openFaq === i ? (
                      <Minus size={16} color="#1a5c2e" style={{ flexShrink: 0 }} />
                    ) : (
                      <Plus size={16} color="#9a9a96" style={{ flexShrink: 0 }} />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "#4a4a47",
                            lineHeight: 1.8,
                            paddingBottom: "1.5rem",
                          }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────── FOOTER ──────────────── */}
        <footer
          style={{
            background: "#1a1a18",
            color: "#9a9a96",
            padding: "4rem 0 2.5rem",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 1.5rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr 1fr",
                gap: "3rem",
                paddingBottom: "3rem",
                borderBottom: "1px solid #2a2a28",
                marginBottom: "2rem",
              }}
              className="footer-grid"
            >
              {/* Brand */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <Image
                    src="/obrien-logo.png"
                    alt="O'Brien Flooring"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "#ffffff",
                      }}
                    >
                      O'Brien Flooring
                    </div>
                    <div
                      style={{
                        fontSize: "0.58rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#5a5a56",
                        marginTop: "0.1rem",
                      }}
                    >
                      Est. 2004
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    lineHeight: 1.75,
                    maxWidth: "280px",
                    color: "#6a6a66",
                  }}
                >
                  Locally owned hardwood flooring specialists serving Easthampton and the Pioneer Valley of western Massachusetts since 2004.
                </p>
              </div>

              {/* Services */}
              <div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#5a5a56",
                    marginBottom: "1rem",
                  }}
                >
                  Services
                </div>
                {[
                  "Sanding & Refinishing",
                  "Floor Installation",
                  "Repairs & Restoration",
                  "Custom Inlays",
                  "Commercial Flooring",
                ].map((s) => (
                  <a
                    key={s}
                    href="#services"
                    style={{
                      display: "block",
                      fontSize: "0.78rem",
                      color: "#6a6a66",
                      textDecoration: "none",
                      marginBottom: "0.5rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#1a5c2e")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6a6a66")}
                  >
                    {s}
                  </a>
                ))}
              </div>

              {/* Contact */}
              <div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#5a5a56",
                    marginBottom: "1rem",
                  }}
                >
                  Contact
                </div>
                <a
                  href="tel:4135388830"
                  style={{
                    display: "block",
                    fontSize: "1.1rem",
                    fontWeight: 400,
                    color: "#ffffff",
                    textDecoration: "none",
                    marginBottom: "0.5rem",
                    letterSpacing: "-0.01em",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#4ade80")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                >
                  (413) 538-8830
                </a>
                <p style={{ fontSize: "0.78rem", color: "#5a5a56", lineHeight: 1.6 }}>
                  Easthampton & Pioneer Valley<br />Massachusetts
                </p>
                <p style={{ fontSize: "0.78rem", color: "#5a5a56", marginTop: "0.5rem" }}>
                  Mon–Sat: 8am – 6pm
                </p>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <p style={{ fontSize: "0.7rem", color: "#4a4a46" }}>
                © {new Date().getFullYear()} O'Brien Flooring. All rights reserved.
              </p>
              <div style={{ display: "flex", gap: "2rem" }}>
                {["Privacy Policy", "Terms of Service"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#4a4a46",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#1a5c2e")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4a46")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* ──────────────── RESPONSIVE TWEAKS (inline) ──────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-grid > div:nth-child(2) {
            height: 320px !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .our-work-row {
            grid-template-columns: 1fr !important;
          }
          .our-work-row > div {
            height: 300px !important;
          }
        }

        .hamburger-btn .bar-top,
        .hamburger-btn .bar-mid,
        .hamburger-btn .bar-bot {
          display: block;
          width: 28px;
          height: 1.5px;
          background: #ffffff;
          transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1),
                      opacity 0.3s ease;
          transform-origin: center;
        }
      `}</style>
    </>
  );
}
