"use client";

import React from "react";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Builder from "../components/Builder";
import Menu from "../components/Menu";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import { Sparkles, UtensilsCrossed, Leaf, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#070c09] text-white">
        
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* Concept Section */}
        <section id="concept" className="relative py-24 px-6 md:px-12 overflow-hidden bg-[#0a0f0c]/50">
          <div className="glow-green top-10 right-10 opacity-15"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Title */}
            <div className="text-center mb-16 flex flex-col items-center gap-3">
              <span className="text-[#008b47] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={12} className="fill-[#008b47]" /> Fraîcheur &amp; Qualité
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                LE CONCEPT <span className="text-[#ffc20e]">SUBWAY</span> <span className="text-[#008b47]">SOKRA</span>
              </h2>
              <p className="text-[#9cb1a6] text-sm sm:text-base max-w-xl">
                Trois étapes simples pour une explosion de saveurs saines et personnalisées selon vos envies.
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card p-8 flex flex-col gap-4 text-center hover:border-[#008b47]/40"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#008b47]/10 border border-[#008b47]/20 flex items-center justify-center text-[#008b47] mx-auto shadow-inner">
                  <UtensilsCrossed size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">1. Choisissez Votre Pain</h3>
                <p className="text-sm text-[#9cb1a6] leading-relaxed">
                  Cuit sur place chaque matin dans nos fours. Blanc italien, complet ou parmesan origan : trouvez la base croustillante idéale.
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-8 flex flex-col gap-4 text-center hover:border-[#ffc20e]/40"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#ffc20e]/10 border border-[#ffc20e]/20 flex items-center justify-center text-[#ffc20e] mx-auto shadow-inner">
                  <Leaf size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">2. Composez sans Limite</h3>
                <p className="text-sm text-[#9cb1a6] leading-relaxed">
                  Garnissez avec nos lanières de poulet, pepperoni ou bacon croustillant. Ajoutez du fromage fondant et des légumes croquants.
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card p-8 flex flex-col gap-4 text-center hover:border-orange-500/40"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto shadow-inner">
                  <Flame size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">3. Nappez &amp; Dégustez</h3>
                <p className="text-sm text-[#9cb1a6] leading-relaxed">
                  Finissez en beauté avec l'une de nos sauces signatures : Sweet Onion acidulée, Chipotle épicée ou Moutarde miel.
                </p>
              </motion.div>

            </div>

          </div>
        </section>

        {/* Interactive Custom Builder Section */}
        <Builder />

        {/* Classic Menu Grid Section */}
        <Menu />

        {/* Shopping Cart Sliding Drawer */}
        <Cart />

        {/* Footer */}
        <Footer />

      </div>
    </CartProvider>
  );
}
