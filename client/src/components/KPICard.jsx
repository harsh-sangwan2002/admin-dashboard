import { motion } from "framer-motion";

export default function KpiCard({ title, value, color }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 rounded-xl shadow-xl border border-white/10 backdrop-blur-xl"
            style={{
                background: "rgba(255,255,255,0.08)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.2)"
            }}
        >
            <h3 className="text-slate-300 text-sm">{title}</h3>
            <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
        </motion.div>
    );
}
