import Image from "next/image";
import { History } from "./History";

const historyData = [
  {
    src: "/arrowD.svg",
    txName: "Collateral Deposit",
    id: 12453,
    date: "3 Jan 2024",
    tokenIcon: "/eth.svg",
    balance: "199,999",
  },
  {
    src: "/arrowUp.svg",
    txName: "Loan Repayment",
    id: 17856,
    date: "15 Jan 2024",
    tokenIcon: "/dai.svg",
    balance: "1,000.15",
  },
];

const TransactionHistory = () => {
  return (
    <div className="bg-black py-6 w-full px-6 font-[family-name:var(--font-outfit)]">
      <div className="flex w-full justify-between items-center pb-6">
        <h3 className="text-[22px] text-[#F6F6F6] font-medium">Transaction History</h3>
        <div className="flex gap-2 items-center">
          <div>
            <h3 className="text-base text-[#D8EE10] font-semibold">Export CSV</h3>
          </div>
          <Image src="/download.svg" alt="download" width={24} height={24} priority quality={100} />
        </div>
      </div>

      <div className="space-y-6">
        {historyData.map((item, index) => (
          <div
            key={item.id}
            className={`pb-6 ${index !== historyData.length - 1 ? 'border-b border-[#3E3E47]' : ''}`}
          >
            <History {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
