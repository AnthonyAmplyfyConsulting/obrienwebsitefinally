"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Wrench, Layers } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "sanding-refinishing",
      title: "Hardwood Sanding & Refinishing",
      description:
        "Breathe new life into faded, scratched, or dull hardwood floors. Our dustless sanding system and hand-mixed custom stains restore brilliance while protecting your home's air quality.",
      image: "/flooring-1.png",
      badge: "Most Popular",
      icon: Sparkles,
      features: [
        "Dust-Containment Sanding System",
        "Custom Stain & Sheen Selection",
        "Commercial Polyurethane Coatings",
        "Staircase & Tread Refinishing",
      ],
    },
    {
      id: "installation",
      title: "Hardwood Floor Installation",
      description:
        "Transform your living spaces with premium oak, maple, walnut, or exotic hardwood. We handle site preparation, moisture barrier setup, and precision board layout.",
      image: "/flooring-2.png",
      badge: "Custom Fitting",
      icon: Layers,
      features: [
        "Solid & Engineered Hardwood",
        "Herringbone & Chevron Patterns",
        "Subfloor Prep & Leveling",
        "Thresholds & Transition Molding",
      ],
    },
    {
      id: "repair",
      title: "Hardwood Floor Repair",
      description:
        "From pet scratches to burst pipe water damage, we seamlessly replace broken planks, fix squeaky subfloors, and match existing stain and age for an invisible repair.",
      image: "/flooring-3.png",
      badge: "Expert Restoration",
      icon: Wrench,
      features: [
        "Plank & Board Replacement",
        "Water & Moisture Damage Repair",
        "Gap Filling & Subfloor Anchoring",
        "Seamless Color Matching",
      ],
    },
    {
      id: "custom-inlays",
      title: "Custom Inlays & Border Design",
      description:
        "Elevate your floors into works of architectural art. We design hand-crafted border accents, medallions, and custom wood species transitions tailored to your home.",
      image: "/flooring-4.png",
      badge: "Bespoke Design",
      icon: ShieldCheck,
      features: [
        "Hardwood Medallions & Borders",
        "Exotic Wood Species Accents",
        "Architectural Focal Points",
        "Custom Framing & Inset Layouts",
      ],
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Light Background Accent Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-100/40 rounded-full blur-3xl -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200"
          >
            <span>Our Specialist Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            Master Craftsmanship for Your Hardwood Floors
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 font-normal leading-relaxed"
          >
            Whether restoring original historic wood or installing modern luxury planks, O'Brien Flooring delivers immaculate results backed by 20+ years of dedicated experience.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-card rounded-3xl overflow-hidden luxury-card-shadow border border-slate-200/80 bg-white flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Zoom effect */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-md border border-slate-100 flex items-center gap-1.5">
                      <IconComp className="w-3.5 h-3.5 text-amber-600" />
                      <span>{service.badge}</span>
                    </div>

                    {/* Overlay Title */}
                    <div className="absolute bottom-4 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8">
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2.5 mb-8">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-between w-full px-5 py-3 rounded-2xl bg-slate-100 hover:bg-amber-500 text-slate-800 hover:text-slate-950 font-bold text-sm transition-all duration-300 group/btn"
                  >
                    <span>Request Service Estimate</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Free Estimate Callout banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to restore your floors?
            </h3>
            <p className="text-slate-300 text-base max-w-xl">
              Locally-owned and operated in Easthampton, MA. We would be delighted to provide a 100% free in-home estimate.
            </p>
          </div>

          <a
            href="#contact"
            className="shrink-0 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Schedule Free Estimate
          </a>
        </motion.div>
      </div>
    </section>
  );
}
