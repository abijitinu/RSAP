import React, { useMemo } from 'react';
import type { Receipt } from '../../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { StatsCard } from './StatsCard';

interface ReceiptTopLineProps {
    receipts: Receipt[];
}

export const ReceiptTopLine: React.FC<ReceiptTopLineProps> = ({ receipts }) => {
    const metrics = useMemo(() => {
        const totalReceipts = receipts.length;
        const totalSales = receipts.reduce((sum, r) => sum + r.amount, 0);
        const autoApproved = receipts.filter(r => r.status === 'Auto Accept').length;
        const rejected = receipts.filter(r => r.status.includes('Reject')).length;

        return {
            totalReceipts,
            totalSales,
            autoRate: totalReceipts ? (autoApproved / totalReceipts) * 100 : 0,
            rejectRate: totalReceipts ? (rejected / totalReceipts) * 100 : 0,
        };
    }, [receipts]);

    const salesTrend = useMemo(() => {
        const grouped: Record<string, number> = {};
        receipts.forEach(r => {
            const d = new Date(r.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            grouped[d] = (grouped[d] || 0) + r.amount;
        });
        return Object.entries(grouped).map(([date, amount]) => ({ date, amount }));
    }, [receipts]);

    const statusData = useMemo(() => {
        const counts: Record<string, number> = {};
        receipts.forEach(r => {
            counts[r.status] = (counts[r.status] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [receipts]);

    const COLORS = ['#6B2B82', '#D4198C', '#EB754F', '#707072']; // Eminence, Vivid Cerise, Burnt Sienna, Dark Silver

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Sales"
                    value={`$${metrics.totalSales.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    change={12.5}
                    tooltip="Total value of processed receipts"
                />
                <StatsCard
                    title="Total Receipts"
                    value={metrics.totalReceipts}
                    change={5.2}
                    tooltip="Number of receipts uploaded"
                />
                <StatsCard
                    title="Auto-Approval"
                    value={`${metrics.autoRate.toFixed(1)}%`}
                    change={2.1}
                    tooltip="Straight through processing rate"
                />
                <StatsCard
                    title="Rejection Rate"
                    value={`${metrics.rejectRate.toFixed(1)}%`}
                    change={-1.5}
                    tooltip="Percentage of rejected receipts"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Volume Trend */}
                <div className="lg:col-span-2 bg-apple-card p-8 rounded-3xl shadow-apple border border-white hover:shadow-apple-hover transition-all duration-500">
                    <h3 className="text-lg font-semibold text-apple-text mb-8 tracking-tight">Sales Volume Trend</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesTrend}>
                                <defs>
                                    <linearGradient id="colorSalesApple" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6B2B82" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#6B2B82" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#86868B', fontSize: 11, fontWeight: 500, fontFamily: 'Aller, Mulish, sans-serif' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#86868B', fontSize: 11, fontWeight: 500, fontFamily: 'Aller, Mulish, sans-serif' }}
                                    tickFormatter={(value) => `$${value}`}
                                    dx={-10}
                                />
                                <RechartsTooltip
                                    cursor={{ stroke: '#6B2B82', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                        padding: '12px 16px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(8px)',
                                        fontFamily: 'Aller, Mulish, sans-serif'
                                    }}
                                    formatter={(value: any) => [`$${value?.toFixed(2) ?? '0.00'}`, 'Sales']}

                                />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#6B2B82"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSalesApple)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Processing Status */}
                <div className="bg-apple-card p-8 rounded-3xl shadow-apple border border-white hover:shadow-apple-hover transition-all duration-500 flex flex-col justify-between">
                    <h3 className="text-lg font-semibold text-apple-text mb-6 tracking-tight">Processing Status</h3>
                    <div className="h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={6}
                                    dataKey="value"
                                    cornerRadius={8}
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <RechartsTooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                        fontSize: '13px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <span className="block text-3xl font-bold text-apple-text tracking-tighter">{metrics.totalReceipts}</span>
                            <span className="text-xs font-medium text-apple-subtext uppercase tracking-wide">Receipts</span>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        {statusData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                    <span className="text-apple-subtext font-medium">{entry.name}</span>
                                </div>
                                <span className="font-semibold text-apple-text tabular-nums">{entry.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
