"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ChevronRight, ChevronLeft, Check, ChefHat, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  name: string;
  price: number;
  emoji: string;
  color: string;
}

const BREADS: Option[] = [
  { name: "Parmesan Origan", price: 0.5, emoji: "🧀🥖", color: "#e3a857" },
  { name: "Complet Fibres", price: 0, emoji: "🌾🥖", color: "#c98f53" },
];

const SIZES: Option[] = [
  { name: "Sub15 (15 cm)", price: 0, emoji: "📏", color: "#008b47" },
  { name: "Sub30 (30 cm)", price: 3.50, emoji: "📐", color: "#ffc20e" },
];

const MEATS: Option[] = [
  { name: "Poulet Teriyaki", price: 2.50, emoji: "🍗", color: "#8a4f21" },
  { name: "Émincé de Poulet", price: 2.30, emoji: "🐔", color: "#edd8be" },
  { name: "Bacon Croustillant", price: 1.80, emoji: "🥓", color: "#d14b4b" },
  { name: "Steak de Bœuf", price: 2.80, emoji: "🥩", color: "#6e3d30" },
  { name: "Tranches de Dinde", price: 1.50, emoji: "🦃", color: "#f3c1a2" },
  { name: "Galette Légumes", price: 1.50, emoji: "🥦", color: "#4ade80" },
];

const CHEESES: Option[] = [
  { name: "Cheddar Fondu", price: 0.80, emoji: "🧀", color: "#ffb020" },
  { name: "Fromage en Tranches", price: 0.80, emoji: "🥞", color: "#fbeeb8" },
  { name: "Emmental Râpé", price: 1.00, emoji: "🥯", color: "#fcf8f2" },
];

const VEGGIES: Option[] = [
  { name: "Laitue Croquante", price: 0, emoji: "🥬", color: "#4ade80" },
  { name: "Tomates Fraîches", price: 0, emoji: "🍅", color: "#ef4444" },
  { name: "Oignons Rouges", price: 0, emoji: "🧅", color: "#a855f7" },
  { name: "Concombres", price: 0, emoji: "🥒", color: "#22c55e" },
  { name: "Poivrons Verts", price: 0, emoji: "🫑", color: "#16a34a" },
  { name: "Olives Noires", price: 0, emoji: "🫒", color: "#1c1917" },
  { name: "Piments Jalapeños", price: 0.20, emoji: "🌶️", color: "#15803d" },
];

const SAUCES: Option[] = [
  { name: "Sweet Onion", price: 0, emoji: "🍯", color: "#ffdd6b" },
  { name: "Chipotle Sud-Ouest", price: 0, emoji: "🌶️ Sauce", color: "#ca5310" },
  { name: "Moutarde Miel", price: 0, emoji: "🥞", color: "#e3ad38" },
  { name: "Oignon Doux", price: 0, emoji: "🧅 Sauce", color: "#f87171" },
  { name: "Mayonnaise Légère", price: 0, emoji: "🥚 Sauce", color: "#faf7f0" },
  { name: "Sauce Barbecue", price: 0, emoji: "🪵 Sauce", color: "#451a03" },
];

const STEPS = [
  { id: "bread", name: "Le Pain", description: "Choisissez la base de votre Sub" },
  { id: "size", name: "La Taille", description: "Sub15 pour caler, Sub30 pour régaler !" },
  { id: "meat", name: "Les Viandes", description: "Sélectionnez vos protéines (Optionnel)" },
  { id: "cheese", name: "Le Fromage", description: "Choisissez votre fromage fondu (Optionnel)" },
  { id: "veggies", name: "Les Légumes", description: "Double dose de fraîcheur croquante (Optionnel)" },
  { id: "sauces", name: "Les Sauces", description: "Donnez du caractère à votre Sub (Optionnel)" },
];

