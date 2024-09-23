import Image from "next/image";

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
      <div className="text-[16px] px-6 mb-1">
        <h3>Your Balances</h3>
      </div>
      <div className="flex justify-between items-center border-y text-white/50 text-[11px] p-1 mb-2">
        <h4 className="p-1">
          Total Balance: <span className="pl-1">$12,345.67</span>
        </h4>
        <h4 className="p-1">
          Max Withdrawal: <span className="pl-1">$2,345.67</span>
        </h4>
      </div>
      <div className="px-4">
        <table className="min-w-full text-[10.5px]">
          <thead>
            <tr className="text-center">
              <th className="py-2">Asset</th>
              <th className="py-2">Balance</th>
              <th className="py-2">Market Value</th>
              <th className="py-2">Net Profit</th>
              <th className="py-2">Collateral</th>
            </tr>
          </thead>
          <tbody>
            {balanceData.map((item, index) => (
              <tr key={index} className="text-center text-[10px]">
                {/* Asset */}
                <td className="pt-3 flex gap-1 items-center">
                  <img src={item.assetImg} alt={item.assetName} className="w-4" />
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
                {/* Collateral Toggle */}
                <td className="pt-2">
                  <div className="flex flex-col items-center">
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
                    <div className="bg-[#2A2A2ACC] px-2 py-1 rounded-lg cursor-pointer">
                      Deposit
                    </div>
                    <div className="bg-[#2A2A2ACC] px-2 py-1 rounded-lg cursor-pointer">
                      Withdraw
                    </div>
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
