// app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Loader } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import LoginRedirect from "@/components/LoginRedirect";

export default function LoginPage() {
  const router = useRouter();
  const { isLoading, error, login } = useAuth();

  // UI-only state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Email/Password Login with AuthContext
  const handleEmailPasswordLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLocalError(null);

    try {
      const success = await login({ email, password });
      
      if (success) {
        toast.success("Login successful", {
          description: "Welcome back!",
        });
        
        // Redirect based on user role (you might want to get this from the auth context)
        router.push("/userDashboard");
      } else {
        const errorMessage = error || "Login failed";
        setLocalError(errorMessage);
        toast.error("Login failed", {
          description: errorMessage,
        });
      }
    } catch (err: any) {
      const errorMessage = "Login failed. Please try again.";
      setLocalError(errorMessage);
      toast.error("Login failed", {
        description: errorMessage,
      });
    }
  };

  // Mock Google Sign-In (unchanged)
  const handleGoogleSignIn = async () => {
    // This is still a mock implementation
    // In a real app, this would integrate with Google OAuth
    const setError = (error: string | null) => setLocalError(error);

    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Welcome! Google sign-in successful");
    router.push("/userDashboard");
  };

  return (
    <LoginRedirect>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Welcome Back
              </h2>

              <Link
                href="/"
                className="block w-full text-center px-4 py-3 mb-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-300"
              >
                Home Page
              </Link>

              {/* ───── Login Form ───── */}
              <>
                <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-300"
                      />
                      <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 pl-12 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-300"
                      />
                      <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/forgot-password?email=${encodeURIComponent(
                              email
                            )}`
                          )
                        }
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {/* Error */}
                {(localError || error) && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm text-center">
                      {localError || error}
                    </p>
                  </div>
                )}

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Button (Mock) */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      Sign in with Google
                    </>
                  )}
                </button>

                {/* Register Link */}
                <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </>
            </div>
          </div>
        </div>
      </div>
    </LoginRedirect>
  );
}