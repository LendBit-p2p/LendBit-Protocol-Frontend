export type DashboardCardProps = {
  text: string;
  figure: string | number;
  extraCSS?: string; 
  icon?: React.ReactNode; 
};

export interface HistoryProps {
  src: string;
  txName: string;
  id: number;
  date: string;
  tokenIcon: string;
  balance: string;
}

export type OrderCardProps = {
  id: number;
  type: string;
  amount: string;
  token: string;
  date: string;
  icon1: string;
  icon2: string;
  isSelected?: boolean;
  style?: React.CSSProperties;
  cardGradient: string;
}

export type ErrorWithReason = {
  reason?: string;
  message?: string;
};

export interface AssetSelectorProps {
  onTokenSelect: (token: string, tokenPrice: number) => void;
  onAssetValueChange: (value: string) => void;
  assetValue: string; // Controlled by the parent
  userAddress?: string | null; // The user's connected wallet address
}

export interface LoanListing {
  listingId: number;
  author: string;
  tokenAddress: string;
  amount: string;
  min_amount: string;
  max_amount: string;
  returnDate: number;
  interest: number;
  listingStatus: string; 
}

export interface Request {
    requestId: number;
    author: string;
    amount: string;
    interest: number;
    totalRepayment: string;
    returnDate: number;
    lender: string;
    loanRequestAddr: string;
    status: string; // Use string to represent OPEN, SERVICED, or CLOSED
}
