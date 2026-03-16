export default function HeroBento() {
    return (
        <div className="glass-panel col-span-1 md:col-span-2 lg:col-span-3 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
                <div className="flex-1 space-y-6">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Available for Hire
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        Dave Smith
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                            AI Orchestrator
                        </span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl font-light">
                        Architecting the systems and culture where AI and humans collaborate. Moving beyond building to spec, to designing goals for autonomous agents and driving high-ROI orchestration.
                    </p>
                </div>
            </div>
        </div>
    );
}
