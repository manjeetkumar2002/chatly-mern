import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import Error from "../component/Error";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEnvelope } from "react-icons/fa";
import { CiLock } from "react-icons/ci";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ emailId, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden p-4">

      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px]" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[180px]" />

      <div className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl shadow-2xl shadow-slate-950/60 p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-3">
            <svg
              className="w-6 h-6 text-white rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-white">Chatly</h1>

          <p className="text-sm text-slate-400 mt-1">
            Connect instantly with your friends
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5">
            <Error message={error} />
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Email Address
            </label>

            <div className="relative">
              <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="email"
                required
                autoComplete="email"
                disabled={loading}
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="john@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Password
            </label>

            <div className="relative">
              <CiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />

              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3 pl-11 pr-16 text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-indigo-400 hover:text-indigo-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-150 rounded-2xl py-3.5 text-white font-semibold shadow-lg shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="w-full border-t border-slate-800"></div>
          <span className="absolute bg-slate-900/60 px-3 text-[10px] uppercase tracking-widest text-slate-500">
            Welcome Back
          </span>
        </div>

        {/* Signup */}
        <div className="text-center">
          <p className="text-sm text-slate-400">
            Want to create a new account?
            <NavLink
              to="/signup"
              className="ml-1 text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Sign Up
            </NavLink>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;