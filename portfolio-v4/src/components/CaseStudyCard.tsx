import Image from 'next/image';

interface CaseStudyProps {
    headline: string;
    action: string;
    tooling: string[];
    roiMetric: string;
    imageSrc: string;
}

export default function CaseStudyCard({ headline, action, tooling, roiMetric, imageSrc }: CaseStudyProps) {
    return (
        <article className="glass-panel overflow-hidden group flex flex-col h-full relative border border-white/5">
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10"></div>
                <img
                    src={imageSrc}
                    alt={headline}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
            </div>

            <div className="p-6 flex-1 flex flex-col relative z-20 -mt-6">
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{headline}</h3>
                <p className="text-sm text-zinc-400 mb-6 flex-1 leading-relaxed">
                    <strong className="text-zinc-300 font-semibold">Action:</strong> {action}
                </p>

                <div className="space-y-4">
                    <div>
                        <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold block mb-2">Tooling</span>
                        <div className="flex flex-wrap gap-2">
                            {tooling.map(tool => (
                                <span key={tool} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-zinc-300">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <span className="text-xs text-emerald-500 uppercase tracking-widest font-bold block mb-1">ROI Metric</span>
                        <p className="text-sm text-white font-medium">{roiMetric}</p>
                    </div>
                </div>
            </div>
        </article>
    );
}
