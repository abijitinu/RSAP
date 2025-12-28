import React from 'react';
import { FileText, Download, Calendar, ArrowRight } from 'lucide-react';

export const Reports: React.FC = () => {
    const reports = [
        { name: 'Monthly Sales Summary', date: 'Oct 2023', size: '2.4 MB', type: 'PDF' },
        { name: 'Fraud Analysis Report', date: 'Oct 2023', size: '1.1 MB', type: 'XLSX' },
        { name: 'Store Performance Audit', date: 'Sep 2023', size: '5.6 MB', type: 'PDF' },
        { name: 'Quarterly OCR Accuracy', date: 'Q3 2023', size: '3.2 MB', type: 'PDF' },
        { name: 'Year End Financials', date: '2022', size: '12.4 MB', type: 'ZIP' },
    ];

    // Apple Style: Collection View / Grid with clean icons
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">Reports</h2>
                    <p className="text-[17px] text-gray-500 font-normal">Access system generated analytics.</p>
                </div>
                <button className="px-4 py-2 bg-[#6B2B82] text-white text-[13px] font-medium rounded-full shadow-sm hover:bg-[#4A1D5A] transition-colors">
                    Generate New
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {reports.map((report) => (
                    <div key={report.name} className="bg-white p-5 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-[16px] flex items-center justify-center mb-4 shadow-sm border border-black/5 group-hover:from-[#6B2B82]/10 group-hover:to-blue-50 transition-colors">
                            <FileText className="w-8 h-8 text-gray-400 group-hover:text-[#6B2B82] transition-colors" strokeWidth={1.5} />
                        </div>

                        <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-1 line-clamp-1 w-full">{report.name}</h3>

                        <div className="flex items-center gap-2 text-[12px] text-gray-500 mb-4">
                            <span>{report.date}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>{report.size}</span>
                        </div>

                        <button className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 hover:bg-gray-200 text-[#1d1d1f] w-8 h-8 rounded-full flex items-center justify-center">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {/* 'Create New' Placeholder Card */}
                <div className="border border-dashed border-gray-300 rounded-[22px] flex flex-col items-center justify-center p-6 text-gray-400 hover:border-[#6B2B82] hover:text-[#6B2B82] hover:bg-[#6B2B82]/5 transition-all cursor-pointer h-full min-h-[200px]">
                    <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-3">
                        <Download className="w-5 h-5" />
                    </div>
                    <span className="text-[13px] font-medium">Custom Report</span>
                </div>
            </div>
        </div>
    );
};
