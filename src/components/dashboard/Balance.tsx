import Image from "next/image";
import { Btn } from "../shared/Btn";

const Balance = () => {
  const balanceData = [
    {
      assetName: "USDC",
      assetImg: "/USDC.svg",
      balance: "8,000",
      marketValue: "$7,979",
      netProfit: "2.53%",
      netProfitColor: "text-green-500",
      collateralImg: "/toggleOn.svg",
      collateralStatus: "On",
    },
    {
      assetName: "ETH",
      assetImg: "/eth.svg",
      balance: "1.75",
      marketValue: "$4,525",
      netProfit: "12.30%",
      netProfitColor: "text-green-500",
      collateralImg: "/toggleOff.svg",
      collateralStatus: "Off",
    },
  ];

  return (
    <div className="bg-black py-6 w-full custom-corner-header">
      <div className="text-xl px-6 mb-1">
        <h3>Your Balances</h3>
      </div>

      {/* Summary Section */}
      <div className="flex justify-between border-y text-white/50 text-xs p-1 mb-2">
        <h4 className="p-1 sm:p-0">
          Total Bal: <span className="pl-1">$12,345.67</span>
        </h4>
        <h4 className="p-1 sm:p-0 text-right sm:text-left">
          Max Withdrawal: <span className="pl-1">$2,345.67</span>
        </h4>
      </div>

      {/* Scrollable Table for mobile */}
      <div className="px-4 overflow-x-auto">
        <table className="min-w-full text-[12px]">
          <thead>
            <tr className="text-center">
              <th className="py-2">Asset</th>
              <th className="py-2">Balance</th>
              <th className="py-2">Value</th>
              <th className="py-2">Intrest</th>
              <th className="py-2 hidden sm:table-cell">Collateral</th> {/* Hidden on mobile */}
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {balanceData.map((item, index) => (
              <tr key={index} className="text-center text-[10px] sm:text-[12px]">
                {/* Asset */}
                <td className=" flex flex-wrap items-center gap-2 justify-center pt-[13px]">
                  <img src={item.assetImg} alt={item.assetName} className="w-6 h-6" />
                  <span>{item.assetName}</span>
                </td>
                {/* Balance */}
                <td className="pt-2">{item.balance}</td>
                {/* Market Value */}
                <td className="pt-2">{item.marketValue}</td>
                {/* Net Profit */}
                <td className={`pt-2 ${item.netProfitColor}`}>
                  {item.netProfit}
                </td>
                {/* Collateral Toggle (Hidden on mobile) */}
                <td className="pt-2 hidden sm:table-cell">
                  <div className="flex justify-center">
                    <Image
                      src={item.collateralImg}
                      alt={`Collateral ${item.collateralStatus}`}
                      width={20}
                      height={8.5}
                      priority
                      quality={100}
                    />
                  </div>
                </td>
                {/* Deposit and Withdraw */}
                <td className="pt-2">
                  <div className="flex justify-center gap-2">
                    <Btn text="Deposit" />
                    <Btn text="Withdraw" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Balance;
