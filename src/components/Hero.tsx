"use client";

import React, { useState } from "react";
import { ChefHat, ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  // Motion values for the 3D Parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransform(y, [-200, 200], [15, -15]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-200, 200], [-15, 15]), { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#070c09]">
      {/* Background Glows */}
      <div className="glow-green top-1/4 left-10 opacity-30"></div>
      <div className="glow-yellow bottom-1/4 right-10 opacity-40"></div>
      
      {/* Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#122218_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-[#ffc20e]/20 text-xs font-semibold text-[#ffc20e]"
          >
            <Sparkles size={14} className="text-[#ffc20e] animate-pulse" />
            L'Expérience Fast-Food Réinventée
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight text-white"
          >
            CRÉEZ LE <span className="bg-gradient-to-r from-[#ffc20e] via-white to-[#008b47] bg-clip-text text-transparent">SUB &amp; PIZZA</span> DE VOS RÊVES
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-[#9cb1a6] max-w-xl"
          >
            Choisissez votre pain ou votre pâte fraîche, garnissez de viandes fondantes, de légumes croquants et nappez de nos sauces légendaires. Visualisez vos créations en temps réel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-4 w-full sm:w-auto"
          >
            <a href="#builder" className="glass-button-primary w-full sm:w-auto justify-center">
              <ChefHat size={18} />
              Composer mon Sub
            </a>
            <a href="#menu" className="glass-button-secondary w-full sm:w-auto justify-center">
              Voir la Carte
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Key Selling Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8 mt-4 w-full"
          >
            <div>
              <p className="text-2xl font-black text-[#ffc20e]">100%</p>
              <p className="text-xs text-[#9cb1a6]">Frais &amp; Sains</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#008b47]">2M+</p>
              <p className="text-xs text-[#9cb1a6]">Combinaisons</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">15 Min</p>
              <p className="text-xs text-[#9cb1a6]">Livraison express</p>
            </div>
          </motion.div>
        </div>

        {/* Right 3D Showcase Column (Interactive 3D Parallax Subway Poster) */}
        <div className="lg:col-span-5 flex justify-center items-center relative min-h-[520px]">
          {/* Circular glow background */}
          <div className="absolute w-[420px] h-[420px] rounded-full bg-[#008b47]/10 filter blur-3xl -z-10 animate-pulse"></div>
          
          {/* 3D Perspective Card Wrapper */}
          <div 
            className="perspective-1000 w-full flex justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Poster Card */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[340px] aspect-[9/16] rounded-[3rem] overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.9)] border border-white/10 flex flex-col items-center justify-between p-8 group transition-shadow duration-300 hover:shadow-[0_45px_100px_rgba(0,139,71,0.35)]"
            >
              {/* Poster split background */}
              <div 
                className="absolute inset-0 z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105"
                style={{
                  background: "linear-gradient(115deg, #ffc20e 47%, #ffe066 47.8%, #00a854 48.2%, #008b47 49%)"
                }}
              />

              {/* Glossy shine layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/5 pointer-events-none z-20"></div>

              {/* Poster Header: Subway Logo (floats high) */}
              <div 
                style={{ transform: "translateZ(80px)" }} 
                className="w-full flex justify-center z-20 transition-transform duration-200"
              >
                <div className="bg-black/40 px-6 py-2 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg group-hover:border-[#ffc20e]/50 transition-all duration-300">
                  <img 
                    src="/subway_vintage_logo_transparent.png" 
                    alt="Subway Vintage Logo" 
                    className="h-8 w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>

              {/* Poster Center: 3D Pizza Render (floats at medium depth) */}
              <div 
                style={{ transform: "translateZ(55px)" }}
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              >
                <motion.img
                  src="/pizza_3d.png"
                  alt="Subway Pizza Poster Render"
                  className="w-[88%] object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] drop-shadow-[0_0_20px_rgba(255,194,14,0.3)]"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Poster Floating Elements (Float at high depth with Z-Translation) */}
              {/* 1. CHEESE */}
              <motion.div
                style={{ transform: "translateZ(90px)" }}
                className="absolute top-[28%] left-[4%] z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-lg pointer-events-none"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-lg select-none">🧀</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ffc20e] font-sans">Cheese</span>
              </motion.div>

              {/* 2. OLIVES */}
              <motion.div
                style={{ transform: "translateZ(85px)" }}
                className="absolute bottom-[36%] right-[4%] z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-lg pointer-events-none"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <span className="text-lg select-none">🫒</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white font-sans">Olives</span>
              </motion.div>

              {/* 3. PEPERONI */}
              <motion.div
                style={{ transform: "translateZ(95px)" }}
                className="absolute bottom-[18%] left-[20%] z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-lg pointer-events-none"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <span className="text-lg select-none">🍅</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white font-sans">Peperoni</span>
              </motion.div>

              {/* 4. Chili Pepper (3D ingredient instead of cartoon) */}
              <motion.div
                style={{ transform: "translateZ(45px)" }}
                className="absolute bottom-[28%] left-[6%] z-20 rotate-[15deg] select-none pointer-events-none"
                animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-4xl drop-shadow-[0_8px_15px_rgba(0,0,0,0.6)]">🌶️</span>
              </motion.div>

              {/* 5. Lettuce Leaf (3D ingredient instead of cartoon) */}
              <motion.div
                style={{ transform: "translateZ(50px)" }}
                className="absolute top-[26%] right-[6%] z-20 -rotate-[20deg] select-none pointer-events-none"
                animate={{ x: [0, -3, 0], y: [0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <span className="text-4xl drop-shadow-[0_8px_15px_rgba(0,0,0,0.6)]">🥬</span>
              </motion.div>

              {/* Poster Footer: Chef welcome badge (floats high) */}
              <div 
                style={{ transform: "translateZ(75px)" }}
                className="w-full flex flex-col items-center z-20 mt-auto select-none"
              >
                <div className="w-14 h-14 rounded-full bg-black/55 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover:border-[#ffc20e]/60">
                  <ChefHat size={26} className="text-[#ffc20e] drop-shadow-[0_0_12px_rgba(255,194,14,0.5)] animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ffc20e] mt-2.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">Welcome</span>
              </div>

            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
