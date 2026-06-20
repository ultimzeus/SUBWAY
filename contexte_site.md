# Contexte du Projet : SITESEBYAIY

Ce document présente une vue d'ensemble, l'architecture technique, la charte graphique et le fonctionnement de l'application **SITESEBYAIY** (Subway 3D Builder Pro Max).

---

## 1. Description Générale du Projet

L'application est un site web moderne de type *Single Page Application* (SPA) destiné à **Subway France**. Il permet aux utilisateurs de :
*   Découvrir l'univers et le concept de Subway.
*   Parcourir une carte interactive de recettes prédéfinies (Signatures, Classiques, Desserts, etc.).
*   **Concevoir un sandwich (Sub) personnalisé étape par étape** grâce à un configurateur visuel interactif en temps réel (*Sandwich Builder*).
*   Gérer un panier d'achats persistant (avec sauvegarde locale) et simuler une commande avec livraison rapide.

---

## 2. Architecture Technique et Structure

L'application est développée avec la version la plus récente de **Next.js** et **React**, structurée selon l'App Router.

```
SITESEBYAIY/
├── .next/                  # Build de Next.js
├── node_modules/           # Dépendances Node.js
├── public/                 # Assets statiques et images 3D (Subway, burger, pizza, etc.)
│   ├── baguette_farcie_3d.png
│   ├── boisson_3d.png
│   ├── boga_cidre_3d.png
│   ├── burger.png
│   ├── caesar-salad.png
│   ├── chicken-wings.png
│   ├── combo.png
│   ├── frites_3d.png
│   ├── hero-sub.png
│   ├── makloub_chawarma_3d.png
│   ├── makloub_escalope_3d.png
│   ├── ojja_3d.png
│   ├── ojja_merguez_3d.png
│   ├── pizza.png
│   ├── pizza_3d.png
│   ├── pizza_4_fromages_3d.png
│   ├── pizza_burger_3d.png
│   ├── pizza_escalope_3d.png
│   ├── pizza_fruits_de_mer_3d.png
│   ├── pizza_thon_3d.png
│   ├── sandwich_escalope_3d.png
│   ├── sandwich_kebab_3d.png
│   ├── spaghetti_3d.png
│   ├── subway_vintage_logo_transparent.png
│   └── tacos_3d.png
├── src/
│   ├── app/                # Pages et styles globaux
│   │   ├── favicon.ico
│   │   ├── globals.css     # Charte graphique & animations CSS
│   │   ├── layout.tsx      # Layout racine (polices Outfit & Plus Jakarta Sans)
│   │   ├── page.module.css
│   │   └── page.tsx        # Page d'accueil principale (Sections Concept, Hero, etc.)
│   ├── components/         # Composants d'interface (UI) réutilisables
│   │   ├── Builder.tsx     # Customizer Pro Max (moteur de personnalisation)
│   │   ├── Cart.tsx        # Tiroir coulissant du panier & checkout
│   │   ├── Footer.tsx      # Pied de page (contacts, horaires, newsletter)
│   │   ├── Hero.tsx        # Section d'accueil animée (Nanobanana 3D)
│   │   ├── Menu.tsx        # Menu des recettes signatures avec onglets de filtrage
│   │   └── Navbar.tsx      # Barre de navigation fixe & responsive
│   └── context/            # Gestion d'état global
│       └── CartContext.tsx # Contexte React pour la gestion du panier (LocalStorage)
├── package.json            # Scripts npm et dépendances
├── remove-checkerboard.js  # Script utilitaire de traitement d'images
└── tsconfig.json           # Configuration TypeScript
```

---

## 3. Technologies Utilisées (Stack Technique)

