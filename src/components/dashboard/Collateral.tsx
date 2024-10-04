import Image from "next/image";
import { Btn } from "../shared/Btn";

const Collateral = () => {
  // Array of assets with their details
  const balanceData = [
    {
      assetName: "USDC",
      assetImg: "/USDC.svg",
      balance: "7,979",
     
    },
    {
      assetName: "ETH",
      assetImg: "/eth.svg",
      balance: "4,525 ",
    },
    {
      assetName: "USDT",
      assetImg: "/usdt.svg",
      balance: "4,525 ",
      },
    {
      assetName: "DAI",
      assetImg: "/dai.svg",
      balance: "4,525 ",
      },
    {
      assetName: "LINK",
      assetImg: "/link.svg",
      balance: "4,525 ",
    },
  ];

  return (
    <div className="bg-black py-6 w-full rounded-lg"
        style = {{
            boxShadow: '0 0 5px 5px rgba(255, 255, 255, 0.1)',
        }}
    >
        <div className="text-xl px-6 mb-3">
            <h3>Deposit Collateral</h3>
        </div>
        <div className="px-6">
        <table className="min-w-full text-center text-[10px] sm:text-[12px] ">
                <thead>
                    <tr className="text-center">
                    <th className="py-2 text-start">Asset</th>
                    <th className="py-2 text-center">Wallet Balance</th>
                    <th className="py-2 text-center">Collateral</th>
                    </tr>
                </thead>
                <tbody>
                    {balanceData.map((item, index) => (
                    <tr key={index} className="text-center text-[10px]">
                        <td className="pt-3 flex gap-1 items-center text-start">
                            <img src={item.assetImg} alt={item.assetName} className="w-4" />
                            <span>{item.assetName}</span>
                        </td>
                        <td className="pt-2">{item.balance}</td>
                        <td className="pt-2">
                        <div className="flex flex-col items-center">
                            <Image
                            src={"/mark.svg"}
                            alt="tick"
                            width={12}
                            height={9}
                            priority
                            quality={100}
                            />
                        </div>
                        </td>
                        <td className="pt-2">
                          <Btn text='Deposit'
                          />
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Collateral;
