"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { OctagonAlertIcon } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),

});

export const SignInView = () => {
     const router= useRouter();
     const [error, setError] = useState<string | null >(null);
     const [Pending, setPending] = useState(false);



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
     
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setError(null);
    setPending(true);

    authClient.signIn.email({
      email: data.email,
      password: data.password,
    }, {
      onSuccess: () => {
        router.push("/")
      },
      onError: (error) => {
        setError(error.error?.message || "An error occurred")
      },
      onSettled: () => {
        setPending(false);
      },
    });

  };

    const onSocial = (provider: "github" | "google" ) => {
      console.log(provider);
      setError(null);
      setPending(true);
  
      authClient.signIn.social({
        provider: provider,
        callbackURL: "/"
      }, 
      {
        onSuccess: () => {
         setPending(false);
         
        },
        onError: (error) => {
          setPending(false);
          setError(error.error?.message || "An error occurred")
        },
      });

    };






  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-4 relative overflow-hidden">
      {/* Background elements for depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-green-500/10 blur-3xl animate-pulse delay-300" />
      </div>

      <Card className="relative overflow-hidden border border-white/10 rounded-3xl shadow-2xl bg-white/5 backdrop-blur-2xl w-full max-w-4xl z-10">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <CardContent className="grid grid-cols-1 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-8 md:p-10 flex flex-col gap-6"
            >
              {/* Heading */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white drop-shadow-md">
                  Welcome Back
                </h1>
                <p className="text-white/70 text-sm mt-2 tracking-wide">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90 font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400/90" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90 font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400/90" />
                  </FormItem>
                )}
              />

            

                {/* Error Alert - conditionally rendered */}
                {!!error && (
                  <Alert className="bg-red-600/20 border border-red-500/30 text-white flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm">
                    <OctagonAlertIcon className="h-5 w-5 text-red-300" />
                    <AlertTitle className="text-red-100">
                    {error}
                    </AlertTitle>
                  </Alert>
                )}



              {/* Submit Button */}
              <Button
                disabled={ Pending }
            
              
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99]"
              >
                Sign In
              </Button>

              {/* Divider */}
              <div className="relative text-center text-white/70 text-sm my-2">
                <span className="relative z-10 px-4 bg-white/5 rounded-full">
                  Or continue with
                </span>
                <div className="absolute inset-0 top-1/2 border-t border-white/10" />
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                disabled={ Pending }
                  onClick={() => {
                   onSocial("google");
                  }}
                  type="button"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 hover:border-white/20"
                >
                 
                  <FaGoogle />
                  
                </button>
                <button
                  disabled={ Pending }
                  onClick={() => {
                    onSocial("github");
                  }}
                  type="button"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 hover:border-white/20"
                >
                  
                  <FaGithub />
                </button>
              </div>

              {/* Footer */}
              <p className="text-sm text-center text-white/70 mt-2 tracking-wide">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="underline underline-offset-4 hover:text-green-300 transition-colors duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </Form>

          {/* Right Side */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-green-800/80 to-emerald-900/80 p-8 gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/10" />
            <div className="relative z-10 flex flex-col items-center">
              <img
                src="/logo.svg"
                alt="Logo"
                className="w-28 h-28 drop-shadow-xl animate-float"
              />
              <p className="text-white text-3xl font-semibold tracking-wide mt-4 drop-shadow-md">
                Callawa
              </p>
              <p className="text-white/80 text-center mt-4 max-w-xs">
                Connect with your community and discover new opportunities
              </p>
            </div>
           
          </div>
        </CardContent>
      </Card>

      {/* Footer note */}
      <div className="text-white/50 text-xs text-center mt-6 tracking-wide z-10">
        By clicking continue, you agree to our{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-green-300 transition-colors duration-200"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="underline underline-offset-4 hover:text-green-300 transition-colors duration-200"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default SignInView;