*   **Framework principal** : [Next.js (v16.2.7)](https://nextjs.org) avec App Router et support React 19 Server Components.
*   **Langage** : [TypeScript](https://www.typescriptlang.org/) pour un typage strict et sécurisé.
*   **Styling & Mise en page** : [Tailwind CSS (v4.3.0)](https://tailwindcss.com/) pour le style utilitaire moderne rapide, couplé à des variables CSS personnalisées.
*   **Animations** : [Framer Motion (v12.40.0)](https://www.framer.com/motion/) pour les micro-animations interactives, les transitions fluides et l'effet d'empilement du sandwich.
*   **Iconographie** : [Lucide React (v1.17.0)](https://lucide.dev/) pour des icônes vectorielles nettes et personnalisables.
*   **Traitement d'images** : `pngjs` et `jpeg-js` via un script utilitaire personnalisé (`remove-checkerboard.js`) pour rendre transparents les arrière-plans quadrillés des images d'ingrédients/produits.

---

## 4. Charte Graphique et Design System

L'application adopte une esthétique sombre et premium (Dark Mode) avec des touches de couleurs néon et des effets de transparence modernes.

*   **Palette de couleurs** :
    *   **Fond principal** : Vert/Noir profond (`#070c09` / `#0f1612`)
    *   **Couleur Primaire Subway (Vert)** : `#008b47` (Glow: `rgba(0, 139, 71, 0.25)`)
    *   **Couleur Secondaire Subway (Jaune)** : `#ffc20e` (Glow: `rgba(255, 194, 14, 0.35)`)
    *   **Accents** : Orange vif (`#ff7a00`) et Blanc pur (`#f2f7f4`)
*   **Esthétique** :
    *   **Glassmorphism** : Cartes et panneaux translucides (`glass-card` et `glass-panel` avec `backdrop-filter: blur()`).
    *   **Typographie** : Police de titre **Outfit** (moderne et géométrique) et police de corps **Plus Jakarta Sans** (élégante et très lisible).
    *   **Effets de Glows** : Halo de lumières radiales vertes et jaunes en arrière-plan (`glow-green` & `glow-yellow`).
    *   **Animations** : Effets de flottaison (`floating-asset`), rotations douces (`spin-slow`) et effets au survol de la souris.

---

## 5. Fonctionnalités Clés du Site

### A. Le Customizer Pro Max (`Builder.tsx`)
C'est le cœur interactif du site. L'utilisateur crée son sandwich couche par couche à travers 6 étapes guidées :
1.  **Le Pain** : Italien Blanc, Parmesan Origan, Complet, Avoine & Miel.
2.  **La Taille** : Sub15 (15 cm) ou Sub30 (30 cm).
3.  **Les Viandes (Protéines)** : Poulet Teriyaki, Émincé de poulet, Bacon croustillant, Steak de bœuf, Tranches de dinde, Galette de légumes.
4.  **Le Fromage** : Cheddar fondu, Fromage en tranches, Emmental râpé.
5.  **Les Légumes** : Laitue, Tomates, Oignons rouges, Concombres, Poivrons, Olives, Jalapeños.
6.  **Les Sauces** : Sweet Onion, Chipotle, Moutarde miel, Mayonnaise légère, Barbecue.

**Aperçu dynamique (Visual Sandwich Stacker)** : À droite du configurateur, une pile 3D virtuelle de tranches de pain, viandes, légumes et sauces s'empile ou s'allège en temps réel selon les choix de l'utilisateur grâce à Framer Motion. Le prix se met également à jour en temps réel.

### B. Le Panier Persistant (`CartContext.tsx` & `Cart.tsx`)
*   Permet d'ajouter des sandwichs personnalisés ainsi que des plats du menu classique.
*   Pour les sandwichs personnalisés, le panier liste le détail complet des ingrédients sélectionnés (Pain, Fromage, Légumes, Sauces).
*   **Persistance** : Synchronisé automatiquement avec le `localStorage` du navigateur pour conserver le panier même après rafraîchissement de la page.
*   **Validation de commande** : Simulation de commande réussie avec un écran de succès animé (estimation de livraison à 15 minutes).

### C. Menu classique interactif (`Menu.tsx`)
*   Présentation des spécialités de la carte du restaurant tunisien (Margherita, Escalope, Fruits de Mer, Makloub, Ojja tunisienne, Baguette Farcie, Tacos, frites et boissons).
*   Système d'onglets réactifs pour filtrer par catégories : *Pizzas*, *Sandwichs & Makloub*, *Plats & Ojjas*, *Spécialités* et *Boissons & Suppléments*.
*   Sélecteur de taille dynamique pour les Pizzas (Petite, Moyenne, Méga) avec recalcul des tarifs en temps réel en Dinars Tunisiens (DT).

---

## 6. Scripts et Commandes Utiles

### Lancer le serveur de développement
```bash
npm run dev
```
*(Démarre le serveur local de Next.js en forçant Webpack pour le rendu de certains assets)*

### Compiler le projet pour la production
```bash
npm run build
```

### Nettoyer le fond des images (Checkerboard Remover)
Si vous ajoutez de nouvelles images de produits provenant d'un rendu 3D avec un fond quadrillé (type Photoshop/checkerboard) :
```bash
node remove-checkerboard.js
```
*Ce script va automatiquement analyser les images du dossier `public/` (comme `hero-sub.png`, `burger.png`, `pizza.png`, etc.) et transformer le fond blanc/gris neutre en transparence alpha pure.*
