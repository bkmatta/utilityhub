import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { register } from '@/lib/auth';

export default function RegisterPage() {
  const [, navigate] = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = (p: string) => {
    if (p.length === 0) return null;
    if (p.length < 8) return { level: 1, label: 'Too short', color: 'bg-rose-400' };
    if (p.length < 12) return { level: 2, label: 'Good', color: 'bg-amber-400' };
    return { level: 3, label: 'Strong', color: 'bg-emerald-500' };
  };
  const strength = passwordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setIsLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate('/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
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
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Create Account</h2>
          <p className="text-xs text-zinc-400">Join UtilityHub — free, private, no ads on your data</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400" htmlFor="name">Full Name</label>
            <input
              id="name" type="text" autoComplete="name"
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="John Doe" className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400" htmlFor="email">Email address</label>
            <input
              id="email" type="email" autoComplete="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com" className={inputClass}
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters" className={`${inputClass} pr-10`}
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-base leading-none">
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {/* Strength bar */}
            {strength && (
              <div className="flex items-center gap-1 pt-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${strength.level >= i ? strength.color : 'bg-zinc-200 dark:bg-zinc-800'}`} />
                ))}
                <span className="text-[10px] text-zinc-400 ml-1">{strength.label}</span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400" htmlFor="confirm">Confirm password</label>
            <input
              id="confirm" type="password" autoComplete="new-password"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••" className={inputClass}
            />
            {confirmPassword && confirmPassword !== password && (
              <p className="text-[10px] text-rose-500 mt-0.5">Passwords don't match</p>
            )}
            {confirmPassword && confirmPassword === password && password.length >= 8 && (
              <p className="text-[10px] text-emerald-500 mt-0.5">✓ Passwords match</p>
            )}
          </div>

          {error && (
            <p className="text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl px-3 py-2 flex items-center gap-1.5">
              <span>⚠️</span>{error}
            </p>
          )}

          <button type="submit" disabled={isLoading}
            className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed">
            {isLoading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-xs text-center text-zinc-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-violet-600 hover:underline font-semibold">Sign in</Link>
        </p>

        <p className="text-[10px] text-center text-zinc-400 leading-relaxed">
          By creating an account you agree to our{' '}
          <Link href="/terms" className="hover:underline">Terms of Service</Link>{' '}and{' '}
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
