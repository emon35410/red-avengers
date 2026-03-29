import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DonorEligibility = () => {
  const [weight, setWeight] = useState('');
  const [lastDonated, setLastDonated] = useState('');
  const [hasDonatedBefore, setHasDonatedBefore] = useState(false);
  const [isEligible, setIsEligible] = useState(null);
  // New state to track specific reasons and tips
  const [errorDetails, setErrorDetails] = useState({ reason: '', tip: '' });

  const checkEligibility = () => {
    const weightNum = parseFloat(weight);
    const monthsNum = parseFloat(lastDonated);

    // 1. Weight Check (Priority 1)
    if (!weightNum || weightNum < 50) {
      setIsEligible(false);
      setErrorDetails({
        reason: "Weight is below the required 50kg.",
        tip: "Consider a balanced diet rich in iron and proteins like spinach, red meat, or lentils to reach a healthy weight for donation."
      });
      return;
    }

    // 2. Donation Gap Check (Priority 2)
    if (hasDonatedBefore) {
      if (!monthsNum || monthsNum < 4) {
        setIsEligible(false);
        const remaining = 4 - (monthsNum || 0);
        setErrorDetails({
          reason: `Only ${monthsNum || 0} month(s) have passed since your last donation.`,
          tip: `Your body needs roughly 120 days to fully replenish red blood cells. Please wait at least ${remaining} more month(s).`
        });
        return;
      }
    }

    // 3. Eligible State
    setIsEligible(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f6] dark:bg-[#1a0e0e] py-16 px-6 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black italic mb-8 dark:text-white uppercase tracking-tighter">
          Donor <span className="text-[#ab2121]">Eligibility</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Requirements List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold dark:text-zinc-200">General Requirements</h3>
            <ul className="space-y-4">
              {[
                "Age between 18 and 65 years.",
                "Weight at least 50 kg (110 lbs).",
                "Last donation was at least 4 months ago."
              ].map((text, i) => (
                <li key={i} className="flex gap-3 items-center p-4 bg-white dark:bg-white/5 rounded-2xl border border-[#ab2121]/5 shadow-sm">
                  <span className="w-8 h-8 rounded-xl bg-[#ab2121]/10 text-[#ab2121] flex items-center justify-center text-sm font-black">{i+1}</span>
                  <span className="text-sm font-medium text-slate-600 dark:text-zinc-400">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility Quiz */}
          <div className="bg-white dark:bg-[#ab2121]/5 p-8 rounded-[2.5rem] border border-slate-200 dark:border-[#ab2121]/10 shadow-xl">
            <h3 className="text-lg font-black mb-6 dark:text-white uppercase italic">Quick Eligibility Check</h3>
            
            <div className="space-y-5">
              {/* Weight Input */}
              <div>
                <label className="text-[10px] font-black uppercase text-[#ab2121] ml-2">Your Weight (kg)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 65" 
                  className="w-full p-4 mt-1 rounded-2xl bg-slate-100 dark:bg-white/5 dark:text-white outline-none focus:ring-2 focus:ring-[#ab2121] transition-all" 
                  onChange={(e) => setWeight(e.target.value)} 
                />
              </div>

              {/* Checkbox for First-time donors */}
              <label className="flex items-center gap-3 cursor-pointer group p-2">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 accent-[#ab2121] rounded" 
                  onChange={(e) => {
                    setHasDonatedBefore(e.target.checked);
                    setIsEligible(null);
                  }}
                />
                <span className="text-sm font-bold dark:text-zinc-400 group-hover:text-[#ab2121] transition-colors">I have donated blood before</span>
              </label>

              {/* Conditional Input for Months */}
              <AnimatePresence>
                {hasDonatedBefore && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="text-[10px] font-black uppercase text-[#ab2121] ml-2">Months since last donation</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 5" 
                      className="w-full p-4 mt-1 rounded-2xl bg-slate-100 dark:bg-white/5 dark:text-white outline-none focus:ring-2 focus:ring-[#ab2121] transition-all" 
                      onChange={(e) => setLastDonated(e.target.value)} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={checkEligibility} 
                className="w-full bg-[#ab2121] text-white font-black py-4 rounded-2xl shadow-lg shadow-[#ab2121]/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs"
              >
                Verify Eligibility
              </button>
              
              {isEligible !== null && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  className={`p-6 rounded-3xl text-left flex flex-col gap-3 ${
                    isEligible ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-[#ab2121]/10 border border-[#ab2121]/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-3xl ${isEligible ? 'text-emerald-500' : 'text-[#ab2121]'}`}>
                      {isEligible ? 'verified_user' : 'cancel'}
                    </span>
                    <p className={`font-black uppercase tracking-tighter ${isEligible ? 'text-emerald-500' : 'text-[#ab2121]'}`}>
                      {isEligible ? "You're a Life Saver! Eligible to Donate." : "Currently Not Eligible."}
                    </p>
                  </div>

                  {/* Dynamic Reason and Tip Section */}
                  {!isEligible ? (
                    <div className="space-y-2 border-l-2 border-[#ab2121]/30 pl-4 ml-3">
                      <p className="text-[11px] font-bold dark:text-zinc-300">
                        <span className="text-[#ab2121] uppercase">Reason:</span> {errorDetails.reason}
                      </p>
                      <p className="text-[10px] font-medium text-slate-500 dark:text-zinc-500 italic">
                        <span className="text-[#ab2121] font-black not-italic uppercase">Health Tip:</span> {errorDetails.tip}
                      </p>
                    </div>
                  ) : (
                    <p className="text-[10px] font-bold text-emerald-600 ml-10">
                      Great! You meet the primary physical requirements. Feel free to find a request.
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorEligibility;