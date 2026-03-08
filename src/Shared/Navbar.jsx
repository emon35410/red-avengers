import React, { useState, useEffect, useRef } from 'react';
import logo from "../assets/Red-Avengers-logo.webp";
import { Link } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { LayoutDashboard, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, logOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || !('theme' in localStorage);
  });
  const defaultAvatar = "https://ui-avatars.com/api/?name=Avenger&background=e11d48&color=fff";
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


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Find Donors', href: '/finddonor' },
    { name: 'Donation Camps', href: '/camps' },
    { name: 'Blood Inventory', href: '#inventory' },
    { name: 'Emergency Request', href: '#emergency' },
    { name: 'Support Us', href: '/support' },
  ];

  const handleLogOut = () => {
    logOut()
      .then(() => setIsProfileOpen(false))
      .catch(error => console.log(error));
  };

  return (
    <nav className="bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-rose-900/30 px-4 py-3 sticky top-0 z-50 shadow-lg transition-colors duration-500 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative h-10 w-10 md:h-14 md:w-14 flex items-center justify-center">
            <img
              src={logo}
              alt="Red Avengers Logo"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-red-600 font-black tracking-tighter text-lg leading-none italic group-hover:text-rose-500 transition-colors uppercase">
              Red <span className="text-green-600">Avengers</span>
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1 md:gap-5">

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 mr-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-3 py-2 rounded-md text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 transition-all duration-200 text-sm font-bold uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-yellow-400 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:ring-2 hover:ring-rose-500/50"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="flex items-center gap-3 relative" ref={profileRef}>
              {/* User Profile Image as Button */}
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative group focus:outline-none"
              >
                <div className="h-10 w-10 md:h-11 md:w-11 rounded-full p-0.5 bg-linear-to-tr from-rose-600 to-red-400 transition-transform active:scale-90">
                  <img
                    src={user?.photoURL || defaultAvatar}
                    alt="User"
                    onError={(e) => { e.targest.src = defaultAvatar; }} 
                    className="h-full w-full rounded-full object-cover border-2 border-white dark:border-slate-950"
                  />
                </div>
              </button>

              {/* USER DROPDOWN MENU */}
              {isProfileOpen && (
                <div className="absolute top-14 right-0 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-rose-900/30 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">

                  {/* user info in dropdown */}
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate italic">
                      {user?.displayName || "Avenger"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 px-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-500/5 rounded-xl transition-all uppercase "
                    >
                      <span className="text-lg"><LayoutDashboard></LayoutDashboard></span>
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/5 rounded-xl transition-all uppercase  text-left"
                    >
                      <span className="text-lg"><LogOut></LogOut></span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block px-6 py-2.5 rounded-full text-sm font-black italic tracking-widest uppercase bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all active:scale-95 shadow-xl shadow-slate-900/10"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
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

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl font-bold uppercase tracking-wider transition-all"
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3.5 rounded-xl text-center font-black italic uppercase tracking-[0.2em]"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;