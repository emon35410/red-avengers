import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Droplet } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import AOS from 'aos';
import 'aos/dist/aos.css';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signInUser, setLoading } = useAuth();
    
    // Navigation helpers
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await signInUser(data.email, data.password);
            
            toast.success('Welcome Back, Hero!', {
                style: { background: '#1e293b', color: '#fff' }
            });
            
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            const message = error.code === 'auth/invalid-credential' 
                ? "Secret code or email doesn't match!" 
                : "Mission failed. Check your connection.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-2 py-5 transition-colors duration-500 overflow-hidden relative">
            
            {/* Ambient Glows (Eye Comfort) */}
            <div className="absolute top-0 left-0 w-125 h-125 bg-rose-600/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-125 h-125 bg-rose-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-lg relative z-10">
                <div 
                    data-aos="zoom-in" 
                    className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-rose-600/5 border border-slate-200 dark:border-white/5 p-8 md:p-12"
                >
                    {/* Header Section */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center px-4 py-1.5 bg-rose-100 dark:bg-rose-500/10 rounded-full mb-6">
                            <Droplet className="w-4 h-4 text-rose-600 mr-2 animate-bounce" />
                            <span className="text-rose-600 font-black uppercase tracking-[0.2em] text-[10px]">Secure Access</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white italic tracking-tighter mb-3 font-heading uppercase">
                            Hero <span className="text-rose-600">Login</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back! Ready to save some lives?</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        {/* Email Address */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                                <input
                                    type="email"
                                    {...register('email', { required: "Email is required" })}
                                    className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none transition text-slate-800 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    placeholder="yourname@hero.com"
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-[10px] font-bold ml-3">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                                <button type="button" className="text-[10px] font-bold text-rose-600 hover:underline uppercase tracking-tighter">Forgot Password?</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: "Password is required" })}
                                    className="w-full pl-14 pr-12 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/5 rounded-2xl outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition text-slate-800 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    placeholder="Enter secret code"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600 transition-colors">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-rose-500 text-[10px] font-bold ml-3">{errors.password.message}</p>}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-4xl font-heading font-black italic tracking-[0.15em] text-lg shadow-2xl shadow-rose-600/20 active:scale-[0.97] transition-all duration-500 mt-4 uppercase"
                        >
                            LOgIn
                        </button>
                    </form>

                    {/* Footer Link */}
                    <div className="mt-10 text-center">
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                            New to the Avengers?{' '}
                            <Link to="/signup" className="text-rose-600 hover:underline font-black italic ml-1">
                                CREATE ACCOUNT
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;