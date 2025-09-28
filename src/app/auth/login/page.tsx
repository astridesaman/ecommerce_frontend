"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/useAuth";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    // Crée un FormData pour OAuth2PasswordRequestForm
    const formData = new FormData();
    formData.append("username", email); // username = email pour OAuth2
    formData.append("password", password);

    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      body: formData, // pas de JSON ici
    });

    if (res.ok) {
      const data = await res.json();
      // Sauvegarde dans localStorage / contexte Auth
      login(data.access_token, data.user);
      router.push("/"); // redirection vers la page d'accueil
    } else {
      const err = await res.json();
      // Transforme les erreurs Pydantic en texte lisible
      if (Array.isArray(err.detail)) {
        setError(err.detail.map((d: any) => d.msg).join(", "));
      } else {
        setError(err.detail || "Connexion échouée");
      }
    }
  } catch {
    setError("Erreur de connexion au serveur");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
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
            Se connecter
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Pas encore de compte ?{" "}
          <Link href="/auth/register" className="text-green-600 hover:underline">
            Inscription
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
