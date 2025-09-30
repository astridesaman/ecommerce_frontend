"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../lib/useAuth";
import { Search, Heart, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(search)}`;
      setSearch("");
    }
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    window.location.href = "/";
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
          >
            EPACIFIC
          </Link>

          {/* Barre de recherche - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (search.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(search)}`;
                      setSearch("");
                    }
                  }
                }}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink href="/community" icon={null}>
              Communauté
            </NavLink>
            <NavLink href="/wishlist" icon={<Heart className="w-5 h-5" />}>
              Wishlist
            </NavLink>
            <NavLink href="/cart" icon={<ShoppingCart className="w-5 h-5" />}>
              Panier
            </NavLink>

            {/* Séparateur */}
            <div className="w-px h-6 bg-gray-300 mx-2" />

            {/* Auth */}
            {!user ? (
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Connexion
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-900"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden xl:inline">{user.first_name || "Profil"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                  aria-label="Déconnexion"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </nav>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Barre de recherche Mobile */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (search.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(search)}`;
                    setSearch("");
                  }
                }
              }}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-1">
            <MobileNavLink href="/community" onClick={closeMobileMenu}>
              Communauté
            </MobileNavLink>
            <MobileNavLink href="/wishlist" onClick={closeMobileMenu} icon={<Heart className="w-5 h-5" />}>
              Wishlist
            </MobileNavLink>
            <MobileNavLink href="/cart" onClick={closeMobileMenu} icon={<ShoppingCart className="w-5 h-5" />}>
              Panier
            </MobileNavLink>

            <div className="h-px bg-gray-200 my-2" />

            {!user ? (
              <Link
                href="/auth/login"
                onClick={closeMobileMenu}
                className="block w-full px-4 py-3 bg-gray-900 text-white rounded-lg font-medium text-center hover:bg-gray-800 transition-colors"
              >
                Connexion
              </Link>
            ) : (
              <>
                <MobileNavLink href="/profile" onClick={closeMobileMenu} icon={<User className="w-5 h-5" />}>
                  {user.first_name || "Profil"}
                </MobileNavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Déconnexion</span>
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

// Composant NavLink pour Desktop
const NavLink = ({ href, icon, children }: { href: string; icon?: React.ReactNode; children: React.ReactNode }) => (
  <Link
    href={href}
    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700 hover:text-gray-900"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

// Composant NavLink pour Mobile
const MobileNavLink = ({ 
  href, 
  icon, 
  children, 
  onClick 
}: { 
  href: string; 
  icon?: React.ReactNode; 
  children: React.ReactNode; 
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700 hover:text-gray-900"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default Navbar;