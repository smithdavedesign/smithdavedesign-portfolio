"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, Cpu, LayoutTemplate } from "lucide-react";

export default function VersionOrchestrator() {
    const [isOpen, setIsOpen] = useState(false);
    const [transitionState, setTransitionState] = useState<{
        active: boolean;
        logs: string[];
        targetUrl: string | null;
    }>({ active: false, logs: [], targetUrl: null });

    // Terminal Logs Sequence for the Glitch Overlay
    const runTransition = (versionName: string, containerId: string, url: string) => {
        setTransitionState({ active: true, logs: [], targetUrl: url });
        setIsOpen(false);

        const sequence = [
            `[SYSTEM]: Intercepting temporal routing...`,
            `[SYSTEM]: Querying MCP State = "ACTIVE"`,
            `[MCP]: Re-initializing persona -> ${versionName}`,
            `[MCP]: Locating legacy container registry...`,
            `[SYS_LOG]: Container [${containerId}] found. Waking instance...`,
            `[TELEMETRY]: Establishing Neural Link... SUCCESS.`,
            `[SYSTEM]: Transferring viewport. Stand by...`
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (step < sequence.length) {
                setTransitionState(prev => ({ ...prev, logs: [...prev.logs, sequence[step]] }));
                step++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    window.location.href = url;
                }, 500); // Small delay before actual redirect
            }
        }, 400); // 400ms per log line
    };

    const versions = [
        {
            id: "v4",
            title: "The Orchestrator",
            subtitle: "Current Agentic Era",
            icon: <Terminal className="w-5 h-5 text-fuchsia-400" />,
            url: "/",
            container: "0xNEXT_15_CORE",
            current: true
        },
        {
            id: "v3",
            title: "Full-Stack Integration",
            subtitle: "Systems Era",
            icon: <Database className="w-5 h-5 text-indigo-400" />,
            url: "http://localhost:5003/v4/portfolio", // Pointing to the restored EJS V4 we just made as a stand-in for full-stack era
            container: "0xEXPRESS_EJS",
            current: false
        },
        {
            id: "v2",
            title: "The Impact Pivot",
            subtitle: "Coding for Good",
            icon: <Cpu className="w-5 h-5 text-teal-400" />,
            url: "http://localhost:5003/v3/portfolio", // Pointing to legacy app endpoints
            container: "0xHEROKU_LEGACY",
            current: false
        },
        {
            id: "v1",
            title: "The Creative Origin",
            subtitle: "Design-centric",
            icon: <LayoutTemplate className="w-5 h-5 text-white/60" />,
            url: "http://localhost:5003/v3/landingPage", // Conceptually the oldest design
            container: "0xSTATIC_ASSETS",
            current: false
        }
    ];

    return (
        <>
            {/* The Floating Orb / Node */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="mb-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-fuchsia-500/20 overflow-hidden w-80"
                        >
                            <div className="p-4 border-b border-white/5 bg-black/40">
                                <h4 className="text-white font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                    Chronos Node
                                </h4>
                                <p className="text-xs text-slate-500 mt-1 font-mono">MCP Connection: Established</p>
                            </div>

                            <div className="p-2 relative">
                                {/* SVG Neural Path background decoration */}
                                <div className="absolute left-6 top-4 bottom-4 w-px bg-white/10" />

                                {versions.map((v, i) => (
                                    <button
                                        key={v.id}
                                        onClick={() => {
                                            if (!v.current) runTransition(v.title, v.container, v.url);
                                        }}
                                        className={`w-full relative flex items-start gap-4 p-3 rounded-xl text-left transition-all duration-300 group
                      ${v.current ? 'bg-white/5 cursor-default' : 'hover:bg-white/10 cursor-pointer'}
                    `}
                                    >
                                        {/* Node Dot */}
                                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border 
                        ${v.current ? 'bg-indigo-500/20 border-indigo-500/50' : 'bg-slate-800 border-white/10 group-hover:border-white/30'}
                    `}>
                                            {v.icon}
                                        </div>

                                        <div>
                                            <h5 className={`font-medium ${v.current ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                                {v.title}
                                                {v.current && <span className="ml-2 text-[10px] uppercase tracking-wider bg-fuchsia-500/20 text-fuchsia-300 px-2 py-0.5 rounded-full border border-fuchsia-500/20">Active</span>}
                                            </h5>
                                            <p className="text-xs text-slate-500 font-mono mt-0.5">{v.id} // {v.subtitle}</p>
                                        </div>

                                        {/* Miniature Hover Portal Preview Effect (CSS only) */}
                                        {!v.current && (
                                            <div className="absolute right-full mr-4 top-0 w-32 h-20 bg-slate-800 border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:flex items-center justify-center text-xs text-slate-400 font-mono overflow-hidden">
                                                [Previewing {v.container}]
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-14 h-14 rounded-xl glass border border-white/20 shadow-lg shadow-indigo-500/20 flex items-center justify-center overflow-hidden group bg-slate-900/50 backdrop-blur-md"
                >
                    {/* Animated Background Gradient inside the button */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#a855f7_360deg)] opacity-50"
                    />
                    <div className="absolute inset-0.5 bg-slate-900 rounded-lg z-10 flex items-center justify-center">
                        <Cpu className={`w-6 h-6 text-slate-300 transition-colors duration-300 ${isOpen ? 'text-fuchsia-400' : 'group-hover:text-indigo-400'}`} />
                    </div>
                </motion.button>
            </div>

            {/* Terminal Glitch Transition Overlay */}
            <AnimatePresence>
                {transitionState.active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center pb-20 p-8"
                    >
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10"></div>

                        <div className="max-w-3xl w-full border border-green-500/30 bg-black/80 rounded-lg p-6 font-mono text-green-400 relative z-20 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                            <div className="flex items-center space-x-2 mb-6 border-b border-green-500/30 pb-4">
                                <Terminal className="w-5 h-5 text-green-400" />
                                <span className="text-sm tracking-widest">MCP_KERNEL_v4.2.0</span>
                            </div>
                            <div className="space-y-3 min-h-[300px]">
                                {transitionState.logs.map((log, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex"
                                    >
                                        <span className="text-slate-500 mr-4">{(new Date()).toISOString().split('T')[1].slice(0, 11)}</span>
                                        <span className={log.includes("SUCCESS") ? "text-fuchsia-400" : "text-green-400"}>{log}</span>
                                    </motion.div>
                                ))}
                                <motion.div
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-3 h-5 bg-green-400 mt-4 inline-block"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
