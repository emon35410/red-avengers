import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, Shield, Droplet, UserCheck, Mail } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiousSecure";
import { useTheme } from '../../../Layouts/BaseLayout';

const ROLE_CFG = {
  user:      { label: 'User',      color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', icon: <Users size={11} /> },
  donor:     { label: 'Donor',     color: '#f43f5e', bg: 'rgba(244,63,94,0.12)',   icon: <Droplet size={11} /> },
  volunteer: { label: 'Volunteer', color: '#10b981', bg: 'rgba(16,185,129,0.12)',  icon: <UserCheck size={11} /> },
  admin:     { label: 'Admin',     color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  icon: <Shield size={11} /> },
};

/* ── Restrict / Unrestrict Button ── */
function ActionButton({ user, onUpdate, dark }) {
  const [hovered, setHovered] = useState(false);
  const isActive = user.status === 'active';

  const base = {
    fontFamily: 'inherit',
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    padding: '7px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid',
  };

  const restrict = {
    background: hovered ? 'rgba(244,63,94,0.12)' : 'transparent',
    borderColor: hovered ? 'rgba(244,63,94,0.4)' : dark ? '#2d2d40' : '#e2e8f0',
    color: hovered ? '#f43f5e' : dark ? '#64748b' : '#94a3b8',
  };

  const unrestrict = {
    background: hovered ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.08)',
    borderColor: hovered ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.25)',
    color: hovered ? '#34d399' : '#10b981',
  };

  return (
    <button
      style={{ ...base, ...(isActive ? restrict : unrestrict) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onUpdate({ id: user._id, updateData: { status: isActive ? 'blocked' : 'active' } })}
    >
      {isActive ? 'Restrict' : 'Unrestrict'}
    </button>
  );
}

