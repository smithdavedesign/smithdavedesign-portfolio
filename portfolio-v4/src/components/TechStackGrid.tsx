export default function TechStackGrid() {
    const technologies = [
        { name: 'Next.js 15', description: 'App Router & Server Components', color: 'from-black to-zinc-800' },
        { name: 'Tailwind v4', description: 'Liquid Glass Theme Design', color: 'from-sky-500/20 to-blue-600/20' },
        { name: 'MCP', description: 'Model Context Protocol', color: 'from-purple-500/20 to-fuchsia-600/20' },
        { name: 'LangGraph', description: 'Agentic Workflows', color: 'from-emerald-500/20 to-teal-600/20' },
    ];

    return (
        <div className="glass-panel col-span-1 md:col-span-2 lg:col-span-2 p-8 flex flex-col">
            <h3 className="text-lg font-medium text-zinc-300 mb-6">Orchestration Tech Stack</h3>
            <div className="grid grid-cols-2 gap-4 flex-1">
                {technologies.map((tech) => (
                    <div key={tech.name} className={`rounded-2xl p-4 border border-white/5 bg-gradient-to-br ${tech.color} flex flex-col justify-center transition-transform hover:scale-105 cursor-default`}>
                        <h4 className="text-white font-semibold mb-1">{tech.name}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{tech.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
