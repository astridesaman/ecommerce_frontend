# 🌱 ePacific

Plateforme e-commerce éco-responsable avec personnalisation et espace communautaire

---

## 🚀 Présentation

ePacific est une plateforme e-commerce innovante, mettant en avant des produits éco-responsables et offrant une expérience utilisateur unique grâce à :
- une personnalisation IA (recommandations, customisation de produits)
- un espace communautaire favorisant l’inclusion des créateurs
- un parcours d’achat optimisé et durable

---

## 📋 Fonctionnalités principales

### 🛍️ Expérience e-commerce

- Catalogue produit avec filtres dynamiques (prix, impact écologique, marque, catégorie)
- Recherche intelligente (suggestions, auto-complétion)
- Panier & paiement sécurisé
- Wishlist intelligente : alertes prix & stock, recommandations associées
- Suivi de commande & retours simplifiés

### 🤖 Personnalisation IA

- Recommandations personnalisées (historique, préférences, durabilité)
- Customisation produit (textile, mugs, accessoires)
- Chatbot / conseiller éthique (guidage vers des choix éco-responsables)

### 🌍 Communauté & marketplace

- Espace communautaire : posts, discussions, avis enrichis
- Marketplace créateurs : vendre/acheter des produits uniques
- Système de badges & gamification (impact écologique, fiabilité vendeur)

---

## 🛠️ Stack technique utilisée

### Frontend

- **Framework** : Next.js 15 (App Router, Server Components)
- **Langage** : TypeScript
- **UI/Design** : Tailwind CSS, ShadCN UI
- **Gestion d’état** : Zustand
- **Authentification & Sécurité** : OAuth2 (SSO, social logins, gestion des rôles), JWT
- **Appels API** : REST (via `lib/api.ts`)
- **Mock de données** : mockProducts.ts

### Paiement & Logistique

- (À intégrer) Stripe, PayPal, API transporteurs

### SEO & Analytics

- **SEO** : Next.js (ISR/SSR)
- **Analytics** : (À intégrer) Google Analytics, LogRocket, PostHog

---

## ▶️ Lancer le projet en local

```bash
npm install
npm run dev
```

Le projet sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## 📁 Structure du projet

```
src/
  app/
    components/
    hooks/
    lib/
    context/
    (routes)/
    public/
    globals.css
    layout.tsx
```
---

## 📄 Licence

Ce projet est sous licence MIT.