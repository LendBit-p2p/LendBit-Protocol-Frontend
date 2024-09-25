export type DashboardCardProps = {
  text: string;
  figure: string | number;
  extraCSS?: React.CSSProperties; 
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

export interface OrderCardProps {
  id: number;
  type: string;
  amount: string;
  token: string;
  date: string;
  icon1: string;
  icon2: string;
}