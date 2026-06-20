"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // For items with a single price
  prices?: {      // For pizzas with size options
    petite: number;
    moyenne: number;
    mega: number;
  };
  category: "Pizzas" | "Sandwichs & Makloub" | "Plats & Ojjas" | "Spécialités" | "Boissons & Suppléments";
  image: string;
  badge?: string;
  rating: number;
}

const MENU_ITEMS: MenuItem[] = [
  // --- PIZZAS ---
  {
    id: "pizza-margherita",
    name: "Pizza Margherita",
    description: "Sauce tomate maison mijotée, mozzarella fondante, olives noires savoureuses, origan et rondelles de tomates fraîches.",
    price: 9.00,
    prices: {
      petite: 9.00,
      moyenne: 16.00,
      mega: 22.00
    },
    category: "Pizzas",
    image: "/pizza_3d.png",
    rating: 4.8,
  },
  {
    id: "pizza-escalope",
    name: "Pizza Escalope",
    description: "Sauce tomate, double mozzarella, émincé d'escalope de poulet marinée et grillée, oignons crus croustillants et origan.",
    price: 12.00,
    prices: {
      petite: 12.00,
      moyenne: 19.00,
      mega: 24.00
    },
    category: "Pizzas",
    image: "/pizza_escalope_3d.png",
    badge: "Populaire",
    rating: 4.9,
  },
  {
    id: "pizza-burger",
    name: "Pizza Burger",
    description: "Sauce tomate, mozzarella, viande hachée assaisonnée, tomates séchées douces, oignons caramélisés et filet de sauce burger Subway.",
    price: 13.00,
    prices: {
      petite: 13.00,
      moyenne: 22.00,
      mega: 27.00
    },
    category: "Pizzas",
    image: "/pizza_burger_3d.png",
    rating: 4.9,
  },
  {
    id: "pizza-fruits-de-mer",
    name: "Pizza Fruits de Mer",
    description: "Sauce tomate parfumée à l'ail, mozzarella, mélange de calamars et crevettes sautées, persil frais et herbes de Provence.",
    price: 17.00,
    prices: {
      petite: 17.00,
      moyenne: 23.00,
      mega: 30.00
    },
    category: "Pizzas",
    image: "/pizza_fruits_de_mer_3d.png",
    badge: "Premium",
    rating: 4.9,
  },
  {
    id: "pizza-thon",
    name: "Pizza Thon",
    description: "Sauce tomate parfumée, fromage mozzarella fondu, thon de premier choix, oignons émincés, olives noires et filet d'huile d'olive.",
    price: 12.00,
    prices: {
      petite: 12.00,
      moyenne: 19.00,
      mega: 25.00
    },
    category: "Pizzas",
    image: "/pizza_thon_3d.png",
    rating: 4.8,
  },
  {
    id: "pizza-quatre-fromages",
    name: "Pizza 4 Fromages",
    description: "Base tomate crème, alliance fondante de mozzarella, cheddar, emmental râpé et copeaux de parmesan parfumé.",
    price: 12.00,
    prices: {
      petite: 12.00,
      moyenne: 19.00,
      mega: 25.00
    },
    category: "Pizzas",
    image: "/pizza_4_fromages_3d.png",
    rating: 4.9,
  },

  // --- SANDWICHS & MAKLOUB ---
  {
    id: "makloub-escalope",
    name: "Makloub Escalope",
    description: "Pain pizza frais cuit sur place, garni d'escalope de poulet grillée, fromage fondant, frites maison, salade fraîche et harissa/mayo.",
    price: 9.00,
    category: "Sandwichs & Makloub",
    image: "/makloub_escalope_3d.png",
    badge: "Incontournable",
    rating: 4.9,
  },
  {
    id: "makloub-chawarma",
    name: "Makloub Chawarma",
    description: "Pain pizza cuit minute au four, chawarma de poulet mariné aux épices orientales, salade croquante, frites, mozzarella et sauce ail.",
    price: 9.00,
    category: "Sandwichs & Makloub",
    image: "/makloub_chawarma_3d.png",
    rating: 4.8,
  },
  {
    id: "sandwich-escalope",
    name: "Sandwich Escalope",
    description: "Baguette traditionnelle croustillante garnie d'escalope de poulet grillée, frites dorées, salade, tomate et sauce au choix.",
    price: 8.00,
    category: "Sandwichs & Makloub",
    image: "/sandwich_escalope_3d.png",
    rating: 4.7,
  },
  {
    id: "sandwich-kebab",
    name: "Sandwich Kebab",
    description: "Pain baguette frais fourré de viande kebab grillée à la broche, oignons, salade fraîche, frites croustillantes et sauce blanche.",
    price: 10.00,
    category: "Sandwichs & Makloub",
    image: "/sandwich_kebab_3d.png",
    badge: "Populaire",
    rating: 4.8,
  },

  // --- PLATS & OJJAS ---
  {
    id: "ojja-merguez",
    name: "Ojja Tunisienne aux Merguez",
    description: "Ragoût pimenté traditionnel à base de tomates fraîches, poivrons verts, ail, épices, œufs pochés coulants et délicieuses merguez grillées.",
    price: 14.00,
    category: "Plats & Ojjas",
    image: "/ojja_merguez_3d.png",
    badge: "Tradition",
    rating: 4.9,
  },
  {
    id: "ojja-fruits-de-mer",
    name: "Ojja Tunisienne Fruits de Mer",
    description: "Recette signature de ragoût de tomates épicé mijoté avec œufs pochés, calamars tendres et crevettes décortiquées parfumées.",
    price: 26.00,
    category: "Plats & Ojjas",
    image: "/ojja_fruits_de_mer_3d.png",
    badge: "Premium",
    rating: 5.0,
  },
  {
    id: "ojja-escalope",
    name: "Ojja Tunisienne à l'Escalope",
    description: "Ragoût tunisien traditionnel mijoté aux tomates, poivrons doux, ail, œufs pochés et généreux morceaux d'escalope de poulet grillés, le tout parfumé aux épices locales.",
    price: 14.00,
    category: "Plats & Ojjas",
    image: "/ojja_escalope_3d.png",
    rating: 4.8,
  },
  {
    id: "plat-spaghetti-fruits-de-mer",
    name: "Spaghetti aux Fruits de Mer",
    description: "Pâtes spaghetti italiennes nappées d'une sauce tomate riche, cuisinées à l'ail, coriandre fraîche et un assortiment de fruits de mer.",
    price: 26.00,
    category: "Plats & Ojjas",
    image: "/spaghetti_3d.png",
    rating: 4.9,
  },

  // --- SPÉCIALITÉS ---
  {
    id: "baguette-farcie-escalope",
    name: "Baguette Farcie Escalope",
    description: "Pâte à pain fraîche façonnée en baguette, garnie d'escalope marinée, fromage fondu coulant, frites, sauces, puis dorée au four.",
    price: 11.00,
    category: "Spécialités",
    image: "/baguette_farcie_3d.png",
    badge: "Maison",
    rating: 4.9,
  },
  {
    id: "baguette-farcie-merguez",
    name: "Baguette Farcie Merguez",
    description: "Pain baguette farci de merguez épicées, fromage fondu, frites croustillantes et sauce algérienne maison avant cuisson au four.",
    price: 15.00,
    category: "Spécialités",
    image: "/baguette_farcie_3d.png",
    rating: 4.8,
  },
  {
    id: "tacos-escalope",
    name: "Tacos Escalope de Poulet",
    description: "Tortilla de blé garnie d'escalope dorée, d'une sauce fromagère onctueuse maison et de frites, cuite au grill pour un fini croustillant.",
    price: 12.00,
    category: "Spécialités",
    image: "/tacos_3d.png",
    badge: "Nouveau",
    rating: 4.9,
  },

  // --- BOISSONS & SUPPLÉMENTS ---
  {
    id: "boisson-cannette",
    name: "Boisson Cannette",
    description: "Cannette rafraîchissante 33cl au choix : Coca-Cola, Fanta Orange, Sprite, Boga Blanche ou Schweppes Citron.",
    price: 2.50,
    category: "Boissons & Suppléments",
    image: "/boisson_3d.png",
    rating: 4.8,
  },
  {
    id: "boisson-boga-cidre",
    name: "Boga Cidre Tunisienne",
    description: "Le légendaire soda tunisien Boga au cidre, boisson rafraîchissante sucrée aux extraits de caroube, servie glacée en cannette.",
    price: 2.50,
    category: "Boissons & Suppléments",
    image: "/boga_cidre_3d.png",
    rating: 4.9,
  },
  {
    id: "supplement-frites",
    name: "Portion de Frites Dorées",
    description: "Une portion généreuse de frites de pommes de terre croustillantes cuites à la commande et légèrement salées.",
    price: 2.50,
    category: "Boissons & Suppléments",
    image: "/frites_3d.png",
    rating: 4.8,
  }
];

