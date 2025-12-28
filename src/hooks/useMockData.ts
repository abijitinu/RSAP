import { useState, useMemo } from 'react';
import type { Receipt, Tenant, Program, QualityIssue, ReceiptStatus, ProductItem, Comment } from '../types';

const TENANTS: Tenant[] = [
    { id: 't1', name: 'MegaMart' },
    { id: 't2', name: 'QuickShop' },
    { id: 't3', name: 'FashionHub' },
    { id: 't4', name: 'TechStore' },
];

const PROGRAMS: Program[] = [
    { id: 'p1', name: 'Summer Savings', tenantId: 't1' },
    { id: 'p2', name: 'Back to School', tenantId: 't1' },
    { id: 'p3', name: 'Loyalty Rewards', tenantId: 't2' },
    { id: 'p4', name: 'Holiday Special', tenantId: 't3' },
    { id: 'p5', name: 'New Year Promo', tenantId: 't4' },
];

const QUALITY_ISSUES: QualityIssue[] = [
    'Start/End Date Missing',
    'Blurry Image',
    'Cut-off Receipt',
    'Tampered',
    'Alignment Issue',
    'Duplicate',
];

const STORES = ['Store #101', 'Store #205', 'Store #88', 'Central Branch', 'Northside', 'Airport Kiosk'];

const PRODUCT_NAMES = [
    'PAMPERS SUPR BX SZ4', 'Coca Cola 12pk', 'Milk 1 Gallon', 'Eggs Dozen',
    'Whole Wheat Bread', 'Bananas 1lb', 'Apple iPhone Case', 'USB-C Cable',
    'Notebook 5-Subject', 'Gel Pens 12ct'
];

const generateReceipts = (count: number): Receipt[] => {
    const receipts: Receipt[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
        const tenant = TENANTS[Math.floor(Math.random() * TENANTS.length)];
        const program = PROGRAMS[Math.floor(Math.random() * PROGRAMS.length)];
        const date = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
        const amount = Math.floor(Math.random() * 20000) / 100 + 5;
        const ocrScore = Math.floor(Math.random() * 30) + 70;
        const fraudScore = Math.floor(Math.random() * 100);

        let status: ReceiptStatus;
        let qualityIssue: QualityIssue = 'None';

        if (ocrScore >= 90) status = Math.random() > 0.05 ? 'Auto Accept' : 'Manual Accept';
        else status = Math.random() > 0.1 ? 'Auto Reject' : 'Manual Reject';

        if (status.includes('Reject')) qualityIssue = QUALITY_ISSUES[Math.floor(Math.random() * QUALITY_ISSUES.length)];
        if (fraudScore > 80) { status = 'Auto Reject'; qualityIssue = 'Tampered'; }

        // Generate Detailed Data
        const products: ProductItem[] = [];
        const numProducts = Math.floor(Math.random() * 5) + 1;
        for (let j = 0; j < numProducts; j++) {
            products.push({
                id: `sku-${i}-${j}`,
                skuName: PRODUCT_NAMES[Math.floor(Math.random() * PRODUCT_NAMES.length)],
                skuId: `${Math.floor(Math.random() * 100000000)}`,
                price: parseFloat((Math.random() * 50).toFixed(2)),
                status: Math.random() > 0.3 ? 'matched' : (Math.random() > 0.5 ? 'unmatched' : 'not-extracted'),
                confidence: Math.random() > 0.8 ? 'high' : 'medium'
            });
        }

        const comments: Comment[] = [];
        if (status.includes('Manual')) {
            comments.push({
                id: `c-${i}`,
                user: 'John Doe',
                text: 'Reviewing alignment issues manually.',
                timeAgo: '2 hrs ago',
                type: 'Manual Review'
            });
        }

        receipts.push({
            id: `r-${i}`,
            tenantId: tenant.id,
            programId: program.id,
            date,
            amount,
            ocrScore,
            fraudScore,
            status,
            qualityIssue,
            storeName: STORES[Math.floor(Math.random() * STORES.length)],
            validationTimeMs: Math.floor(Math.random() * 2000) + 500,

            // Detailed properties
            retailerAddress: `${Math.floor(Math.random() * 999)} Main St`,
            retailerCity: 'Carterville',
            retailerPostalCode: '56425',
            consumerId: '456789987',
            quota: '5000/5000 used',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.',

            scores: {
                receiptDetection: Math.floor(Math.random() * 30) + 70,
                alignmentDetection: Math.floor(Math.random() * 30) + 70,
                isComplete: Math.floor(Math.random() * 100),
                notTampered: 100 - fraudScore,
                ocr: ocrScore,
                overall: Math.floor((ocrScore + (100 - fraudScore)) / 2)
            },
            products,
            comments
        });
    }
    return receipts;
};

export const useMockData = () => {
    // Generate once
    const allReceipts = useMemo(() => generateReceipts(1500), []);

    const [filters, setFilters] = useState<{
        tenantId: string;
        programId: string;
        dateRange: string;
    }>({
        tenantId: 'all',
        programId: 'all',
        dateRange: '30d',
    });

    const filteredReceipts = useMemo(() => {
        let result = allReceipts;
        if (filters.tenantId !== 'all') result = result.filter(r => r.tenantId === filters.tenantId);
        if (filters.programId !== 'all') result = result.filter(r => r.programId === filters.programId);

        const now = new Date();
        const days = filters.dateRange === '7d' ? 7 : filters.dateRange === '90d' ? 90 : 30;
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        result = result.filter(r => new Date(r.date) >= cutoff);
        return result;
    }, [allReceipts, filters]);

    return {
        tenants: TENANTS,
        programs: PROGRAMS,
        receipts: filteredReceipts,
        filters,
        setFilter: (key: keyof typeof filters, value: string) => setFilters(prev => ({ ...prev, [key]: value })),
    };
};
