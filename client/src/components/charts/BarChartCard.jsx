import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import CustomTooltip from './CustomTooltip';

export default function BarChartCard({ title, data }) {

    const fixedData = data.map((item, idx) => ({
        ...item,
        name: `${item.name}-${idx + 1}`
    }));

    return (
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 
                        p-4 rounded-xl shadow-lg">
            <h3 className="text-slate-200 text-lg font-semibold mb-3">{title}</h3>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fixedData}>
                        <XAxis dataKey="name" stroke="#ddd" />
                        <YAxis stroke="#ddd" />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
