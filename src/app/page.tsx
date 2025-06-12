"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Gère la création d'utilisateur avec validation basique
  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      return window.alert("❌ Tous les champs sont requis.");
    }

    if (password !== confirmPassword) {
      return window.alert("❌ Les mots de passe ne correspondent pas.");
    }

    authClient.signUp.email(
      { email, name, password },
      {
        onError: (err) => {
          console.error("SignUp Error:", err);
          window.alert("❌ Erreur lors de la création du compte.");
        },
        onSuccess: () => {
          window.alert("✅ Compte créé avec succès !");
        },
      }
    );
  };

  // Si session active (utilisateur connecté)
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-2xl font-bold mb-4">👋 Bienvenue, {session.user.name}</p>
        <p className="text-gray-700 mb-4">Vous êtes connecté.</p>
        <Button onClick={() => authClient.signOut()}>🚪 Se déconnecter</Button>
      </div>
    );
  }

  // Formulaire de création d'utilisateur
  return (
    <div className="flex flex-col max-w-md mx-auto justify-center min-h-screen bg-gray-100 p-4 space-y-4">
      <h1 className="text-xl font-bold text-center mb-2">Créer un compte</h1>

      <Input
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        placeholder="Confirmer le mot de passe"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button onClick={handleSignUp} className="w-full">
        ✅ Créer le compte
      </Button>
    </div>
  );
}
