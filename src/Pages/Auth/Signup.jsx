import React, { useEffect, useState } from 'react';
import { Lock, Mail, User, Eye, EyeOff, Droplet, Image as ImageIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SocialLogin from './SocialLogin';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { registerUser, updateUserProfile, setLoading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch('password');
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    // React Query mutation for saving user to database
    const { mutateAsync: saveUserToDB } = useMutation({
        mutationFn: async (userInfo) => {
            const { data } = await axiosPublic.post('/users', userInfo);
            return data;
        }
    });

    useEffect(() => {
        // ১. localStorage থেকে থিম চেক করে ডাইনামিকলি ক্লাস অ্যাড করা
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

            // Image upload to imgbb
            const formData = new FormData();
            formData.append('image', data.image[0]);
            const image_API_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Host_KEY}`;
            const imgRes = await axios.post(image_API_url, formData);
            const photoURL = imgRes.data.data.url;

            // Firebase auth registration
            const firebaseResult = await registerUser(data.email, data.password);
            const firebaseUID = firebaseResult.user.uid;

            // Update Profile
            await updateUserProfile({
                displayName: data.name,
                photoURL: photoURL
            });

            // Prepare user info structure
            const userInfo = {
                uid: firebaseUID,
                name: data.name,
                email: data.email,
                photoURL: photoURL,
                bloodGroup: data.blood_group,
                district: "",
                upazila: "",
                phone: "",
                role: 'user',
                status: 'active',
                createdAt: new Date()
            };

            // Save user info to database
            const dbResponse = await saveUserToDB(userInfo);

            if (dbResponse.insertedId || dbResponse.message === 'User already exists') {
                toast.success('Hero Account Created Successfully!');
                navigate(from, { replace: true });
            }

        } catch (error) {
            console.error("Signup Error:", error);
            const errorMessage = error.code === 'auth/email-already-in-use'
                ? "This hero is already registered!"
                : "Mission failed. Please try again.";

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-500 overflow-hidden relative font-sans p-6">
            
            {/* Background Aesthetic Glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/10 dark:bg-rose-600/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-500/10 dark:bg-rose-600/5 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-xl relative z-10">
                <div
                    data-aos="zoom-in"
                    className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/5 p-8 md:p-10"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center px-4 py-1.5 bg-rose-100 dark:bg-rose-500/10 rounded-full mb-6">
                            <Droplet className="w-4 h-4 text-rose-600 mr-2 animate-pulse" />
                            <span className="text-rose-600 font-black uppercase tracking-[0.2em] text-[10px]">Avengers Initiative</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter mb-2 uppercase">
                            Join <span className="text-rose-600">Forces</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 font-medium text-sm italic">Create your hero profile and start saving lives.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Name Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                                <input
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none transition text-slate-800 dark:text-white font-medium"
                                    placeholder="Enter your name"
                                />
                            </div>
                            {errors.name && <p className="text-rose-500 text-[10px] font-bold ml-2">{errors.name.message}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                                <input
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none transition text-slate-800 dark:text-white font-medium"
                                    placeholder="yourname@hero.com"
                                />
                            </div>
                            {errors.email && <p className="text-rose-500 text-[10px] font-bold ml-2">{errors.email.message}</p>}
                        </div>

                        {/* Blood Group & Photo Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Blood Group</label>
                                <div className="relative">
                                    <Droplet className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500 z-10" />
                                    <select
                                        {...register('blood_group', { required: 'Required' })}
                                        className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl appearance-none outline-none focus:border-rose-500 text-slate-700 dark:text-slate-200 font-semibold cursor-pointer transition-all"
                                    >
                                        <option value="" className="dark:bg-slate-900">Group</option>
                                        {bloodGroups.map(g => <option key={g} value={g} className="dark:bg-slate-900">{g}</option>)}
                                    </select>
                                </div>
                                {errors.blood_group && <p className="text-rose-500 text-[10px] font-bold ml-2">Required</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-2">Profile Photo</label>
                                <div className="relative group">
                                    <ImageIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                                    <input
                                        type="file"
                                        {...register('image', { required: 'Required' })}
                                        className="w-full pl-14 pr-4 py-3.5 bg-white dark:bg-slate-950/50 border border-dashed border-slate-300 dark:border-white/20 rounded-2xl file:hidden cursor-pointer text-slate-500 text-[11px] focus:border-rose-500 transition-all"
                                    />
                                </div>
                                {errors.image && <p className="text-rose-500 text-[10px] font-bold ml-2">Required</p>}
                            </div>
                        </div>

                        {/* Passwords Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: 'Required', minLength: { value: 6, message: 'Min 6 chars' } })}
                                    className="w-full pl-14 pr-12 py-4 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-rose-500 transition text-slate-800 dark:text-white"
                                    placeholder="Password"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                {errors.password && <p className="text-rose-500 text-[10px] font-bold ml-2">{errors.password.message}</p>}
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirm_password', {
                                        validate: v => v === password || 'No match'
                                    })}
                                    className="w-full pl-14 pr-12 py-4 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-rose-500 transition text-slate-800 dark:text-white"
                                    placeholder="Confirm"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-600">
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                {errors.confirm_password && <p className="text-rose-500 text-[10px] font-bold ml-2">{errors.confirm_password.message}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-4xl font-black tracking-[0.15em] text-lg shadow-xl shadow-rose-600/20 active:scale-[0.98] transition-all duration-300 mt-4 uppercase"
                        >
                            Sign Up Now
                        </button>
                    </form>
                    <SocialLogin></SocialLogin>

                    <div className="mt-8 text-center">
                        <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                            Already Have an Account?{' '}
                            <Link to="/login" className="text-rose-600 hover:text-rose-700 hover:underline font-black italic ml-1 uppercase transition-colors">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;