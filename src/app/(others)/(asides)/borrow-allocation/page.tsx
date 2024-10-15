"use client";

import { Btn } from "@/components/shared/Btn";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation"; // Import useSearchParams
import { useState } from "react"; // Import useState for managing input state

export default function BorrowAllocationPage() {
    const router = useRouter();
    const searchParams = useSearchParams(); // Get search parameters

    // Extract query parameters from the URL
    const listingId = searchParams.get("listingId");
    const maxAmount = parseFloat(searchParams.get("maxAmount") || "0");
    const minAmount = parseFloat(searchParams.get("minAmount") || "0");

    const [borrowAmount, setBorrowAmount] = useState(""); // State to hold the input value

    const handleCancel = () => {
        router.push("/marketplace");
    };

    // Function to handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBorrowAmount(value)

        // // Validate input value
        // if (value === "" || (parseFloat(value) >= minAmount && parseFloat(value) <= maxAmount)) {
        //     setBorrowAmount(value); // Update state if value is valid
        // }
    };

    return (
        <div className="h-screen flex items-center">
            <div className="bg-black rounded-md py-2 px-4 text-white u-class-shadow">
                <p className="text-base">Borrow</p>

                <div className="w-96 my-6">
                    <p className="text-[14.6px]">Borrow Allocation</p>
                    <div className="mt-2 w-full bg-white rounded-lg">
                        {/* Input field for borrow amount */}
                        <input
                            type="number"
                            value={borrowAmount}
                            onChange={handleChange}
                            placeholder={`Enter amount between $${minAmount.toFixed(4)} and $${maxAmount.toFixed(4)}`}
                            className="w-full bg-transparent border border-white rounded-lg py-2 px-3 text-black"
                        />
                    </div>
                    
                    <div className="text-base mt-6 flex justify-between items-center">
                        <div className="w-[121px]">
                            <div className="border border-white w-full py-3 rounded-lg">
                                <p className="pl-4">${minAmount.toFixed(4) || 0}</p>
                            </div>
                            <p className="text-[10px] font-medium text-center mt-1">Lower Limit</p>
                        </div>

                        <div className="text-2xl">-</div>

                        <div className="w-[121px]">
                            <div className="border border-white w-full py-3 rounded-lg">
                                <p className="pl-4">${maxAmount.toFixed(4) || 8600}</p>
                            </div>
                            <p className="text-[10px] font-medium text-center mt-1">Upper Limit</p>
                        </div>
                    </div>
                </div>

                <div className="my-4 cursor-pointer">
                    <Btn
                        text={"Borrow"}
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
