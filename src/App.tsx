import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { FilterBar } from './components/Layout/FilterBar';
import { ReceiptTopLine } from './components/Dashboard/ReceiptTopLine';
import { SegmentAnalysis } from './components/Dashboard/SegmentAnalysis';
import { Analysis } from './components/Pages/Analysis';
import { Receipts } from './components/Pages/Receipts';
import { ReceiptDetail } from './components/Pages/ReceiptDetail';
import { FraudControl } from './components/Pages/FraudControl';
import { Reports } from './components/Pages/Reports';
import { Subscription } from './components/Pages/Subscription';
import { Settings } from './components/Pages/Settings';
import { TicketingSystem } from './components/Pages/TicketingSystem';
import { CreateOffer } from './components/Pages/CreateOffer';
import { OfferList } from './components/Pages/OfferList';
import { useMockData } from './hooks/useMockData';
import type { Receipt } from './types';
import clsx from 'clsx';

function App() {
  const { tenants, programs, receipts, filters, setFilter } = useMockData();
  const [activePage, setActivePage] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState<'top-line' | 'segments'>('top-line');
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleViewReceipt = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
  };

  const handleBackToReceipts = () => {
    setSelectedReceipt(null);
  };

  const renderContent = () => {
    if (selectedReceipt) {
      return <ReceiptDetail receipt={selectedReceipt} onBack={handleBackToReceipts} />;
    }

    switch (activePage) {
      case 'Dashboard':
        return (
          <>
            {/* iOS Large Title Style */}
            <div className="pt-2 pb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <h2 className="text-[34px] leading-[41px] font-bold text-[#1d1d1f] tracking-tight">Dashboard</h2>
            </div>

            {/* Segmented Control - iOS Style */}
            <div className="mb-8">
              <div className="flex p-0.5 bg-[#EFEFF0] rounded-[9px] w-fit">
                <button
                  onClick={() => setActiveTab('top-line')}
                  className={clsx(
                    'px-8 py-1.5 rounded-[7px] text-[13px] font-medium transition-all duration-200 ease-out shadow-sm',
                    activeTab === 'top-line'
                      ? 'bg-white text-black shadow-sm ring-1 ring-black/5'
                      : 'text-gray-600 hover:text-black hover:bg-black/5 shadow-none'
                  )}
                >
                  Business Insights
                </button>
                <button
                  onClick={() => setActiveTab('segments')}
                  className={clsx(
                    'px-8 py-1.5 rounded-[7px] text-[13px] font-medium transition-all duration-200 ease-out shadow-sm',
                    activeTab === 'segments'
                      ? 'bg-white text-black shadow-sm ring-1 ring-black/5'
                      : 'text-gray-600 hover:text-black hover:bg-black/5 shadow-none'
                  )}
                >
                  Technical Insights
                </button>
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {activeTab === 'top-line' ? (
                <ReceiptTopLine receipts={receipts} />
              ) : (
                <SegmentAnalysis receipts={receipts} />
              )}
            </div>
          </>
        );
      case 'Analysis':
        return <Analysis receipts={receipts} />;
      case 'Receipts':
        return <Receipts receipts={receipts} onViewReceipt={handleViewReceipt} />;
      case 'Fraud Control':
        return <FraudControl receipts={receipts} />;
      case 'Reports':
        return <Reports />;
      case 'Settings':
        return <Settings />;
      case 'Subscription':
        return <Subscription />;
      case 'Ticketing System':
        return <TicketingSystem />;
      case 'Ticketing System':
        return <TicketingSystem />;
      case 'Offer List':
        return <OfferList onCreateOffer={() => setActivePage('Create Offer')} />;
      case 'Create Offer':
        return <CreateOffer />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex bg-[#F5F5F7] min-h-screen font-sans antialiased text-[#1d1d1f]">
      {/* Sidebar Width is dynamic */}
      <Sidebar
        activePage={activePage}
        setActivePage={(page) => { setActivePage(page); setSelectedReceipt(null); }}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area - offset dynamic */}
      <main className={clsx(
        "flex-1 flex flex-col min-h-screen relative isolation-auto transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "ml-[80px]" : "ml-[260px]"
      )}>
        <Header />

        {!selectedReceipt && activePage !== 'Settings' && activePage !== 'Reports' && (
          <FilterBar
            tenants={tenants}
            programs={programs}
            filters={filters}
            setFilter={setFilter}
          />
        )}

        <div className="p-10 max-w-[1600px] w-full mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
