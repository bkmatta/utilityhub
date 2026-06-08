import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { login, accountExists, resetPassword } from '@/lib/auth';

type View = 'login' | 'forgot';
type ForgotStep = 'email' | 'reset' | 'done';

export default function LoginPage() {
  const [, navigate] = useLocation();
  const [view, setView] = useState<View>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<ForgotStep>('email');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) { setError('Please fill in all fields.'); return; }
    setError(''); setIsLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!forgotEmail.trim()) { setError('Please enter your email address.'); return; }
    if (!accountExists(forgotEmail.trim())) { setError('No account found with this email address.'); return; }
    setForgotStep('reset');
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!newPassword || !confirmPassword) { setError('Please fill in both fields.'); return; }
    if (newPassword.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }
    setIsLoading(true);
    await resetPassword(forgotEmail.trim(), newPassword);
    setIsLoading(false);
    setForgotStep('done');
  };

  const gotoLogin = () => {
    setView('login'); setError('');
    setForgotEmail(''); setForgotStep('email');
    setNewPassword(''); setConfirmPassword('');
  };

  const inputClass = 'w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none transition-all';

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-6">

        {/* Logo */}
        <div className="text-center space-y-2">
          <Link href="/">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg mx-auto shadow-sm cursor-pointer hover:scale-105 transition-transform">U</div>
          </Link>
          {view === 'login' && (
            <>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Welcome Back</h2>
              <p className="text-xs text-zinc-400">Sign in to your UtilityHub account</p>
            </>
          )}
          {view === 'forgot' && (
            <>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {forgotStep === 'done' ? 'Password Updated' : 'Reset Password'}
              </h2>
              <p className="text-xs text-zinc-400">
                {forgotStep === 'done' ? 'You can now sign in with your new password.' : 'Enter your account email to continue'}
              </p>
            </>
          )}
        </div>

        {/* ── LOGIN FORM ── */}
        {view === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400" htmlFor="email">Email address</label>
              <input
                id="email" type="email" autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com" className={inputClass}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400" htmlFor="password">Password</label>
                <button type="button" onClick={() => { setView('forgot'); setError(''); }} className="text-[10px] text-violet-600 hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" className={`${inputClass} pr-10`}
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-base leading-none">
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl px-3 py-2 flex items-center gap-1.5">
                <span>⚠️</span>{error}
              </p>
            )}
            <button type="submit" disabled={isLoading}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed">
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        )}

        {/* ── FORGOT: enter email ── */}
        {view === 'forgot' && forgotStep === 'email' && (
          <form onSubmit={handleForgotEmail} className="space-y-4" noValidate>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400" htmlFor="femail">Your account email</label>
              <input
                id="femail" type="email" autoComplete="email"
                value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="name@domain.com" className={inputClass}
              />
            </div>
            {error && (
              <p className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl px-3 py-2 flex items-center gap-1.5">
                <span>⚠️</span>{error}
              </p>
            )}
            <button type="submit" className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all text-sm">
              Continue
            </button>
            <button type="button" onClick={gotoLogin} className="w-full text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-center py-1">
              ← Back to sign in
            </button>
          </form>
        )}

        {/* ── FORGOT: set new password ── */}
        {view === 'forgot' && forgotStep === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4" noValidate>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 rounded-xl px-4 py-3 border border-zinc-200 dark:border-zinc-800">
              Resetting password for <span className="font-semibold text-zinc-700 dark:text-zinc-300">{forgotEmail}</span>
            </p>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400">New password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'} autoComplete="new-password"
                  value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters" className={`${inputClass} pr-10`}
                />
                <button type="button" onClick={() => setShowNew((v) => !v)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-base leading-none">
                  {showNew ? '🙈' : '👁️'}
                </button>
              </div>
              {newPassword && (
                <div className="flex gap-1 pt-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                      newPassword.length >= i * 3
                        ? newPassword.length >= 12 ? 'bg-emerald-500' : newPassword.length >= 8 ? 'bg-amber-400' : 'bg-rose-400'
                        : 'bg-zinc-200 dark:bg-zinc-800'
                    }`} />
                  ))}
                  <span className="text-[10px] text-zinc-400 ml-1 self-center">
                    {newPassword.length < 8 ? 'Too short' : newPassword.length < 12 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400">Confirm new password</label>
              <input
                type="password" autoComplete="new-password"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••" className={inputClass}
              />
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-[10px] text-rose-500 mt-0.5">Passwords don't match</p>
              )}
            </div>
            {error && (
              <p className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl px-3 py-2 flex items-center gap-1.5">
                <span>⚠️</span>{error}
              </p>
            )}
            <button type="submit" disabled={isLoading}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all text-sm disabled:opacity-60">
              {isLoading ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        )}

        {/* ── FORGOT: done ── */}
        {view === 'forgot' && forgotStep === 'done' && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="text-5xl mb-3">✅</div>
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Password updated!</p>
            </div>
            <button onClick={gotoLogin} className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all text-sm">
              Sign In Now
            </button>
          </div>
        )}

        {/* Footer */}
        {view === 'login' && (
          <p className="text-xs text-center text-zinc-400">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-violet-600 hover:underline font-semibold">Sign up free</Link>
          </p>
        )}
      </div>
    </div>
  );
}