export default function Menu() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<string>("Tous");
  
  // Size selection state for pizzas
  const [selectedSizes, setSelectedSizes] = useState<Record<string, "petite" | "moyenne" | "mega">>({});

  const categories = [
    "Tous",
    "Pizzas",
    "Sandwichs & Makloub",
    "Plats & Ojjas",
    "Spécialités",
    "Boissons & Suppléments"
  ];

  const filteredItems = activeTab === "Tous" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="relative py-24 px-6 md:px-12 bg-[#0a0f0c] overflow-hidden">
      {/* Background glow */}
      <div className="glow-yellow top-1/4 right-0 opacity-25"></div>
      <div className="glow-green bottom-10 left-10 opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16 flex flex-col items-center gap-3">
          <span className="text-[#ffc20e] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <Star size={12} className="fill-[#ffc20e]" /> Nos Saveurs Authentiques
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            EXPLOREZ NOTRE CARTE <span className="text-[#008b47]">TUNISIENNE</span>
          </h2>
          <p className="text-[#9cb1a6] text-sm sm:text-base max-w-xl">
            Retrouvez les spécialités de notre restaurant faites à la demande avec des ingrédients frais de qualité supérieure.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                activeTab === cat
                  ? "bg-[#008b47] border-[#008b47] text-white shadow-lg shadow-[#008b47]/20"
                  : "bg-white/5 border-white/5 text-[#9cb1a6] hover:bg-white/10 hover:border-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              // Get current price & name based on size if item is a pizza
              const isPizza = item.category === "Pizzas" && item.prices;
              const pizzaSize = selectedSizes[item.id] || "petite";
              const currentPrice = isPizza && item.prices ? item.prices[pizzaSize] : item.price;
              
              const sizeLabel = pizzaSize === "petite" ? "Petite" : pizzaSize === "moyenne" ? "Moyenne" : "Méga";
              const cartName = isPizza ? `${item.name} (${sizeLabel})` : item.name;
              const cartId = isPizza ? `${item.id}-${pizzaSize}` : item.id;

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card flex flex-col h-full group relative"
                >
                  {/* Image and badge */}
                  <div className="h-56 w-full bg-black/20 flex items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,139,71,0.05)_0%,transparent_70%)] group-hover:scale-125 transition-transform duration-500"></div>
                    
                    {item.badge && (
                      <span className="absolute top-4 left-4 bg-[#ffc20e] text-[#070c09] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 z-10">
                        <Sparkles size={10} className="fill-black" />
                        {item.badge}
                      </span>
                    )}
                    
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full object-contain filter drop-shadow-[0_8px_10px_rgba(0,0,0,0.4)] drop-shadow-[0_12px_15px_rgba(0,139,71,0.2)] group-hover:scale-115 group-hover:-rotate-3 group-hover:drop-shadow-[0_22px_28px_rgba(0,139,71,0.45)] transition-all duration-500 z-10 pointer-events-none"
                    />
                  </div>

                  {/* Info content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-black text-[#008b47] uppercase tracking-widest">{item.category}</span>
                      <div className="flex items-center gap-1 text-[#ffc20e] text-xs">
                        <Star size={12} className="fill-[#ffc20e] stroke-none" />
                        <span className="font-bold">{item.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-white text-lg font-bold group-hover:text-[#ffc20e] transition-colors mb-2">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-[#9cb1a6] line-clamp-3 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Size Selector for Pizzas */}
                    {isPizza && item.prices && (
                      <div className="mt-auto mb-4">
                        <p className="text-[10px] uppercase font-bold text-[#647d70] tracking-wider mb-2">Taille de la Pizza :</p>
                        <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 p-1 rounded-xl">
                          {(["petite", "moyenne", "mega"] as const).map((sz) => {
                            const isSelected = pizzaSize === sz;
                            return (
                              <button
                                key={sz}
                                type="button"
                                onClick={() => setSelectedSizes({ ...selectedSizes, [item.id]: sz })}
                                className={`flex-1 py-1.5 px-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                                  isSelected
                                    ? "bg-[#008b47] text-white shadow-md"
                                    : "text-[#9cb1a6] hover:text-white hover:bg-white/5"
                                }`}
                              >
                                {sz === "petite" ? "P (22cm)" : sz === "moyenne" ? "M (28cm)" : "Mega (36cm)"}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Pricing and Action row */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <span className="text-xl font-black text-white">
                        {currentPrice.toFixed(2)} DT
                      </span>
                      <button
                        onClick={() => addToCart({
                          id: cartId,
                          name: cartName,
                          price: currentPrice,
                          image: item.image,
                          type: "classic"
                        })}
                        className="glass-button-primary py-2 px-4 text-xs"
                      >
                        <ShoppingBag size={14} />
                        Ajouter
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
