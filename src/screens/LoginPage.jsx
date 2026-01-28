import React, { useEffect, useState } from "react";
import { useLogin } from "../ApiHook";
import { LogIn, Mail, Lock, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "@material-tailwind/react";
import { UserStore } from "../state/store";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const { mutate, isLoading, error, isError } = useLogin()
  const userData = UserStore.useState(s => s.user)

  const HandleLogin = (e) => {
    e.preventDefault()
    mutate({ email, password })
  }

  useEffect(() => {
    if (userData) {
      navigate('/admin');
    }
  }, [userData, navigate]);

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Section - Image & Branding */}
      <div
        className="hidden lg:block lg:w-3/5 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/img3.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all group-hover:bg-white/30">
              <ArrowLeft size={20} />
            </div>
            <span className="font-bold tracking-wide uppercase text-sm">Back to Website</span>
          </Link>

          <div>
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
              Empowering <br />
              <span className="text-primary-light italic">Sokoto's Landscapes</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
              Managing our environment with resilience and innovation for a sustainable future.
            </p>
          </div>

          <div className="text-sm text-slate-400 font-medium tracking-widest uppercase">
            ACReSAL Sokoto Admin Portal
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Staff Login</h2>
            <p className="text-slate-500 font-medium">Welcome back! Please enter your credentials to access the administrative dashboard.</p>
          </div>

          <form onSubmit={HandleLogin} className="space-y-6">
            {isError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Alert color="red" className="bg-red-50 text-red-700 border border-red-100 rounded-xl">
                  {error?.response?.data?.detail || "Invalid email or password"}
                </Alert>
              </motion.div>
            )}

            <div>
              <label className="block text-slate-700 text-sm font-bold uppercase tracking-wider mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-slate-700 text-sm font-bold uppercase tracking-wider" htmlFor="password">
                  Password
                </label>
                <Link to="/forgot-password" size="sm" className="text-primary hover:text-primary-light text-sm font-bold">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary-premium flex justify-center py-4"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn size={20} />
                  <span>Sign In</span>
                </div>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Sokoto ACReSAL. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
