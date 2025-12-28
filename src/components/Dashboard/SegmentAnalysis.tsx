import React, { useMemo } from 'react';
import type { Receipt } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { StatsCard } from './StatsCard';

interface SegmentAnalysisProps {
    receipts: Receipt[];
}

export const SegmentAnalysis: React.FC<SegmentAnalysisProps> = ({ receipts }) => {
    const metrics = useMemo(() => {
        const avgOcr = receipts.reduce((sum, r) => sum + r.ocrScore, 0) / receipts.length;
        const fraudCases = receipts.filter(r => r.fraudScore > 80).length;
        const avgValidation = receipts.reduce((sum, r) => sum + r.validationTimeMs, 0) / receipts.length;

        return {
            avgOcr,
            fraudCases,
            avgValidation,
        };
    }, [receipts]);

    const qualityIssuesData = useMemo(() => {
        const issues: Record<string, number> = {};
        receipts.forEach(r => {
            if (r.qualityIssue !== 'None') {
                const label = r.qualityIssue === 'Tampered' ? `Fraud: ${r.qualityIssue}` : `Quality: ${r.qualityIssue}`;
                issues[label] = (issues[label] || 0) + 1;
            }
        });
        return Object.entries(issues)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [receipts]);

    const ocrDistribution = useMemo(() => {
        const buckets: Record<string, number> = { '<70': 0, '70-80': 0, '80-90': 0, '90-100': 0 };
        receipts.forEach(r => {
            if (r.ocrScore < 70) buckets['<70']++;
            else if (r.ocrScore < 80) buckets['70-80']++;
            else if (r.ocrScore < 90) buckets['80-90']++;
            else buckets['90-100']++;
        });
        return Object.entries(buckets).map(([range, count]) => ({ range, count }));
    }, [receipts]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Avg OCR Confidence"
                    value={`${metrics.avgOcr.toFixed(1)}%`}
                    tooltip="Average confidence score"
                />
                <StatsCard
                    title="Potential Fraud"
                    value={metrics.fraudCases}
                    type="negative"
                    tooltip="High fraud probability cases"
                />
                <StatsCard
                    title="Avg Validation Time"
                    value={`${metrics.avgValidation.toFixed(0)}ms`}
                    tooltip="System validation speed"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Rejection Reasons */}
                <div className="bg-apple-card p-8 rounded-3xl shadow-apple border border-white hover:shadow-apple-hover transition-all duration-500">
                    <h3 className="text-lg font-semibold text-apple-text mb-8 tracking-tight">Rejection Insights</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={qualityIssuesData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E5EA" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    width={140}
                                    tick={{ fontSize: 11, fill: '#86868B', fontWeight: 500, fontFamily: 'Aller, Mulish, sans-serif' }}
                                    interval={0}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <RechartsTooltip
                                    cursor={{ fill: '#F5F5F7' }}
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                        fontFamily: 'Aller, Mulish, sans-serif'
                                    }}
                                />
                                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                                    {qualityIssuesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name.includes('Fraud') ? '#D4198C' : '#EB754F'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* OCR Score Dist */}
                <div className="bg-apple-card p-8 rounded-3xl shadow-apple border border-white hover:shadow-apple-hover transition-all duration-500">
                    <h3 className="text-lg font-semibold text-apple-text mb-8 tracking-tight">OCR Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ocrDistribution} barSize={40}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                                <XAxis
                                    dataKey="range"
                                    tick={{ fill: '#86868B', fontSize: 11, fontWeight: 500, fontFamily: 'Aller, Mulish, sans-serif' }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    tick={{ fill: '#86868B', fontSize: 11, fontWeight: 500, fontFamily: 'Aller, Mulish, sans-serif' }}
                                    axisLine={false}
                                    tickLine={false}
                                    dx={-10}
                                />
                                <RechartsTooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                        fontFamily: 'Aller, Mulish, sans-serif'
                                    }}
                                />
                                <Bar dataKey="count" fill="#6B2B82" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};
