import { useParams, Link } from "react-router";

const PaymentFail = () => {
    const { tranId } = useParams();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-8 text-center border border-rose-100 dark:border-rose-900/30">
                <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Payment Failed</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Oops! Something went wrong with your transaction. No money was deducted from your account.
                </p>

                <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 mb-8 border border-slate-100 dark:border-slate-800 text-sm text-slate-500">
                    ID: <span className="font-mono">{tranId}</span>
                </div>

                <div className="space-y-3">
                    <Link to="/support" className="block w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition-all">
                        Try Again
                    </Link>
                    <Link to="/" className="block w-full text-slate-500 font-medium py-2">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;