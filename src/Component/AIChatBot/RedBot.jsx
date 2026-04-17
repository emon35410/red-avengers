import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiousSecure';

const RedBot = () => {
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello Hero! I am Red Bot. How can I help you save lives today?' }
    ]);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const mutation = useMutation({
        mutationFn: async (chatData) => {
            const res = await axiosSecure.post('/ai/chat', chatData);
            return res.data;
        },
        onSuccess: (data) => {
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        }
    });

    const handleSendMessage = () => {
        if (!input.trim() || mutation.isPending) return;
        const newUserMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        mutation.mutate({
            prompt: input,
            history: messages.slice(-3)
        });
    };

    return (
        <div className="fixed bottom-5 right-5 z-9999 font-mono selection:bg-red-500/30">
            {/* FAB Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-14.5 h-14.5 rounded-full bg-[#0a0606] border-[1.5px] border-[#e8001c] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-110 active:scale-95 group overflow-hidden"
            >
                {/* Pulse Animations */}
                {!isOpen && (
                    <>
                        <div className="absolute -inset-0.5 rounded-full border-[1.5px] border-[#e8001c] animate-ping opacity-20"></div>
                        <div className="absolute -inset-0.5 rounded-full border-[1.5px] border-[#e8001c] animate-ping opacity-10 [animation-delay:0.8s]"></div>
                    </>
                )}
                
                {/* Icon */}
                <span className={`text-2xl transition-transform duration-300 z-10 ${isOpen ? 'rotate-45 scale-90' : 'scale-100'}`}>
                    {isOpen ? '✕' : '🩸'}
                </span>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-radial-gradient from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div className="absolute bottom-18 right-0 w-90 h-130 bg-[#0a0608eb] border border-red-600/20 rounded-[20px] flex flex-col overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.75)] backdrop-blur-2xl animate-in fade-in zoom-in slide-in-from-bottom-3 duration-300">
                    
                    {/* Decorative Scanline & Corners */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_4px)]"></div>
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-red-600/50 rounded-tl-sm"></div>
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-red-600/50 rounded-tr-sm"></div>
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-red-600/50 rounded-bl-sm"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-red-600/50 rounded-br-sm"></div>

                    {/* Header */}
                    <div className="relative z-10 p-4 border-b border-red-600/20 bg-linear-to-br from-red-600/10 to-transparent flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#e8001c] to-[#7a0010] flex items-center justify-center shadow-[0_0_16px_rgba(232,0,28,0.4)] relative overflow-hidden group">
                                <span className="relative z-10 text-sm">🩸</span>
                                <div className="absolute top-0 inset-x-0 h-1/2 bg-white/10"></div>
                            </div>
                            <div>
                                <h3 className="text-white text-sm font-bold tracking-wider uppercase font-sans">Red Bot</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00e87c] animate-pulse shadow-[0_0_8px_rgba(0,232,124,0.6)]"></div>
                                    <span className="text-[10px] text-white/40 tracking-widest uppercase">Online</span>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:bg-red-600/20 hover:border-red-600 hover:text-white transition-all flex items-center justify-center"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-red-600/20">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed relative ${
                                    msg.role === 'user' 
                                    ? 'bg-linear-to-br from-[#e8001c] to-[#a3001a] text-white rounded-2xl rounded-tr-none shadow-lg shadow-red-900/20' 
                                    : 'bg-white/5 text-[#f0eaeb] border border-white/5 rounded-2xl rounded-tl-none'
                                }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {mutation.isPending && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce shadow-[0_0_6px_#e8001c]"></div>
                                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s] shadow-[0_0_6px_#e8001c]"></div>
                                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s] shadow-[0_0_6px_#e8001c]"></div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-black/30 border-t border-red-600/20">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 pl-4 focus-within:border-red-600/40 focus-within:ring-4 focus-within:ring-red-600/5 transition-all">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask Red Bot anything..."
                                className="flex-1 bg-transparent border-none outline-none text-[12.5px] text-[#f0eaeb] placeholder:text-white/30"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={mutation.isPending || !input.trim()}
                                className="w-8 h-8 rounded-lg bg-linear-to-br from-[#e8001c] to-[#a3001a] text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-red-900/40"
                            >
                                ↑
                            </button>
                        </div>
                        <p className="text-[10px] text-white/30 text-center mt-3 tracking-widest uppercase">
                            Enter to send • Powered by Red-Avengers
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RedBot;