import React, { useEffect } from 'react';
import { Route, Switch } from 'wouter';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import CategoryPage from './pages/category-page';
import ToolPage from './pages/tool-page';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import PrivacyPage from './pages/privacy';
import TermsPage from './pages/terms';
import LoginPage from './pages/auth-login';
import RegisterPage from './pages/auth-register';
import NotFound from './pages/not-found';

function App() {
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const root = window.document.documentElement;
    if (stored === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <Header />
      <main className="min-h-[calc(100vh-64px-80px)]">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:slug">
            {(params) => <CategoryPage slug={params.slug} />}
          </Route>
          <Route path="/tools/:slug">
            {(params) => <ToolPage slug={params.slug} />}
          </Route>
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/auth/login" component={LoginPage} />
          <Route path="/auth/register" component={RegisterPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
