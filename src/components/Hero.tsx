"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Phone, ChevronDown, Volume2, VolumeX, Play, Pause, Sparkles, Award } from "lucide-react";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Video Stream */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/obrien-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        />
        {/* Soft luxury lighting gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/70 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/40" />
      </div>

      {/* Floating Video Control Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-slate-700/60 shadow-xl">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full text-slate-200 hover:text-amber-400 hover:bg-slate-800 transition-colors"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2 rounded-full text-slate-200 hover:text-amber-400 hover:bg-slate-800 transition-colors"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 text-center lg:text-left">
        <div className="max-w-3xl">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span>Easthampton & Pioneer Valley's Trusted Contractor</span>
          </motion.div>

          {/* Main Headline with Curved Green/Yellow Gradient Underline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6"
          >
            Crafting Exceptional{" "}
            <span className="gradient-underline-curved text-amber-400 font-serif italic">
              Hardwood Flooring
            </span>{" "}
            Since 2004.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl"
          >
            Sanding, refinishing, repairs, and custom installations engineered to bring enduring warmth and sophistication back into your home or office.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-extrabold text-base rounded-full shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-0.5 text-center"
            >
              Request Free Estimate
            </a>

            <a
              href="tel:4135388830"
              className="w-full sm:w-auto px-7 py-4 bg-slate-900/80 hover:bg-slate-800/90 text-white font-bold text-base rounded-full border border-slate-700/80 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              (413) 538-8830
            </a>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 sm:gap-6 text-slate-300"
          >
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Award className="w-5 h-5 text-lime-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">20+ Years Exp</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Locally Owned</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Dust-Free System</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <a
          href="#services"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors"
          aria-label="Scroll down to services"
        >
          <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-amber-400" />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
