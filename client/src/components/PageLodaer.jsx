export default function PageLoader() {
    return (
        <div className="fixed inset-0 items-center justify-center 
                        min-h-screen w-full bg-linear-to-br 
                        from-slate-900 via-indigo-900 to-purple-900 
                        flex flex-col
                        z-50">

            <div className="w-12 h-12 border-4 border-white/40 
                            border-t-white rounded-full animate-spin"></div>
        </div>
    );
}
