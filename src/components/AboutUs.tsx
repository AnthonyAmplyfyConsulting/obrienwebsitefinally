"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ShieldCheck, HeartHandshake, MapPin, CheckCircle } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[450px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <Image
                src="/flooring-5.png"
                alt="O'Brien Flooring Craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              
              {/* Floating Experience Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-extrabold text-xl shrink-0 shadow-md">
                    20+
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Years of Excellence
                    </div>
                    <div className="text-xs text-slate-600">
                      Serving Easthampton, Northampton, Springfield & Pioneer Valley since 2004.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent Card Badge */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center gap-3 bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-800">
              <MapPin className="w-6 h-6 text-lime-400" />
              <div className="text-xs font-bold">
                <span className="block text-amber-300">Locally Owned</span>
                <span>Easthampton, MA</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200">
              <span>About O'Brien Flooring</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Making Massachusetts Hardwood Floors Shine Since 2004
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              At <strong className="text-slate-900">O'Brien Flooring</strong>, we believe hardwood floors are the heart of a beautiful home. For over two decades, our locally-owned and operated team has provided homeowners and commercial clients with unmatched craftsmanship, attention to detail, and integrity.
            </p>

            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Whether you need dust-containment sanding, custom stain refinishing, structural floor repairs, or custom inlay borders, we approach every project with the highest standard of labor and dedication. We treat your property with the utmost respect—going above and beyond for every client we serve.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Licensed & Insured</h4>
                  <p className="text-xs text-slate-500">Complete peace of mind for every job.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Free In-Home Estimates</h4>
                  <p className="text-xs text-slate-500">Transparent pricing with no surprises.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <Award className="w-5 h-5 text-lime-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Master Craftsmanship</h4>
                  <p className="text-xs text-slate-500">20+ years of refined woodworking.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Above & Beyond Service</h4>
                  <p className="text-xs text-slate-500">Dedicated to your complete satisfaction.</p>
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-base transition-colors shadow-lg"
            >
              <span>Get in Touch Today</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
