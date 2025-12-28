import React from 'react';
import { ArrowLeft, Send, ExternalLink, ChevronRight, Clock, User, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface TicketDetailProps {
    ticketId?: string;
    onBack: () => void;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({ ticketId = '45678909', onBack }) => {
    // Mock Data for the detail view
    const ticketInfo = {
        type: 'Miscellaneous',
        status: 'New',
        receiptId: '56425',
        consumerId: '56799425',
        program: 'Oral B Electric Brush',
        tenant: 'Oral B',
        priority: 'Critical',
        problemStatement: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        createdBy: 'Consumer Support Agent',
        createdDate: '19/02/2021 17:07:02',
        assignedTo: 'L1 Agent',
        assignedDate: '19/02/2021 17:07:02'
    };

    const ticketHistory = [
        { id: 1, modified: '1 Day ago', supportName: 'John William', comment: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.' },
        { id: 2, modified: '13 hours ago', supportName: 'Tom Jerry', comment: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.' },
        { id: 3, modified: '8 hours ago', supportName: 'Tom Jerry', comment: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.' },
    ];

    return (
        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Breadcrumb & Navigation */}
            <div className="flex items-center gap-2 mb-6 text-[13px] text-gray-500 font-medium">
                <button onClick={onBack} className="hover:text-[#6B2B82] transition-colors">Ticket List</button>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-[#1d1d1f]">Ticket Detail</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">
                    Ticket ID {ticketId}
                </h2>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#6B2B82] text-white rounded-full text-[13px] font-semibold shadow-sm hover:bg-[#4A1D5A] transition-all">
                    View Receipt
                    <ExternalLink className="w-3.5 h-3.5" />
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Ticket Info */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 relative overflow-hidden">

                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Ticket Info</h3>
                            <div className="flex items-center gap-2 px-3 py-1 bg-[#FF3B30]/10 rounded-full border border-[#FF3B30]/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30]"></span>
                                <span className="text-[11px] font-bold text-[#FF3B30] uppercase">Critical</span>
                            </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="space-y-1">
                                <label className="text-[11px] font-medium text-gray-500">Ticket Type</label>
                                <div className="p-2.5 bg-[#F5F5F7] rounded-lg text-[13px] font-medium text-[#1d1d1f] border border-black/5">
                                    {ticketInfo.type}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-medium text-gray-500">Status</label>
                                <div className="p-2.5 bg-[#F5F5F7] rounded-lg text-[13px] font-medium text-[#1d1d1f] border border-black/5 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                    {ticketInfo.status}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-medium text-gray-500">Receipt ID</label>
                                <div className="p-2.5 bg-[#F5F5F7] rounded-lg text-[13px] font-medium text-[#6B2B82] border border-black/5 cursor-pointer hover:bg-blue-50 transition-colors">
                                    #{ticketInfo.receiptId}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-medium text-gray-500">Consumer ID</label>
                                <div className="p-2.5 bg-[#F5F5F7] rounded-lg text-[13px] font-medium text-[#1d1d1f] border border-black/5">
                                    {ticketInfo.consumerId}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-medium text-gray-500">Program</label>
                                <div className="p-2.5 bg-[#F5F5F7] rounded-lg text-[13px] font-medium text-[#1d1d1f] border border-black/5 truncate">
                                    {ticketInfo.program}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-medium text-gray-500">Tenant</label>
                                <div className="p-2.5 bg-[#F5F5F7] rounded-lg text-[13px] font-medium text-[#1d1d1f] border border-black/5">
                                    {ticketInfo.tenant}
                                </div>
                            </div>
                        </div>

                        {/* Problem Statement */}
                        <div className="mb-6 space-y-1">
                            <label className="text-[11px] font-medium text-gray-500">Problem Statement</label>
                            <div className="p-4 bg-[#F5F5F7] rounded-xl text-[13px] leading-relaxed text-[#1d1d1f] border border-black/5 min-h-[140px] text-justify">
                                {ticketInfo.problemStatement}
                            </div>
                        </div>

                        {/* Metadata Footer */}
                        <div className="grid grid-cols-2 gap-y-4 pt-4 border-t border-black/5">
                            <div>
                                <div className="text-[11px] font-semibold text-gray-400">Created By</div>
                                <div className="text-[12px] font-medium text-[#1d1d1f]">{ticketInfo.createdBy}</div>
                            </div>
                            <div>
                                <div className="text-[11px] font-semibold text-gray-400">Created Date</div>
                                <div className="text-[12px] font-medium text-[#1d1d1f] tabular-nums">{ticketInfo.createdDate}</div>
                            </div>
                            <div>
                                <div className="text-[11px] font-semibold text-gray-400">Assigned To</div>
                                <div className="text-[12px] font-medium text-[#1d1d1f]">{ticketInfo.assignedTo}</div>
                            </div>
                            <div>
                                <div className="text-[11px] font-semibold text-gray-400">Assigned Date</div>
                                <div className="text-[12px] font-medium text-[#1d1d1f] tabular-nums">{ticketInfo.assignedDate}</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Column: Key History / Chat */}
                <div className="lg:col-span-7 h-full flex flex-col">
                    <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 flex-1 flex flex-col overflow-hidden h-[calc(100vh-180px)] min-h-[600px]">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Ticket History</h3>
                        </div>

                        {/* Scrollable History Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Table Header like labels */}
                            <div className="flex px-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                                <div className="w-32">Modified</div>
                                <div className="w-40">Support Name</div>
                                <div className="flex-1">Comment</div>
                            </div>

                            {ticketHistory.map((item) => (
                                <div key={item.id} className="group relative">
                                    <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0">
                                        <div className="w-32 text-[12px] font-medium text-[#1d1d1f] opacity-80 pt-1">{item.modified}</div>
                                        <div className="w-40 text-[13px] font-semibold text-[#1d1d1f] pt-1">{item.supportName}</div>
                                        <div className="flex-1 text-[13px] leading-relaxed text-gray-600">{item.comment}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-[#F5F5F7] border-t border-black/5">
                            <div className="flex items-end gap-3 bg-white p-2 rounded-2xl shadow-sm border border-black/5 focus-within:ring-2 focus-within:ring-[#6B2B82]/20 transition-all">
                                <select className="h-10 px-3 bg-[#F5F5F7] rounded-xl text-[13px] font-medium text-[#1d1d1f] border-none outline-none cursor-pointer hover:bg-gray-200 transition-colors">
                                    <option>Status</option>
                                    <option>Closed</option>
                                    <option>Pending</option>
                                    <option>Escalated</option>
                                </select>
                                <textarea
                                    className="flex-1 max-h-32 py-2.5 px-2 bg-transparent border-none outline-none text-[14px] placeholder:text-gray-400 resize-none min-h-[44px]"
                                    placeholder="Type a response..."
                                    rows={1}
                                />
                                <button className="w-10 h-10 flex items-center justify-center bg-[#6B2B82] text-white rounded-full hover:bg-[#4A1D5A] transition-colors shadow-sm mb-0.5">
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </div>
                            <div className="px-4 py-2 flex justify-between items-center">
                                <span className="text-[11px] text-gray-400">Press Enter to send</span>
                                <div className="flex gap-2">
                                    {/* Action buttons could go here */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
