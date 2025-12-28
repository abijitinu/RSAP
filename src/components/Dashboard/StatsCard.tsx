import React from 'react';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import clsx from 'clsx';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: number;
    tooltip: string;
    type?: 'neutral' | 'positive' | 'negative';
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, tooltip, type = 'neutral' }) => {
    return (
        <div className="bg-white p-5 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 relative group">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-aller font-semibold text-gray-500 uppercase tracking-wide leading-none">{title}</span>

                {/* SF Symbol Style Info Icon */}
                <div className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-help">
                    <Tooltip content={tooltip}>
                        <Info className="w-4 h-4" />
                    </Tooltip>
                </div>
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2 mb-1">
                <span className={clsx(
                    "text-[32px] font-chevin font-bold tracking-tight leading-snug",
                    type === 'negative' ? 'text-[#FF3B30]' : 'text-[#1d1d1f]'
                )}>
                    {value}
                </span>
            </div>

            {/* Change Indicator */}
            {change !== undefined && (
                <div className="flex items-center gap-1.5 mt-auto">
                    <div className={clsx(
                        "flex items-center justify-center w-5 h-5 rounded-full",
                        change >= 0 ? "bg-[#34C759]/10" : "bg-[#FF3B30]/10"
                    )}>
                        {change >= 0 ? (
                            <ArrowUp className="w-3 h-3 text-[#34C759]" strokeWidth={3} />
                        ) : (
                            <ArrowDown className="w-3 h-3 text-[#FF3B30]" strokeWidth={3} />
                        )}
                    </div>
                    <span className={clsx(
                        "text-[13px] font-chevin font-medium",
                        change >= 0 ? "text-[#34C759]" : "text-[#FF3B30]"
                    )}>
                        {Math.abs(change)}%
                        <span className="text-gray-400 font-aller font-normal ml-1">vs last month</span>
                    </span>
                </div>
            )}
        </div>
    );
};
