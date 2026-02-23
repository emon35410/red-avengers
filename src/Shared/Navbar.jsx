import React, { useState, useEffect } from 'react';
import logo from "../assets/Red-Avengers-logo.webp";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark for eye comfort

  // Effect to handle the theme change
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Find Donors', href: '/find' },
    { name: 'Donation Camps', href: '#camps' },
    { name: 'Blood Inventory', href: '#inventory' },
    { name: 'Emergency Request', href: '#emergency' },
  ];

  return (
    <nav className="bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-rose-900/30 px-4 py-3 sticky top-0 z-50 shadow-lg transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative h-10 w-10 md:h-12 md:w-12 flex items-center justify-center">
            <img
              src={logo}
              alt="Red Avengers Logo"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100 dark:invert-0"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-red-600 font-black tracking-tighter text-lg leading-none italic group-hover:text-rose-500 transition-colors">
              RED <span className="text-green-600">AVENGERS</span>
            </span>
          </div>
        </div>

        {/* Right Side: Navigation + Toggle */}
        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 transition-all duration-200 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-900 text-slate-600 dark:text-yellow-400 border border-gray-200 dark:border-slate-800 transition-all duration-300 hover:ring-2 hover:ring-rose-500/50"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>

          <button className="hidden sm:block bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-all shadow-md active:scale-95">
            Donate Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 p-2 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-rose-500 rounded-lg font-medium"
            >
              {link.name}
            </a>
          ))}
          <button className="w-full mt-2 bg-rose-600 text-white py-3 rounded-lg font-bold">
            Donate Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;