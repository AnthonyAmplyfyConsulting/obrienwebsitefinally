"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Hardwood Sanding and Refinishing",
    additionalInfo: "",
    smsConsent: false,
  });

  const servicesList = [
    "Hardwood Sanding and Refinishing",
    "Hardwood Floor Installation",
    "Hardwood Floor Repair & Restoration",
    "Custom Inlays & Border Design",
    "Staircase Sanding & Refinishing",
    "Commercial Flooring Service",
    "Other / General Inquiry",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-100/30 rounded-full blur-3xl -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200">
              <span>Free In-Home Estimates</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Request Your Free Estimate
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Ready to give your hardwood floors the expert care they deserve? Fill out the form or give us a call directly. We respond to all estimate requests within 24 business hours.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 mb-8">
              <a
                href="tel:4135388830"
                className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all group luxury-card-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Direct Phone
                  </div>
                  <div className="text-lg font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">
                    (413) 538-8830
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-lime-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Service Region
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    Easthampton & Pioneer Valley, MA
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Hours of Operation
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    Mon - Sat: 8:00 AM - 6:00 PM
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200/80 luxury-card-shadow relative">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900">
                    Estimate Request Received!
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-base">
                    Thank you, <strong className="text-slate-900">{formData.name}</strong>. A member of O'Brien Flooring will review your request and contact you at <strong className="text-slate-900">{formData.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
                      Project Information
                    </h3>
                    <p className="text-xs text-slate-500">
                      Please fill in your details below to schedule your free estimate.
                    </p>
                  </div>

                  {/* Name & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(413) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm font-medium outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Job Select Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm font-medium outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Job Select (Service Needed) *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm font-medium outline-none bg-white transition-all cursor-pointer"
                      >
                        {servicesList.map((srv, i) => (
                          <option key={i} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Additional Info / Message Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Additional Info / Project Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your room size, current floor condition, desired wood species or stain color..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm font-medium outline-none transition-all resize-none"
                    />
                  </div>

                  {/* SMS Messaging Consent Checkbox */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.smsConsent}
                        onChange={(e) => setFormData({ ...formData, smsConsent: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 leading-normal">
                        I agree to receive SMS text notifications from <strong className="text-slate-900">O'Brien Flooring</strong> regarding my project estimate, appointment scheduling, and service updates. Message & data rates may apply. Reply STOP to cancel at any time.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-8 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-amber-500/25 transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Free Estimate Request</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
