import React, { useState } from 'react';
import { Calendar, Search, AlertTriangle, CheckSquare, Square, Save } from 'lucide-react';
import clsx from 'clsx';

export const CreateOffer: React.FC = () => {
    // Mock Data for Dropdowns
    const tenants = ['Tenant A', 'Tenant B', 'Tenant C'];
    const programs = ['Program X', 'Program Y', 'Program Z'];
    const offerTypes = ['Discount', 'BOGO', 'Cashback'];
    const statuses = ['Draft', 'Active', 'Inactive'];

    // Mock Data for Product Master
    const productMaster = [
        { id: 1, brand: 'Pampers', category: 'Baby', subCategory: 'Pampers Cruisers', name: 'Diapers Size 4, 186 Count - Pampers Baby Dry Disposable Baby Diapers, ONE MONTH SUPPLY', skuId: 'SKU001' },
        { id: 2, brand: 'Pampers', category: 'Baby', subCategory: 'Dry Diapers', name: 'Pampers Baby Wipes, Complete Clean Fresh Scent, 1X Pop-Top, 72 ct', skuId: 'SKU002' },
        { id: 3, brand: 'Pampers', category: 'Baby', subCategory: 'Night Diapers', name: 'Baby Diapers Size 5, 132 Count - Pampers Swaddlers, ONE MONTH SUPPLY (Packaging May Vary)', skuId: 'SKU003' },
        { id: 4, brand: 'Pampers', category: 'Baby', subCategory: 'Dry Diapers', name: 'Pampers Baby Wipes, Complete Clean Fresh Scent, 1X Pop-Top, 72 ct', skuId: 'SKU004' },
        { id: 5, brand: 'Pampers', category: 'Baby', subCategory: 'Night Diapers', name: 'Diapers Size 4, 186 Count - Pampers Baby Dry Disposable Baby Diapers, ONE MONTH SUPPLY', skuId: 'SKU005' },
    ];

    const retailers = ['amazon', 'Walmart', 'Kroger', 'Walgreens'];

    // State
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);

    const toggleProduct = (id: number) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(pid => pid !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    const toggleRetailer = (retailer: string) => {
        if (selectedRetailers.includes(retailer)) {
            setSelectedRetailers(selectedRetailers.filter(r => r !== retailer));
        } else {
            setSelectedRetailers([...selectedRetailers, retailer]);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header & Breadcrumbs */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center bg-white p-4 rounded-[12px] shadow-sm border border-black/5">
                    <div className="flex items-center gap-2 text-[13px] font-medium text-gray-500 uppercase tracking-wide">
                        <span>Offer List</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-[#6B2B82]">Create Offer</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">CREATE OFFER</h2>
                    <button className="px-6 py-2 bg-[#6B2B82] text-white text-[13px] font-bold rounded-[8px] shadow-sm hover:bg-[#4A1D5A] transition-colors tracking-wide">
                        SAVE
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* LEFT COLUMN: DETAILS & RULES */}
                <div className="xl:col-span-4 space-y-6">
                    {/* OFFER DETAILS CARD */}
                    <div className="bg-white p-6 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-[15px] font-bold text-gray-600 uppercase tracking-wider">Offer Details</h3>
                            <div className="w-1/3">
                                <select className="w-full text-[13px] border border-gray-200 rounded-md p-2 text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#6B2B82]">
                                    <option>Status</option>
                                    {statuses.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <select className="w-full text-[13px] border border-gray-200 rounded-md p-2.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#6B2B82]">
                                    <option>Tenant</option>
                                    {tenants.map(t => <option key={t}>{t}</option>)}
                                </select>
                                <select className="w-full text-[13px] border border-gray-200 rounded-md p-2.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#6B2B82]">
                                    <option>Program</option>
                                    {programs.map(p => <option key={p}>{p}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Offer Name" className="w-full text-[13px] border border-gray-200 rounded-md p-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6B2B82]" />
                                <select className="w-full text-[13px] border border-gray-200 rounded-md p-2.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#6B2B82]">
                                    <option>Offer Type</option>
                                    {offerTypes.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <input type="text" placeholder="Start Date" className="w-full text-[13px] border border-gray-200 rounded-md p-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6B2B82]" />
                                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                </div>
                                <div className="relative">
                                    <input type="text" placeholder="End Date" className="w-full text-[13px] border border-gray-200 rounded-md p-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6B2B82]" />
                                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            <textarea
                                placeholder="Description"
                                rows={4}
                                className="w-full text-[13px] border border-gray-200 rounded-md p-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6B2B82] resize-none"
                            ></textarea>

                            <input type="text" placeholder="Loyalty Id" className="w-1/2 text-[13px] border border-gray-200 rounded-md p-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6B2B82]" />

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Created By" className="w-full text-[13px] border border-gray-200 rounded-md p-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6B2B82]" />
                                <input type="text" placeholder="Created Date" className="w-full text-[13px] border border-gray-200 rounded-md p-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#6B2B82]" />
                            </div>
                        </div>
                    </div>

                    {/* RULES CARD */}
                    <div className="bg-white p-6 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5">
                        <h3 className="text-[15px] font-bold text-gray-600 uppercase tracking-wider mb-6">Rules</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 relative group focus-within:ring-1 focus-within:ring-[#6B2B82] focus-within:border-[#6B2B82]">
                                    <label className="text-[10px] text-gray-500 absolute -top-2 left-2 bg-white px-1">Min Bill Amount ($)</label>
                                    <input type="number" defaultValue={20} className="w-full text-[13px] font-medium text-gray-900 focus:outline-none p-0 border-none" />
                                </div>
                                <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 relative group focus-within:ring-1 focus-within:ring-[#6B2B82] focus-within:border-[#6B2B82]">
                                    <label className="text-[10px] text-gray-500 absolute -top-2 left-2 bg-white px-1">Max Bill Amount ($)</label>
                                    <input type="number" defaultValue={20} className="w-full text-[13px] font-medium text-gray-900 focus:outline-none p-0 border-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 relative group focus-within:ring-1 focus-within:ring-[#6B2B82] focus-within:border-[#6B2B82]">
                                    <label className="text-[10px] text-gray-500 absolute -top-2 left-2 bg-white px-1">Min Quantity</label>
                                    <input type="number" defaultValue={4} className="w-full text-[13px] font-medium text-gray-900 focus:outline-none p-0 border-none" />
                                </div>
                                <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 relative group focus-within:ring-1 focus-within:ring-[#6B2B82] focus-within:border-[#6B2B82]">
                                    <label className="text-[10px] text-gray-500 absolute -top-2 left-2 bg-white px-1">Max Quantity</label>
                                    <input type="number" defaultValue={4} className="w-full text-[13px] font-medium text-gray-900 focus:outline-none p-0 border-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 relative group focus-within:ring-1 focus-within:ring-[#6B2B82] focus-within:border-[#6B2B82]">
                                    <label className="text-[10px] text-gray-500 absolute -top-2 left-2 bg-white px-1">Offer Avail Limit</label>
                                    <input type="number" defaultValue={3} className="w-full text-[13px] font-medium text-gray-900 focus:outline-none p-0 border-none" />
                                </div>
                                <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 relative group focus-within:ring-1 focus-within:ring-[#6B2B82] focus-within:border-[#6B2B82]">
                                    <label className="text-[10px] text-gray-500 absolute -top-2 left-2 bg-white px-1">Cashback ($)</label>
                                    <input type="number" defaultValue={20} className="w-full text-[13px] font-medium text-gray-900 focus:outline-none p-0 border-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-200 rounded-md px-3 py-1.5 relative group focus-within:ring-1 focus-within:ring-[#6B2B82] focus-within:border-[#6B2B82]">
                                    <label className="text-[10px] text-gray-500 absolute -top-2 left-2 bg-white px-1">Budget ($)</label>
                                    <input type="number" defaultValue={20} className="w-full text-[13px] font-medium text-gray-900 focus:outline-none p-0 border-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: LISTS */}
                <div className="xl:col-span-8 space-y-6">
                    {/* PRODUCT MASTER LIST */}
                    <div className="bg-white p-6 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5">
                        <h3 className="text-[15px] font-bold text-gray-600 uppercase tracking-wider mb-6">Product Master List</h3>

                        {/* Filters */}
                        <div className="flex gap-3 mb-6">
                            <select className="flex-1 bg-gray-50 border border-gray-200 text-gray-600 text-[13px] rounded-md px-3 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#6B2B82]">
                                <option>Brand</option>
                            </select>
                            <select className="flex-1 bg-gray-50 border border-gray-200 text-gray-600 text-[13px] rounded-md px-3 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#6B2B82]">
                                <option>Category</option>
                            </select>
                            <select className="flex-1 bg-gray-50 border border-gray-200 text-gray-600 text-[13px] rounded-md px-3 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#6B2B82]">
                                <option>Sub Category</option>
                            </select>
                            <div className="flex-[1.5] relative">
                                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="SKU Name" className="w-full pl-8 pr-3 py-2 bg-white border border-[#6B2B82] rounded-md text-[13px] focus:outline-none text-[#6B2B82] placeholder:text-[#6B2B82]" />
                            </div>
                            <div className="flex-[1.5] relative">
                                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" placeholder="SKU ID" className="w-full pl-8 pr-3 py-2 bg-white border border-[#6B2B82] rounded-md text-[13px] focus:outline-none text-[#6B2B82] placeholder:text-[#6B2B82]" />
                            </div>
                            <input type="text" placeholder="Price" className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6B2B82]" />
                        </div>

                        {/* Table */}
                        <div className="overflow-hidden border border-gray-100 rounded-lg">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 w-10">
                                            <div className="w-4 h-4 border-2 border-gray-300 rounded-[4px]"></div>
                                        </th>
                                        <th className="py-3 px-2 text-[12px] font-bold text-[#6B2B82] uppercase tracking-wide">Brand</th>
                                        <th className="py-3 px-2 text-[12px] font-bold text-[#6B2B82] uppercase tracking-wide">Category</th>
                                        <th className="py-3 px-2 text-[12px] font-bold text-[#6B2B82] uppercase tracking-wide">SubCategory</th>
                                        <th className="py-3 px-2 text-[12px] font-bold text-[#6B2B82] uppercase tracking-wide">SKU Name</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {productMaster.map((p) => (
                                        <tr key={p.id} className="hover:bg-[#6B2B82]/5 transition-colors cursor-pointer" onClick={() => toggleProduct(p.id)}>
                                            <td className="p-4">
                                                <div className={clsx(
                                                    "w-4 h-4 border-2 rounded-[4px] flex items-center justify-center transition-colors",
                                                    selectedProducts.includes(p.id) ? "border-[#6B2B82] bg-[#6B2B82]" : "border-gray-300 bg-white"
                                                )}>
                                                    {selectedProducts.includes(p.id) && <CheckSquare className="w-3 h-3 text-white" />}
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-[13px] text-gray-500 font-medium">{p.brand}</td>
                                            <td className="py-3 px-2 text-[13px] text-gray-500">{p.category}</td>
                                            <td className="py-3 px-2 text-[13px] text-gray-500">{p.subCategory}</td>
                                            <td className="py-3 px-2 text-[13px] text-gray-500 truncate max-w-[300px]" title={p.name}>{p.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* SELECTED OFFER PRODUCT LIST */}
                    <div className="bg-white p-6 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5 min-h-[200px] flex flex-col">
                        <h3 className="text-[15px] font-bold text-gray-600 uppercase tracking-wider mb-6">Selected Offer Product List</h3>

                        {selectedProducts.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-[#6B2B82] py-12 bg-gray-50/30 rounded-xl border-2 border-dashed border-gray-100">
                                <AlertTriangle className="w-5 h-5 mb-2" />
                                <span className="text-[13px] font-medium">There are no records to display right now</span>
                            </div>
                        ) : (
                            <div className="overflow-hidden border border-gray-100 rounded-lg">
                                {/* Simple selected list view */}
                                <table className="w-full text-left">
                                    <thead className="bg-[#6B2B82]/5 border-b border-[#6B2B82]/10">
                                        <tr>
                                            <th className="py-3 px-4 text-[12px] font-bold text-[#6B2B82] uppercase tracking-wide">Brand</th>
                                            <th className="py-3 px-4 text-[12px] font-bold text-[#6B2B82] uppercase tracking-wide">SKU Name</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {productMaster.filter(p => selectedProducts.includes(p.id)).map(p => (
                                            <tr key={p.id}>
                                                <td className="py-3 px-4 text-[13px] font-medium text-gray-600">{p.brand}</td>
                                                <td className="py-3 px-4 text-[13px] text-gray-500">{p.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* APPLICABLE RETAILERS */}
                    <div className="bg-white p-6 rounded-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/5">
                        <h3 className="text-[15px] font-bold text-gray-600 uppercase tracking-wider mb-6">Applicable Retailers</h3>
                        <div className="flex gap-4">
                            {retailers.map(r => (
                                <div
                                    key={r}
                                    onClick={() => toggleRetailer(r)}
                                    className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg min-w-[140px] cursor-pointer hover:border-[#6B2B82]/30 transition-colors"
                                >
                                    {/* Mock Logos (using text for now if image not avail, but styling to look like image placeholders) */}
                                    <span className={clsx(
                                        "font-bold text-lg tracking-tight",
                                        r === 'amazon' ? "text-black" :
                                            r === 'Walmart' ? "text-blue-600" :
                                                r === 'Kroger' ? "text-blue-800" : "text-red-600"
                                    )}>
                                        {r}
                                    </span>

                                    <div className={clsx(
                                        "w-5 h-5 border-2 rounded-[4px] flex items-center justify-center transition-colors",
                                        selectedRetailers.includes(r) ? "border-[#6B2B82] bg-[#6B2B82]" : "border-gray-300 bg-white"
                                    )}>
                                        {selectedRetailers.includes(r) && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
