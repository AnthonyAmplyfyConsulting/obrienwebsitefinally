"use client";

import { motion } from "framer-motion";
import { X, Shield } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-200"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close Terms of Service"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 text-amber-600">
          <Shield className="w-6 h-6" />
          <h3 className="text-2xl font-extrabold text-slate-900">Terms of Service</h3>
        </div>

        <div className="space-y-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
          <p className="font-semibold text-slate-800">
            Last Updated: August 2026
          </p>

          <h4 className="font-bold text-slate-900 text-base">1. Acceptance of Terms</h4>
          <p>
            By accessing or using the O'Brien Flooring website or requesting our flooring services (including sanding, refinishing, repairs, and installation), you agree to be bound by these Terms of Service.
          </p>

          <h4 className="font-bold text-slate-900 text-base">2. Service Estimates & Proposals</h4>
          <p>
            All preliminary in-home estimates are free of charge. Official written proposals outline the specific scope of work, material costs, and projected timelines. Additional scope requested during project execution will be quoted in writing prior to performance.
          </p>

          <h4 className="font-bold text-slate-900 text-base">3. Customer Responsibilities</h4>
          <p>
            Clients are requested to ensure the work area is clear of furniture, personal items, and fragile decor prior to the scheduled start date, unless furniture moving services are explicitly included in your proposal.
          </p>

          <h4 className="font-bold text-slate-900 text-base">4. SMS Communications & TCPA Compliance</h4>
          <p>
            By checking the SMS opt-in box on our contact forms, you grant consent to receive text messages from O'Brien Flooring regarding project estimates, scheduling notifications, and project updates. You may opt out at any time by replying STOP.
          </p>

          <h4 className="font-bold text-slate-900 text-base">5. Contact Information</h4>
          <p>
            For questions regarding these terms, please contact O'Brien Flooring at (413) 538-8830 or visit our office in Easthampton, MA.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
          >
            Close Window
          </button>
        </div>
      </motion.div>
    </div>
  );
}
