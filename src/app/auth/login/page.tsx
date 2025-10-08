"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/useAuth";
import Link from "next/link";
import { Mail, Lock, AlertCircle, Eye, EyeOff, ArrowRight } from "lucide-react";
import type { User } from "../../lib/api";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(""); // Réinitialise l'erreur lors de la saisie
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const formDataBody = new FormData();
      formDataBody.append("username", formData.email);
      formDataBody.append("password", formData.password);

      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        body: formDataBody,
      });

      if (res.ok) {
        const data: { access_token: string; user: User } = await res.json();
        login(data.access_token, data.user);
        router.push("/");
      } else {
        const err: { detail?: string | { msg: string }[] } = await res.json();
        if (Array.isArray(err.detail)) {
          setError(err.detail.map((d) => d.msg).join(", "));
        } else {
          setError(typeof err.detail === "string" ? err.detail : "Identifiants incorrects");
        }
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-bold text-gray-900 mb-2">
            EPACIFIC
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bon retour !</h1>
          <p className="text-gray-600">Connectez-vous pour continuer vos achats</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-gray-900"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-gray-900"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              onClick={(e) => handleLogin(e as any)}
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Nouveau sur EPACIFIC ?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Créer un compte
            </Link>
          </p>
        </div>

        {/* Security Note */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            🔒 Connexion sécurisée. Vos données sont protégées et cryptées.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;