"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center space-y-4">
          <div className="animate-pulse text-yellow-400 text-lg font-semibold">
            Patientez...
          </div>
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-zinc-900 shadow-2xl rounded-3xl p-8 max-w-md w-full border border-yellow-500 flex flex-col items-center space-y-6 transition-all duration-300 ease-in-out">
        
        {/* Avatar */}
        <img
          src={session.user.image || "/default-avatar.png"}
          alt="Photo de profil"
          className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-md object-cover"
        />

        {/* Nom stylisé */}
        <h1 className="text-2xl font-bold text-yellow-400 text-center">
          Bienvenue, <span className="text-emerald-400">{session.user.name}</span> 👑
        </h1>

        {/* Message animé */}
        <p className="text-emerald-300 text-center px-2 italic leading-relaxed">
          <Typewriter
            words={[
              "Espace sécurisé prêt.",
              "Prenez le contrôle de votre tableau de bord.",
              "Personnalisez votre expérience.",
              "Restez productif et protégé."
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={2000}
          />
        </p>

        {/* Bouton */}
        <Button
          onClick={() => authClient.signOut({
               fetchOptions: { 
                    onSuccess:() => router.push("/sign-in")
               }}
          )}
          className="w-full bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 focus:outline-none text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          🚪 Se déconnecter
        </Button>
      </div>
    </div>
  );
};


