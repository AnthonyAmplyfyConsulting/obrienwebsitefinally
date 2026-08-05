"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Reviews", href: "#reviews" },
    { name: "Get Estimate", href: "#contact" },
  ];

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-slate-800">
        <ShieldCheck className="w-4 h-4 text-lime-400" />
        <span>Pioneer Valley's Premier Hardwood Specialist • Over 20 Years Experience • </span>
        <a
          href="tel:4135388830"
          className="text-amber-300 font-bold hover:underline underline-offset-2 flex items-center gap-1"
        >
          Call (413) 538-8830
        </a>
      </div>

      {/* Main Glass Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-nav py-3 shadow-md"
            : "bg-white/95 backdrop-blur-md py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-44 h-11 sm:w-56 sm:h-12 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/logo.svg"
                alt="O'Brien Flooring"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-amber-700 transition-colors tracking-wide relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-500 via-amber-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Phone & CTA Button */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:4135388830"
              className="flex items-center gap-2.5 text-sm font-bold text-slate-800 hover:text-amber-700 transition-colors bg-slate-100 hover:bg-slate-200/70 px-3.5 py-2 rounded-full border border-slate-200"
            >
              <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-tight">(413) 538-8830</span>
            </a>

            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 text-slate-900 font-extrabold">
                Free Estimate
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="tel:4135388830"
              className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center"
              aria-label="Call O'Brien Flooring"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden fixed top-[105px] left-0 right-0 z-40"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-bold text-slate-800 hover:text-amber-600 transition-colors py-2 border-b border-slate-100"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href="tel:4135388830"
                  className="flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-xl font-bold text-slate-800 text-center"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  Call (413) 538-8830
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-xl font-extrabold text-slate-950 text-center shadow-md"
                >
                  Get Free Estimate
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
