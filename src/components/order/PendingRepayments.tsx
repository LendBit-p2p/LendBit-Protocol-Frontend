import Image from "next/image";
import { Btn } from "../shared/Btn";

const paymentsData = [
  {
    assetName: "USDC",
    days: "4h 30m",
    balance: "$12,000",
  },
  {
    assetName: "USDC",
    days: "1d 1h 29m",
    balance: "$9,700",
  },
  {
    assetName: "USDC",
    days: "3d 23h 59m",
    balance: "$120",
  },
  {
    assetName: "USDC",
    days: "12d 1h 9m",
    balance: "$16,750",
  },
];

const PendingRepayments = () => {
  return (
    <div className="bg-black py-6 w-full px-6 font-[family-name:var(--font-outfit)]">
      <div className="flex w-full justify-between items-center pb-4">
        <h3 className="text-[22px] text-[#F6F6F6] font-medium">Pending Repayments</h3>
        <div>
          <Image
            src={"/Hhourglass.svg"}
            alt="Hhourglass"
            width={24}
            height={24}
            priority
            quality={100}
          />
        </div>
      </div>

      <div className="space-y-6">
        {paymentsData.map((item, index) => (
          <div key={index} className="flex justify-between gap-6 items-center w-full">
            <div className="text-[#C5C4C7] text-base font-normal w-2/5">
              {item.assetName}
            </div>
            <div className="w-1/5 font-normal">
              <Btn
                text="Repay"
                css="text-black bg-[#D8EE10] text-sm px-3"
              />
            </div>
            <div className="text-sm font-medium text-[#F6F6F6] w-1/5 text-center">
              {item.days}
            </div>
            <div className="text-sm font-medium text-[#F6F6F6] w-1/5 text-right">
              {item.balance}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingRepayments;