export default function Builder() {
  const { addToCart } = useCart();
  
  // Custom builder states
  const [activeStep, setActiveStep] = useState(0);
  const [bread, setBread] = useState(BREADS[0]);
  const [size, setSize] = useState(SIZES[0]);
  const [selectedMeats, setSelectedMeats] = useState<Option[]>([]);
  const [selectedCheeses, setSelectedCheeses] = useState<Option[]>([]);
  const [selectedVeggies, setSelectedVeggies] = useState<Option[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<Option[]>([]);

  // Base price
  const basePrice = 5.90;
  
  // Calculate price dynamically
  const calculatePrice = () => {
    let total = basePrice;
    total += bread.price;
    total += size.price;
    total += selectedMeats.reduce((sum, item) => sum + item.price, 0);
    total += selectedCheeses.reduce((sum, item) => sum + item.price, 0);
    total += selectedVeggies.reduce((sum, item) => sum + item.price, 0);
    total += selectedSauces.reduce((sum, item) => sum + item.price, 0);
    return total;
  };

  const handleNext = () => {
    if (activeStep < STEPS.length - 1) setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const resetBuilder = () => {
    setActiveStep(0);
    setBread(BREADS[0]);
    setSize(SIZES[0]);
    setSelectedMeats([]);
    setSelectedCheeses([]);
    setSelectedVeggies([]);
    setSelectedSauces([]);
  };

  const toggleOption = (
    item: Option,
    selectedList: Option[],
    setSelectedList: React.Dispatch<React.SetStateAction<Option[]>>,
    isMultiple: boolean
  ) => {
    if (!isMultiple) {
      setSelectedList([item]);
      return;
    }

    const index = selectedList.findIndex((x) => x.name === item.name);
    if (index > -1) {
      setSelectedList(selectedList.filter((x) => x.name !== item.name));
    } else {
      setSelectedList([...selectedList, item]);
    }
  };

  const handleAddToBag = () => {
    const finalPrice = calculatePrice();
    const details = {
      bread: bread.name,
      size: size.name,
      meats: selectedMeats.map((x) => x.name),
      cheeses: selectedCheeses.map((x) => x.name),
      veggies: selectedVeggies.map((x) => x.name),
      sauces: selectedSauces.map((x) => x.name),
    };

    addToCart({
      id: `custom-${Date.now()}`,
      name: `Sub Customisé Pro Max`,
      price: finalPrice,
      image: "/hero-sub.png",
      type: "custom",
      details: details,
    });

    // Reset after adding
    resetBuilder();
  };

  return (
    <section id="builder" className="relative py-24 px-6 md:px-12 overflow-hidden bg-[#070c09]">
      <div className="glow-green top-1/3 left-0 opacity-20"></div>
      <div className="glow-yellow bottom-1/3 right-0 opacity-15"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="text-[#ffc20e] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <ChefHat size={14} /> Customizer Pro Max
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            CONCEVEZ VOTRE SANDWICH <span className="text-[#ffc20e]">COUCHE PAR COUCHE</span>
          </h2>
          <p className="text-[#9cb1a6] text-sm sm:text-base max-w-xl">
            Cliquez sur les ingrédients pour assembler votre Sub en temps réel et voir l'aperçu de votre création.
          </p>
        </div>

        {/* Builder Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Controls (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            
            {/* Steps Progress Bar */}
            <div className="glass-panel p-4 rounded-2xl flex items-center justify-between gap-1 overflow-x-auto">
              {STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(idx)}
                  className={`flex flex-col items-center gap-1.5 min-w-[70px] transition-all relative ${
                    activeStep === idx 
                      ? "text-[#ffc20e]" 
                      : idx < activeStep 
                        ? "text-[#008b47]" 
                        : "text-[#647d70]"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${
                    activeStep === idx 
                      ? "bg-[#ffc20e] border-[#ffc20e] text-[#070c09]" 
                      : idx < activeStep 
                        ? "bg-[#008b47] border-[#008b47] text-white" 
                        : "bg-white/5 border-white/5 text-[#9cb1a6]"
                  }`}>
                    {idx < activeStep ? <Check size={14} /> : idx + 1}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{s.name}</span>
                </button>
              ))}
            </div>

            {/* Current Step Settings Panel */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl min-h-[350px] flex flex-col justify-between relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-bl-full"></div>
              
              <div>
                {/* Step Headline */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Étape {activeStep + 1} : {STEPS[activeStep].name}
                  </h3>
                  <p className="text-xs text-[#9cb1a6]">{STEPS[activeStep].description}</p>
                </div>

                {/* Options grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeStep === 0 && BREADS.map((item) => {
                    const isSelected = bread.name === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setBread(item)}
                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected 
                            ? "bg-[#008b47]/20 border-[#008b47] text-white" 
                            : "bg-white/5 border-white/5 text-[#9cb1a6] hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <p className="font-bold text-sm text-white">{item.name}</p>
                            {item.price > 0 && <p className="text-xs text-[#ffc20e] font-semibold">+{item.price.toFixed(2)} DT</p>}
                          </div>
                        </div>
                        {isSelected && <div className="w-5 h-5 rounded-full bg-[#008b47] flex items-center justify-center"><Check size={12} className="text-white" /></div>}
                      </button>
                    );
                  })}

                  {activeStep === 1 && SIZES.map((item) => {
                    const isSelected = size.name === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => setSize(item)}
                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected 
                            ? "bg-[#008b47]/20 border-[#008b47] text-white" 
                            : "bg-white/5 border-white/5 text-[#9cb1a6] hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <p className="font-bold text-sm text-white">{item.name}</p>
                            {item.price > 0 && <p className="text-xs text-[#ffc20e] font-semibold">+{item.price.toFixed(2)} DT</p>}
                          </div>
                        </div>
                        {isSelected && <div className="w-5 h-5 rounded-full bg-[#008b47] flex items-center justify-center"><Check size={12} className="text-white" /></div>}
                      </button>
                    );
                  })}

                  {activeStep === 2 && MEATS.map((item) => {
                    const isSelected = selectedMeats.some((x) => x.name === item.name);
                    return (
                      <button
                        key={item.name}
                        onClick={() => toggleOption(item, selectedMeats, setSelectedMeats, true)}
                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected 
                            ? "bg-[#008b47]/20 border-[#008b47] text-white" 
                            : "bg-white/5 border-white/5 text-[#9cb1a6] hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <p className="font-bold text-sm text-white">{item.name}</p>
                            <p className="text-xs text-[#ffc20e] font-semibold">+{item.price.toFixed(2)} DT</p>
                          </div>
                        </div>
                        {isSelected && <div className="w-5 h-5 rounded-full bg-[#008b47] flex items-center justify-center"><Check size={12} className="text-white" /></div>}
                      </button>
                    );
                  })}

                  {activeStep === 3 && CHEESES.map((item) => {
                    const isSelected = selectedCheeses.some((x) => x.name === item.name);
                    return (
                      <button
                        key={item.name}
                        onClick={() => toggleOption(item, selectedCheeses, setSelectedCheeses, true)}
                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected 
                            ? "bg-[#008b47]/20 border-[#008b47] text-white" 
                            : "bg-white/5 border-white/5 text-[#9cb1a6] hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <p className="font-bold text-sm text-white">{item.name}</p>
                            <p className="text-xs text-[#ffc20e] font-semibold">+{item.price.toFixed(2)} DT</p>
                          </div>
                        </div>
                        {isSelected && <div className="w-5 h-5 rounded-full bg-[#008b47] flex items-center justify-center"><Check size={12} className="text-white" /></div>}
                      </button>
                    );
                  })}

                  {activeStep === 4 && VEGGIES.map((item) => {
                    const isSelected = selectedVeggies.some((x) => x.name === item.name);
                    return (
                      <button
                        key={item.name}
                        onClick={() => toggleOption(item, selectedVeggies, setSelectedVeggies, true)}
                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected 
                            ? "bg-[#008b47]/20 border-[#008b47] text-white" 
                            : "bg-white/5 border-white/5 text-[#9cb1a6] hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <p className="font-bold text-sm text-white">{item.name}</p>
                            {item.price > 0 && <p className="text-xs text-[#ffc20e] font-semibold">+{item.price.toFixed(2)} DT</p>}
                          </div>
                        </div>
                        {isSelected && <div className="w-5 h-5 rounded-full bg-[#008b47] flex items-center justify-center"><Check size={12} className="text-white" /></div>}
                      </button>
                    );
                  })}

                  {activeStep === 5 && SAUCES.map((item) => {
                    const isSelected = selectedSauces.some((x) => x.name === item.name);
                    return (
                      <button
                        key={item.name}
                        onClick={() => toggleOption(item, selectedSauces, setSelectedSauces, true)}
                        className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected 
                            ? "bg-[#008b47]/20 border-[#008b47] text-white" 
                            : "bg-white/5 border-white/5 text-[#9cb1a6] hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.emoji}</span>
                          <div>
                            <p className="font-bold text-sm text-white">{item.name}</p>
                            {item.price > 0 && <p className="text-xs text-[#ffc20e] font-semibold">+{item.price.toFixed(2)} DT</p>}
                          </div>
                        </div>
                        {isSelected && <div className="w-5 h-5 rounded-full bg-[#008b47] flex items-center justify-center"><Check size={12} className="text-white" /></div>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation controls row */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-8">
                <button
                  disabled={activeStep === 0}
                  onClick={handlePrev}
                  className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                    activeStep === 0 ? "opacity-30 cursor-not-allowed text-[#647d70]" : "text-[#9cb1a6] hover:text-white"
                  }`}
                >
                  <ChevronLeft size={16} /> Retour
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={resetBuilder}
                    className="p-2.5 rounded-full bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                    title="Réinitialiser"
                  >
                    <RotateCcw size={14} />
                  </button>

                  {activeStep === STEPS.length - 1 ? (
                    <button
                      onClick={handleAddToBag}
                      className="glass-button-primary py-2.5 px-6 text-xs uppercase"
                    >
                      Ajouter au panier ({calculatePrice().toFixed(2)} DT)
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="glass-button-primary py-2.5 px-6 text-xs uppercase"
                    >
                      Suivant <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: Visual Sandwich Stacker (5 Columns) */}
          <div className="lg:col-span-5 w-full flex flex-col items-center justify-center">
            
            {/* Summary card */}
            <div className="glass-panel p-5 w-full rounded-2xl border-white/5 mb-6 text-center text-xs font-semibold text-[#9cb1a6] flex justify-between items-center">
              <div>
                <strong>Pain:</strong> {bread.name} | <strong>Taille:</strong> {size.name.split(" ")[0]}
              </div>
              <div className="text-[#ffc20e] font-black text-sm">
                {calculatePrice().toFixed(2)} DT
              </div>
            </div>

            {/* Sandwich Assembly Stage */}
            <div className="relative w-full max-w-[320px] h-[450px] bg-black/20 border border-white/5 rounded-3xl overflow-hidden flex flex-col justify-center items-center py-8">
              {/* Circular light gradient */}
              <div className="absolute w-[220px] h-[220px] rounded-full bg-[#008b47]/5 filter blur-2xl pointer-events-none"></div>

              {/* STACK OF LAYERS */}
              <div className="flex flex-col justify-center items-center relative w-full h-full gap-2">
                
                {/* 1. Top Bread Bun */}
                <motion.div
                  layout
                  className="z-30 w-52 h-10 rounded-full border-t border-b border-[#ffdca8]/30 flex items-center justify-center relative shadow-lg shadow-black/40"
                  style={{
                    backgroundColor: bread.color,
                    boxShadow: "inset 0 4px 6px -1px rgba(255,255,255,0.4), inset 0 -4px 6px -1px rgba(0,0,0,0.3)"
                  }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-xs font-black uppercase text-amber-900/40 tracking-wider">
                    {bread.name} (Haut)
                  </span>
                  {/* Sesame seeds effect on Parmesan Origan */}
                  {bread.name === "Parmesan Origan" && (
                    <div className="absolute inset-0 flex flex-wrap gap-2 p-2 justify-center items-center opacity-30 select-none pointer-events-none">
                      <span>•</span><span>.</span><span>•</span><span>.</span><span>•</span>
                    </div>
                  )}
                </motion.div>

                {/* 2. Sauces (Wavy lines layered below top bread) */}
                <AnimatePresence>
                  {selectedSauces.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.6, y: -20 }}
                      className="z-25 flex flex-col gap-1 w-44"
                    >
                      {selectedSauces.map((sauce) => (
                        <div
                          key={sauce.name}
                          className="h-2 rounded-full w-full opacity-90 shadow-sm relative overflow-hidden"
                          style={{ backgroundColor: sauce.color }}
                        >
                          {/* Wavy lines style */}
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.35)_50%)] bg-[length:12px_100%] animate-pulse"></div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 3. Veggies */}
                <AnimatePresence>
                  {selectedVeggies.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, y: -15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.6, y: -15 }}
                      className="z-20 flex flex-wrap justify-center gap-1.5 w-48"
                    >
                      {selectedVeggies.map((veg) => (
                        <span
                          key={veg.name}
                          className="text-lg p-1.5 rounded-full flex items-center justify-center shadow-md shadow-black/20"
                          style={{
                            backgroundColor: veg.color + "25",
                            border: `1px solid ${veg.color}50`
                          }}
                        >
                          {veg.emoji}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 4. Cheese */}
                <AnimatePresence>
                  {selectedCheeses.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.6, y: -10 }}
                      className="z-15 flex justify-center gap-2 w-44"
                    >
                      {selectedCheeses.map((cheese) => (
                        <div
                          key={cheese.name}
                          className="w-12 h-6 rounded border-b shadow-md relative"
                          style={{
                            backgroundColor: cheese.color,
                            borderColor: cheese.color,
                            transform: "skewX(-15deg)"
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 5. Meats */}
                <AnimatePresence>
                  {selectedMeats.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.6, y: -5 }}
                      className="z-10 flex flex-col justify-center items-center gap-1 w-48"
                    >
                      {selectedMeats.map((meat) => (
                        <div
                          key={meat.name}
                          className="h-5 w-full rounded-lg shadow-lg relative flex items-center justify-center overflow-hidden"
                          style={{ backgroundColor: meat.color }}
                        >
                          <div className="absolute inset-0 bg-black/10"></div>
                          <span className="text-[10px] font-bold text-white tracking-widest">{meat.emoji} {meat.name}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 6. Bottom Bread Bun */}
                <motion.div
                  layout
                  className="z-5 w-52 h-10 rounded-full border-t border-b border-[#ffdca8]/20 flex items-center justify-center shadow-lg shadow-black/40"
                  style={{
                    backgroundColor: bread.color,
                    boxShadow: "inset 0 4px 6px -1px rgba(255,255,255,0.2), inset 0 -5px 6px -1px rgba(0,0,0,0.4)"
                  }}
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-xs font-black uppercase text-amber-900/40 tracking-wider">
                    {bread.name} (Bas)
                  </span>
                </motion.div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
