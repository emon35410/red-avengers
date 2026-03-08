import { useParams, Link } from "react-router";

const PaymentSuccess = () => {
    const { tranId } = useParams();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-8 text-center border border-green-100 dark:border-green-900/30">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Payment Successful!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Thank you for your generous donation. Your contribution helps us save lives.
                </p>

                <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 mb-8 border border-slate-100 dark:border-slate-800">
                    <span className="block text-xs uppercase tracking-widest text-slate-400 mb-1 font-semibold">Transaction ID</span>
                    <span className="text-rose-600 font-mono font-bold break-all">{tranId}</span>
                </div>

                <div className="space-y-3">
                    <Link to="/" className="block w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl transition-all">
                        Back to Home
                    </Link>
                    <Link to="/dashboard/my-donations" className="block w-full text-slate-500 hover:text-rose-600 font-medium py-2 transition-all">
                        View Donation History
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;