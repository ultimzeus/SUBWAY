"use client";

import React from "react";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#060a08] border-t border-white/5 py-16 px-6 md:px-12 overflow-hidden">
      <div className="glow-green -top-24 -left-24 opacity-30"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        
        {/* Info Column */}
        <div className="flex flex-col gap-4">
          <a href="#" className="flex items-center group">
            <img 
              src="/subway_vintage_logo_transparent.png" 
              alt="Subway Logo" 
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>
          <p className="text-sm text-[#9cb1a6] mt-2">
            Le goût de la fraîcheur à chaque bouchée. Créez votre propre chef-d'œuvre culinaire en temps réel grâce à notre technologie interactive.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="w-10 h-10 rounded-full glass-panel border-white/5 flex items-center justify-center text-[#9cb1a6] hover:text-[#ffc20e] hover:border-[#ffc20e]/30 transition-all hover:scale-110" aria-label="Instagram">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-panel border-white/5 flex items-center justify-center text-[#9cb1a6] hover:text-[#ffc20e] hover:border-[#ffc20e]/30 transition-all hover:scale-110" aria-label="Facebook">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.613L17 8h-4V6.983c0-1.024.212-1.437 1.2-1.437H18V1h-3.75C10.512 1 9 2.5 9 5.25V8z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#008b47] rounded-sm"></span> Contactez-nous
          </h3>
          <ul className="flex flex-col gap-4 text-sm text-[#9cb1a6]">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#ffc20e] shrink-0 mt-0.5" />
              <span>42 Avenue des Champs-Élysées,<br />75008 Paris, France</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[#ffc20e] shrink-0" />
              <span>+33 1 23 45 67 89</span>
            </li>
          </ul>
        </div>

        {/* Hours Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#ffc20e] rounded-sm"></span> Horaires d'Ouverture
          </h3>
          <ul className="flex flex-col gap-4 text-sm text-[#9cb1a6]">
            <li className="flex items-start gap-3">
              <Clock size={18} className="text-[#008b47] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Lundi - Vendredi</p>
                <p>09:00 - 23:00</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="text-[#008b47] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Samedi - Dimanche</p>
                <p>10:00 - 01:00 (Non-stop)</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#008b47] rounded-sm"></span> Newsletter
          </h3>
          <p className="text-sm text-[#9cb1a6] mb-4">
            Abonnez-vous pour recevoir des offres exclusives et des surprises croustillantes !
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Votre e-mail"
              className="flex-1 bg-white/5 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#008b47] transition-all"
            />
            <button className="p-2.5 rounded-lg bg-[#008b47] text-white hover:bg-[#00a854] flex items-center justify-center transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#647d70] relative z-10">
        <p>&copy; {new Date().getFullYear()} Subway France. Tous droits réservés.</p>
        <p className="flex items-center gap-1">
          Fait avec amour &amp; 3D assets de <span className="text-white font-semibold hover:text-[#ffc20e] cursor-pointer">Nanobanana</span>
        </p>
      </div>
    </footer>
  );
}
