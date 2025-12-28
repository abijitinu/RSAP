export type ReceiptStatus = 'Auto Accept' | 'Manual Accept' | 'Auto Reject' | 'Manual Reject';

export type QualityIssue =
    | 'Start/End Date Missing'
    | 'Blurry Image'
    | 'Cut-off Receipt'
    | 'Tampered'
    | 'Alignment Issue'
    | 'Duplicate'
    | 'None';

export interface Tenant {
    id: string;
    name: string;
}

export interface Program {
    id: string;
    name: string;
    tenantId: string;
}

export interface ScoreDetails {
    receiptDetection: number;
    alignmentDetection: number;
    isComplete: number;
    notTampered: number;
    ocr: number;
    overall: number;
}

export interface ProductItem {
    id: string;
    skuName: string;
    skuId: string;
    price: number;
    status: 'matched' | 'unmatched' | 'not-extracted';
    confidence: 'high' | 'medium' | 'low';
}

export interface Comment {
    id: string;
    user: string;
    text: string;
    timeAgo: string;
    type: 'Manual Review' | 'System';
}

export interface Receipt {
    id: string;
    tenantId: string;
    programId: string;
    date: string; // ISO date string
    amount: number;
    ocrScore: number;
    fraudScore: number; // 0-100, 100 being high probability of fraud
    status: ReceiptStatus;
    qualityIssue: QualityIssue;
    imageUrl?: string;
    storeName: string;
    validationTimeMs: number;

    // Detailed fields
    retailerAddress?: string;
    retailerCity?: string;
    retailerPostalCode?: string;
    consumerId?: string;
    scores?: ScoreDetails;
    products?: ProductItem[];
    comments?: Comment[];
    quota?: string;
    description?: string;
}

export interface DashboardMetrics {
    totalReceipts: number;
    autoApprovalRate: number;
    manualReviewRate: number;
    rejectionRate: number;
    averageProcessingTime: number;
    totalSalesVolume: number;
}
