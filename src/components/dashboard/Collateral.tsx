import Image from "next/image";
import { Btn } from "../shared/Btn";
import { tokenData2 } from "@/constants/utils/tokenData2";

const Collateral = () => {
 

  return (
    <div className="bg-black py-6 w-full rounded-lg u-class-shadow-3"
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
                    {tokenData2.map((item, index) => (
                    <tr key={index} className="text-center text-[10px]">
                        <td className="pt-3 flex gap-1 items-center text-start">
                            <img src={item.icon} alt={item.icon} className="w-4" />
                            <span>{item.token}</span>
                        </td>
                        <td className="pt-2">{item.tokenPrice}</td>
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
