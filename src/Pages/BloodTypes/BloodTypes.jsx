import React from 'react';

const BloodTypes = () => {
    const types = [
        { group: 'O-', give: 'All Groups (Universal Donor)', receive: 'O-' },
        { group: 'O+', give: 'O+, A+, B+, AB+', receive: 'O+, O-' },
        { group: 'A-', give: 'A-, A+, AB-, AB+', receive: 'A-, O-' },
        { group: 'A+', give: 'A+, AB+', receive: 'A+, A-, O+, O-' },
        { group: 'B-', give: 'B-, B+, AB-, AB+', receive: 'B-, O-' },
        { group: 'B+', give: 'B+, AB+', receive: 'B+, B-, O+, O-' },
        { group: 'AB-', give: 'AB-, AB+', receive: 'AB-, A-, B-, O-' },
        { group: 'AB+', give: 'AB+ Only', receive: 'All Groups (Universal Recipient)' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-16 px-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black italic mb-4 dark:text-white uppercase tracking-tighter">
                        Blood <span className="text-rose-600">Compatibility</span>
                    </h1>
                    <p className="text-slate-500 dark:text-zinc-500 font-bold text-xs uppercase tracking-[0.3em]">
                        Who can give and who can receive
                    </p>
                </div>

                {/* Compatibility Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {types.map((t) => (
                        <div 
                            key={t.group} 
                            className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 hover:border-rose-500 dark:hover:border-rose-600 transition-all duration-300 group shadow-sm hover:shadow-xl hover:shadow-rose-500/10 cursor-default"
                        >
                            {/* Icon/Group Badge */}
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-rose-500 to-red-700 flex items-center justify-center text-white font-black text-2xl mb-8 shadow-lg shadow-rose-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                {t.group}
                            </div>

                            {/* Info Section */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <p className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-widest">
                                            Can Give To
                                        </p>
                                    </div>
                                    <p className="text-md font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                        {t.give}
                                    </p>
                                </div>

                                <div className="pt-5 border-t border-slate-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                        <p className="text-[10px] font-black uppercase text-slate-400 dark:text-zinc-500 tracking-widest">
                                            Can Receive From
                                        </p>
                                    </div>
                                    <p className="text-md font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                        {t.receive}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Info/Footer */}
                <div className="mt-16 p-8 bg-rose-50 dark:bg-rose-950/20 rounded-4xl border border-rose-100 dark:border-rose-900/30 text-center">
                    <p className="text-sm text-rose-800 dark:text-rose-300 font-medium">
                        <strong>Universal Donor:</strong> O Negative (O-) units can be given to patients of any blood type. <br className="hidden md:block"/>
                        <strong>Universal Recipient:</strong> AB Positive (AB+) patients can receive blood from any blood type.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BloodTypes;