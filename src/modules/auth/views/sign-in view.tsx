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
                  type="button"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 hover:border-white/20"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.166-2.685-6.735-2.685-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.961h-9.811z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  disabled={ Pending }
                  type="button"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 hover:border-white/20"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                  </svg>
                  GitHub
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