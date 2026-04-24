import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'react-hot-toast';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { Shield, Users, Heart, UserCircle } from 'lucide-react';
import { auth } from '../../Firebase/Firebase.init';

const DemoLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // ইউজার যে পেজ থেকে এসেছে সেখানে পাঠানো, না থাকলে হোমপেজ
    const from = location.state?.from?.pathname || "/";

    const demoAccounts = [
        { role: 'Admin', email: 'admin@demo.com', color: '#ef4444', icon: <Shield size={20} /> },
        { role: 'Volunteer', email: 'volunteer@demo.com', color: '#f59e0b', icon: <Users size={20} /> },
        { role: 'Donor', email: 'donor@demo.com', color: '#3b82f6', icon: <Heart size={20} /> },
        { role: 'User', email: 'user@demo.com', color: '#10b981', icon: <UserCircle size={20} /> }
    ];

    const handleDemoLogin = async (email) => {
        const loadingToast = toast.loading("Authenticating demo access...");
        
        try {
            // ১. Firebase দিয়ে অথেন্টিকেশন (যাতে রিয়াল JWT টোকেন পাওয়া যায়)
            const result = await signInWithEmailAndPassword(auth, email, "password123");
            const user = result.user;

            // ২. টোকেন সংগ্রহ করে LocalStorage-এ রাখা (আপনার প্রোজেক্টের লজিক অনুযায়ী)
            const token = await user.getIdToken();
            localStorage.setItem('access-token', token);

            toast.success(`Access Granted: ${email}`, { id: loadingToast });

            // ৩. নির্দিষ্ট পাথে নেভিগেট করা
            navigate(from, { replace: true });
            
        } catch (error) {
            console.error("Demo login error:", error);
            toast.error("Access Denied! Make sure demo users exist in Firebase.", { id: loadingToast });
        }
    };

    return (
        <div className="mt-10 w-full max-w-md mx-auto px-4">
            {/* Divider with Text */}
            <div className="relative flex items-center py-5">
                <div className="grow border-t border-gray-300 dark:border-gray-700"></div>
                <span className="shrink mx-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Quick Access
                </span>
                <div className="grow border-t border-gray-300 dark:border-gray-700"></div>
            </div>

            {/* Container with Glassmorphism */}
            <div className="p-px bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-900 rounded-4xl shadow-2xl transition-all duration-500">
                <div className="bg-white dark:bg-[#0f172a] p-6 rounded-[31px] overflow-hidden relative">
                    
                    {/* Background Subtle Glow for Eye Comfort */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/10 dark:bg-red-500/5 blur-3xl rounded-full"></div>
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-full"></div>

                    <div className="relative">
                        <h3 className="text-gray-800 dark:text-gray-100 text-center font-bold text-xl mb-1">
                            Explore Red Avengers
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-center text-xs mb-6 font-medium">
                            Select a role to preview specific features
                        </p>

                        {/* 4-Role Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {demoAccounts.map((account) => (
                                <button
                                    key={account.role}
                                    onClick={() => handleDemoLogin(account.email)}
                                    className="group flex flex-col items-center justify-center p-4 
                                               bg-gray-50 dark:bg-gray-800/40 
                                               hover:bg-white dark:hover:bg-gray-800 
                                               border border-gray-200 dark:border-gray-700/50 
                                               hover:border-red-400 dark:hover:border-red-500/50
                                               rounded-2xl transition-all duration-300 
                                               hover:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.1)] 
                                               dark:hover:shadow-[0_10px_25px_-10px_rgba(239,68,68,0.1)]
                                               transform hover:-translate-y-1 active:scale-95"
                                >
                                    <div 
                                        className="p-2.5 rounded-xl mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm"
                                        style={{ 
                                            backgroundColor: `${account.color}15`, 
                                            color: account.color 
                                        }}
                                    >
                                        {account.icon}
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-200 text-sm font-bold tracking-tight">
                                        {account.role}
                                    </span>
                                    <span className="text-gray-400 dark:text-gray-500 text-[9px] mt-1 font-medium uppercase">
                                        Read-Only
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Restricted Notice Footer */}
                        <div className="mt-6 flex items-start gap-3 p-3 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl">
                            <span className="text-red-500 text-sm">🛡️</span>
                            <p className="text-[10px] text-red-700/80 dark:text-red-400/80 leading-relaxed font-medium italic">
                                Note: Adding, updating, or deleting data is blocked for these demo accounts to ensure data safety.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemoLogin;