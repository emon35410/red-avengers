import React, { useState, useEffect, useRef } from 'react';
import logo from "../assets/Red-Avengers-logo.webp";
import { Link, NavLink } from 'react-router'; // NavLink add kora hoyeche
import useAuth from '../Hooks/useAuth';
import { LayoutDashboard, LogOut, Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    { name: 'Blood Inventory', href: '/inventory' },
    { name: 'Emergency Request', href: '/emergency' },
    { name: 'Support Us', href: '/support' },
  ];

  const handleLogOut = () => {
    logOut()
      .then(() => setIsProfileOpen(false))
      .catch(error => console.log(error));
  };

  // Active Link Styling Function
  const getLinkStyles = ({ isActive }) => `
    relative px-4 py-2 rounded-xl text-xs font-black uppercase 
    ${isActive 
      ? "text-rose-600 dark:text-rose-500 bg-rose-500/10 shadow-[0_0_25px_rgba(225,29,72,0.15)] ring-1 ring-rose-500/20" 
      : "text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-500/5"
    }
  `;

  return (
    <nav className="bg-white/80 dark:bg-[#06060e]/80 border-b border-slate-200 dark:border-rose-900/20 px-4 py-3 sticky top-0 z-50 backdrop-blur-md transition-colors duration-500 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* --- Logo Section --- */}
        <Link to="/" className="flex items-center gap-3 group active:scale-95 transition-transform">
          <div className="relative h-10 w-10 md:h-12 md:w-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-rose-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={logo}
              alt="Logo"
              className="relative h-full w-full object-contain transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-rose-600 dark:text-rose-500 font-black tracking-tighter text-lg leading-none italic uppercase">
              Red <span className="text-green-600 dark:text-white transition-colors">Avengers</span>
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">

          {/* --- Desktop Navigation --- */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.href} className={getLinkStyles}>
                {({ isActive }) => (
                  <>
                    {link.name}
                    {/* Active Underglow Dot */}
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-600 transition-all duration-500
                      ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-40"}`} 
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* --- Theme Toggle --- */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-[#0c0c14] text-slate-600 dark:text-rose-500 border border-slate-200 dark:border-zinc-800/50 transition-all hover:ring-2 hover:ring-rose-500/30"
          >
            {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>

          {/* --- User Auth Section --- */}
          {user ? (
            <div className="flex items-center gap-3 relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative focus:outline-none"
              >
                <div className="h-10 w-10 rounded-2xl p-0.5 bg-linear-to-tr from-rose-600 to-rose-400 shadow-lg shadow-rose-500/20 active:scale-90 transition-transform">
                  <img
                    src={user?.photoURL || defaultAvatar}
                    alt="User"
                    className="h-full w-full rounded-[14px] object-cover border-2 border-white dark:border-[#06060e]"
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute top-14 right-0 w-56 bg-white dark:bg-[#0c0c14] border border-slate-200 dark:border-rose-900/20 rounded-3xl shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="px-5 py-3 border-b border-slate-100 dark:border-zinc-800/50 mb-2">
                    <p className="text-sm font-black text-slate-800 dark:text-white truncate uppercase tracking-tight">
                      {user?.displayName || "Avenger"}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 truncate mt-0.5">{user?.email}</p>
                  </div>

                  <div className="px-2 space-y-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-[11px] font-black text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-500/5 rounded-xl transition-all uppercase tracking-widest"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all uppercase tracking-widest text-left"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center justify-center px-7 py-2.5 rounded-2xl text-[11px] font-black italic tracking-[0.15em] uppercase bg-slate-900 dark:bg-rose-600 text-white hover:shadow-[0_10px_20px_rgba(225,29,72,0.2)] transition-all active:scale-95"
            >
              Login
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-[#0c0c14] border border-transparent dark:border-zinc-800/50"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-white dark:bg-[#0c0c14] rounded-3xl border border-slate-200 dark:border-rose-900/20 p-4 shadow-2xl animate-in slide-in-from-top-5">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `
                  block px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all
                  ${isActive ? "text-rose-600 bg-rose-500/10" : "text-slate-600 dark:text-slate-400"}
                `}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          {!user && (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 w-full block bg-rose-600 text-white py-4 rounded-2xl text-center font-black italic uppercase tracking-[0.2em] shadow-lg shadow-rose-500/20"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;