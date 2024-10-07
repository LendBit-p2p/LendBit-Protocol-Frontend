import { Slider } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function VolumePage() {


    return (
        <div className="bg-black rounded-md py-2 px-4 font-medium text-white u-class-shadow">
            <Link
                href={"/create-order"}
                className="flex items-center gap-1 cursor-pointer"
            >
                <div className="flex items-center">
                    <div className="rounded-full w-5 h-5 border-white border-2 flex items-center justify-center">
                        <Image
                            src={"/chevronDown.svg"}
                            alt="chevron"
                            width={10}  
                            height={10}  
                            priority
                            quality={100}
                            className="rotate-90" 
                        />
                    </div>
                </div>
                <p className="text-lg">Back</p>
            </Link>

            <div className="mt-[6px]">
                <p className="text-lg">Customize order Volume per User</p>
            </div>

            <div className="mt-5">
                <p className="text-[14.6px]">Borrow Allocation</p>

                {/* Range Slider Here */}
                <div className="mt-2 w-[428px] bg-[#FFCFB4] rounded-lg">
                    <Slider defaultValue={[0, 72]} className="w-full" size="3" color="orange" radius="large" />
                </div>

                <div className="text-base mt-6 flex justify-between items-center">
                    <div className="w-[121px]">
                        <div className="border border-white w-full py-3 rounded-lg">
                            <p className="pl-4">$0</p>
                        </div>
                        <p className="text-[10px] font-medium text-center mt-1">Lower Limit</p>
                    </div>

                    <div className="text-2xl">
                        -
                    </div>

                    <div className="w-[121px]">
                        <div className="border border-white w-full py-3 rounded-lg">
                            <p className="pl-4">$8600</p>
                        </div>
                        <p className="text-[10px] font-medium text-center mt-1">Upper Limit</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
