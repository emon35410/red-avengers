import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth'; 
import useAxiosPublic from '../../Hooks/useAxiosPublic'; 
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const { googleSignIn, setLoading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            const loggedInUser = result.user; // 🔥 সরাসরি রেজাল্ট থেকে নাম নিলে আর null আসবে না

            const userInfo = {
                uid: loggedInUser?.uid,
                email: loggedInUser?.email,
                name: loggedInUser?.displayName,
                photoURL: loggedInUser?.photoURL,
                bloodGroup: "", 
                role: 'user',
                status: 'active',
                createdAt: new Date()
            };

            // ১. ডাটাবেসে ইউজার সেভ বা চেক
            const res = await axiosPublic.post('/users', userInfo);
            const dbUser = res.data?.user || res.data; 

            if (res.data) {
                // ২. যদি নতুন ইউজার হয় বা প্রোফাইল অসম্পূর্ণ থাকে
                if (!dbUser?.bloodGroup || dbUser?.bloodGroup === "") {
                    Swal.fire({
                        title: '<span style="color: #fff; font-size: 20px; font-weight: 900; text-transform: uppercase;">Hero Onboarding</span>',
                        html: `
                            <div style="display: flex; flex-direction: column; gap: 15px; text-align: left; padding: 10px;">
                                <div style="padding: 12px; background: #1e293b; border-radius: 12px; border: 1px solid #334155; margin-bottom: 5px;">
                                    <p style="color: #94a3b8; font-size: 11px; margin: 0; text-transform: uppercase;">Logged in as</p>
                                    <p style="color: #e11d48; font-size: 14px; font-weight: 800; margin: 0;">${loggedInUser?.displayName || 'Hero'}</p>
                                </div>

                                <div>
                                    <label style="color: #94a3b8; font-size: 10px; font-weight: bold; text-transform: uppercase; margin-bottom: 6px; display: block;">Blood Group</label>
                                    <select id="swal-bloodGroup" style="width: 100%; padding: 14px; background: #020617; color: #fff; border: 1px solid #334155; border-radius: 12px; outline: none; cursor: pointer;">
                                        <option value="" disabled selected>Select Group</option>
                                        <option value="A+">A+</option><option value="A-">A-</option>
                                        <option value="B+">B+</option><option value="B-">B-</option>
                                        <option value="O+">O+</option><option value="O-">O-</option>
                                        <option value="AB+">AB+</option><option value="AB-">AB-</option>
                                    </select>
                                </div>

                                <div>
                                    <label style="color: #94a3b8; font-size: 10px; font-weight: bold; text-transform: uppercase; margin-bottom: 6px; display: block;">Phone Number</label>
                                    <input id="swal-phone" type="tel" placeholder="01XXX XXXXXX" style="width: 100%; padding: 14px; background: #020617; color: #fff; border: 1px solid #334155; border-radius: 12px; outline: none;">
                                </div>

                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                    <div>
                                        <label style="color: #94a3b8; font-size: 10px; font-weight: bold; text-transform: uppercase; margin-bottom: 6px; display: block;">District</label>
                                        <input id="swal-district" placeholder="City" style="width: 100%; padding: 14px; background: #020617; color: #fff; border: 1px solid #334155; border-radius: 12px; outline: none;">
                                    </div>
                                    <div>
                                        <label style="color: #94a3b8; font-size: 10px; font-weight: bold; text-transform: uppercase; margin-bottom: 6px; display: block;">Upazila</label>
                                        <input id="swal-upazila" placeholder="Area" style="width: 100%; padding: 14px; background: #020617; color: #fff; border: 1px solid #334155; border-radius: 12px; outline: none;">
                                    </div>
                                </div>
                            </div>
                        `,
                        background: '#121a2b',
                        confirmButtonText: 'SAVE & CONTINUE',
                        confirmButtonColor: '#e11d48',
                        allowOutsideClick: false,
                        preConfirm: () => {
                            const bloodGroup = document.getElementById('swal-bloodGroup').value;
                            const phone = document.getElementById('swal-phone').value;
                            const district = document.getElementById('swal-district').value;
                            const upazila = document.getElementById('swal-upazila').value;

                            if (!bloodGroup) {
                                Swal.showValidationMessage('Please select your blood group!');
                                return false;
                            }
                            if (!phone || !district || !upazila) {
                                Swal.showValidationMessage('All fields are required.');
                                return false;
                            }
                            return { bloodGroup, phone, district, upazila };
                        }
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            try {
                                await axiosPublic.patch(`/users/update-by-email/${loggedInUser.email}`, result.value);
                                toast.success(`Profile Updated! Welcome, ${loggedInUser.displayName}`, {
                                    style: { background: '#1e293b', color: '#fff', borderRadius: '15px' }
                                });
                                navigate(from, { replace: true });
                            } catch (err) {
                                console.error(err);
                                toast.error("Database update failed.");
                            }
                        }
                    });
                } else {
                    // ৩. যদি ইউজার আগে থেকেই কমপ্লিট থাকে
                    toast.success(`Welcome Back, ${loggedInUser?.displayName || 'Hero'}!`, {
                        style: { background: '#1e293b', color: '#fff', borderRadius: '15px' }
                    });
                    navigate(from, { replace: true });
                }
            }
        } catch (error) {
            console.error("Auth Error:", error);
            toast.error('Google login failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 px-2">
            <button
                onClick={handleGoogleSignIn}
                type="button"
                className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-rose-500/30 transition-all duration-500 group active:scale-[0.98]"
            >
                <div className="bg-rose-50 dark:bg-rose-500/10 p-2 rounded-xl group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700">
                    <FaGoogle className="text-rose-600 w-4 h-4" />
                </div>
                <span className="text-slate-700 dark:text-slate-200 font-black text-xs uppercase tracking-widest">
                    Continue with Google
                </span>
            </button>
        </div>
    );
};

export default SocialLogin;