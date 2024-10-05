import { DateInputField } from "@/components/createOrder/DateInputField";
import { Btn } from "@/components/shared/Btn";
import Image from "next/image";
import Link from "next/link";

export default function CreateOrderPage() {
 
    return (
        <div className="bg-black rounded-md p-2">
            <p className="text-base text-white pl-2 font-[family-name:var(--font-montserrat)]">Order</p>

            <div className="my-4 font-[family-name:var(--font-inter)] px-14">
                <div className="flex gap-6 items-center w-80 justify-center">
                    <Btn
                        text={"Lend"}
                        css="text-black/80 bg-[#D7D7D7CC]/80 text-xl w-full  py-2 rounded flex items-center justify-center"
                    />
                    <Btn
                        text={"Borrow"}
                        css="text-black bg-[#FF4D00CC]/80 text-xl w-full py-2 rounded flex items-center justify-center"
                    />
            </div>
        </div>

        <div className="bg-white rounded-lg p-3 font-[family-name:var(--font-montserrat)]">
            <div className="text-black flex justify-between mb-3 items-center">
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

        <div className="px-4">
                <div className="bg-white mt-3 font-[family-name:var(--font-inter)] rounded-[40px] px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="text-[14.6px] font-medium">
                        <p className="text-[#636363]">
                            Order Value
                            <span className="text-black/30 ml-3">
                            .<span className="ml-2">Net Profit</span>
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-black text-[14.6px]">ETH</p>
                        <Image
                            src={"/chevron.svg"}
                            alt="token"
                            width={6}
                            height={11}
                            priority
                            quality={100}
                            className=""
                        />
                    </div>
                </div>

                <div className="mt-2">
                    <p className="font-bold text-black text-[51.12px]">
                    $17,200<span className="text-[14.6px] ml-2 font-medium text-black/30">+$233</span>
                    </p>
                </div>

                <div className="flex items-center w-full gap-1 justify-center mt-2">
                    <div className="bg-[#A2A8B4] rounded-full py-4 px-[28px] flex items-center justify-center">
                        <p className="text-4xl">-</p>
                    </div>

                    <div className="bg-[#FF4D00CC]/80 rounded-3xl p-4 flex items-center justify-center">
                        <p className="text-[27.5px] font-medium text-black">0.00<span className="ml-1">%</span></p>
                    </div>

                    <div className="bg-[#A2A8B4] rounded-full py-4 px-[25px] flex items-center justify-center">
                        <p className="text-4xl">+</p>
                    </div>
                </div>
                </div>
            </div>

            <div className="px-4">
                <DateInputField />
            </div>
      
            <Link href={"/volume"} className="font-[family-name:var(--font-montserrat)] my-4 px-4 cursor-pointer">
                <Btn
                    text={"Create Order"}
                    css="text-black bg-[#FF4D00CC]/80 text-base w-full py-2 rounded flex items-center justify-center"
                />
            </Link>
        </div>
     );
}
