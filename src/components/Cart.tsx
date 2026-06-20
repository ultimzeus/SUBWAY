"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { X, Trash2, Plus, Minus, CheckCircle2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useCart();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    window.open("https://glovoapp.com/en", "_blank");
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => !checkoutSuccess && setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#070c09] border-l border-white/5 shadow-2xl z-50 flex flex-col"
          >
            {checkoutSuccess ? (
              // Checkout Success Animation View
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#070c09] relative">
                <div className="glow-green opacity-40"></div>
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: [0.7, 1.1, 1], opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#008b47] to-[#00ff7f] flex items-center justify-center shadow-lg shadow-[#008b47]/20 mb-6"
                >
                  <CheckCircle2 size={50} className="text-white" />
                </motion.div>
                <motion.h3
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-black text-white mb-3"
                >
                  Commande Validée !
                </motion.h3>
                <motion.p
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-[#9cb1a6] max-w-xs leading-relaxed"
                >
                  Votre délicieux Sub est en cours de préparation chez Subway ! Livraison estimée dans 15 minutes. Bon appétit !
                </motion.p>
              </div>
            ) : (
              // Regular Cart View
              <>
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="text-[#ffc20e]" size={22} />
                    <h2 className="text-xl font-bold text-white">Votre Panier</h2>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-full text-[#9cb1a6] hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Items list */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                  {cart.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center opacity-40 gap-3">
                      <span className="text-6xl">🥪</span>
                      <p className="text-sm text-[#9cb1a6]">Votre panier est vide.</p>
                      <p className="text-xs text-[#647d70]">Configurez votre Sub personnalisé ou choisissez-en un dans notre menu !</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="glass-panel border-white/5 p-4 rounded-xl flex items-start gap-4 relative overflow-hidden"
                      >
                        {/* Glow effect for items */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.02] rounded-bl-full"></div>

                        {/* Image wrapper */}
                        <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-contain"
                          />
                        </div>

                        {/* Content info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-[#ffc20e] font-semibold mb-1">
                            {item.price.toFixed(2)} DT
                          </p>
                          {item.type === "custom" && item.details && (
                            <div className="text-[10px] text-[#647d70] bg-black/20 p-1.5 rounded border border-white/5 mt-1 leading-tight flex flex-col gap-0.5">
                              <div><strong>Pain:</strong> {item.details.bread} ({item.details.size})</div>
                              {item.details.meats.length > 0 && <div><strong>Viandes:</strong> {item.details.meats.join(", ")}</div>}
                              {item.details.cheeses.length > 0 && <div><strong>Fromage:</strong> {item.details.cheeses.join(", ")}</div>}
                              {item.details.veggies.length > 0 && <div><strong>Légumes:</strong> {item.details.veggies.join(", ")}</div>}
                              {item.details.sauces.length > 0 && <div><strong>Sauces:</strong> {item.details.sauces.join(", ")}</div>}
                            </div>
                          )}
                          
                          {/* Item Quantity control & Delete */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center bg-black/40 border border-white/5 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 px-2 hover:text-white text-[#9cb1a6] transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs px-2 text-white font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 px-2 hover:text-white text-[#9cb1a6] transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1.5 hover:bg-red-500/10 rounded-lg text-[#647d70] hover:text-red-400 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Cart Summary & Order Actions */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-white/5 bg-[#0a0f0c] flex flex-col gap-4">
                    <div className="flex justify-between items-center text-sm font-semibold text-[#9cb1a6]">
                      <span>Sous-total</span>
                      <span className="text-white">{cartTotal.toFixed(2)} DT</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-semibold text-[#9cb1a6]">
                      <span>Livraison</span>
                      <span className="text-[#008b47] font-bold">GRATUITE</span>
                    </div>
                    <div className="border-t border-white/5 my-1"></div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-[#ffc20e]">{cartTotal.toFixed(2)} DT</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full glass-button-primary justify-center py-3 text-sm font-bold uppercase mt-2"
                    >
                      Valider ma commande ({cartTotal.toFixed(2)} DT)
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
