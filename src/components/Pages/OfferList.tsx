import React, { useState } from 'react';
import { Search, Filter, Download, Plus, MoreHorizontal, Calendar } from 'lucide-react';
import clsx from 'clsx';

interface Offer {
    id: string;
    name: string;
    type: string;
    startDate: string;
    endDate: string;
    status: 'Active' | 'Draft' | 'Expired' | 'Scheduled';
    retailers: string[];
    budget: number;
}

interface OfferListProps {
    onCreateOffer: () => void;
}

export const OfferList: React.FC<OfferListProps> = ({ onCreateOffer }) => {
    // Mock Data
    const offers: Offer[] = [
        { id: 'OFF-001', name: 'Pampers Annual Savings', type: 'Discount', startDate: '06/01/2025', endDate: '06/30/2025', status: 'Active', retailers: ['Walmart', 'Target'], budget: 50000 },
        { id: 'OFF-002', name: 'Tide Pods BOGO Event', type: 'BOGO', startDate: '07/01/2025', endDate: '07/15/2025', status: 'Scheduled', retailers: ['Kroger', 'Publix'], budget: 22000 },
        { id: 'OFF-003', name: 'Olay New User Bonus', type: 'Cashback', startDate: '01/01/2025', endDate: '12/31/2025', status: 'Active', retailers: ['All'], budget: 150000 },
        { id: 'OFF-004', name: 'Gillette Holiday Pack', type: 'Bundle', startDate: '12/01/2024', endDate: '12/31/2024', status: 'Expired', retailers: ['Walmart', 'CVS'], budget: 30000 },
        { id: 'OFF-005', name: 'Head & Shoulders Loyalty', type: 'Loyalty', startDate: '03/01/2025', endDate: '03/31/2025', status: 'Draft', retailers: ['Walgreens'], budget: 15000 },
        { id: 'OFF-006', name: 'Old Spice Flash Sale', type: 'Discount', startDate: '04/01/2025', endDate: '04/02/2025', status: 'Scheduled', retailers: ['Target'], budget: 5000 },
        { id: 'OFF-007', name: 'Oral-B Back to School', type: 'Bundle', startDate: '08/15/2025', endDate: '09/15/2025', status: 'Draft', retailers: ['Walmart', 'Target', 'Costco'], budget: 80000 },
        { id: 'OFF-008', name: 'Dawn Dish Soap Q4 Push', type: 'Cashback', startDate: '10/01/2025', endDate: '12/31/2025', status: 'Draft', retailers: ['All'], budget: 250000 },
        { id: 'OFF-009', name: 'Pampers Pure Launch', type: 'Sample', startDate: '05/01/2025', endDate: '05/30/2025', status: 'Scheduled', retailers: ['Whole Foods', 'Sprouts'], budget: 45000 },
        { id: 'OFF-010', name: 'Bounty & Charmin Bundle', type: 'Bundle', startDate: '11/15/2024', endDate: '12/25/2024', status: 'Expired', retailers: ['Amazon', 'Target'], budget: 120000 },
        { id: 'OFF-011', name: 'Swiffer Spring Cleaning', type: 'Discount', startDate: '04/01/2025', endDate: '04/30/2025', status: 'Active', retailers: ['Kroger', 'Meijer'], budget: 35000 }
    ];

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            Active: 'bg-[#34C759]/10 text-[#34C759]',
            Draft: 'bg-gray-100 text-gray-500',
            Expired: 'bg-red-100 text-red-600',
            Scheduled: 'bg-blue-100 text-blue-600',
        }[status] || 'bg-gray-100 text-gray-500';

        return (
            <span className={clsx("px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide", styles)}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">Offer List</h2>
                    <p className="text-[17px] text-gray-500 font-normal">Manage and track your promotional campaigns.</p>
                </div>
                <button
                    onClick={onCreateOffer}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#6B2B82] text-white text-[13px] font-semibold rounded-full shadow-sm hover:bg-[#4A1D5A] transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Create Offer
                </button>
            </div>

            <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden">
                {/* Toolbox */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4 bg-gray-50/30">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="relative group flex-1 max-w-xs">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6B2B82] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search offers..."
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
                            <th className="px-6 py-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">Offer Details</th>
                            <th className="px-6 py-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">Type</th>
                            <th className="px-6 py-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">Duration</th>
                            <th className="px-6 py-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">Retailers</th>
                            <th className="px-6 py-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">Budget</th>
                            <th className="px-6 py-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30">Status</th>
                            <th className="px-6 py-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider bg-gray-50/30 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {offers.map((offer) => (
                            <tr key={offer.id} className="group hover:bg-[#6B2B82]/5 transition-all cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-[#1d1d1f] text-[13px] group-hover:text-[#6B2B82] transition-colors">{offer.name}</span>
                                        <span className="text-[11px] text-gray-400 font-mono">{offer.id}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[13px] text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded-md border border-gray-200">{offer.type}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                        <span>{offer.startDate} - {offer.endDate}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        {offer.retailers.map((r, i) => (
                                            <span key={i} className="text-[11px] font-medium text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                                {r}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[13px] font-medium text-gray-700">${offer.budget.toLocaleString()}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge status={offer.status} />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-1.5 text-gray-400 hover:text-[#6B2B82] hover:bg-[#6B2B82]/10 rounded-md transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
