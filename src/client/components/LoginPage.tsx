import React, { useState } from "react";
import { ShieldCheck, CircleHelp, LogIn, Loader2, AlertCircle } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

interface LoginPageProps {
  onLogin: (role: "admin" | "staff" | "user") => void;
  onHome: () => void;
}

export function LoginPage({ onLogin, onHome }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      onLogin("admin"); // Defaulting to admin role upon successful login
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#083a2a] text-white selection:bg-emerald-500/30" style={{ fontFamily: "Antonio, sans-serif" }}>
      {/* LEFT PANEL: Branding & Context */}
      <div className="relative w-full md:w-[55%] flex flex-col justify-end p-12 lg:p-20 overflow-hidden min-h-[50vh] md:min-h-screen">
        {/* Background Image with Green Blend */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop"
            alt="Hospital Corridor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0c4a34] mix-blend-multiply opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#083a2a] via-[#083a2a]/80 to-transparent opacity-90" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 max-w-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-emerald-400" />
            <span className="text-emerald-400 text-sm font-bold tracking-[0.2em] uppercase">
              ResQ Clinical Intelligence
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-6">
            "Precision in every pulse, security in every second."
          </h1>

          <p className="text-emerald-50 text-lg md:text-xl font-medium leading-relaxed opacity-90">
            Operating at the intersection of life-saving speed and cryptographic
            certainty.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL: Auth Form */}
      <div className="w-full md:w-[45%] bg-[#fdfdfd] text-gray-900 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center p-8 lg:px-16">
          <button onClick={onHome} className="flex items-center gap-2" style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
            <span className="text-2xl font-black tracking-tight text-[#0c4a34]">
              ResQ
            </span>
          </button>
          <div className="flex items-center gap-4 text-gray-500">
            <button className="hover:text-gray-900 transition-colors" style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
              <CircleHelp className="size-5" />
            </button>
            <button className="hover:text-gray-900 transition-colors" style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
              <ShieldCheck className="size-5" />
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 max-w-2xl mx-auto w-full py-12">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Command Access
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Please enter your credentials to access the secure terminal.
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm font-semibold flex items-center gap-2">
                <AlertCircle className="size-4" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-[#0c4a34] hover:bg-[#0f5a43] text-white rounded-xl py-4 flex items-center justify-center gap-2 font-bold text-lg mt-8 transition-colors shadow-lg shadow-emerald-900/20 disabled:opacity-80 disabled:cursor-not-allowed"
              style={{ border: "none", cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign in with Google
                  <LogIn className="size-5" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-900">
            <h4 className="font-bold flex items-center gap-2 mb-2">
              <CircleHelp className="size-4" /> Secure Access
            </h4>
            <p className="text-blue-800/80 mb-3">Please use your Google account to log into the secure dashboard. You will automatically be granted Admin access.</p>
          </div>


        </div>

        {/* Footer */}
        <div className="mt-auto px-8 lg:px-16 pb-8 text-xs font-semibold text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-100 pt-8">
          <div className="flex items-center gap-8 uppercase tracking-widest">
            <a href="#" className="flex items-center gap-2 hover:text-gray-600 transition-colors">
              <ShieldCheck className="size-4" /> System Support
            </a>
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <a href="#" className="flex items-center gap-2 hover:text-gray-600 transition-colors">
              Legal Terms
            </a>
          </div>

          <div className="flex items-center gap-8 uppercase tracking-wider text-right">
            <span>© 2024 ResQ Clinical Systems. High-Security Access Area.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-600 transition-colors">System Status</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
