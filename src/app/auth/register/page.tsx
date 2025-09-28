"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/useAuth";
import Link from "next/link";

const RegisterPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const user = await res.json();
        setSuccess("Compte créé avec succès 🎉");
        login(localStorage.getItem("token") || "", user);
        setTimeout(() => router.push("/"), 1500);
      } else {
        const err = await res.json();
        setError(err.detail || "Inscription échouée");
      }
    } catch {
      setError("Erreur de connexion au serveur");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>

        {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}
        {success && <p className="mb-4 text-sm text-green-600 text-center">{success}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nom complet"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Créer mon compte
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Déjà un compte ?{" "}
          <Link href="/auth/login" className="text-green-600 hover:underline">
            Connexion
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
