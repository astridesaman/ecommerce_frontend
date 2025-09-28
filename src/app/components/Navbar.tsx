"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../lib/useAuth";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { user, logout } = useAuth(); // on utilise le hook refactoré

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(search)}`;
    }
  };

  const handleLogout = () => {
    logout(); // supprime token + user côté contexte et localStorage
    window.location.href = "/"; // redirection après déconnexion
  };

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="relative flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          EPACIFIC
        </Link>

        {/* Barre de recherche */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-6">
          <input
            type="text"
            placeholder="Search a product ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </form>

        {/* Liens rapides */}
        <nav className="flex gap-6 items-center">
          <Link href="/community">Communauté</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/cart">Panier</Link>

          {/* Auth */}
          {!user ? (
            <Link href="/auth/login" className="text-green-600 font-semibold">
              Connexion
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="font-semibold">
                {user.first_name || "Profil"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Déconnexion
              </button>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
