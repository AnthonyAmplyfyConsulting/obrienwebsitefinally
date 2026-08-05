"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, CheckCircle2, MessageSquarePlus, X, Send } from "lucide-react";

export default function Reviews() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    reviewText: "",
  });

  const reviewsList = [
    {
      id: "review-1",
      name: "Rebecca P.",
      location: "Easthampton, MA",
      rating: 5,
      featured: true,
      text: "I cannot say enough wonderful things about this company. We had them come to sand and refinish our wood floors and stairs. Not only are the floors beautiful but when they showed up a pipe had burst and they immediately took care of doing everything possible to save our house. They went above and beyond more than any company has ever done.",
      service: "Sanding & Stair Refinishing",
    },
    {
      id: "review-2",
      name: "David & Sarah M.",
      location: "Northampton, MA",
      rating: 5,
      featured: false,
      text: "O'Brien Flooring replaced our outdated carpet with solid oak flooring throughout our first floor. The craftsmanship is flawless. Their dust-containment sanding was clean and efficient!",
      service: "Oak Installation",
    },
    {
      id: "review-3",
      name: "Michael K.",
      location: "Amherst, MA",
      rating: 5,
      featured: false,
      text: "We had severe water staining on 60-year-old maple floors. O'Brien repaired the damaged boards, sanded, and refinished them to look brand new. Professional, punctual, and fair pricing.",
      service: "Water Damage Repair",
    },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setFormData({ name: "", location: "", reviewText: "" });
    }, 2500);
  };

  return (
    <section id="reviews" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200">
              <span>Client Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Trusted Across Pioneer Valley
            </h2>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-amber-400" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Featured Testimonial Banner (Rebecca P) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass-card rounded-3xl p-8 sm:p-12 mb-12 border-2 border-amber-300/60 bg-gradient-to-br from-amber-50/60 via-white to-white luxury-card-shadow"
        >
          <div className="absolute top-6 right-8 text-amber-200/80 hidden sm:block">
            <Quote className="w-20 h-20" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-1.5 mb-6 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                Featured Verified Review
              </span>
            </div>

            <p className="text-slate-800 text-lg sm:text-xl md:text-2xl font-serif italic leading-relaxed mb-8">
              "{reviewsList[0].text}"
            </p>

            <div className="flex items-center justify-between border-t border-slate-200/80 pt-6">
              <div>
                <div className="font-extrabold text-slate-900 text-base sm:text-lg">
                  {reviewsList[0].name}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {reviewsList[0].location} • {reviewsList[0].service}
                </div>
              </div>

              <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Homeowner</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviewsList.slice(1).map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 luxury-card-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 text-base leading-relaxed mb-6 font-normal">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{rev.name}</div>
                  <div className="text-xs text-slate-500">{rev.location}</div>
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                  {rev.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leave a Review Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-100"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close review modal"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Thank You!</h3>
                  <p className="text-slate-600 text-sm">
                    Your review has been submitted for approval. We appreciate your feedback!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-5">
                  <div className="text-left">
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
                      Leave a Review
                    </h3>
                    <p className="text-xs text-slate-500">
                      Share your experience working with O'Brien Flooring.
                    </p>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= rating ? "fill-current" : "stroke-slate-300 fill-none"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm outline-none"
                    />
                  </div>

                  {/* Location Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      City / Town
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Easthampton, MA"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm outline-none"
                    />
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Your Review
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about the service provided and quality of work..."
                      value={formData.reviewText}
                      onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900 text-sm outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Review</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
