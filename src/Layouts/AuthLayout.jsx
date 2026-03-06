import React from 'react';
import { Link, Outlet } from 'react-router';
import logo from "../assets/Red-Avengers-logo.webp";

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 flex flex-col">
            
            {/* Header / Navbar Section */}
            <header className="w-full border-b border-slate-100 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                    
                    {/* Logo & Brand */}
                    <Link 
                        to="/" 
                        className="group flex items-center gap-3 transition-all active:scale-95"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-rose-600/10 blur-lg rounded-full group-hover:bg-rose-600/30 transition-all"></div>
                            <img
                                src={logo}
                                alt="Red Avengers Logo"
                                className="h-12 md:h-14 w-auto object-contain relative z-10 drop-shadow-sm"
                            />
                        </div>

                        <div className="flex flex-col -space-y-1">
                            <span className="text-xl md:text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
                                Red<span className="text-rose-600">Avengers</span>
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 pl-0.5">
                                Blood Initiative
                            </span>
                        </div>
                    </Link>

                    {/* Right Side - Optional Link */}
                    <div className="hidden sm:block">
                        <Link 
                            to="/" 
                            className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-rose-600 transition-colors uppercase tracking-widest"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content (Login/Signup) */}
            <main className="grow flex items-center justify-center relative overflow-hidden py-10">
                {/* Background Ambient Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-[10%] right-[-10%] w-75 md:w-150 h-75 md:h-150 bg-rose-600/5 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[10%] left-[-10%] w-75 md:w-150 h-75 md:h-150 bg-rose-600/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 w-full">
                    <Outlet />
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="py-6 border-t border-slate-100 dark:border-white/5 text-center bg-slate-50/50 dark:bg-slate-950/50">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">
                    Saving Lives Since 2026 • Red Avengers
                </p>
            </footer>
        </div>
    );
};

export default AuthLayout;