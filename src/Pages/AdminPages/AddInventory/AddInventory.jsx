import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Droplets, MapPin, Mail, User, Phone, Send, Loader2, Database } from 'lucide-react';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useTheme } from '../../../Layouts/BaseLayout';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

/* ── Optimized Input Field (Slightly Larger) ── */
const InputField = ({ label, icon: Icon, error, dark, ...props }) => (
    <div className="flex flex-col gap-2.5">
        <label className="text-[15px] font-extrabold text-rose-600 dark:text-rose-500 uppercase tracking-[0.25em] ml-1">
            {label}
        </label>
        <div className="relative group">
            {Icon && (
                <Icon className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors
                    ${dark ? 'text-slate-600 group-focus-within:text-rose-500' : 'text-slate-400 group-focus-within:text-rose-500'}`} 
                />
            )}
            <input
                className={`w-full ${Icon ? 'pl-14' : 'pl-6'} pr-6 py-5 rounded-[1.25rem] text-base font-medium transition-all duration-300 outline-none border
                    ${dark 
                        ? 'bg-[#0f0f1a] border-[#252538] text-slate-100 focus:border-rose-500/60 focus:ring-8 focus:ring-rose-500/5' 
                        : 'bg-white border-slate-200 text-slate-800 focus:border-rose-500/60 focus:ring-8 focus:ring-rose-500/10'
                    }
                    ${error ? 'border-rose-500/50 bg-rose-500/5' : ''}`}
                {...props}
            />
        </div>
        {error && <span className="text-[10px] text-rose-500 font-bold ml-2 uppercase tracking-wider">{error}</span>}
    </div>
);

const AddInventory = () => {
    const { dark } = useTheme();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();
    const [selectedBlood, setSelectedBlood] = useState('');
    const [bloodError, setBloodError] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const mutation = useMutation({
        mutationFn: (newUnit) => axiosPublic.post('/inventory/add', newUnit),
        onSuccess: (res) => {
            if (res.data.success) {
                queryClient.invalidateQueries(['inventory']);
                toast.success('System Updated Successfully');
                reset();
                setSelectedBlood('');
                setBloodError(false);
            }
        }
    });

    const onSubmit = (data) => {
        if (!selectedBlood) return setBloodError(true);
        mutation.mutate({ ...data, bloodGroup: selectedBlood });
    };

    return (
        <div className={`w-full py-5 transition-colors duration-200 ${dark ? 'text-slate-200' : 'text-slate-700'}`}>
            <div className="max-w-4xl mx-auto px-4">
                
                {/* ── Bolder Header ── */}
                <header className="mb-14">

                        <h1 className={`font-serif text-center  font-black text-3xl md:text-5xl  ${dark ? 'text-white' : 'text-slate-900'}`}>
                            Entry <span className="text-rose-600">Blood</span> Unit
                        </h1>   
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                    
                    {/* ── Section 01 ── */}
                    <div className={`p-10 rounded-[2.5rem] border-2 transition-all duration-300
                        ${dark ? 'bg-[#0f0f1a] border-[#1c1c2e]' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/40'}`}>
                        
                        <div className="flex items-center justify-between mb-10">
                             <span className="text-xs font-black  tracking-[0.4em] text-slate-400">01: Origin Identity</span>
                             <User className="w-5 h-5 opacity-30" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField
                                label="Donor Full Name"
                                icon={User}
                                dark={dark}
                                placeholder="Enter Donor Name"
                                error={errors.donorName?.message}
                                {...register('donorName', { required: 'Name is required' })}
                            />
                            <InputField
                                label="Donor Email"
                                icon={Mail}
                                type="email"
                                dark={dark}
                                placeholder="name@domain.com"
                                error={errors.donorEmail?.message}
                                {...register('donorEmail', { required: 'Email is required' })}
                            />
                            <div className="md:col-span-2">
                                <InputField
                                    label="Donor Phone Number"
                                    icon={Phone}
                                    dark={dark}
                                    placeholder="+880 XXX XXXXXX"
                                    {...register('donorPhone')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Section 02 ── */}
                    <div className={`p-10 rounded-[2.5rem] border-2 
                        ${dark ? 'bg-[#0f0f1a] border-[#1c1c2e]' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/40'}`}>
                        
                        <div className="flex items-center justify-between mb-10">
                             <span className="text-xs font-black  tracking-[0.4em] text-slate-400">02: Vital Statistics</span>
                             <Droplets className="w-5 h-5 opacity-30 text-rose-500" />
                        </div>

                        <div className="mb-10">
                            <label className="text-[15px] font-black text-rose-600 uppercase tracking-[0.3em] ml-1 mb-5 block">Blood Classification</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
                                {BLOOD_GROUPS.map((group) => (
                                    <button
                                        key={group}
                                        type="button"
                                        onClick={() => { setSelectedBlood(group); setBloodError(false); }}
                                        className={`py-5 rounded-2xl text-sm font-black transition-all border-2
                                            ${selectedBlood === group 
                                                ? 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-500/30 scale-105' 
                                                : dark 
                                                    ? 'bg-white/5 text-slate-400 border-transparent hover:border-slate-700' 
                                                    : 'bg-slate-50 text-slate-500 border-transparent hover:border-slate-200'
                                            }`}
                                    >
                                        {group}
                                    </button>
                                ))}
                            </div>
                            {bloodError && <span className="text-xs text-rose-500 font-bold mt-4 block uppercase tracking-widest animate-bounce">Please Select A Group</span>}
                        </div>

                        <InputField
                            label="Collection Facility / Location"
                            icon={MapPin}
                            dark={dark}
                            placeholder="Current Location Name"
                            error={errors.location?.message}
                            {...register('location', { required: 'Location data is required' })}
                        />
                    </div>

                    {/* ── Submission ── */}
                    <div className="pt-4 flex justify-center items-center">
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className={`w-lg py-3 rounded-4xl font-black  text-2xl
                                     transition-all duration-500 active:scale-[0.97] flex items-center justify-center gap-4
                                     ${dark 
                                        ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-2xl shadow-rose-900/40' 
                                        : 'bg-slate-900 text-white hover:bg-black shadow-2xl shadow-slate-300'
                                     } disabled:opacity-50`}
                        >
                            {mutation.isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Send className="w-6 h-6" />
                                    <span>Entry Register</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInventory;