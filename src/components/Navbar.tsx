"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Menu, X, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { setIsCartOpen, cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 px-6 md:px-12 bg-[#070c09]/80 backdrop-blur-md border-b border-white/5 shadow-lg"
            : "py-6 px-6 md:px-12 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <img 
              src="/subway_vintage_logo_transparent.png" 
              alt="Subway Logo" 
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-neutral-300">
            <a href="#" className="hover:text-[#ffc20e] transition-colors">Accueil</a>
            <a href="#menu" className="hover:text-[#ffc20e] transition-colors">Le Menu</a>
            <a href="#builder" className="hover:text-[#ffc20e] transition-colors flex items-center gap-1.5">
              <ChefHat size={16} className="text-[#008b47]" />
              Sandwich Builder
            </a>
            <a href="#concept" className="hover:text-[#ffc20e] transition-colors">Notre Concept</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full glass-panel hover:border-white/20 text-white flex items-center justify-center transition-all hover:scale-105"
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} className="text-[#ffc20e]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#008b47] text-white text-[10px] font-black flex items-center justify-center shadow-md border border-[#070c09]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-lg text-neutral-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[70px] left-0 right-0 z-30 p-6 glass-panel border-b border-white/5 flex flex-col gap-4 text-center md:hidden"
          >
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 font-semibold text-lg hover:text-[#ffc20e]"
            >
              Accueil
            </a>
            <a
              href="#menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 font-semibold text-lg hover:text-[#ffc20e]"
            >
              Le Menu
            </a>
            <a
              href="#builder"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 font-semibold text-lg text-[#ffc20e] flex items-center justify-center gap-1.5"
            >
              <ChefHat size={18} />
              Sandwich Builder
            </a>
            <a
              href="#concept"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2.5 font-semibold text-lg hover:text-[#ffc20e]"
            >
              Notre Concept
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
