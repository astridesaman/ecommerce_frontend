"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/useAuth";
import Link from "next/link";
import { User, Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff, ArrowRight } from "lucide-react";
import type { User as UserType } from "../../lib/api";

const RegisterPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
    setSuccess("");
  };

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) return "Le mot de passe doit contenir au moins 8 caractères";
    if (!/[A-Z]/.test(pwd)) return "Le mot de passe doit contenir au moins une majuscule";
    if (!/[a-z]/.test(pwd)) return "Le mot de passe doit contenir au moins une minuscule";
    if (!/[0-9]/.test(pwd)) return "Le mot de passe doit contenir au moins un chiffre";
    return null;
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation côté client
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        const user: UserType = await res.json();
        setSuccess("Compte créé avec succès ! Redirection...");
        login(localStorage.getItem("token") || "", user);
        setTimeout(() => router.push("/"), 1500);
      } else {
        const err: { detail?: string | { msg: string }[] } = await res.json();
        if (Array.isArray(err.detail)) {
          setError(err.detail.map((d) => d.msg).join(", "));
        } else {
          setError(typeof err.detail === "string" ? err.detail : "Inscription échouée");
        }
      }
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (pwd: string): { strength: string; color: string; width: string } => {
    if (!pwd) return { strength: "", color: "", width: "0%" };
    
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { strength: "Faible", color: "bg-red-500", width: "33%" };
    if (score === 3) return { strength: "Moyen", color: "bg-yellow-500", width: "66%" };
    return { strength: "Fort", color: "bg-green-500", width: "100%" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-bold text-gray-900 mb-2">
            EPACIFIC
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rejoignez-nous</h1>
          <p className="text-gray-600">Créez votre compte en quelques secondes</p>
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

          {/* Success Alert */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-gray-900"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Force du mot de passe</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength === "Fort" ? "text-green-600" :
                      passwordStrength.strength === "Moyen" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {passwordStrength.strength}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                </div>
              )}

              <p className="mt-2 text-xs text-gray-500">
                Minimum 8 caractères avec majuscule, minuscule et chiffre
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={(e) => handleRegister(e as any)}
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Création du compte...</span>
                </>
              ) : (
                <>
                  <span>Créer mon compte</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Terms */}
          <p className="mt-6 text-xs text-gray-500 text-center">
            En créant un compte, vous acceptez nos{" "}
            <Link href="/terms" className="text-gray-900 hover:underline">
              Conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link href="/privacy" className="text-gray-900 hover:underline">
              Politique de confidentialité
            </Link>
          </p>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>

        {/* Security Note */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 text-center">
            🔒 Vos données sont sécurisées avec un cryptage de niveau bancaire
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;