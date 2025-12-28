import React, { useState } from 'react';
import type { Receipt } from '../../types';
import { Search, Filter, Download, ChevronRight, MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';

interface ReceiptsProps {
    receipts: Receipt[];
    onViewReceipt: (receipt: Receipt) => void;
}

export const Receipts: React.FC<ReceiptsProps> = ({ receipts, onViewReceipt }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Minimal Apple-style logic
    const filtered = receipts.slice(0, 8); // Just show top 8 for demo to keep it clean

    const StatusBadge = ({ status }: { status: string }) => {
        const isSuccess = status.includes('Accept');
        const isError = status.includes('Reject');
        return (
            <span className={clsx(
                "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1.5",
                isSuccess ? "bg-emerald-100/50 text-emerald-700" : isError ? "bg-red-100/50 text-red-700" : "bg-gray-100 text-gray-700"
            )}>
                <span className={clsx("w-1.5 h-1.5 rounded-full", isSuccess ? "bg-emerald-500" : isError ? "bg-red-500" : "bg-gray-500")} />
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">Receipts</h2>
                    <p className="text-[17px] text-gray-500 font-normal">Manage and review incoming transactions.</p>
                </div>

                <div>
                    {/* Header Controls Removed */}
                </div>
            </div>

            <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden">
                {/* Table Toolbox */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/30">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="relative group flex-1 max-w-xs">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6B2B82] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search receipts..."
                                className="pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-full text-[13px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#6B2B82] focus:border-transparent w-full transition-all shadow-sm placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-[#1d1d1f] hover:border-gray-300 transition-all shadow-sm">
                            <Filter className="w-4 h-4" />
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[12px] font-heading font-medium text-[#1d1d1f] shadow-sm hover:bg-gray-50 transition-colors">
                            <Download className="w-3.5 h-3.5" />
                            Export
                        </button>
                    </div>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="px-8 py-5 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">ID</th>
                            <th className="px-8 py-5 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">Date</th>
                            <th className="px-8 py-5 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">Merchant</th>
                            <th className="px-8 py-5 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">Amount</th>
                            <th className="px-8 py-5 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">Status</th>
                            <th className="px-8 py-5 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filtered.map((receipt) => (
                            <tr
                                key={receipt.id}
                                className="group hover:bg-apple-blue/5 transition-all cursor-pointer relative"
                                onClick={() => onViewReceipt(receipt)}
                            >
                                <td className="px-8 py-5">
                                    <span className="font-medium text-apple-text font-mono text-sm group-hover:text-apple-blue transition-colors">
                                        #{receipt.id.replace('r-', '00')}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-apple-text">{new Date(receipt.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                        <span className="text-xs text-apple-subtext">{new Date(receipt.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-apple-bg flex items-center justify-center text-xs font-bold text-apple-subtext border border-apple-border/30">
                                            {receipt.storeName.charAt(0)}
                                        </div>
                                        <span className="text-sm font-medium text-apple-text">{receipt.storeName}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="text-sm font-semibold text-apple-text font-mono tracking-tight">${receipt.amount.toFixed(2)}</span>
                                </td>
                                <td className="px-8 py-5">
                                    <StatusBadge status={receipt.status} />
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button className="p-2 text-apple-subtext hover:text-apple-blue hover:bg-apple-blue/10 rounded-full transition-all opacity-0 group-hover:opacity-100">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 bg-gray-50/30 border-t border-apple-border/50 text-center">
                    <button className="text-sm font-medium text-apple-subtext hover:text-apple-text transition-colors">Load more transactions...</button>
                </div>
            </div>
        </div>
    );
};
