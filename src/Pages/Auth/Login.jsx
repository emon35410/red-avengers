import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Droplet } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from './SocialLogin';
import DemoLogin from './DemoLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signInUser, setLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        AOS.init({ duration: 1000, once: true });
    }, []);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await signInUser(data.email, data.password);
            toast.success('Welcome Back, Hero!', {
                style: { background: '#1e293b', color: '#fff', borderRadius: '15px' }
            });
            setTimeout(() => navigate(from, { replace: true }), 100);
        } catch (error) {
            toast.error(error.message || 'Login failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#080c14] flex items-center justify-center p-4 py-16 transition-colors duration-700 relative overflow-hidden font-sans">
            
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-lg relative z-10">
                <div
                    data-aos="fade-up"
                    className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-3xl rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/20 dark:border-white/5 p-8 md:p-14"
                >
                    {/* Brand Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center px-4 py-2 bg-rose-50 dark:bg-rose-500/5 rounded-2xl mb-6 border border-rose-100 dark:border-rose-500/10">
                            <Droplet className="w-4 h-4 text-rose-600 mr-2 fill-rose-600 animate-pulse" />
                            <span className="text-rose-600 font-black uppercase tracking-[0.25em] text-[9px]">Hero Identity</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter mb-4 uppercase">
                            Red <span className="text-rose-600 drop-shadow-sm">Avengers</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Sign in to manage your lifesaving missions</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4">Access Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-all duration-300" />
                                <input
                                    type="email"
                                    {...register('email', { required: "Identity required" })}
                                    className="w-full pl-16 pr-6 py-5 bg-slate-100/50 dark:bg-slate-950/40 border-none rounded-[1.8rem] focus:ring-2 focus:ring-rose-500/20 outline-none transition-all text-slate-800 dark:text-white font-semibold placeholder:text-slate-400/70"
                                    placeholder="hero@nexus.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Security Code</label>
                                <button type="button" className="text-[9px] font-black text-rose-600/70 hover:text-rose-600 uppercase transition-colors">Recover</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-all duration-300" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: "Code required" })}
                                    className="w-full pl-16 pr-14 py-5 bg-slate-100/50 dark:bg-slate-950/40 border-none rounded-[1.8rem] focus:ring-2 focus:ring-rose-500/20 outline-none transition-all text-slate-800 dark:text-white font-semibold placeholder:text-slate-400/70"
                                    placeholder="••••••••"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600 transition-colors">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-5 rounded-4xl font-black italic tracking-widest text-lg shadow-xl shadow-rose-600/20 hover:shadow-rose-600/40 active:scale-[0.96] transition-all duration-500 uppercase"
                        >
                            Log In Here
                        </button>
                    </form>

                    {/* Social Login Integrated inside card */}
                    <SocialLogin />

                    {/* Signup Footer */}
                    <div className="mt-10 text-center">
                        <p className="text-slate-400 dark:text-slate-500 font-bold text-[11px] uppercase tracking-tighter">
                            Don't have an account? 
                            <Link to="/signup" className="text-rose-600 hover:text-rose-500 ml-2 font-black italic tracking-widest">
                                Sign Up Now
                            </Link>
                        </p>
                    </div>
                </div>
                <DemoLogin />
            </div>
        </div>
    );
};

export default Login;