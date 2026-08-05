"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, ShieldCheck, Heart } from "lucide-react";
import TermsModal from "./TermsModal";
import PrivacyModal from "./PrivacyModal";

export default function Footer() {
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block">
              <div className="relative w-56 h-12 bg-white/95 rounded-xl p-2 shadow-md">
                <Image
                  src="/logo.svg"
                  alt="O'Brien Flooring"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Professional hardwood flooring contractor based in Easthampton, MA. Making floors shine since 2004! Over 20 years of experience delivering sanding, refinishing, repairs, and custom hardwood installations.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>Locally Owned & Operated • Fully Licensed & Insured</span>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Specialized Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Hardwood Sanding & Refinishing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Hardwood Floor Installation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Hardwood Floor Repair
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Custom Inlays & Borders
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Dustless Sanding Technology
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact & Estimates
            </h4>
            
            <a
              href="tel:4135388830"
              className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Call Us Directly</div>
                <div className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  (413) 538-8830
                </div>
              </div>
            </a>

            <div className="flex items-center gap-3 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Easthampton & Pioneer Valley, Massachusetts</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} O'Brien Flooring. All rights reserved.
          </div>

          {/* Legal Triggers */}
          <div className="flex items-center gap-6 font-medium">
            <button
              onClick={() => setTermsOpen(true)}
              className="hover:text-slate-300 transition-colors underline-offset-4 hover:underline"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-slate-300 transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      <TermsModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
}
