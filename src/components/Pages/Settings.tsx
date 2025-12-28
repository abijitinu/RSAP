import React, { useState } from 'react';

export const Settings: React.FC = () => {
    const [ocrThreshold, setOcrThreshold] = useState(90);
    const [autoRejectFraud, setAutoRejectFraud] = useState(true);

    const Toggle = ({ checked, onChange }: any) => (
        <div
            onClick={() => onChange(!checked)}
            className={`w-[51px] h-[31px] rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${checked ? 'bg-[#6B2B82]' : 'bg-[#E9E9EA]'}`}
        >
            <div className={`w-[27px] h-[27px] bg-white rounded-full shadow-sm transform transition-transform duration-300 ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`}></div>
        </div>
    );

    return (
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6">
                <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">Settings</h2>
                <p className="text-[17px] text-gray-500 font-normal">Manage system automation and preferences.</p>
            </div>

            {/* Automation Rules Group */}
            <div className="space-y-2">
                <h3 className="ml-4 text-[13px] font-normal text-gray-500 uppercase tracking-wide">Automation Configuration</h3>
                <div className="bg-white rounded-[18px] shadow-sm border border-black/5 overflow-hidden">

                    {/* List Item 1 */}
                    <div className="p-4 flex items-center justify-between border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <div className="flex-1 pr-8">
                            <p className="text-[17px] text-[#1d1d1f] font-normal">OCR Confidence Threshold</p>
                            <p className="text-[13px] text-gray-500 mt-0.5 max-w-sm">Receipts below this score are sent for manual review.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[17px] font-normal text-gray-500 w-10 text-right">{ocrThreshold}%</span>
                            <div className="w-32">
                                <input
                                    type="range"
                                    min="50"
                                    max="100"
                                    value={ocrThreshold}
                                    onChange={(e) => setOcrThreshold(Number(e.target.value))}
                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6B2B82]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* List Item 2 */}
                    <div className="p-4 flex items-center justify-between border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <div className="flex-1 pr-8">
                            <p className="text-[17px] text-[#1d1d1f] font-normal">Auto-Reject High Risk</p>
                            <p className="text-[13px] text-gray-500 mt-0.5">Automatically reject receipts with fraud probability &gt; 80%.</p>
                        </div>
                        <Toggle checked={autoRejectFraud} onChange={setAutoRejectFraud} />
                    </div>
                </div>
            </div>

            {/* Notifications Group */}
            <div className="space-y-2">
                <h3 className="ml-4 text-[13px] font-normal text-gray-500 uppercase tracking-wide">Notifications</h3>
                <div className="bg-white rounded-[18px] shadow-sm border border-black/5 overflow-hidden divide-y divide-gray-100">
                    {['Daily Digest Email', 'Real-time Fraud Alerts', 'System Maintenance Updates'].map((item) => (
                        <div key={item} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <span className="text-[17px] text-[#1d1d1f] font-normal">{item}</span>
                            <Toggle checked={true} onChange={() => { }} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button className="px-6 py-2 bg-[#6B2B82] text-white text-[15px] font-medium rounded-full shadow-sm hover:bg-[#4A1D5A] transition-colors active:scale-95 transform">
                    Save Preferences
                </button>
            </div>
        </div>
    );
};
