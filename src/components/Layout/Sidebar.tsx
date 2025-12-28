import React from 'react';
import { LayoutDashboard, ReceiptText, BarChart3, Settings, ShieldCheck, PieChart, CreditCard, Users, PanelLeftClose, PanelLeftOpen, Tag } from 'lucide-react';
import clsx from 'clsx';
import rsapLogo from '../../assets/rsap_logo.png';

interface SidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isCollapsed, toggleSidebar }) => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'Analysis', icon: PieChart },
        { name: 'Receipts', icon: ReceiptText },
        { name: 'Fraud Control', icon: ShieldCheck },
        { name: 'Ticketing System', icon: Users },
        { name: 'Offer List', icon: Tag },
        { name: 'Reports', icon: BarChart3 },
        { name: 'Subscription', icon: CreditCard },
        { name: 'Settings', icon: Settings },
    ];

    return (
        <aside className={clsx(
            "flex flex-col h-screen fixed left-0 top-0 border-r border-black/5 font-sans z-50 bg-[#F5F5F7]/80 backdrop-blur-2xl transition-all duration-300 ease-in-out",
            isCollapsed ? "w-[80px]" : "w-[260px]"
        )}>
            {/* Logo Area */}
            <div className={clsx("h-14 flex items-center mt-2 transition-all", isCollapsed ? "justify-center px-0" : "px-6")}>
                <a
                    href="https://www.abijit.com/project-sales-portal.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#1d1d1f] font-semibold text-base tracking-tight opacity-90 hover:opacity-100 transition-opacity"
                >
                    <img src={rsapLogo} alt="RSAP Logo" className="h-8 w-auto object-contain" />
                    {!isCollapsed && (
                        <div className="flex flex-col leading-none animate-in fade-in duration-300">
                            <span className="font-heading font-bold text-lg">RSAP</span>
                            <span className="text-[9px] text-[#86868B] font-medium tracking-wide">Receipt Sales Analysis Portal</span>
                        </div>
                    )}
                </a>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
                {!isCollapsed && (
                    <div className="px-3 mb-2 text-[11px] font-heading font-semibold text-gray-500/80 uppercase tracking-widest pl-3 animate-in fade-in duration-300">
                        Main
                    </div>
                )}
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActivePage(item.name)}
                        title={isCollapsed ? item.name : undefined}
                        className={clsx(
                            'w-full flex items-center transition-all text-[13.5px] font-medium leading-tight group relative',
                            isCollapsed ? 'justify-center p-2 rounded-xl mb-2' : 'gap-3 px-3 py-1.5 rounded-lg',
                            activePage === item.name
                                ? 'bg-[#6B2B82] text-white shadow-sm'
                                : 'text-[#1d1d1f]/80 hover:bg-black/5 active:bg-black/10'
                        )}
                    >
                        <item.icon
                            className={clsx(
                                "transition-colors",
                                isCollapsed ? "w-6 h-6" : "w-[18px] h-[18px]",
                                activePage === item.name ? "text-white" : "text-[#1d1d1f]/60"
                            )}
                            strokeWidth={isCollapsed ? 1.5 : 2}
                        />
                        {!isCollapsed && <span className="whitespace-nowrap overflow-hidden animate-in fade-in duration-200">{item.name}</span>}

                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                                {item.name}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            {/* Collapse Toggle Button */}
            <div className="p-3 border-t border-black/5">
                <button
                    onClick={toggleSidebar}
                    className="w-full flex items-center justify-center p-2 text-gray-500 hover:bg-black/5 rounded-lg transition-colors"
                >
                    {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                </button>
            </div>
        </aside>
    );
};
