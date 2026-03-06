import logo from "../assets/Red-Avengers-logo.webp";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 px-6 border-t border-slate-200 dark:border-rose-900/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand & Mission */}
        <div className="col-span-1 md:col-span-1 group">
          <div className="relative h-24 w-24 md:h-32 md:w-32 flex items-center justify-center mb-4">
            <img
              src={logo}
              alt="Red Avengers Logo"
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110 brightness-100 dark:brightness-90 group-hover:dark:brightness-100"
            />
          </div>
          <p className="text-sm leading-relaxed mb-4">
            Empowering communities to save lives through seamless blood donation management. Every drop counts in the fight for life.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-4 uppercase text-xs tracking-widest">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Donor Eligibility</a></li>
            <li><a href="#" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Blood Types</a></li>
            <li><a href="#" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Success Stories</a></li>
            <li><a href="#" className="hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-4 uppercase text-xs tracking-widest">Emergency</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <span className="text-rose-600 font-bold">Hotline:</span>
              <span className="text-slate-800 dark:text-slate-300">1-800-RED-AVEN</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-rose-600 font-bold">Email:</span>
              <span className="text-slate-800 dark:text-slate-300">urgent@redavengers.org</span>
            </li>
            <li className="italic opacity-80">Available 24/7 for urgent requests</li>
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div>
          <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-4 uppercase text-xs tracking-widest">Newsletter</h3>
          <p className="text-xs mb-4">Get notified about blood camps in your area.</p>
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter email"
              className="bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-rose-600 transition-all text-slate-900 dark:text-white"
            />
            <button className="bg-rose-600 text-white py-2 rounded text-xs font-bold uppercase hover:bg-rose-700 active:scale-95 transition-all shadow-lg shadow-rose-600/20">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Area */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>&copy; {currentYear} RedAvengers Management. All rights reserved.</p>
        <p className="mt-2 md:mt-0 text-slate-500 italic">Built with care for donors worldwide.</p>
      </div>
    </footer>
  );
};

export default Footer;