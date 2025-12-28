import React from 'react';
import { Bell, Search } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="h-16 bg-apple-bg/80 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-40 transition-all duration-300">
            <div className="flex items-center gap-4">
                {/* Search Bar - Apple Style: Gray background, pill shape, no border */}
                <div className="relative group">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-black transition-colors" opacity={0.6} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-9 pr-4 py-1.5 bg-black/5 hover:bg-black/10 focus:bg-white border-transparent focus:border-blue-500/50 rounded-full text-[13px] text-[#1d1d1f] focus:outline-none focus:ring-4 focus:ring-[#6B2B82]/20 w-64 transition-all placeholder:text-gray-500/70"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-apple-subtext hover:text-apple-text hover:bg-black/5 rounded-full transition-all relative group">
                    <Bell className="w-5 h-5" strokeWidth={1.5} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="w-8 h-8 rounded-full bg-gray-200 border border-black/5 flex items-center justify-center text-gray-500 text-xs font-semibold">
                        AU
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-[#1d1d1f]">Admin User</span>
                        <span className="text-[11px] text-gray-500">admin@acme.com</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
