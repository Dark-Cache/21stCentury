import { useState, useEffect } from "react";
import { Lock, Mail, User as UserIcon, ArrowLeft } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [connectionStatus, setConnectionStatus] = useState("Testing...");

  // Test Supabase connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { error } = await supabase.from('profiles').select('count').limit(1);
        if (error) {
          setConnectionStatus(`❌ Connection Error: ${error.message}`);
        } else {
          setConnectionStatus('✅ Supabase Connected');
        }
      } catch (err) {
        setConnectionStatus(`❌ Network Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };
    testConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isSignUp) {
        await signUp(formData.email, formData.password, formData.fullName);
        setSuccess(
          "Account created successfully! Please check your email to verify your account."
        );
        setFormData({ email: "", password: "", fullName: "" });
        setTimeout(() => {
          setIsSignUp(false);
          setSuccess("");
        }, 3000);
      } else {
        await signIn(formData.email, formData.password);
        onNavigate("home");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 to-blue-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-indigo-400/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-white">21st Century</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
                  Prophet
                </span>
              </h1>
              <p className="text-purple-200 text-sm">
                Divine guidance for modern times
              </p>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {isSignUp ? "Join Our Community" : "Welcome Back"}
            </h2>
            <p className="text-purple-200">
              {isSignUp
                ? "Create your account to share testimonies"
                : "Sign in to continue your spiritual journey"}
            </p>
          </div>

          {/* Connection Status */}
          <div className="mb-4 p-3 bg-white/90 rounded-lg border border-white/30">
            <p className="text-sm font-medium text-center">
              {connectionStatus}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="text"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white/80"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white/80"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <input
                    type="password"
                    id="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white/80"
                    placeholder="Enter your password"
                    minLength={6}
                  />
                </div>
                {isSignUp && (
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                  <p className="text-green-800 text-sm font-medium">
                    {success}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Please wait...
                  </div>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Toggle Sign In/Up */}
            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                  setSuccess("");
                  setFormData({ email: "", password: "", fullName: "" });
                }}
                className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>

          {/* Return to Home */}
          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate("home")}
              className="inline-flex items-center gap-2 text-purple-200 hover:text-white transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
