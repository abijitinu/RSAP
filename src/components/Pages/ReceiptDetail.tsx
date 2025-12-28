import React, { useMemo } from 'react';
import { ChevronLeft, Maximize2, Image as ImageIcon, CheckCircle, AlertCircle, ShoppingBag, Tag, CreditCard } from 'lucide-react';
import type { Receipt } from '../../types';
import clsx from 'clsx';
import { StatsCard } from '../Dashboard/StatsCard'; // Re-use simpler cards for KPIs if needed or build custom

interface ReceiptDetailProps {
    receipt: Receipt;
    onBack: () => void;
}

export const ReceiptDetail: React.FC<ReceiptDetailProps> = ({ receipt, onBack }) => {

    const ScoreRing = ({ score }: { score: number }) => {
        const radius = 36;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (score / 100) * circumference;
        const isGood = score >= 80;
        const isAvg = score >= 60 && score < 80;
        const color = isGood ? 'text-emerald-500' : isAvg ? 'text-amber-500' : 'text-red-500';

        return (
            <div className="relative flex items-center justify-center w-32 h-32">
                <svg className="transform -rotate-90 w-full h-full">
                    <circle cx="50%" cy="50%" r={radius} stroke="#E5E5EA" strokeWidth="8" fill="transparent" />
                    <circle cx="50%" cy="50%" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className={clsx(color, "transition-all duration-1000 ease-out")}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-bold text-apple-text tracking-tight">{score}</span>
                    <span className="text-[10px] font-medium text-apple-subtext uppercase tracking-wide mt-1">Score</span>
                </div>
            </div>
        );
    };

    const DetailRow = ({ label, value, highlight = false }: any) => (
        <div className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 group">
            <span className="text-sm text-apple-subtext font-medium">{label}</span>
            <span className={clsx("text-sm font-medium", highlight ? "text-apple-blue" : "text-apple-text")}>{value}</span>
        </div>
    );

    const ProgressBar = ({ label, value, colorClass = 'bg-amber-500' }: { label: string, value: number, colorClass?: string }) => (
        <div className="mb-4 group">
            <div className="flex justify-between text-xs font-semibold text-apple-subtext mb-1.5 uppercase tracking-wide">
                <span>{label}</span>
                <span className="text-apple-text">{value}%</span>
            </div>
            <div className="w-full bg-apple-bg rounded-full h-2 overflow-hidden">
                <div className={clsx("h-full rounded-full transition-all duration-1000 ease-out", colorClass)} style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-6xl mx-auto">
            {/* Header / Nav */}
            <div className="mb-8 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center text-apple-blue font-medium text-sm hover:text-apple-blueHover transition-colors group"
                >
                    <ChevronLeft className="w-5 h-5 mr-0.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Receipts
                </button>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Image & Quick Stats */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Receipt Image Card */}
                    <div className="bg-white p-1 rounded-3xl shadow-apple border border-white relative group overflow-hidden">
                        <div className="bg-apple-bg/50 rounded-[22px] aspect-[3/4] flex items-center justify-center relative overflow-hidden">
                            {receipt.imageUrl ? (
                                <img src={receipt.imageUrl} alt="Receipt" className="w-full h-full object-contain" />
                            ) : (
                                <div className="flex flex-col items-center text-apple-subtext/50">
                                    <ImageIcon className="w-16 h-16 mb-4 opacity-50" strokeWidth={1} />
                                    <span className="text-sm font-medium">No Receipt Image</span>
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <button className="bg-white/90 text-apple-text px-6 py-2.5 rounded-full font-medium text-sm shadow-xl hover:scale-105 transition-transform backdrop-blur-md">
                                    View Original
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Overall Score Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-apple border border-white flex flex-col items-center justify-center relative overflow-hidden">
                        <h3 className="text-sm font-heading font-semibold text-apple-subtext uppercase tracking-wider mb-6">Confidence Score</h3>
                        <ScoreRing score={receipt.scores?.overall || 57} />
                        <div className="mt-6 flex gap-2">
                            <span className={clsx(
                                "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide",
                                receipt.status.includes('Accept') ? "bg-emerald-100 text-emerald-700" :
                                    receipt.status.includes('Reject') ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                            )}>
                                {receipt.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="lg:col-span-8 space-y-8">

                    {/* Primary Info */}
                    <div className="bg-white p-8 rounded-3xl shadow-apple border border-white">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-heading font-semibold text-apple-text tracking-tight mb-1">
                                    Receipt <span className="text-apple-subtext font-light">#{receipt.id.replace('r-', '000')}</span>
                                </h1>
                                <p className="text-apple-subtext">Processed on {new Date(receipt.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-heading font-bold text-apple-text tracking-tight">${receipt.amount.toFixed(2)}</p>
                                <p className="text-apple-subtext text-sm">Total Amount</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h4 className="text-xs font-heading font-bold text-apple-subtext uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Analysis Breakdown</h4>
                                <div className="space-y-1">
                                    <ProgressBar label="OCR Readability" value={receipt.ocrScore} colorClass={receipt.ocrScore > 80 ? "bg-emerald-500" : "bg-amber-500"} />
                                    <ProgressBar label="Fraud Check" value={receipt.scores?.notTampered || 85} colorClass="bg-emerald-500" />
                                    <ProgressBar label="Image Quality" value={receipt.scores?.receiptDetection || 70} colorClass="bg-blue-500" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-xs font-heading font-bold text-apple-subtext uppercase tracking-wider mb-4 border-b border-gray-50 pb-2">Merchant Details</h4>
                                <div className="space-y-0">
                                    <DetailRow label="Store Name" value={receipt.storeName} />
                                    <DetailRow label="Location" value="Carterville, NY" />
                                    <DetailRow label="Retailer ID" value="RET-8842" />
                                    <DetailRow label="Category" value="Grocery / Retail" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Extracted Items Table */}
                    <div className="bg-white rounded-3xl shadow-apple border border-white overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                            <h3 className="text-lg font-heading font-semibold text-apple-text tracking-tight">Line Items</h3>
                            <button className="text-xs font-medium text-apple-blue hover:underline">Download CSV</button>
                        </div>
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50/30 border-b border-gray-100 text-apple-subtext font-heading font-semibold text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">SKU Description</th>
                                    <th className="px-6 py-4">Quantity</th>
                                    <th className="px-6 py-4 text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-apple-text">
                                {receipt.products?.map((prod, idx) => (
                                    <tr key={idx} className="hover:bg-apple-blue/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={clsx(
                                                    "w-2 h-2 rounded-full",
                                                    prod.status === 'matched' ? 'bg-emerald-500' : 'bg-amber-500'
                                                )} />
                                                <span className="text-xs text-apple-subtext font-medium group-hover:text-apple-text transition-colors capitalize">{prod.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium">{prod.skuName}</td>
                                        <td className="px-6 py-4 text-apple-subtext">1</td>
                                        <td className="px-6 py-4 text-right font-medium font-mono">${prod.price.toFixed(2)}</td>
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
