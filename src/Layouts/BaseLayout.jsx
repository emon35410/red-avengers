import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router"; 
import {
  Droplet, LogOut, Bell, Sun, Moon, Menu, X,
  CheckCheck, Info, AlertTriangle, Clock, Trash2, ChevronRight
} from "lucide-react";
import useAuth from "../Hooks/useAuth";
import logo from "../assets/Red-Avengers-logo.webp";
import { useTheme } from "../Context/ThemeContext ";
import { io } from "socket.io-client";

// Socket connection
const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");

const NOTIF_STYLE = {
  info:     { icon: <Info size={13} />,         dot: "bg-sky-400",     iconBg: "bg-sky-500/10 text-sky-400",         border: "border-sky-500/20"      },
  success: { icon: <CheckCheck size={13} />,    dot: "bg-emerald-400", iconBg: "bg-emerald-500/10 text-emerald-400", border: "border-emerald-500/20" },
  warning: { icon: <AlertTriangle size={13} />, dot: "bg-amber-400",   iconBg: "bg-amber-500/10 text-amber-400",     border: "border-amber-500/20"    },
};

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// --- Notification Panel Component ---
const NotificationPanel = ({ dark, onClose, notifications, onMarkRead, onMarkAllRead, onDelete }) => {
  const unread = notifications.filter(n => !n.read).length;
  const navigate = useNavigate();

  return (
    <div className={`absolute right-0 top-12 w-96 rounded-2xl border shadow-2xl overflow-hidden z-50
      ${dark ? "bg-[#0e0e1a] border-zinc-800 shadow-black/60" : "bg-white border-slate-200 shadow-slate-200/80"}`}>
      <div className={`flex items-center justify-between px-5 py-4 border-b ${dark ? "border-zinc-800" : "border-slate-100"}`}>
        <div className="flex items-center gap-2.5">
          <span className={`text-sm font-black ${dark ? "text-white" : "text-slate-800"}`}>Notifications</span>
          {unread > 0 && <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-black rounded-full">{unread}</span>}
        </div>
        <div className="flex items-center gap-2">
          {notifications.length > 0 && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Bubbling থামানোর জন্য
                onMarkAllRead();
              }} 
              className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all
                ${dark ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"}`}>
              Mark all read
            </button>
          )}
          <button onClick={onClose} className={`p-1.5 rounded-lg transition-all ${dark ? "text-zinc-500 hover:bg-zinc-800" : "text-slate-400 hover:bg-slate-100"}`}>
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="max-h-105 overflow-y-auto divide-y divide-zinc-800/40">
        {notifications.length === 0 ? (
          <div className="py-16 text-center">
            <Bell size={28} className={`mx-auto mb-3 ${dark ? "text-zinc-700" : "text-slate-300"}`} />
            <p className={`text-sm font-bold ${dark ? "text-zinc-600" : "text-slate-400"}`}>All caught up!</p>
          </div>
        ) : (
          notifications.map(n => {
            const s = NOTIF_STYLE[n.type] || NOTIF_STYLE.info;
            return (
              <div 
                key={n.id} 
                onClick={() => {
                  onMarkRead(n.id);
                  if (n.link) {
                    navigate(n.link);
                    onClose();
                  }
                }}
                className={`flex items-start gap-4 px-5 py-4 cursor-pointer transition-all group
                  ${!n.read
                    ? dark ? "bg-zinc-900/60 hover:bg-zinc-800/60" : "bg-slate-50 hover:bg-slate-100"
                    : dark ? "hover:bg-zinc-900/40"                 : "hover:bg-slate-50"}`}>
                <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center border mt-0.5 ${s.iconBg} ${s.border}`}>{s.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-xs font-bold truncate ${dark ? "text-zinc-100" : "text-slate-700"}`}>{n.title}</p>
                    {!n.read && <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${s.dot}`} />}
                  </div>
                  <p className={`text-[11px] leading-relaxed ${dark ? "text-zinc-500" : "text-slate-400"}`}>{n.desc}</p>
                  <p className={`text-[10px] font-bold mt-1.5 flex items-center gap-1 ${dark ? "text-zinc-600" : "text-slate-400"}`}>
                    <Clock size={9} /> {n.time}
                  </p>
                </div>
                <button onClick={e => { e.stopPropagation(); onDelete(n.id); }}
                  className={`shrink-0 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all
                    ${dark ? "text-zinc-600 hover:text-rose-400 hover:bg-rose-500/10" : "text-slate-300 hover:text-rose-500 hover:bg-rose-50"}`}>
                  <Trash2 size={12} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// --- NavItem and SidebarNav Components ---
const NavItem = ({ to, icon: Icon, label, badge, dark }) => (
  <NavLink to={to} end={to === "/dashboard"} className={({ isActive }) => `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 relative ${isActive ? "bg-rose-600/15 text-rose-400 border border-rose-500/20" : `border border-transparent ${dark ? "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800/70" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}`}>
    {({ isActive }) => (
      <><span className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-rose-400" : ""}`}><Icon size={17} /></span>
      <span className="flex-1 tracking-tight">{label}</span>
      {badge && <span className={`shrink-0 text-[9px] font-black px-1.5 py-0.5 rounded-md ${badge === "New" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/20 text-rose-400 border border-rose-500/20"}`}>{badge}</span>}</>
    )}
  </NavLink>
);

const SidebarNav = ({ navSections, dark }) => (
  <div className="space-y-6">{navSections.map((section, index) => (<div key={section.label || index}><p className={`px-3 mb-2 text-[9px] font-black uppercase tracking-[0.25em] ${dark ? "text-zinc-600" : "text-slate-400"}`}>{section.label}</p><div className="space-y-0.5">{section.items.map((item) => (<NavItem key={item.to} {...item} dark={dark} />))}</div></div>))}</div>
);

// --- MAIN LAYOUT ---
export default function BaseLayout({ navSections = [], roleLabel = "User" }) {
  const { dark, toggleTheme } = useTheme();
  const { user, logOut } = useAuth();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);
  
  const [notifications, setNotifications] = useState(() => {
    if (!user?.email) return [];
    const saved = localStorage.getItem(`notifs_${user.email}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const notifRef  = useRef(null);
  const navigate  = useNavigate();
  const now       = useClock();

  // ১. নোটিফিকেশন পরিবর্তন হলে LocalStorage-এ আপডেট করা
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`notifs_${user.email}`, JSON.stringify(notifications));
    }
  }, [notifications, user?.email]);

  // ২. Socket Logic
  useEffect(() => {
    if (user?.email) {
      socket.emit('join_room', user.email);
    }

    socket.on('new_blood_request', (data) => {
      const isAdmin = roleLabel === "Admin";
      if (!isAdmin && data.senderEmail === user?.email) return;

      const newNotif = {
        id: Date.now(),
        type: data.type || "info",
        title: data.title,
        desc: data.desc,
        link: data.link,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      setNotifications(prev => [newNotif, ...prev]);
    });

    return () => socket.off('new_blood_request');
  }, [user?.email, roleLabel]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = e => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout      = async () => { await logOut(); navigate("/"); };
  const handleMarkRead    = id  => setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  
  // সংশোধিত ফাংশন: যা সরাসরি updated ডাটা সেভ করবে
  const handleMarkAllRead = () => {
    setNotifications(prevNotifications => {
      const updated = prevNotifications.map(n => ({ ...n, read: true }));
      if (user?.email) {
        localStorage.setItem(`notifs_${user.email}`, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleDelete      = id  => setNotifications(ns => ns.filter(n => n.id !== id));

  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

  return (
      <div className={`flex h-screen overflow-hidden transition-colors duration-300 font-sans ${dark ? "bg-[#06060e]" : "bg-slate-50"}`}>
        {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden" onClick={() => setSidebarOpen(false)} />}

        <aside className={`fixed xl:static inset-y-0 left-0 z-50 w-64 flex flex-col border-r transition-transform duration-300 ${dark ? "bg-[#0c0c14] border-zinc-800/50" : "bg-white border-slate-200"} ${sidebarOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}`}>
          <div className={`px-6 py-8 border-b flex items-center justify-between transition-all ${dark ? "border-zinc-800/40" : "border-slate-100"}`}>
            <Link to="/" className="flex items-center gap-3.5 group cursor-pointer outline-none">
                <div className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:rotate-10 group-hover:scale-110 ${dark ? "bg-linear-to-br from-rose-500 to-rose-700 shadow-lg shadow-rose-900/20" : "bg-rose-600 shadow-lg shadow-rose-200"}`}>
                  <img src={logo} alt="Logo" className="w-7 h-7 object-contain brightness-0 invert" />
                </div>
              <p className="text-sm font-black text-red-500 uppercase">RED <span className="text-green-500 italic">AVENGERS</span></p>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="xl:hidden p-2 rounded-xl"><X size={20} /></button>
          </div>

          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <p className={`px-3 mb-5 text-[9px] font-black uppercase tracking-[0.25em] ${dark ? "text-zinc-600" : "text-slate-400"}`}>{roleLabel} Menu</p>
            <SidebarNav navSections={navSections} dark={dark} />
          </nav>

          <div className={`p-4 border-t ${dark ? "border-zinc-800/50" : "border-slate-100"}`}>
            <div className="flex items-center gap-3 p-2">
              <img src={user?.photoURL || "https://avatar.iran.liara.run/public"} className="w-9 h-9 rounded-lg border object-cover" alt="avatar" />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold truncate ${dark ? "text-zinc-200" : "text-slate-700"}`}>{user?.displayName || "Member"}</p>
                <button onClick={handleLogout} className="text-[10px] text-rose-500 font-bold flex items-center gap-1"><LogOut size={10} /> Logout</button>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <header className={`shrink-0 border-b backdrop-blur-md z-40 ${dark ? "bg-[#0c0c14]/90 border-zinc-800/50" : "bg-white/90 border-slate-200"}`}>
            <div className="flex items-center justify-between px-4 xl:px-8 h-16 gap-4">
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(true)} className="xl:hidden p-2 rounded-lg border border-slate-200 text-slate-500"><Menu size={18} /></button>
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${dark ? "bg-zinc-900/60 border-zinc-800" : "bg-slate-50 border-slate-200"}`}>
                  <Clock size={14} className="text-rose-500" />
                  <div className="hidden sm:block text-left">
                    <p className={`text-sm font-black tabular-nums leading-none tracking-tight ${dark ? "text-white" : "text-slate-800"}`}>{timeStr}</p>
                    <p className={`text-[10px] font-bold leading-none mt-0.5 ${dark ? "text-zinc-500" : "text-slate-400"}`}>{dateStr}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button onClick={toggleTheme} className={`w-10 h-10 rounded-xl border flex items-center justify-center ${dark ? "bg-zinc-800 border-zinc-700 text-amber-400" : "bg-slate-100 border-slate-200 text-slate-500"}`}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
                <div className="relative" ref={notifRef}>
                  <button onClick={() => setNotifOpen(!notifOpen)} className={`relative w-10 h-10 rounded-xl border flex items-center justify-center ${dark ? "bg-zinc-800 border-zinc-700 text-zinc-400" : "bg-slate-100 border-slate-200 text-slate-500"}`}>
                    < Bell size={17} />
                    {unreadCount > 0 && <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-[#0c0c14]">{unreadCount > 9 ? "9+" : unreadCount}</span>}
                  </button>
                  {notifOpen && <NotificationPanel dark={dark} onClose={() => setNotifOpen(false)} notifications={notifications} onMarkRead={handleMarkRead} onMarkAllRead={handleMarkAllRead} onDelete={handleDelete} />}
                </div>

                <div className="hidden md:flex items-center gap-2.5 ml-2">
                  <img src={user?.photoURL || "https://avatar.iran.liara.run/public"} className="w-9 h-9 rounded-xl border object-cover" alt="avatar" />
                  <div className="text-left">
                    <p className={`text-xs font-black leading-none ${dark ? "text-zinc-100" : "text-slate-700"}`}>{user?.displayName?.split(" ")[0] || "Admin"}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest leading-none mt-0.5 ${dark ? "text-zinc-600" : "text-slate-400"}`}>{roleLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto scroll-smooth">
            <div className="p-6 xl:p-10 max-w-7xl mx-auto min-h-full"><Outlet /></div>
          </main>
        </div>
      </div>
  );
}