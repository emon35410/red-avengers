import React from 'react';
import { Shield } from 'lucide-react';

const EligibilitySection = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Container */}
        <div 
          data-aos="fade-up"
          className="bg-slate-50 dark:bg-white/2 rounded-4xl p-8 lg:p-14 border border-slate-200 dark:border-white/5 relative overflow-hidden"
        >
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-transparent via-rose-600 to-transparent"></div>

          {/* Header */}
          <div className="flex flex-col items-center justify-center gap-4 mb-14" data-aos="zoom-in" data-aos-delay="200">
            <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-2xl shadow-inner">
              <Shield className="h-10 w-10 text-rose-600" />
            </div>
            <h3 className="font-heading text-3xl md:text-4xl font-black text-slate-900 dark:text-white text-center italic tracking-tighter">
              HERO ELIGIBILITY <span className="text-rose-600">CRITERIA</span>
            </h3>
          </div>

          {/* Criteria Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: '18-65', label: 'Years Old', icon: '🎂' },
              { value: '50kg+', label: 'Min. Weight', icon: '⚖️' },
              { value: 'Good', label: 'Health Status', icon: '💪' },
              { value: '3 Months', label: 'Gap Period', icon: '📅' },
            ].map((req, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="group relative text-center p-8 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-rose-500/30 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-500">{req.icon}</div>
                <div className="text-3xl font-black text-rose-600 font-heading mb-1">{req.value}</div>
                <div className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">{req.label}</div>
                
                {/* Subtle Indicator */}
                <div className="mt-4 w-6 h-1 bg-slate-200 dark:bg-white/10 mx-auto rounded-full group-hover:w-12 group-hover:bg-rose-600 transition-all"></div>
              </div>
            ))}
          </div>

          {/* Disclaimer / Note */}
          <div 
            data-aos="fade-right" 
            data-aos-delay="600"
            className="mt-12 p-6 bg-blue-50/50 dark:bg-blue-500/5 border-l-4 border-blue-600 rounded-2xl flex items-center gap-4"
          >
            <div className="hidden sm:block text-2xl">ℹ️</div>
            <p className="text-sm text-slate-700 dark:text-blue-200 leading-relaxed font-medium">
              <strong className="text-blue-700 dark:text-blue-400 uppercase tracking-tighter mr-2">Mission Note:</strong> 
              Additional health screening will be conducted before donation. Consult with our medical team if you have specific health concerns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;