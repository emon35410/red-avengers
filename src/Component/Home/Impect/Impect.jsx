import React, { useEffect } from 'react';
import { Users, Droplet, MapPin, Award, TrendingUp, Heart } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router';

export function Impect() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const stats = [
    {
      icon: Users,
      number: '12,547',
      label: 'Registered Heroes',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50/50 dark:bg-blue-500/10',
      iconColor: 'text-blue-600 dark:text-blue-400',
      trend: '+12%',
    },
    {
      icon: Droplet,
      number: '37,641',
      label: 'Total Donations',
      color: 'from-rose-500 to-red-600',
      bgColor: 'bg-rose-50/50 dark:bg-rose-500/10',
      iconColor: 'text-rose-600 dark:text-rose-400',
      trend: '+18%',
    },
    {
      icon: Heart,
      number: '112,923',
      label: 'Lives Saved',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50/50 dark:bg-pink-500/10',
      iconColor: 'text-pink-600 dark:text-pink-400',
      trend: '+25%',
    },
    {
      icon: MapPin,
      number: '156',
      label: 'Blood Camps Held',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50/50 dark:bg-green-500/10',
      iconColor: 'text-green-600 dark:text-green-400',
      trend: '+8%',
    },
    {
      icon: Award,
      number: '3,892',
      label: 'Active Volunteers',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50/50 dark:bg-purple-500/10',
      iconColor: 'text-purple-600 dark:text-purple-400',
      trend: '+15%',
    },
    {
      icon: TrendingUp,
      number: '98%',
      label: 'Success Rate',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50/50 dark:bg-orange-500/10',
      iconColor: 'text-orange-600 dark:text-orange-400',
      trend: '+2%',
    },
  ];

  return (
    <section className="py-14 bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 mb-6">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="text-rose-600 dark:text-rose-500 font-bold tracking-widest uppercase text-[15px]">
              Mission Impact
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-6 font-heading italic tracking-tighter">
            RED AVENGERS IN <span className="text-rose-600">NUMBERS</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Together, we're creating a powerful force for good. Every unit of blood 
            donated adds to this strategic scoreboard of life.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative group bg-slate-50/50 dark:bg-white/2 border p-5 border-slate-100 dark:border-white/5 0 rounded-4xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-rose-600/5 hover:-translate-y-1"
            >
              {/* Background Glow Effect */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-full blur-3xl transition-opacity duration-500`}></div>

              <div className="relative z-10">
                {/* Icon Container */}
                <div className={`${stat.bgColor} w-13 h-13 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>

                {/* Number & Trend */}
                <div className="flex items-end gap-3 mb-2">
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white font-heading tracking-tighter">
                    {stat.number}
                  </h4>
                  <div className="flex items-center text-emerald-500 text-xs font-bold mb-2">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </div>
                </div>

                {/* Label */}
                <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase text-xs">
                    {stat.label}
                </p>
              </div>

              {/* Bottom Decorative Indicator */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r ${stat.color} group-hover:w-full transition-all duration-700`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div 
          className="mt-24 relative p-5 md:p-12 bg-rose-600 rounded-[3rem] text-center text-white overflow-hidden shadow-2xl shadow-rose-600/20"
          data-aos="zoom-in"
        >
          {/* Decorative Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full"></div>
             <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-black mb-4 font-heading italic">RECRUITING NEW HEROES</h3>
            <p className="text-rose-100 mb-10 max-w-xl mx-auto font-light text-lg">
              Every donor is a tactical asset in our mission to save lives. 
              Will you answer the call today?
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/become-donor" className="bg-white text-rose-600 px-10 py-4 rounded-2xl font-black text-sm tracking-[0.2em] uppercase hover:bg-slate-50 transition-all active:scale-95 shadow-lg">
                JOIN THE SQUAD
              </Link>
              <Link to="/support" className="border-2 border-white/40 text-white px-10 py-4 rounded-2xl font-black text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition-all active:scale-95">
                DONATE NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}