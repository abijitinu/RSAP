import React from 'react';
import { Filter, Calendar, Building2, Tag, ChevronDown } from 'lucide-react';
import type { Tenant, Program } from '../../types';

interface FilterBarProps {
    tenants: Tenant[];
    programs: Program[];
    filters: {
        tenantId: string;
        programId: string;
        dateRange: string;
    };
    setFilter: (key: any, value: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ tenants, programs, filters, setFilter }) => {

    // Helper component for Apple-style dropdowns
    const Select = ({ icon: Icon, value, onChange, options, minWidth = '160px' }: any) => (
        <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none">
                <Icon className="w-3.5 h-3.5" strokeWidth={2} />
            </div>
            <select
                value={value}
                onChange={onChange}
                className={`pl-9 pr-8 py-1.5 bg-white ring-1 ring-black/5 hover:ring-black/15 active:ring-black/20 rounded-lg text-[13px] font-medium text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#6B2B82] min-w-[${minWidth}] appearance-none cursor-pointer transition-all shadow-sm`}
            >
                {options}
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown className="w-3 h-3" strokeWidth={2.5} />
            </div>
        </div>
    );

    return (
        <div className="bg-apple-bg/80 backdrop-blur-md px-10 py-4 flex items-center justify-end gap-3 flex-wrap z-30 sticky top-16">
            <div className="flex items-center gap-2 text-apple-subtext text-xs font-heading font-semibold uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-black/10 mx-2"></div>

            <Select
                icon={Building2}
                value={filters.tenantId}
                onChange={(e: any) => setFilter('tenantId', e.target.value)}
                minWidth="180px"
                options={
                    <>
                        <option value="all">All Tenants</option>
                        {tenants.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </>
                }
            />

            <Select
                icon={Tag}
                value={filters.programId}
                onChange={(e: any) => setFilter('programId', e.target.value)}
                minWidth="180px"
                options={
                    <>
                        <option value="all">All Programs</option>
                        {programs
                            .filter(p => filters.tenantId === 'all' || p.tenantId === filters.tenantId)
                            .map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </>
                }
            />

            <Select
                icon={Calendar}
                value={filters.dateRange}
                onChange={(e: any) => setFilter('dateRange', e.target.value)}
                minWidth="160px"
                options={
                    <>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 90 Days</option>
                    </>
                }
            />
        </div>
    );
};
