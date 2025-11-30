import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import LineChartCard from "../components/charts/LineChartCard";
import BarChartCard from "../components/charts/BarChartCard";
import KpiCard from "../components/KPICard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

    const [kpi, setKpi] = useState(null);
    const [signups, setSignups] = useState([]);
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const kpiRes = await axiosInstance.get("/analytics/kpi");
            const signupsRes = await axiosInstance.get("/analytics/signups");
            const salesRes = await axiosInstance.get("/analytics/sales");

            setKpi(kpiRes.data);
            setSignups(signupsRes.data);
            setSales(salesRes.data);
        };

        fetchData();
    }, []);

    if (!kpi) return <div className="text-white p-10 text-xl">Loading Analytics...</div>;

    return (
        <div className="min-h-screen w-full bg-linear-to-br 
                        from-slate-900 via-indigo-900 to-purple-900 
                        flex flex-col">

            {/* NAVBAR */}
            <Navbar />

            {/* TITLE */}
            <h1 className="text-4xl text-center font-bold text-white mt-10 mb-10">
                Admin Analytics Dashboard
            </h1>

            {/* MAIN CONTENT */}
            <div className="flex flex-col items-center justify-center grow w-full px-8">

                {/* KPI CARDS – FULL WIDTH */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                                gap-6 mb-10 w-full">
                    <KpiCard title="Active Users" value={kpi.activeUsers} color="text-indigo-400" />
                    <KpiCard title="Total Users" value={kpi.totalUsers} color="text-purple-400" />
                    <KpiCard title="Total Sales" value={"$" + kpi.totalSales} color="text-emerald-400" />
                    <KpiCard title="Revenue Growth" value={`${kpi.revenueGrowth}%`} color="text-pink-400" />
                </div>

                {/* CHARTS – FULL WIDTH */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full mb-14">
                    <div className="w-full">
                        <LineChartCard title="Weekly New Signups" data={signups} />
                    </div>
                    <div className="w-full">
                        <BarChartCard title="Monthly Sales Overview" data={sales} />
                    </div>
                </div>

                {/* ADMIN CONTROLS SECTION */}
                <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 
                                rounded-xl shadow-xl p-8">

                    <h2 className="text-3xl font-semibold text-white mb-6">
                        Admin Controls
                    </h2>

                    <p className="text-slate-300 mb-6">
                        Manage users, roles, and system content.
                    </p>

                    <button
                        onClick={() => navigate("/admin/users")}
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 
                                   text-white rounded-xl shadow-lg transition 
                                   font-semibold text-lg"
                    >
                        Open User Management
                    </button>
                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;
