import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import type { Receipt } from '../../types';
import { BadgeCheck } from 'lucide-react';
import { StatsCard } from '../Dashboard/StatsCard';

interface FraudControlProps {
    receipts: Receipt[];
}

export const FraudControl: React.FC<FraudControlProps> = ({ receipts }) => {
    const fraudData = useMemo(() => {
        return receipts
            .filter(r => r.fraudScore > 80 || r.qualityIssue === 'Tampered')
            .sort((a, b) => b.fraudScore - a.fraudScore);
    }, [receipts]);

    const fraudTrend = useMemo(() => {
        return Array.from({ length: 7 }).map((_, i) => ({
            day: `Day ${i + 1}`,
            detected: Math.floor(Math.random() * 20),
            prevented: Math.floor(Math.random() * 15)
        }));
    }, []);

    // Apple HIG: Lists should be clean with dividers, clear hierarchy.
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6">
                <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">Fraud Control</h2>
                <p className="text-[17px] text-gray-500 font-normal">Real-time risk monitoring and intervention.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="High Risk Receipts"
                    value={fraudData.length}
                    tooltip="Receipts flagged for immediate review"
                    type="negative"
                />
                <StatsCard
                    title="Value At Risk"
                    value={`$${fraudData.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}`}
                    tooltip="Total monetary value of potential fraud"
                />
                <StatsCard
                    title="False Positive Rate"
                    value="1.2%"
                    tooltip="Rate of incorrectly flagged legitimate receipts"
                    change={-0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Fraud History Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5">
                    <div className="mb-6">
                        <h3 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">Fraud Detection History</h3>
                        <p className="text-[13px] text-gray-500">7-day rolling window of activity</p>
                    </div>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={fraudTrend}>
                                <defs>
                                    <linearGradient id="fraudGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4198C" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#D4198C" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="preventedGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6B2B82" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6B2B82" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                                <XAxis
                                    dataKey="day"
                                    tick={{ fill: '#86868B', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    tick={{ fill: '#86868B', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dx={-10}
                                />
                                <RechartsTooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                        fontFamily: '-apple-system',
                                        fontSize: '13px'
                                    }}
                                />
                                <Area type="monotone" dataKey="detected" stroke="#D4198C" strokeWidth={2} fill="url(#fraudGradient)" name="Detected" />
                                <Area type="monotone" dataKey="prevented" stroke="#6B2B82" strokeWidth={2} fill="url(#preventedGradient)" name="Prevented" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Priority Queue List (Apple Mail / Settings list style) */}
                <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="text-[15px] font-semibold text-[#1d1d1f]">Priority Review Queue</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[400px]">
                        <ul className="divide-y divide-gray-100">
                            {fraudData.slice(0, 6).map(r => (
                                <li key={r.id} className="p-4 hover:bg-[#6B2B82]/5 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-semibold text-[13px] text-[#1d1d1f]">#{r.id.toUpperCase()}</span>
                                        <span className="text-[11px] font-medium text-[#D4198C] bg-[#D4198C]/10 px-2 py-0.5 rounded-full">
                                            Score: {r.fraudScore}
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-gray-500 mb-2 truncate">Potential tampering detected</p>
                                    <div className="flex justify-end">
                                        <button className="text-[12px] font-medium text-[#6B2B82] hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                                            Inspect Receipt
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {fraudData.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-400">
                            <BadgeCheck className="w-12 h-12 mb-2 opacity-50 text-[#34C759]" />
                            <span className="text-sm">No high risk items</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
