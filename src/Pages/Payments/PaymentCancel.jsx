import { useParams, Link } from "react-router";

const PaymentCancel = () => {
    const { tranId } = useParams();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-8 text-center border border-slate-100 dark:border-slate-800">
                {/* Cancel Icon */}
                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 font-heading">Payment Cancelled</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 font-sans">
                    আপনি পেমেন্টটি বাতিল করেছেন। কোনো টাকা কাটা হয়নি। আপনি চাইলে পরে আবার চেষ্টা করতে পারেন।
                </p>

                {/* Transaction ID Display */}
                <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 mb-8 border border-slate-100 dark:border-slate-800">
                    <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-bold">Ref ID</span>
                    <span className="text-slate-600 dark:text-slate-300 font-mono text-sm break-all uppercase">{tranId}</span>
                </div>

                <div className="space-y-3">
                    <Link 
                        to="/support" 
                        className="block w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-rose-600/20"
                    >
                        Try Again
                    </Link>
                    <Link 
                        to="/" 
                        className="block w-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium py-2 transition-all"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;