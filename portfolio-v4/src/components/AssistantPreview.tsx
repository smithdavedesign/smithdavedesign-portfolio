'use client';
import { useState } from 'react';

export default function AssistantPreview() {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hi! I am the automated Dave Smith Resume MCP. Ask me about his ROI metrics or orchestration experience.' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text: input }]);
        setInput('');

        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', text: 'Simulated response: Dave specializes in orchestrating LLM agents to deliver measurable ROI.' }]);
        }, 1000);
    };

    return (
        <div className="glass-panel col-span-1 md:col-span-1 lg:col-span-1 p-6 flex flex-col h-[350px]">
            <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-white">Ask my Resume</h3>
                    <p className="text-xs text-zinc-400">Powered by MCP SDK</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`text-xs p-3 rounded-2xl max-w-[85%] ${msg.role === 'user' ? 'bg-blue-600/40 text-blue-100 rounded-tr-sm' : 'bg-white/5 text-zinc-300 rounded-tl-sm border border-white/5'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSend} className="relative mt-auto">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-zinc-600"
                />
                <button type="submit" className="absolute right-2 top-1.5 p-1 text-zinc-400 hover:text-blue-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
                </button>
            </form>
        </div>
    );
}
