import React, { useState } from 'react';
import { Check, Package, CreditCard, ChevronRight, Plus, Minus, Info } from 'lucide-react';
import clsx from 'clsx';
import { StatsCard } from '../Dashboard/StatsCard'; // Reusing for consistency style if needed, or custom

export const Subscription: React.FC = () => {
    const [extraBlocks, setExtraBlocks] = useState(1);

    // Mock Data
    const purchaseHistory = [
        { id: 1, plan: 'Basic', type: 'Monthly Quota', volume: 5000, blocks: 0, date: '01/02/2025' },
        { id: 2, plan: 'Basic', type: 'Additional Block', volume: 2500, blocks: 1, date: '15/02/2025' },
        { id: 3, plan: 'Basic', type: 'Additional Block', volume: 5000, blocks: 2, date: '20/02/2025' },
    ];

    const plans = [
        {
            name: 'Basic Plan',
            price: '$299',
            period: '/mo',
            current: true,
            features: {
                receipts: '5,000 receipts',
                additional: '2,500 receipts/block',
                limit: '5 blocks max',
                retailers: 'Walmart, Target',
                support: 'Standard'
            }
        },
        {
            name: 'Standard Plan',
            price: '$599',
            period: '/mo',
            current: false,
            features: {
                receipts: '25,000 receipts',
                additional: '10,000 receipts/block',
                limit: '10 blocks max',
                retailers: 'Top 50 US Retailers',
                support: 'Priority (12h)'
            }
        },
        {
            name: 'Enterprise Plan',
            price: 'Custom',
            period: '',
            current: false,
            features: {
                receipts: 'Unlimited',
                additional: 'Unlimited',
                limit: 'No limit',
                retailers: 'All Global Retailers',
                support: 'Dedicated Manager'
            }
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6">
                <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">Subscription</h2>
                <p className="text-[17px] text-gray-500 font-normal">Manage your plan, quotas, and billing.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Status & Quota */}
                <div className="lg:col-span-5 space-y-8">

                    {/* Current Plan Card */}
                    <div className="bg-white p-6 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Current Plan</h3>
                                <div className="text-[32px] font-semibold text-[#1d1d1f] tracking-tight flex items-center gap-3">
                                    Basic Plan
                                    <span className="px-3 py-1 bg-[#6B2B82]/10 text-[#6B2B82] text-[11px] font-bold rounded-full uppercase tracking-wide">Active</span>
                                </div>
                                <p className="text-[15px] text-gray-500 mt-1">Renews on Mar 1, 2025 • 4 days remaining</p>
                            </div>
                            <button className="px-5 py-2 bg-[#6B2B82] text-white text-[13px] font-medium rounded-full shadow-sm hover:bg-[#4A1D5A] transition-colors">
                                Upgrade
                            </button>
                        </div>
                    </div>

                    {/* Quota & Add-ons */}
                    <div className="bg-white p-6 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5">
                        <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide mb-4">Usage & Quota</h3>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-[13px] font-medium text-[#1d1d1f] mb-2">
                                <span>2,500 / 5,000 used</span>
                                <span className="text-gray-500">50%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#6B2B82] w-1/2 rounded-full shadow-sm"></div>
                            </div>
                        </div>

                        {/* Buy Extra Blocks */}
                        <div className="p-5 bg-[#F5F5F7] rounded-[18px] border border-black/5">
                            <div className="flex items-center gap-2 mb-2">
                                <Package className="w-4 h-4 text-[#6B2B82]" />
                                <h4 className="text-[15px] font-semibold text-[#1d1d1f]">Buy Additional Quota</h4>
                            </div>
                            <p className="text-[13px] text-gray-500 mb-4">Need more scans? Add blocks of 2,500 receipts to your current cycle.</p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center bg-white rounded-lg p-1 border border-black/5 shadow-sm">
                                    <button
                                        onClick={() => setExtraBlocks(Math.max(1, extraBlocks - 1))}
                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#1d1d1f] hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center text-[15px] font-semibold tabular-nums">{extraBlocks}</span>
                                    <button
                                        onClick={() => setExtraBlocks(Math.min(5, extraBlocks + 1))}
                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#1d1d1f] hover:bg-gray-50 rounded-md transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[11px] text-gray-500 font-medium">TOTAL (2,500 x {extraBlocks})</span>
                                    <div className="flex items-center gap-3 justify-end">
                                        <span className="text-[17px] font-semibold text-[#1d1d1f]">${extraBlocks * 50}</span>
                                        <button className="px-4 py-1.5 bg-[#1d1d1f] text-white text-[13px] font-medium rounded-full shadow-sm hover:bg-black transition-colors">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Purchase History */}
                    <div className="bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide">Purchase History</h3>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/30 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Volume</th>
                                    <th className="px-6 py-3 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-[13px] text-[#1d1d1f]">
                                {purchaseHistory.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{item.type}</td>
                                        <td className="px-6 py-4 text-gray-500">+{item.volume.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right text-gray-400 font-mono">{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: Plans Comparison */}
                <div className="lg:col-span-7 bg-white rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden flex flex-col">
                    <div className="p-8 border-b border-gray-100">
                        <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-tight">Plan Comparison</h3>
                        <p className="text-[15px] text-gray-500 mt-1">Upgrade seamlessly as you scale.</p>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="p-6 w-1/4"></th>
                                    {plans.map(plan => (
                                        <th key={plan.name} className="p-6 w-1/4">
                                            <div className="flex flex-col items-center text-center">
                                                <div className={clsx(
                                                    "mb-4 w-12 h-12 rounded-[14px] flex items-center justify-center bg-gray-50 border border-gray-100 shadow-sm text-gray-400",
                                                    plan.current && "bg-[#6B2B82]/10 border-[#6B2B82]/20 text-[#6B2B82]"
                                                )}>
                                                    {plan.name.includes('Basic') ? <Package className="w-6 h-6" /> :
                                                        plan.name.includes('Enterprise') ? <CreditCard className="w-6 h-6" /> : <Package className="w-6 h-6" />}
                                                </div>
                                                <span className="text-[15px] font-bold text-[#1d1d1f] mb-1">{plan.name}</span>
                                                <span className="text-[13px] text-gray-500">{plan.price} <span className="font-normal text-gray-400">{plan.period}</span></span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-[13px]">
                                {[
                                    { label: 'Receipt Volume', key: 'receipts' },
                                    { label: 'Add-on Block Size', key: 'additional' },
                                    { label: 'Add-on Limits', key: 'limit' },
                                    { label: 'Retailer Support', key: 'retailers' },
                                    { label: 'Support Level', key: 'support' }
                                ].map((row) => (
                                    <tr key={row.key} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6 font-medium text-gray-500 bg-gray-50/30 group-hover:bg-gray-50/50">{row.label}</td>
                                        {plans.map(plan => (
                                            <td key={plan.name} className="p-6 text-center text-[#1d1d1f] font-medium border-l border-gray-100 first:border-l-0">
                                                {/* @ts-ignore */}
                                                {plan.features[row.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
