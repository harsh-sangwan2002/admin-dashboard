import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

export default function Dashboard() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="min-h-screen bg-linear-to-br 
                        from-slate-900 via-indigo-900 to-purple-900 
                        flex flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* CENTERED USER DASHBOARD CONTENT */}
            <div className="flex flex-col items-center justify-center grow p-8">

                {/* TITLE */}
                <h1 className="text-4xl text-center font-bold text-white mb-10">
                    Welcome, {user?.name || "User"} 👋
                </h1>

                {/* USER KPI CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                                gap-6 mb-14 w-full max-w-5xl">

                    <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/10 
                                    rounded-xl shadow-lg">
                        <h3 className="text-slate-300 text-sm">Your Role</h3>
                        <p className="text-3xl font-bold mt-2 text-indigo-400 capitalize">
                            {user?.role}
                        </p>
                    </div>

                    <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/10 
                                    rounded-xl shadow-lg">
                        <h3 className="text-slate-300 text-sm">Member Since</h3>
                        <p className="text-3xl font-bold mt-2 text-purple-400">
                            {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/10 
                                    rounded-xl shadow-lg">
                        <h3 className="text-slate-300 text-sm">Status</h3>
                        <p className="text-3xl font-bold mt-2 text-emerald-400">Active</p>
                    </div>
                </div>

                {/* MAIN USER INFO BOX */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 
                                rounded-xl shadow-lg p-8 w-full max-w-4xl text-center">

                    <h2 className="text-2xl font-bold text-white mb-4">
                        Your Dashboard Overview
                    </h2>

                    <p className="text-slate-300">
                        This is your personal dashboard where you can track your activity
                        and manage your account. More features coming soon!
                    </p>

                </div>

            </div>
        </div>
    );
}
