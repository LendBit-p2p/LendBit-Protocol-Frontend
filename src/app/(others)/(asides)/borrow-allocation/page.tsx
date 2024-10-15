"use client"

import { Btn } from "@/components/shared/Btn";
import { Slider } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function BorrowAllocationPage() {
   const router = useRouter();

   const handleCancel = () => {
    router.push("/marketplace");
   };

    return (
        <div className="h-screen flex items-center">
            <div className="bg-black rounded-md py-2 px-4  text-white u-class-shadow">
                <p className="text-base">Borrow</p>

                <div className="w-96 my-6">
                    <p className="text-[14.6px]">Borrow Allocation</p>
                    <div className="mt-2 w-full bg-[#FFCFB4] rounded-lg">
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

                <div className=" my-4 cursor-pointer">
                    <Btn
                        text={"Borow"}
                        css="text-black bg-[#FF4D00CC]/80 text-base w-full py-2 rounded flex items-center justify-center"
                    />
                </div>

                <div className="cursor-pointer mb-4" onClick={handleCancel}>
                    <Btn
                    text={"Cancel"}
                    css="text-black bg-[#a2a8b4]/80 text-base w-full py-2 rounded flex items-center justify-center"
                    />
                </div>
            </div>
       </div>
    );
}
