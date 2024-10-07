import { Btn } from "@/components/shared/Btn";
import Image from "next/image";
import Link from "next/link";

export default function TransactPage() {


    return (
        <div className="bg-black rounded-md p-2">
            <p className="text-base text-white pl-2">Deposit</p>

            <div className="w-96 my-6">
                <div className="bg-white rounded-lg p-3">
                    <div className="text-black flex justify-between mb-3 items-center w-full">
                        <div className="bg-black rounded-md p-2 gap-3 flex items-center">
                            <div className="bg-[#A2A8B4] rounded-full px-1 py-[0.5px] flex items-center justify-center">
                                <Image
                                    src={"/Coin/ETH_black.svg"}
                                    alt="token"
                                    width={9}
                                    height={14}
                                    priority
                                    quality={100}
                                    className=""
                                />
                            </div>

                            <div className="text-white text-xs">
                                <p>ETH</p>
                            </div>

                            <div className="">
                                <Image
                                    src={"/chevronDown.svg"}
                                    alt="dropdown indicator"
                                    width={10}
                                    height={5}
                                    priority
                                    quality={100}
                                    className="text-[#A2A8B4]"
                                />
                            </div>
                        </div>

                        <div className="text-black text-xl">
                            <p>0.00</p>
                        </div>
                    </div>
                
                    <div className="text-black text-xs flex justify-between">
                        <p>1 ETH = $2,500</p>
                        <p className="font-bold">≈$ 6726.2307</p>
                    </div>
                </div>
            </div>

            <Link href={"/successful"} className=" my-4 px-4 cursor-pointer">
                <Btn
                    text={"Deposit"}
                    css="text-black bg-[#FF4D00CC]/80 text-base w-full py-2 rounded flex items-center justify-center"
                />
            </Link>
        </div>
    );
}
