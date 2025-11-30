export default function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || !payload.length) return null;

    // payload[0].payload is the original datum
    const datum = payload[0].payload;

    // Try common fields in order of confidence
    const value =
        datum.value ??       // preferred
        datum.sales ??       // if backend sent `sales`
        payload[0].value ??  // fallback
        null;

    return (
        <div className="bg-white/95 text-slate-900 px-3 py-2 rounded shadow">
            <div className="text-sm font-medium">{label}</div>
            <div className="text-lg font-semibold">
                {value !== null ? (typeof value === "number" ? value.toLocaleString() : value) : "—"}
            </div>
        </div>
    );
}
