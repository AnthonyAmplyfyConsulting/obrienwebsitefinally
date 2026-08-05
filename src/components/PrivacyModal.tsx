"use client";

import { motion } from "framer-motion";
import { X, Lock } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
          aria-label="Close Privacy Policy"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 text-emerald-600">
          <Lock className="w-6 h-6" />
          <h3 className="text-2xl font-extrabold text-slate-900">Privacy Policy</h3>
        </div>

        <div className="space-y-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
          <p className="font-semibold text-slate-800">
            Last Updated: August 2026
          </p>

          <h4 className="font-bold text-slate-900 text-base">1. Information We Collect</h4>
          <p>
            O'Brien Flooring respects your privacy. We collect personal information that you voluntarily submit through our contact forms, estimate request forms, and review forms, including your name, email address, phone number, physical service address, and project details.
          </p>

          <h4 className="font-bold text-slate-900 text-base">2. How We Use Your Information</h4>
          <p>
            Your information is used solely to respond to your inquiries, schedule in-home estimates, deliver requested flooring services, provide customer support, and send SMS notifications if consented to.
          </p>

          <h4 className="font-bold text-slate-900 text-base">3. Data Sharing & Non-Disclosure</h4>
          <p>
            We strictly <strong className="text-slate-900">do not sell, rent, or trade</strong> your personal information or mobile phone number to third parties or marketing brokers under any circumstances.
          </p>

          <h4 className="font-bold text-slate-900 text-base">4. Data Security</h4>
          <p>
            We implement industry-standard encryption and physical security measures to safeguard your personal data against unauthorized access or disclosure.
          </p>

          <h4 className="font-bold text-slate-900 text-base">5. Contact Us</h4>
          <p>
            If you have questions regarding our privacy practices or wish to request removal of your personal information, please call us directly at (413) 538-8830.
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
