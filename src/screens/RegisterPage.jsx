import React, { useEffect, useState } from "react";
import { useRegister } from "../ApiHook";
import { User, Mail, Phone, Lock, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "@material-tailwind/react";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { mutate, isError, error, isLoading, isSuccess } = useRegister();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/admin");
    }
  }, [isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setMessage("");
    mutate({ username, email, mobile, password });
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Section - Image & Branding */}
      <div
        className="hidden lg:block lg:w-3/5 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/images/img4.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all group-hover:bg-white/30">
              <ArrowLeft size={20} />
            </div>
            <span className="font-bold tracking-wide uppercase text-sm">Back to Home</span>
          </Link>

          <div>
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
              Join the <br />
              <span className="text-primary-light italic">Resilience Mission</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
              Become part of the ACReSAL team and help us build a greener, more sustainable Sokoto State.
            </p>
          </div>

          <div className="text-sm text-slate-400 font-medium tracking-widest uppercase">
            Staff Enrollment Portal
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Create Account</h2>
            <p className="text-slate-500 font-medium">Join our administrative team to manage and monitor project progress.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(message || isError) && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Alert color="red" className="bg-red-50 text-red-700 border border-red-100 rounded-xl">
                  {message || error?.response?.data?.error || error?.message || "Registration failed"}
                </Alert>
              </motion.div>
            )}

            <div>
              <label className="block text-slate-700 text-sm font-bold uppercase tracking-wider mb-1" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="jdoe24"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-bold uppercase tracking-wider mb-1" htmlFor="email">
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
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-bold uppercase tracking-wider mb-1" htmlFor="mobile">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+234..."
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 text-sm font-bold uppercase tracking-wider mb-1" htmlFor="password">
                  Password
                </label>
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
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 text-sm font-bold uppercase tracking-wider mb-1" htmlFor="confirmPassword">
                  Confirm
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary-premium flex justify-center py-4 mt-4"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Enrolling...</span>
                </div>
              ) : (
                <span>Register Account</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary-light font-bold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;