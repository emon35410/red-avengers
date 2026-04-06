import { useQuery } from '@tanstack/react-query';
// import { motion } from 'framer-motion';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import {  differenceInDays } from 'date-fns';

const BLOOD_COLORS = {
  'A+': 'from-rose-500 to-red-600', 'A-': 'from-red-400 to-rose-500',
  'B+': 'from-orange-500 to-red-500', 'B-': 'from-orange-400 to-orange-600',
  'AB+': 'from-purple-500 to-rose-600', 'AB-': 'from-purple-400 to-purple-600',
  'O+': 'from-red-600 to-rose-700', 'O-': 'from-red-500 to-red-700',
};

const BloodInventory = () => {
  const axiosPublic = useAxiosPublic();

  const { data: summary = [] } = useQuery({
    queryKey: ['inventory-summary'],
    queryFn: async () => {
      const res = await axiosPublic.get('/inventory');
      return res.data.data;
    }
  });

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['inventory-logs'],
    queryFn: async () => {
      const res = await axiosPublic.get('/inventory/logs');
      return res.data.data;
    }
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center dark:bg-zinc-950 text-rose-600 font-bold">LOADING...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black italic tracking-tighter dark:text-white">PUBLIC <span className="text-rose-600">INVENTORY</span></h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Verified Blood Stock Status</p>
        </div>

        {/* Stock Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-16">
          {summary.map((item) => (
            <div key={item._id} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-3xl text-center">
              <div className={`w-10 h-10 mx-auto rounded-xl bg-linear-to-br ${BLOOD_COLORS[item._id]} flex items-center justify-center mb-3 shadow-lg`}>
                <span className="text-white font-black text-xs">{item._id}</span>
              </div>
              <p className="text-2xl font-black dark:text-white">{item.totalBags}</p>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Units</span>
            </div>
          ))}
        </div>

        {/* Public Logs Table */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-800/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="px-8 py-5">Unit ID</th>
                  <th className="px-8 py-5">Group</th>
                  <th className="px-8 py-5">Volume</th>
                  <th className="px-8 py-5">Quality</th>
                  <th className="px-8 py-5">Expiry Status</th>
                  <th className="px-8 py-5">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                {logs.map((log) => {
                  const daysLeft = differenceInDays(new Date(log.expiryDate), new Date());
                  return (
                    <tr key={log._id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/40">
                      <td className="px-8 py-5 font-mono text-[10px] text-slate-400">#{log.unitId}</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1.5 rounded-lg bg-linear-to-br ${BLOOD_COLORS[log.bloodGroup]} text-white font-bold text-xs`}>
                          {log.bloodGroup}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-bold text-sm dark:text-slate-200">{log.volume || '450 ml'}</td>
                      <td className="px-8 py-5">
                        <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">✓ {log.quality || 'Verified'}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`text-xs font-bold ${daysLeft < 10 ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {daysLeft > 0 ? `${daysLeft} Days Left` : 'Expired'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-xs text-slate-500 font-medium">{log.location}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodInventory;