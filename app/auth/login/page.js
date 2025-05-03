"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Twitter, Facebook } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [transition, setTransition] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle the transition effect and redirection
  useEffect(() => {
    if (success) {
      // First fade out
      setTransition(true);
      
      // Then redirect after animation completes
      const redirectTimer = setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login logic
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 transition-opacity duration-800 ease-in-out ${transition ? 'opacity-0' : 'opacity-100'}`}>
      {/* Left section - Brand/Welcome Panel */}
      <div className="hidden md:flex md:w-1/2 p-8 items-center justify-center bg-gradient-to-br from-indigo-800 via-indigo-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Decorative elements */}
        <div className="absolute w-full h-full">
          <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mt-12"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mb-16"></div>
          <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-white opacity-10 rounded-full"></div>
        </div>
        
        {/* Welcome content */}
        <div className="relative z-10 max-w-md text-center">
          <h1 className="text-4xl font-extrabold mb-6">Welcome Back!</h1>
          <p className="text-lg mb-10 text-indigo-100">
            Access your dashboard, track your projects, and connect with your team.
          </p>
          
          {/* Stats section */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-1">100+</h3>
              <p className="text-sm text-indigo-100">Projects</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-1">10k+</h3>
              <p className="text-sm text-indigo-100">Users</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-1">24/7</h3>
              <p className="text-sm text-indigo-100">Support</p>
            </div>
          </div>
          
          {/* Client logos */}
          <div className="flex justify-center space-x-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <img src="/api/placeholder/40/40" alt="Client logo" className="rounded-full" />
            </div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <img src="/api/placeholder/40/40" alt="Client logo" className="rounded-full" />
            </div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <img src="/api/placeholder/40/40" alt="Client logo" className="rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right section - login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
          {/* Form header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-indigo-100 mb-4">
              <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="text-gray-500 mt-2">Access your account</p>
          </div>

          {/* Social login options */}
          <div className="flex justify-center space-x-4 mb-6">
            <button className="flex items-center justify-center p-2 border border-gray-200 rounded-lg w-12 h-12 hover:bg-gray-50 transition-colors">
              <Github size={20} className="text-gray-700" />
            </button>
            <button className="flex items-center justify-center p-2 border border-gray-200 rounded-lg w-12 h-12 hover:bg-gray-50 transition-colors">
              <Twitter size={20} className="text-blue-400" />
            </button>
            <button className="flex items-center justify-center p-2 border border-gray-200 rounded-lg w-12 h-12 hover:bg-gray-50 transition-colors">
              <Facebook size={20} className="text-blue-600" />
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or continue with email</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Forgot password?
              </a>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center shadow-md hover:shadow-lg group"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="/auth/register" className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-200">
                Create an account
              </a>
            </p>
          </div>

          {/* Terms & privacy */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              By signing in, you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}