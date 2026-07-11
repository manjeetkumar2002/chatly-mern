import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import axiosClient from '../utils/axiosClient';
import Error from '../component/Error';
import { signup } from '../store/authSlice';
import { useDispatch, useSelector } from "react-redux"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [userName, setUserName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { error, loading, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleSignUp = (e) => {
    e.preventDefault()
    dispatch(signup({ userName, emailId, password }))
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (error) {
    return (
      <Error message={error} />
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex justify-center items-center p-4'>
      <div className='w-full max-w-[420px]'>
        {/* Card */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] border border-white/50 overflow-hidden'>
          
          {/* Header */}
          <div className='relative px-8 pt-10 pb-8 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600'>
            <div className='absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2'></div>
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2'></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl'></div>
            <div className='relative z-10 text-center'>
              <h1 className='text-3xl font-bold text-white mb-1'>Create Account</h1>
              <p className='text-indigo-100/80 text-sm font-medium'>Join the community today</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className='px-8 pt-8 pb-10 space-y-5'>
            {/* Username Input */}
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-slate-600 uppercase tracking-wider block ml-1'>
                Username
              </label>
              <div className='relative group'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                  type="text" 
                  placeholder="Choose a username" 
                  className='w-full pl-9 pr-4 py-3 bg-slate-50/50 border-2 border-slate-200 rounded-xl outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20 text-slate-700 placeholder:text-slate-400 text-sm'
                />
              </div>
            </div>

            {/* Email Input */}
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-slate-600 uppercase tracking-wider block ml-1'>
                Email Address
              </label>
              <div className='relative group'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <input 
                  value={emailId} 
                  onChange={(e) => setEmailId(e.target.value)} 
                  type="email" 
                  placeholder="you@example.com" 
                  className='w-full pl-9 pr-4 py-3 bg-slate-50/50 border-2 border-slate-200 rounded-xl outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20 text-slate-700 placeholder:text-slate-400 text-sm'
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-slate-600 uppercase tracking-wider block ml-1'>
                Password
              </label>
              <div className='relative group'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <svg className='w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Create a strong password" 
                  className='w-full pl-9 pr-16 py-3 bg-slate-50/50 border-2 border-slate-200 rounded-xl outline-none transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20 text-slate-700 placeholder:text-slate-400 text-sm'
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} 
                  className='absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200'
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {/* Password Hint */}
              <p className='text-xs text-slate-400 ml-1'>Must be at least 8 characters</p>
            </div>

            {/* Terms Checkbox */}
            <div className='flex items-center gap-2.5 pt-1'>
              <input 
                type="checkbox" 
                id="terms" 
                className='w-4 h-4 rounded border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 focus:ring-2 transition-all cursor-pointer'
                required
              />
              <label htmlFor="terms" className='text-xs text-slate-600 cursor-pointer select-none'>
                I agree to the <span className='text-indigo-500 hover:text-indigo-600 transition-colors font-medium'>Terms of Service</span> and <span className='text-indigo-500 hover:text-indigo-600 transition-colors font-medium'>Privacy Policy</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className='pt-2'>
              <button 
                disabled={loading} 
                type='submit' 
                className='w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none'
              >
                {loading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : "Create Account"}
              </button>
            </div>

            {/* Login Link */}
            <div className='pt-2'>
              <p className='text-center text-sm text-slate-600'>
                Already have an account?{' '}
                <NavLink to="/login" className="font-semibold text-indigo-500 hover:text-indigo-600 transition-colors hover:underline underline-offset-2">
                  Sign in
                </NavLink>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className='text-center mt-6'>
          <p className='text-xs text-slate-400'>✨ Join thousands of happy users</p>
        </div>
      </div>
    </div>
  )
}

export default SignUp