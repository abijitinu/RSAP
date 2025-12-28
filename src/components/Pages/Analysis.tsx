import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import type { Receipt } from '../../types';

interface AnalysisProps {
    receipts: Receipt[];
}

export const Analysis: React.FC<AnalysisProps> = ({ receipts }) => {
    const storePerformance = useMemo(() => {
        const stores: Record<string, { total: number, count: number }> = {};
        receipts.forEach(r => {
            if (!stores[r.storeName]) stores[r.storeName] = { total: 0, count: 0 };
            stores[r.storeName].total += r.amount;
            stores[r.storeName].count += 1;
        });
        return Object.entries(stores)
            .map(([name, data]) => ({ name, sales: data.total, receipts: data.count }))
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 8); // Top 8 only
    }, [receipts]);

    const timeDistribution = useMemo(() => {
        const hours = new Array(24).fill(0);
        receipts.forEach(r => {
            const h = new Date(r.date).getHours();
            hours[h]++;
        });
        return hours.map((count, hour) => ({ hour: `${hour}:00`, count }));
    }, [receipts]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6">
                <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">Analysis</h2>
                <p className="text-[17px] text-gray-500 font-normal">Deep dive into store performance and upload trends.</p>
            </div>

            <div className="bg-white p-8 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-tight">Store Performance</h3>
                        <p className="text-[14px] text-gray-500 mt-1">Sales volume vs transaction count by store</p>
                    </div>
                </div>

                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={storePerformance} barGap={8}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#86868B', fontSize: 11, fontWeight: 500 }}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                yAxisId="left"
                                orientation="left"
                                tick={{ fill: '#86868B', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(val) => `$${val}`}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                tick={{ fill: '#86868B', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <RechartsTooltip
                                cursor={{ fill: '#F5F5F7' }}
                                contentStyle={{
                                    borderRadius: '14px',
                                    border: 'none',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                    fontFamily: '-apple-system',
                                    fontSize: '13px'
                                }}
                            />
                            <Bar yAxisId="left" dataKey="sales" fill="#6B2B82" name="Sales ($)" radius={[6, 6, 0, 0]} maxBarSize={50} />
                            <Bar yAxisId="right" dataKey="receipts" fill="#EB754F" name="Receipt Count" radius={[6, 6, 0, 0]} maxBarSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-tight">Upload Time Distribution</h3>
                        <p className="text-[14px] text-gray-500 mt-1">Peak processing hours (24h)</p>
                    </div>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timeDistribution}>
                            <defs>
                                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6B2B82" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#6B2B82" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                            <XAxis
                                dataKey="hour"
                                tick={{ fill: '#86868B', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                interval={3}
                                dy={10}
                            />
                            <YAxis
                                tick={{ fill: '#86868B', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <RechartsTooltip
                                contentStyle={{
                                    borderRadius: '14px',
                                    border: 'none',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                    fontFamily: '-apple-system',
                                    fontSize: '13px'
                                }}
                            />
                            <Area type="monotone" dataKey="count" stroke="#6B2B82" strokeWidth={3} fill="url(#colorTime)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
