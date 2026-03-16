'use client';

export default function ROIPulse() {
    return (
        <div className="glass-panel col-span-1 md:col-span-1 lg:col-span-2 p-8 flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium text-zinc-300">Copilot ROI Pulse</h3>
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-8">
                <div>
                    <p className="text-sm text-zinc-500 mb-1">Operational Cost Reduction</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold tracking-tight text-white">35%</span>
                        <span className="text-sm text-emerald-400 font-medium">↑ +15% QoQ</span>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-zinc-500 mb-1">Developer Hours Reclaimed</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold tracking-tight text-zinc-200">2,450</span>
                        <span className="text-sm text-zinc-400">hrs/mo</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/10">
                    <p className="text-xs text-zinc-500 font-mono" aria-label="ROI Formula: Value minus Investment, divided by Investment, multiplied by 100">
                        ROI = ((Value - Inv) / Inv) × 100
                    </p>
                </div>
            </div>
        </div>
    );
}
