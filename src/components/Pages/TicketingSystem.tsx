import React, { useState } from 'react';
import { Eye, Download, Search, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import clsx from 'clsx';
import { TicketDetail } from './TicketDetail';
// Mock Data
interface Ticket {
    id: string;
    slNo: number;
    subject: string;
    dateCreated: string;
    raisedBy: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    status: 'New' | 'Pending' | 'Closed' | 'Archived' | 'Escalated';
    lastUpdated: string;
    assignedTo: string;
}

const mockTickets: Ticket[] = [
    { id: '5765868', slNo: 1, subject: 'Blurry receipt for Pampers bulk purchase', dateCreated: '23 Hrs Ago', raisedBy: 'Sarah Connor', priority: 'Critical', status: 'New', lastUpdated: '23 Hrs Ago', assignedTo: 'Unassigned' },
    { id: '5765869', slNo: 2, subject: 'Points missing from Tide Eco-Savings', dateCreated: '1 Day Ago', raisedBy: 'Mike Ross', priority: 'High', status: 'Escalated', lastUpdated: '2 Hrs Ago', assignedTo: 'Harvey S.' },
    { id: '5765870', slNo: 3, subject: 'High-value Olay transaction flagged as fraud', dateCreated: '2 Days Ago', raisedBy: 'Fraud Bot', priority: 'Critical', status: 'Pending', lastUpdated: '5 Hrs Ago', assignedTo: 'Ken Adams' },
    { id: '5765871', slNo: 4, subject: 'Old Spice coupon code not recognized', dateCreated: '2 Days Ago', raisedBy: 'John Smith', priority: 'Medium', status: 'Closed', lastUpdated: '1 Day Ago', assignedTo: 'Louis Litt' },
    { id: '5765872', slNo: 5, subject: 'Gillette Razor subscription cancellation', dateCreated: '3 Days Ago', raisedBy: 'Rachel Green', priority: 'Low', status: 'Closed', lastUpdated: '2 Days Ago', assignedTo: 'Ross G.' },
    { id: '5765873', slNo: 6, subject: 'Duplicate upload of same Charmin receipt', dateCreated: '3 Days Ago', raisedBy: 'Monica G.', priority: 'Medium', status: 'Pending', lastUpdated: '1 Day Ago', assignedTo: 'Chandler B.' },
    { id: '5765874', slNo: 7, subject: 'Retailer mismatch for Oral-B purchase', dateCreated: '4 Days Ago', raisedBy: 'Phoebe B.', priority: 'Low', status: 'New', lastUpdated: '4 Days Ago', assignedTo: 'Unassigned' },
    { id: '5765875', slNo: 8, subject: 'Swiffer WetJet refill SKU extraction failed', dateCreated: '5 Days Ago', raisedBy: 'Joey T.', priority: 'Low', status: 'Archived', lastUpdated: '5 Days Ago', assignedTo: 'Unassigned' },
    { id: '5765876', slNo: 9, subject: 'Head & Shoulders campaign date error', dateCreated: '1 Week Ago', raisedBy: 'Janice L.', priority: 'Low', status: 'Closed', lastUpdated: '6 Days Ago', assignedTo: 'Gunther' },
    { id: '5765877', slNo: 10, subject: 'System glitch on Febreze bulk upload', dateCreated: '1 Week Ago', raisedBy: 'System Monitor', priority: 'High', status: 'Resolved', lastUpdated: '1 Week Ago', assignedTo: 'IT Support' },
    { id: '5765878', slNo: 11, subject: 'Crest 3D White rebate not applied', dateCreated: '8 Days Ago', raisedBy: 'Ted Mosby', priority: 'Medium', status: 'New', lastUpdated: '8 Days Ago', assignedTo: 'Unassigned' },
    { id: '5765879', slNo: 12, subject: 'Invalid store location for Dawn promo', dateCreated: '9 Days Ago', raisedBy: 'Barney S.', priority: 'High', status: 'Pending', lastUpdated: '2 Days Ago', assignedTo: 'Lily A.' },
] as Ticket[];

export const TicketingSystem: React.FC = () => {
    // Apple HIG: Use clean, rounded elements, soft shadows, and clear typography.
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

    const PriorityBadge = ({ priority }: { priority: string }) => {
        const styles = {
            Critical: 'bg-[#D4198C] text-white',
            High: 'bg-[#EB754F] text-white',
            Medium: 'bg-amber-500 text-white',
            Low: 'bg-[#6B2B82] text-white',
        }[priority] || 'bg-gray-100 text-gray-600';

        return (
            <span className={clsx("px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide", styles)}>
                {priority}
            </span>
        );
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const styles = {
            New: 'bg-yellow-100 text-yellow-700',
            Pending: 'bg-blue-100 text-blue-700',
            Closed: 'bg-green-100 text-green-700',
            Resolved: 'bg-green-100 text-green-700',
            Archived: 'bg-gray-100 text-gray-600',
            Escalated: 'bg-red-100 text-red-700',
        }[status] || 'bg-gray-100 text-gray-600';

        const dotColors = {
            New: 'bg-yellow-500',
            Pending: 'bg-blue-500',
            Closed: 'bg-green-500',
            Resolved: 'bg-green-500',
            Archived: 'bg-gray-500',
            Escalated: 'bg-red-500',
        }[status] || 'bg-gray-500';

        return (
            <div className="flex items-center gap-2">
                <span className={clsx("w-2 h-2 rounded-full", dotColors)}></span>
                <span className="text-[13px] text-[#1d1d1f] font-medium">{status}</span>
            </div>
        );
    };

    if (selectedTicketId) {
        return <TicketDetail ticketId={selectedTicketId} onBack={() => setSelectedTicketId(null)} />;
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">Elven Support</h2>
                    <p className="text-[17px] text-gray-500 font-normal">Advanced ticketing for customer care agents.</p>
                </div>
                {/* Actions Moved to Table */}
            </div>

            {/* SLA / Priority Legend Bar - Using Apple 'Inset Grouped' style look but horizontal */}
            <div className="flex items-center gap-4 py-3 px-4 bg-white/60 backdrop-blur-md border border-black/5 rounded-[18px]">
                <span className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide mr-2">SLA Status:</span>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#D4198C]/10 rounded-lg border border-[#D4198C]/10">
                    <span className="w-2 h-2 rounded-full bg-[#D4198C]"></span>
                    <span className="text-[12px] font-semibold text-[#D4198C]">Critical</span>
                    <span className="text-[11px] text-[#D4198C]/70 font-medium pl-1">16-24 hrs</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#EB754F]/10 rounded-lg border border-[#EB754F]/10">
                    <span className="w-2 h-2 rounded-full bg-[#EB754F]"></span>
                    <span className="text-[12px] font-semibold text-[#EB754F]">High</span>
                    <span className="text-[11px] text-[#EB754F]/70 font-medium pl-1">8-16 hrs</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#6B2B82]/10 rounded-lg border border-[#6B2B82]/10">
                    <span className="w-2 h-2 rounded-full bg-[#6B2B82]"></span>
                    <span className="text-[12px] font-semibold text-[#6B2B82]">Low</span>
                    <span className="text-[11px] text-[#6B2B82]/70 font-medium pl-1">0-8 hrs</span>
                </div>
            </div>

            {/* Filters & Search Table Header */}
            <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden">
                {/* Toolbox */}
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
                    {/* Search & Left Controls */}
                    <div className="flex items-center gap-3 flex-1">
                        <div className="relative group flex-1 max-w-xs">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#6B2B82] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search Tickets..."
                                className="pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-full text-[13px] text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#6B2B82] focus:border-transparent w-full transition-all shadow-sm placeholder:text-gray-400"
                            />
                        </div>
                        {/* Inline Filters */}
                        <div className="flex gap-2">
                            {['Status', 'Priority'].map(filter => (
                                <button key={filter} className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[12px] font-heading font-medium text-gray-600 hover:border-gray-300 hover:text-[#1d1d1f] transition-colors shadow-sm">
                                    {filter}
                                    <SlidersHorizontal className="w-3 h-3 text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[12px] font-heading font-medium text-[#1d1d1f] shadow-sm hover:bg-gray-50 transition-colors">
                            <Download className="w-3.5 h-3.5" />
                            Export
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#6B2B82] text-white rounded-full text-[12px] font-heading font-medium shadow-sm hover:bg-[#4A1D5A] transition-colors">
                            Create Ticket
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100/50">
                                <th className="py-3 px-6 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider w-16">Action</th>
                                <th className="py-3 px-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="py-3 px-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider">Date Created</th>
                                <th className="py-3 px-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider">Raised By</th>
                                <th className="py-3 px-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                                <th className="py-3 px-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider">Ticket ID</th>
                                <th className="py-3 px-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="py-3 px-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
                                <th className="py-3 px-4 text-[11px] font-heading font-semibold text-gray-500 uppercase tracking-wider">Assigned To</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {mockTickets.map((ticket) => (
                                <tr key={ticket.id} className="group hover:bg-blue-50/30 transition-colors">
                                    <td className="py-3 px-6">
                                        <button
                                            onClick={() => setSelectedTicketId(ticket.id)}
                                            className="p-1.5 text-gray-400 hover:text-[#6B2B82] hover:bg-[#6B2B82]/10 rounded-md transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className="text-[13px] font-medium text-[#1d1d1f] block truncate max-w-[200px]" title={ticket.subject}>
                                            {ticket.subject}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-[13px] text-gray-500">{ticket.dateCreated}</td>
                                    <td className="py-3 px-4 text-[13px] text-[#1d1d1f]">{ticket.raisedBy}</td>
                                    <td className="py-3 px-4">
                                        <PriorityBadge priority={ticket.priority} />
                                    </td>
                                    <td className="py-3 px-4 text-[13px] text-gray-600 font-mono">#{ticket.id}</td>
                                    <td className="py-3 px-4">
                                        <StatusBadge status={ticket.status} />
                                    </td>
                                    <td className="py-3 px-4 text-[13px] text-gray-500">{ticket.lastUpdated}</td>
                                    <td className="py-3 px-4 text-[13px]">
                                        {ticket.assignedTo === 'Unassigned' ? (
                                            <span className="text-gray-400 italic font-light">Unassigned</span>
                                        ) : (
                                            <span className="text-[#6B2B82] font-medium">{ticket.assignedTo}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/30">
                    <span className="text-[12px] text-gray-500">Rows per page: 20</span>
                    <div className="flex items-center gap-4 text-[12px] text-gray-500">
                        <span>1-7 of 13</span>
                        <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-gray-200 rounded-md disabled:opacity-30 transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded-md transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
