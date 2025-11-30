import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function LineChartCard({ title, data }) {
    return (
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 
                        p-4 rounded-xl shadow-lg">
            <h3 className="text-slate-200 text-lg font-semibold mb-3">{title}</h3>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="#ddd" />
                        <YAxis stroke="#ddd" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#a855f7"
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
