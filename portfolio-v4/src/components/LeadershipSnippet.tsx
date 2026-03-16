export default function LeadershipSnippet() {
    return (
        <div className="glass-panel col-span-1 md:col-span-1 lg:col-span-1 p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>

            <div className="relative z-10 flex-1 flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">AI KT Series</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    Scaling the agentic workforce. 10+ custom internal agent tools deployed by trained engineers.
                </p>

                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 uppercase tracking-widest font-semibold">Leadership</span>
                    <span className="text-purple-400 hover:text-purple-300 cursor-pointer flex items-center gap-1 transition-colors">
                        View Framework <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                </div>
            </div>
        </div>
    );
}
