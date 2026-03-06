import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { Droplet, MapPin, Phone } from 'lucide-react';

const FindDonor = () => {
    const axiosPublic = useAxiosPublic();
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosPublic.get('/users')
            .then(res => {
                // শুধু যাদের role 'donor' তাদের ফিল্টার করে নেওয়া হচ্ছে
                const donorList = res.data.filter(user => user.role === 'donor' || user.isDonor === true);
                setDonors(donorList);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [axiosPublic]);

    if (loading) {
        return <div className="text-center py-20 text-rose-600 font-bold animate-pulse uppercase tracking-widest">Finding Life Savers...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black dark:text-white uppercase italic">Available <span className="text-rose-600">Donors</span></h2>
                <p className="text-slate-500 text-sm mt-2 font-medium">Found {donors.length} heroes ready to help.</p>
            </div>

            {donors.length === 0 ? (
                <div className="text-center text-slate-400 py-20">No donors found at the moment.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donors.map(donor => (
                        <div 
                            key={donor._id}
                            className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-xl hover:border-rose-500/50 transition-all group"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative">
                                    <img 
                                        src={donor.photoURL || 'https://via.placeholder.com/150'} 
                                        alt={donor.name} 
                                        className="w-16 h-16 rounded-2xl object-cover border-2 border-rose-500/20"
                                    />
                                    <div className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                                        {donor.bloodGroup}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 dark:text-white uppercase text-sm tracking-tight">{donor.name}</h3>
                                    <p className="text-[10px] text-rose-600 font-bold uppercase tracking-widest">Active Donor</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center text-xs text-slate-500 font-medium">
                                    <MapPin size={14} className="mr-2 text-slate-400" />
                                    {donor.upazila}, {donor.district}
                                </div>
                                <div className="flex items-center text-xs text-slate-500 font-medium">
                                    <Phone size={14} className="mr-2 text-slate-400" />
                                    {donor.phone || 'N/A'}
                                </div>
                            </div>

                            <a 
                                href={`tel:${donor.phone}`}
                                className="block w-full text-center py-3 bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-700 dark:text-slate-300 rounded-xl font-bold text-xs transition-all uppercase tracking-widest"
                            >
                                Call Now
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FindDonor;