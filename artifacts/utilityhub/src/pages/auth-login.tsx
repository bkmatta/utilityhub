import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';

export default function LoginPage() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('user_session', JSON.stringify({ email, name: email.split('@')[0] }));
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg mx-auto shadow-sm">U</div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Welcome Back</h2>
          <p className="text-xs text-zinc-400">Sign in to sync calculations and favorites</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400" htmlFor="email">Email address</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none" />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-zinc-650 dark:text-zinc-400" htmlFor="password">Password</label>
              <a href="#" className="text-[10px] text-violet-600 hover:underline">Forgot password?</a>
            </div>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:outline-none" />
          </div>
          {error && <p className="text-xs text-rose-500">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-md transition-all text-sm disabled:opacity-50">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="relative flex py-2 items-center text-xs text-zinc-400">
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
          <span className="flex-shrink mx-4">or continue with</span>
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
        </div>

        <button onClick={() => { setIsLoading(true); setTimeout(() => { setIsLoading(false); localStorage.setItem('user_session', JSON.stringify({ email: 'google.user@gmail.com', name: 'Google User' })); navigate('/'); }, 800); }} className="w-full py-2.5 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-950 font-semibold text-zinc-700 dark:text-zinc-300 rounded-xl transition-all text-sm flex items-center justify-center gap-2">
          <span>🌐</span> Google OAuth
        </button>

        <p className="text-xs text-center text-zinc-400">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-violet-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
