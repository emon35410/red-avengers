import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Send, Activity, ShieldAlert, Rocket } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useTheme } from '../../../Layouts/BaseLayout';

const AddCamp = () => {
    const { user } = useAuth();
    const { dark } = useTheme();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const mutation = useMutation({
        mutationFn: async (newCamp) => {
            const res = await axiosPublic.post('/camps', newCamp);
            return res.data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                queryClient.invalidateQueries(['camps']);
                toast.success("Mission Launched!", {
                    style: {
                        borderRadius: '15px',
                        background: dark ? '#0f172a' : '#fff',
                        color: dark ? '#fff' : '#0f172a',
                        border: `1px solid ${dark ? 'rgba(225, 29, 72, 0.2)' : '#e2e8f0'}`
                    }
                });
                reset();
            }
        },
        onError: () => {
            toast.error("Deployment Failed!");
        }
    });

    const onSubmit = (data) => {
        const campData = {
            ...data,
            adminEmail: user?.email,
            adminName: user?.displayName,
            registeredDonors: [],
            createdAt: new Date()
        };
        mutation.mutate(campData);
    };

    /* ── Updated Eye-Comfort Styles ── */
    const inputClasses = `w-full px-6 py-4 rounded-2xl outline-none border-2 transition-all duration-300 font-bold text-sm
        ${dark
            ? 'bg-[#0b0b14] border-[#1c1c2e] text-slate-100 placeholder:text-slate-700 focus:border-rose-500/50 focus:bg-[#0f0f1a]'
            : 'bg-slate-50 border-slate-100 text-slate-800 placeholder:text-slate-300 focus:border-rose-400 focus:bg-white shadow-inner'}`;

    const labelClasses = "text-[15px] font-black text-rose-600/80 dark:text-rose-500/70 ml-1 mb-2 block";

    return (
        <div className={`w-full py-10 transition-colors duration-500`}>
            <div className="max-w-4xl mx-auto px-4">

                {/* ── Header ── */}
                <div className="mb-5 flex items-center justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-rose-500/10">
                            <Rocket className="w-5 h-5 text-rose-500" />
                        </div>
                        <h1 className={`text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none ${dark ? 'text-white' : 'text-slate-900'}`}>
                            Add <span className="text-rose-600">New Camp</span>
                        </h1>
                    </div>

                </div>

                {/* ── Form Container ── */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 py-12 transition-all duration-500 border-t 
                               ${dark ? 'border-white/5' : 'border-slate-100'}`}
                >
                    {/* Mission Title */}
                    <div className="md:col-span-2 space-y-1">
                        <label className={labelClasses}>Mission Title</label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            className={inputClasses}
                            placeholder="OPERATIONAL NAME..."
                        />
                        {errors.title && <span className="text-[10px] text-rose-500 font-bold ml-1 uppercase">{errors.title.message}</span>}
                    </div>

                    {/* Organizer */}
                    <div className="space-y-1">
                        <label className={labelClasses}>Organizer Name</label>
                        <input {...register("organizer", { required: true })}
                         className={inputClasses}
                          placeholder="ORGANIZER NAME" />
                    </div>

                    {/* Status Select */}
                    <div className="space-y-1">
                        <label className={labelClasses}>Priority Level</label>
                        <select {...register("status")} className={`${inputClasses} cursor-pointer uppercase tracking-widest text-[11px]`}>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Regular">Regular</option>
                            <option value="Urgent">Urgent Alert</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div className="space-y-1">
                        <label className={labelClasses}>Starting Date</label>
                        <input {...register("date", { required: true })} type="date" className={inputClasses} />
                    </div>

                    {/* Time Frame */}
                    <div className="space-y-1">
                        <label className={labelClasses}>Time Window</label>
                        <input {...register("time", { required: true })} className={inputClasses} placeholder="08:00 AM - 04:00 PM" />
                    </div>

                    {/* District */}
                    <div className="space-y-1">
                        <label className={labelClasses}>District</label>
                        <input {...register("district", { required: true })} className={inputClasses} placeholder="SYLHET" />
                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                        <label className={labelClasses}>Location </label>
                        <input {...register("location", { required: true })} className={inputClasses} placeholder="VENUE NAME" />
                    </div>
                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-center items-center pt-10">
                        <button
                            disabled={mutation.isPending}
                            type="submit"
                            className={`w-lg py-4 rounded-4xl font-black  text-[12px] transition-all active:scale-[0.98] flex items-center justify-center gap-4
                                ${dark
                                    ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-[0_10px_30px_rgba(225,29,72,0.2)]'
                                    : 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200'} 
                                disabled:opacity-50`}
                        >
                            {mutation.isPending ? "AUTHORIZING..." : "SUBMIT CAMP"}
                            <Send className={`w-4 h-4 ${mutation.isPending ? 'animate-pulse' : ''}`} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCamp;