"use client"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Usage = () => {
  const balanceData = [
    {
      assetName: "USDC",
      assetImg: "/USDC.svg",
      balance: "8,000",
      marketValue: "$7,979",
      netProfit: "2.53%",
    },
    {
      assetName: "USDT",
      assetImg: "/usdt.svg",
      balance: "3,000",
      marketValue: "$2,999",
      netProfit: "1.99%",
    },
    {
      assetName: "DAI",
      assetImg: "/dai.svg",
      balance: "2,000",
      marketValue: "$2,001",
      netProfit: "0.13%",
    },
  ];

  const powerLeft = 60;
  
  return (
    <div className="bg-black py-6 w-full border border-[#ff4d00] rounded-lg">
      <div className="text-[16px] px-6 mb-1">
        <h3>Your Usage</h3>
      </div>
      <div className="flex justify-between items-center border-y text-white/50 text-[11px] p-1 mb-6">
        <h4 className="p-1">
          Total Collateral: <span className="pl-1">$12,345.67</span>
        </h4>
        <h4 className="p-1">
          Total Borrowed: <span className="pl-1">$1,259.43</span>
        </h4>
      </div>
    
       <div className="flex flex-col items-center mb-4 relative">
        
        <div style={{ width: 290, height: 290 }}>
            <CircularProgressbar
            value={powerLeft}
            counterClockwise
            maxValue={100}
            styles={buildStyles({
                pathColor: `rgba(255, 0, 0, ${powerLeft / 100})`,
                trailColor: "#EFEFEF",
            })}
            />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center gap-3">
            <div className="text-[#FB3B52] text-lg border border-[#FB3B52] bg-white pl-[6px] pr-1 rounded-2xl flex items-center">
            <span className="font-extrabold pr-[2px]">
                <img src={"/Vector.svg"} alt={"arrow"} className="w-3" />
            </span>
            {powerLeft}%
            </div>
            <p className="text-[10.5px]">Borrow Power Left</p>
        </div>
        </div>

      <div className="px-4 mb-2">
        <table className="min-w-full text-[10px] text-center">
          <thead>
          </thead>
          <tbody>
            {balanceData.map((item, index) => (
              <tr key={index} className="text-white/50">
                <td className="pt-3 flex gap-1 items-center text-start text-white">
                  <img src={item.assetImg} alt={item.assetName} className="w-4" />
                  <span>{item.assetName}</span>
                </td>
                <td className="pt-2">{item.balance}</td>
                <td className="pt-2">{item.marketValue}</td>
                <td className="pt-2">
                  {item.netProfit}
                </td>
                <td className="pt-2 flex justify-center">
                  <div className="text-white/90 bg-[#2A2A2ACC] w-fit px-2 py-1 text-center rounded-lg cursor-pointer">
                    Repay
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 w-4/6 m-auto mt-1">
        <button className="bg-[#FF4D00] text-xs rounded-xl font-normal w-full py-3">
            Create Order
        </button>
      </div>
    </div>
  );
};

export default Usage;