/* ── Stat Card ── */
function StatCard({ label, val, color, dark }) {
  return (
    <div className={`p-6 rounded-3xl border transition-colors duration-200
      ${dark ? 'bg-[#0f0f1a] border-[#1c1c2e]' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className={`text-[15px] uppercase tracking-widest font-bold mb-1.5
        ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</div>
      <div className="font-black text-2xl" style={{ color }}>{val}</div>
    </div>
  );
}

const UserManagement = () => {
  const { dark } = useTheme();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [toast, setToast] = useState({ show: false, msg: '', color: '' });

  /* ── FETCH ── */
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  /* ── MUTATION ── */
  const { mutate: updateUser } = useMutation({
    mutationFn: async ({ id, updateData }) => {
      const res = await axiosSecure.patch(`/users/admin/${id}`, updateData);
      return res.data;
    },
    onSuccess: (_, { updateData }) => {
      queryClient.invalidateQueries(['users']);
      if (updateData.role) {
        triggerToast(`Role updated to ${ROLE_CFG[updateData.role]?.label}`, ROLE_CFG[updateData.role]?.color);
      } else if (updateData.status) {
        triggerToast(
          updateData.status === 'active' ? 'User unrestricted.' : 'User restricted.',
          updateData.status === 'active' ? '#10b981' : '#f43f5e'
        );
      }
    },
    onError: () => triggerToast('Something went wrong.', '#f43f5e'),
  });

  /* ── TOAST ── */
  const triggerToast = (msg, color) => {
    setToast({ show: true, msg, color });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  };

  /* ── FILTER ── */
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const match = u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
      const roleMatch = roleFilter === 'all' || u.role === roleFilter;
      return match && roleMatch;
    });
  }, [users, search, roleFilter]);

  /* ── LOADING ── */
  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  /* ── CSS vars per theme ── */
  const C = dark ? {
    page:        'text-slate-200',
    cardBg:      '#0f0f1a',
    cardBorder:  '#1c1c2e',
    headerBg:    '#141420',
    inputBg:     '#0f0f1a',
    inputBorder: '#252538',
    rowHover:    'rgba(255,255,255,0.02)',
    footerBg:    '#0d0d15',
    label:       'text-slate-500',
    text:        'text-slate-200',
    subtext:     'text-slate-500',
    selectBg:    '#141420',
    selectBorder:'#252538',
  } : {
    page:        'text-slate-700',
    cardBg:      '#ffffff',
    cardBorder:  '#e2e8f0',
    headerBg:    '#f8fafc',
    inputBg:     '#ffffff',
    inputBorder: '#e2e8f0',
    rowHover:    'rgba(0,0,0,0.02)',
    footerBg:    '#f8fafc',
    label:       'text-slate-400',
    text:        'text-slate-700',
    subtext:     'text-slate-400',
    selectBg:    '#ffffff',
    selectBorder:'#e2e8f0',
  };

  return (
    <div className={`${C.page} font-mono relative pb-8 transition-colors duration-200`}>

      {/* Toast */}
      <div className={`fixed bottom-8 right-8 z-9999 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl
        border transition-all duration-500
        ${dark ? 'bg-[#141420] border-[#252538]' : 'bg-white border-slate-200 shadow-slate-200'}
        ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: toast.color }} />
        <span className={`text-xs tracking-wider ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{toast.msg}</span>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <header className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <h1 className={`font-serif  font-black text-4xl tracking-tight ${dark ? 'text-white' : 'text-slate-800'}`}>
              User Registry
            </h1>
          </div>
          <div className={`border rounded-2xl p-3 flex items-center gap-4 transition-colors duration-200
            ${dark ? 'bg-[#0f0f1a] border-[#252538]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <Users className="text-rose-500" size={20} />
            <div>
              <div className={`text-[9px] uppercase tracking-widest font-bold ${C.label}`}>Total Records</div>
              <div className={`font-serif text-2xl font-black ${dark ? 'text-white' : 'text-slate-800'}`}>{users.length}</div>
            </div>
          </div>
        </header>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard dark={dark} label="Total"   val={users.length}                                color="#94a3b8" />
          <StatCard dark={dark} label="Active"  val={users.filter(u => u.status === 'active').length}  color="#10b981" />
          <StatCard dark={dark} label="Blocked" val={users.filter(u => u.status !== 'active').length}  color="#f43f5e" />
          <StatCard dark={dark} label="Admins"  val={users.filter(u => u.role === 'admin').length}     color="#f59e0b" />
        </div>

        {/* ── Toolbar ── */}
        <div className="flex flex-wrap gap-3 mb-5">
          {/* Search */}
          <div className={`flex-1 min-w-60 border rounded-xl px-5 py-4 flex items-center gap-3
            focus-within:border-rose-500 transition-all duration-200
            ${dark ? 'bg-[#0f0f1a] border-[#252538]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <Search size={14} className={C.subtext} />
            <input
              type="text"
              placeholder="Search by name or email..."
              className={`bg-transparent border-none outline-none text-xs w-full placeholder:opacity-50
                ${dark ? 'text-slate-200 placeholder:text-slate-600' : 'text-slate-700 placeholder:text-slate-400'}`}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {/* Filter */}
          <div className={`border rounded-xl px-4 py-3 flex items-center gap-3 transition-colors duration-200
            ${dark ? 'bg-[#0f0f1a] border-[#252538]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <Filter size={14} className={C.subtext} />
            <select
              className={`bg-transparent border-none outline-none text-[10px] uppercase font-bold cursor-pointer
                ${dark ? 'text-slate-300' : 'text-slate-600'}`}
              onChange={e => setRoleFilter(e.target.value)}
              style={{ background: C.selectBg }}
            >
              <option value="all"       style={{ background: C.selectBg }}>All Roles</option>
              <option value="user"      style={{ background: C.selectBg }}>User</option>
              <option value="donor"     style={{ background: C.selectBg }}>Donor</option>
              <option value="volunteer" style={{ background: C.selectBg }}>Volunteer</option>
              <option value="admin"     style={{ background: C.selectBg }}>Admin</option>
            </select>
          </div>
        </div>

        {/* ── Table ── */}
        <div className={`border rounded-3xl overflow-hidden transition-colors duration-200`}
          style={{ background: C.cardBg, borderColor: C.cardBorder }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ background: C.headerBg, borderColor: C.cardBorder }}>
                  {['Identity', 'Role', 'Status', 'Action'].map((h, i) => (
                    <th key={h}
                      className={`p-6 text-[9px] font-bold uppercase tracking-[0.3em] ${C.label} ${i === 3 ? 'text-center' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className={`p-16 text-center text-[10px] uppercase tracking-widest font-bold ${C.subtext}`}>
                      — No records found —
                    </td>
                  </tr>
                ) : filteredUsers.map((u, idx) => {
                  const cfg = ROLE_CFG[u.role] || ROLE_CFG.user;
                  const isActive = u.status === 'active';
                  return (
                    <tr key={u._id}
                      className="transition-all group"
                      style={{
                        borderTop: idx !== 0 ? `1px solid ${C.cardBorder}` : 'none',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = C.rowHover}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Identity */}
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative shrink-0">
                            <div
                              className="w-11 h-11 rounded-2xl flex items-center justify-center overflow-hidden border-2 transition-all"
                              style={{
                                background: `${u.color || '#94a3b8'}22`,
                                borderColor: dark ? '#252538' : '#e2e8f0',
                              }}
                            >
                              {u.image || u.photoURL ? (
                                <img
                                  src={u.image || u.photoURL}
                                  alt={u.name}
                                  className="w-full h-full object-cover"
                                  onError={e => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = u.name?.charAt(0) || '?';
                                  }}
                                />
                              ) : (
                                <span className="font-serif font-black text-lg" style={{ color: u.color || '#94a3b8' }}>
                                  {u.name?.charAt(0) || '?'}
                                </span>
                              )}
                            </div>
                            {u.isDonor && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 text-[8px] flex items-center justify-center font-black text-white"
                                style={{ borderColor: C.cardBg }}>D</div>
                            )}
                          </div>
                          <div>
                            <div className={`font-serif font-bold text-sm tracking-tight ${dark ? 'text-slate-100' : 'text-slate-700'}`}>{u.name}</div>
                            <div className={`flex items-center gap-1.5 text-[10px] mt-1 ${C.subtext}`}>
                              <Mail size={9} /> {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <span
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border border-white/5 whitespace-nowrap"
                            style={{ color: cfg.color, background: cfg.bg }}
                          >
                            {cfg.icon} {cfg.label}
                          </span>
                          <select
                            value={u.role}
                            onChange={e => updateUser({ id: u._id, updateData: { role: e.target.value } })}
                            className="text-[10px] p-1.5 rounded-lg outline-none cursor-pointer border transition-colors duration-200"
                            style={{
                              background: C.selectBg,
                              borderColor: C.selectBorder,
                              color: dark ? '#94a3b8' : '#64748b',
                            }}
                          >
                            <option value="user"      style={{ background: C.selectBg }}>User</option>
                            <option value="donor"     style={{ background: C.selectBg }}>Donor</option>
                            <option value="volunteer" style={{ background: C.selectBg }}>Volunteer</option>
                            <option value="admin"     style={{ background: C.selectBg }}>Admin</option>
                          </select>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-6">
                        <div
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 w-fit"
                          style={{
                            background: isActive ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.08)',
                            color: isActive ? '#10b981' : '#f43f5e',
                          }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                          <span className="text-[9px] font-bold uppercase tracking-widest">{u.status}</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="p-6 text-center">
                        <ActionButton user={u} onUpdate={updateUser} dark={dark} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-8 py-4 flex justify-between items-center border-t transition-colors duration-200"
            style={{ background: C.footerBg, borderColor: C.cardBorder }}>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${C.label}`}>
              Showing {filteredUsers.length} of {users.length} records
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${C.label}`}>◈ Authorized Access Only</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserManagement;